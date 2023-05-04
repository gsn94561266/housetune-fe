import React from 'react';
import { useState, useEffect } from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/Authcontext';
import { useChat } from '../Context/Chatcontext';
import { useGoogle } from '../Context/Googlecontext';
import jwt_decode from 'jwt-decode';

function Login() {
  const navigate = useNavigate();
  const { googleInfo, setGoogleInfo } = useGoogle();
  const { userinfo, setUserInfo, isLoggedIn, setIsLoggedIn } = useAuth();
  const [value, setValue] = useState('');
  const [member, setMemeber] = useState({
    account: '',
    password: '',
  });
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
  // useEffect(() => {
  //   return () => {
  //     setGoogleInfo({
  //       email: '',
  //       name: '',
  //     });
  //   };
  // }, []);
  axios.defaults.withCredentials = true;
  function handleCallBackResponse(response) {
    // console.log('Encoded JWT ID token: ' + response.credential);
    var userObj = jwt_decode(response.credential);
    // console.log(userObj.name);
    setGoogleInfo({
      email: userObj.email,
      name: userObj.name,
    });
  }
  useEffect(() => {
    async function fetchData() {
      if (googleInfo.email !== '' && googleInfo.name !== '') {
        try {
          let response = await axios.post(
            'http://localhost:3001/api/auth/login/google',
            googleInfo
          );
          let response1 = await axios.get(
            'http://localhost:3001/api/auth/member'
          );
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
          if (e.response.data.errors) {
            alert(e.response.data.errors[0]['msg']);
          } else if (e.response.data.bundle) {
            alert(e.response.data.bundle[0]['msg']);
            navigate('/google/bundle');
          } else {
            navigate('/register/google');
          }
        }
      }
    }
    fetchData();
  }, [googleInfo]);
  useEffect(() => {
    console.log(process.env);
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_ID,
      callback: handleCallBackResponse,
    });
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    });
  }, []);

  function handleChange(e) {
    setMemeber({ ...member, [e.target.name]: e.target.value });
  }
  function handleChange1(e) {
    setValue(e.target.value);
    setMemeber({ ...member, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response = await axios.post(
        'http://localhost:3001/api/auth/login',
        member
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
    <>
      <div className="pageBG bg-orange py-lg-5 py-4">
        {/* <header className="bg-primary text-center">Header</header> */}

        <div className="pageImg">
          <div className="container">
            <form
              action=""
              method=""
              className="formStyle"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <h1 className="title text-center text-info fw-bold">
                  會員登入
                </h1>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-12 col-lg-8">
                  <input
                    required
                    maxLength="20"
                    minLength="4"
                    className="form-control"
                    type="text"
                    placeholder="帳號"
                    name="account"
                    onChange={handleChange1}
                    value={value}
                  ></input>
                </div>
                <div className="col-12 col-lg-8">
                  <input
                    required
                    maxLength="12"
                    minLength="6"
                    className="form-control"
                    type="password"
                    placeholder="密碼"
                    name="password"
                    onChange={handleChange}
                  ></input>
                </div>
                {/* desktop */}
                <div className="col-8">
                  <div className="d-none d-lg-block">
                    <div className="d-flex justify-content-between mt-3 mb-5">
                      <div>
                        <button className="btn btn-primary-300" type="submit">
                          登入
                        </button>
                      </div>
                      <div className="">
                        <h6 className="text-gray-200 fw-bold">
                          還沒有加入Housetune ?
                        </h6>
                        <Link
                          to="/forgot"
                          className="text-decoration-none text-info fw-bold"
                        >
                          忘記您的 帳號 / 密碼嗎 ?
                        </Link>
                      </div>

                      <div className="/register">
                        <Link
                          to="/register"
                          className="mx-1 text-decoration-none  text-primary-300 fw-bold"
                        >
                          點我加入會員
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-8 d-flex justify-content-end">
                  <p className="my-0 me-3 d-flex align-items-center">或</p>
                  <div id="signInDiv"></div>
                </div>
              </div>

              {/* mobile */}
              <div className="d-lg-none">
                <div className="d-flex">
                  <button className="btn btn-primary-300">登入</button>
                  <div className="mx-3">
                    <h6 className="text-gray-200">還沒有加入Housetune ?</h6>
                    <Link
                      to="/register"
                      className="text-decoration-none text-primary-300"
                    >
                      點我加入會員
                    </Link>
                  </div>
                </div>
                <div className="mt-3 mb-5">
                  <Link
                    to="/forgot"
                    className="text-decoration-none text-primary-300"
                  >
                    忘記您的 帳號 / 密碼嗎 ?
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* <footer className="bg-gray-100 text-center">Footer</footer> */}
      </div>
    </>
  );
}

export default Login;
