import React from 'react';
import { useState, useEffect } from 'react';
import './Chat.scss';
// import io from 'socket.io-client';
import { useChat } from '../Context/Chatcontext';
import { useAuth } from '../Context/Authcontext';
import axios from 'axios';

// const socket = io.connect('http://localhost:3001');

function Chat({ socket }) {
  axios.defaults.withCredentials = true;
  const {
    chat,
    setChat,
    reciever,
    setReciever,
    recieverId,
    setRecieverId,
    message,
    setMessage,
    begin,
    setBegin,
    messageList,
    setMessageList,
    room,
    setRoom,
    otherReciever,
    setOtherReciever,
    switchZone,
    setSwitchZone,
    newMessage,
    setNewMessage,
    chatListAccount,
    setChatListAccount,
  } = useChat();
  const { userinfo, setUserInfo, isLoggedIn, setIsLoggedIn } = useAuth();
  async function handleBegin() {
    setBegin(true);
    // console.log(userinfo.name);
    socket.emit('join_room', userinfo.account);
    try {
      let response = await axios.post('http://localhost:3001/api/chat/get', {
        userId: userinfo.id,
        recieverId: recieverId,
      });
      // console.log(response.data);
      for (let i = 0; i < response.data.length; i++) {
        let time1 = response.data[i].timestamp.slice(0, 10);
        let time2 = response.data[i].timestamp.slice(11, 16);
        const messageStored = {
          recieverId: response.data[i].reciever_id,
          senderId: response.data[i].sender_id,
          message: response.data[i].message,
          time: time1 + ' ' + time2,
          sender:
            response.data[i].sender_id === userinfo.id
              ? userinfo.name
              : reciever,
        };
        setMessageList((list) => [...list, messageStored]);
      }
      let response1 = await axios.post(
        'http://localhost:3001/api/chat/getlist',
        {
          userId: userinfo.id,
        }
      );
      // console.log(response1.data);
      setChatListAccount(response1.data);
    } catch (e) {}
  }
  async function handleSwitch() {
    if (switchZone !== '') {
      let response = await axios.post('http://localhost:3001/api/chat/switch', {
        otherReciever: otherReciever,
      });
      // console.log(response.data);
      if (response.data.length === 0) {
        alert('無此用戶');
      } else if (response.data[0].account === userinfo.account) {
        alert('寄件者與收件者為同一用戶');
      } else if (response.data[0].name === reciever) {
        alert('已在與此用戶通訊中');
      } else {
        setMessageList([]);
        setReciever(response.data[0].name);
        setRecieverId(response.data[0].user_id);
        setSwitchZone(!switchZone);
        setBegin(!begin);
        setRoom(otherReciever);
      }
    }
  }
  async function sendMessage() {
    // console.log('hi');
    if (message !== '') {
      let hour = new Date(Date.now()).getHours();
      let minute = new Date(Date.now()).getMinutes();
      let second = new Date(Date.now()).getSeconds();
      if (hour < 10) {
        hour = '0' + hour;
      }
      if (minute < 10) {
        minute = '0' + minute;
      }
      if (second < 10) {
        second = '0' + second;
      }
      const messageData = {
        reciever: reciever,
        sender: userinfo.name,
        senderId: userinfo.id,
        senderAccount: userinfo.account,
        recieverId: recieverId,
        message: message,
        room: room,
        time:
          new Date(Date.now()).getMonth() +
          1 +
          '/' +
          new Date(Date.now()).getDate() +
          ' ' +
          hour +
          ':' +
          minute,
        fulltime:
          new Date(Date.now()).getFullYear() +
          '-' +
          (new Date(Date.now()).getMonth() + 1) +
          '-' +
          new Date(Date.now()).getDate() +
          ' ' +
          hour +
          ':' +
          minute +
          ':' +
          second,
      };
      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setMessage('');
      try {
        let response = await axios.post(
          'http://localhost:3001/api/chat',
          messageData
        );
        let response1 = await axios.post(
          'http://localhost:3001/api/chat/getlist',
          {
            userId: userinfo.id,
          }
        );
        // console.log(response1.data);
        setChatListAccount(response1.data);
      } catch (e) {}
    }
  }
  useEffect(() => {
    // console.log('reciever change');

    socket.off('recieve_message');
    // console.log('ki');
    socket.on('recieve_message', (data) => {
      // console.log(data);
      // console.log(reciever);
      if (data.sender !== reciever) {
        const newcomer = {
          sender: data.sender,
          senderId: data.senderId,
          senderAccount: data.senderAccount,
        };
        setNewMessage((list) => [...list, newcomer]);
        // setReciever(data.sender);
        // setRecieverId(data.senderId);
        // console.log(newMessage);
      } else {
        setMessageList((list) => [...list, data]);
      }
    });
  }, [reciever]);

  useEffect(() => {
    // console.log(newMessage);
    async function changeList() {
      let replica = newMessage;
      let replica1 = replica.map((x) => x.sender);
      // console.log(replica1);
      let last = replica1[replica1.length - 1];
      if (replica1.indexOf(last) < replica1.length - 1) {
        replica.pop();
        // console.log(replica);
        setNewMessage([]);
        for (let i = 0; i < replica.length; i++) {
          setNewMessage((list) => [...list, replica[i]]);
        }
      }
      let response1 = await axios.post(
        'http://localhost:3001/api/chat/getlist',
        {
          userId: userinfo.id,
        }
      );
      // console.log(response1.data);
      setChatListAccount(response1.data);
    }
    changeList();
  }, [newMessage]);
  useEffect(() => {
    async function fetchdata() {
      setMessageList([]);
      let response = await axios.post('http://localhost:3001/api/chat/get', {
        userId: userinfo.id,
        recieverId: recieverId,
      });
      //   console.log(response.data);
      for (let i = 0; i < response.data.length; i++) {
        let time1 = response.data[i].timestamp.slice(0, 10);
        let time2 = response.data[i].timestamp.slice(11, 16);
        const message = {
          recieverId: response.data[i].reciever_id,
          senderId: response.data[i].sender_id,
          message: response.data[i].message,
          time: time1 + ' ' + time2,
          sender:
            response.data[i].sender_id === userinfo.id
              ? userinfo.name
              : reciever,
        };
        setMessageList((list) => [...list, message]);
      }
    }
    fetchdata();
  }, [recieverId]);
  return (
    <>
      <div
        className={
          'position-relative chat justify-content-between d-flex flex-column position-fixed bg-white shadow rounded-top ' +
          (chat && isLoggedIn ? '' : 'd-none')
        }
      >
        <div
          className={
            'notification position-absolute text-white bg-primary-200 shadow ' +
            (newMessage.length === 0 ? 'd-none' : '')
          }
        >
          <p className="m-0 text-center">您有新訊息</p>
          {newMessage.map((v, i) => {
            return (
              <p
                className="m-0 text-center bg-white text-black shadow-lg noti"
                key={i}
                onClick={() => {
                  setReciever(v.sender);
                  setRecieverId(v.senderId);
                  let replica = [...newMessage];
                  replica.splice(i, 1);
                  setNewMessage(replica);
                  setRoom(v.senderAccount);
                }}
              >
                {v.sender}
              </p>
            );
          })}
        </div>
        <div
          className={
            'chatlist position-absolute text-white bg-primary-200 shadow dialogue-list ' +
            (begin === false || chatListAccount.length === 0 ? 'd-none' : '')
          }
        >
          <p className="m-0 text-center">對話列表</p>
          {chatListAccount.map((v, i) => {
            return (
              <p
                className="m-0 text-center bg-white text-black shadow-lg list"
                key={i}
                onClick={() => {
                  setReciever(v.name);
                  setRecieverId(v.id);
                  setRoom(v.account);
                  let replica = newMessage;
                  let replica1 = replica.filter(
                    (item) => item.senderId !== v.id
                  );
                  setNewMessage(replica1);
                }}
              >
                {v.name}
              </p>
            );
          })}
        </div>
        <div>
          <h4 className="bg-primary-300 text-center text-white py-2 position-relative rounded-top">
            {reciever}
            <i
              className="fa-solid fa-xmark position-absolute mt-1 fs-5"
              onClick={() => {
                setChat(false);
              }}
            ></i>
          </h4>
        </div>
        <button
          className={
            'btn btn-primary-300 text-white w-50 align-self-center ' +
            (begin === false && switchZone === false ? '' : 'd-none')
          }
          onClick={handleBegin}
        >
          開始即時通訊
        </button>
        <div
          id="message"
          className={
            'overflow-auto d-flex flex-column chatbody flex-grow-1 ' +
            (begin ? '' : 'd-none')
          }
          onClick={function () {
            var objDiv = document.getElementById('message');
            objDiv.scrollTop = objDiv.scrollHeight;
          }}
        >
          {messageList.map((v, i) => {
            return (
              <div key={i} className="message">
                <div
                  className={
                    'mx-2 message-content d-flex ' +
                    (userinfo.id === v.senderId ? 'flex-row-reverse' : '')
                  }
                >
                  <p
                    className={
                      'd-flex px-2 mb-0 rounded-pill text-white ' +
                      (userinfo.id === v.senderId
                        ? 'bg-primary-300'
                        : 'bg-primary-100')
                    }
                  >
                    {v.message}
                  </p>
                </div>
                <div className="mx-2 message-meta">
                  <p className={userinfo.id === v.senderId ? 'text-end' : ''}>
                    {v.time}
                    {v.sender}
                  </p>
                </div>
              </div>
            );
          })}
          <div className="anchor"></div>
        </div>
        <div className="input-area d-flex position-relative bg-gray">
          <input
            disabled={begin ? '' : 'disabled'}
            type="text"
            className="w-90 border-0 bg-gray text px-2 py-4 me-2 input-style"
            placeholder="請輸入訊息"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <div
            className={
              'd-flex switch-zone position-absolute ' +
              (switchZone ? '' : 'd-none')
            }
          >
            <div className="input-group mx-2">
              <p className="my-auto me-2">傳送訊息給</p>
              <input
                className="mw-191 form-control"
                type="text"
                placeholder="請輸入收件者帳號"
                value={otherReciever}
                onChange={(e) => {
                  setOtherReciever(e.target.value);
                }}
              />
              <button
                className="btn btn-primary-300 text-white"
                onClick={handleSwitch}
              >
                送出
              </button>
            </div>
          </div>
          <i
            className="text-primary-300 fa-solid fa-paper-plane bg-gray w-10 d-flex align-items-center"
            onClick={sendMessage}
          ></i>
          <i
            className="text-primary-300 fa-solid fa-people-arrows bg-gray w-10 d-flex align-items-center"
            onClick={() => {
              setSwitchZone(!switchZone);
              setBegin(!begin);
            }}
          ></i>
        </div>
      </div>
    </>
  );
}

export default Chat;
