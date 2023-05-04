import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../Context/Authcontext';
import { useChat } from '../Context/Chatcontext';
import { useGoogle } from '../Context/Googlecontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GoogleBundle() {
  const navigate = useNavigate();
  const { googleInfo, setGoogleInfo } = useGoogle();
  const { userinfo, setUserInfo, isLoggedIn, setIsLoggedIn } = useAuth();
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
  } = useChat();
  const [userData, setUserData] = useState({
    email: googleInfo.email,
    password: '',
  });
  axios.defaults.withCredentials = true;
  async function handleSubmit() {
    try {
      console.log(userData);
      let response = await axios.put(
        'http://localhost:3001/api/auth/bundle/google',
        userData
      );
      let response1 = await axios.get('http://localhost:3001/api/auth/member');
      setIsLoggedIn(response1.data.loggedIn);
      setChat(false);
      setReciever('官方客服');
      setRecieverId(1);
      setMessage('');
      setBegin(false);
      setMessageList([]);
      setRoom('test123');
      setOtherReciever('');
      setSwitchZone(false);
      setNewMessage([]);
      if (response1.data.userInfo) {
        setUserInfo(response1.data.userInfo);
      }
      alert(response.data.msg);
      navigate('/user');
    } catch (e) {
      alert(e.response.data.errors[0]['msg']);
    }
  }
  return (
    <div className="bg-orange googlebundle">
      <div className="container d-flex flex-column align-items-center">
        <p>此email: {googleInfo.email}已註冊過</p>
        <p>輸入此用戶密碼以綁定您的google帳號</p>
        <input
          type="password"
          className="mt-3"
          name="password"
          onChange={(e) => {
            setUserData({ ...userData, [e.target.name]: e.target.value });
          }}
        />
        <div className="d-flex justify-content-between mt-5">
          <button className="me-5" onClick={handleSubmit}>
            送出
          </button>
          <button
            onClick={() => {
              setGoogleInfo({
                email: '',
                name: '',
              });
              navigate('/');
            }}
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
}

export default GoogleBundle;
