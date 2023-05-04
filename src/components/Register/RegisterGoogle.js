import React from 'react';
import './Register.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useGoogle } from '../Context/Googlecontext';
import { useAuth } from '../Context/Authcontext';
import { useChat } from '../Context/Chatcontext';
import axios from 'axios';

function subcity(city) {
  switch (city) {
    case '台北市':
      return [
        '大安區',
        '北投區',
        '大同區',
        '中山區',
        '文山區',
        '內湖區',
        '士林區',
        '松山區',
        '萬華區',
        '信義區',
        '南港區',
        '中正區',
      ];
    case '新北市':
      return [
        '萬里區',
        '金山區',
        '板橋區',
        '汐止區',
        '深坑區',
        '石碇區',
        '瑞芳區',
        '平溪區',
        '雙溪區',
        '貢寮區',
        '新店區',
        '坪林區',
        '烏來區',
        '永和區',
        '中和區',
        '土城區',
        '三峽區',
        '樹林區',
        '鶯歌區',
        '三重區',
        '新莊區',
        '泰山區',
        '林口區',
        '蘆洲區',
        '五股區',
        '八里區',
        '淡水區',
        '三芝區',
        '石門區',
      ];
    case '桃園市':
      return [
        '桃園區',
        '中壢區',
        '平鎮區',
        '八德區',
        '楊梅區',
        '蘆竹區',
        '大溪區',
        '龜山區',
        '大園區',
        '觀音區',
        '新屋區',
        '龍潭區',
        '復興區',
      ];
    default:
      return [];
  }
}

function RegisterGoogle() {
  const { googleInfo, setGoogleInfo } = useGoogle();
  const navigate = useNavigate();
  // let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  const [inputItem, setInputitem] = useState([
    {
      title: '會員帳號',
      type: 'text',
      preset: '請輸入會員帳號',
      name: 'account',
      max: '20',
      min: '4',
      req: true,
    },
    {
      title: '會員密碼',
      type: 'password',
      preset: '請輸入會員密碼',
      name: 'password',
      max: '12',
      min: '6',
      req: true,
    },
    {
      title: '確認密碼',
      type: 'password',
      preset: '請再次輸入會員密碼',
      name: 'rePassword',
      max: '12',
      min: '6',
      req: true,
    },
    {
      title: '會員姓名',
      type: 'text',
      preset: '請輸入會員姓名',
      name: 'name',
      max: '',
      min: '',
      req: true,
      value: googleInfo.name,
      disabled: 'disabled',
    },
    {
      title: 'E-mail',
      type: 'text',
      preset: '請輸入電子信箱',
      name: 'email',
      max: '',
      min: '',
      req: true,
      value: googleInfo.email,
      disabled: 'disabled',
    },
    {
      title: '連絡電話',
      type: 'text',
      preset: '請輸入連絡電話',
      name: 'phone',
      max: '',
      min: '',
      req: true,
    },
    {
      title: '銀行代碼（二手商品收款用，非必填）',
      type: 'text',
      preset: '請輸入銀行代碼（非必填）',
      name: 'bankcode',
      max: '',
      min: '',
      req: false,
      class: 'd-flex align-items-center',
    },
    {
      title: '銀行帳號（二手商品收款用，非必填）',
      type: 'text',
      preset: '請輸入銀行帳號（非必填）',
      name: 'bankaccount',
      max: '',
      min: '',
      req: false,
      class: 'd-flex align-items-center',
    },
  ]);
  const [member, setMemeber] = useState({
    account: '',
    password: '',
    rePassword: '',
    name: googleInfo.name,
    email: googleInfo.email,
    phone: '',
    address1: '',
    address2: '',
    address3: '',
    bankcode: '',
    bankaccount: '',
  });
  const [a, setA] = useState(['', '', '', '', '', '', '', '']);

  // const [errors, setErrors] = useState({
  //   account: '',
  //   password: '',
  //   rePassword: '',
  //   name: '',
  //   email: '',
  //   phone: '',
  //   address1: '',
  //   address2: '',
  // });
  axios.defaults.withCredentials = true;

  function handleChange(e) {
    setMemeber({ ...member, [e.target.name]: e.target.value });
  }

  function cityFunc(e) {
    setCity(e.target.value);
    handleChange(e);
  }
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

  async function handleSubmit(e) {
    e.preventDefault();
    if (member.password !== member.rePassword) {
      alert('密碼輸入不一致，請修正');
      return;
    }
    try {
      let response = await axios.post(
        'http://localhost:3001/api/auth/register/google',
        member
      );
      alert(response.data);
      let response1 = await axios.post(
        'http://localhost:3001/api/auth/login/google',
        googleInfo
      );
      let response2 = await axios.get('http://localhost:3001/api/auth/member');
      setIsLoggedIn(response2.data.loggedIn);
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
      if (response2.data.userInfo) {
        setUserInfo(response2.data.userInfo);
      }
      navigate('/user');
    } catch (e) {
      // console.log(e.response);
      if (e.response.data) {
        alert(e.response.data.errors[0]['msg']);
      }
    }
  }
  const [city, setCity] = useState('');

  return (
    <>
      <div className="pageBG bg-orange py-lg-5 py-4">
        {/* header */}
        {/* <header className="bg-primary text-center">Header</header> */}

        {/* form */}
        <div className="container">
          <form
            action=""
            method=""
            className="form-control"
            onSubmit={handleSubmit}
          >
            {/* form title */}
            <div className="mt-1 mb-4 py-2">
              <h1
                className="text-center text-info fw-bold"
                onClick={() => {
                  setA([
                    'bob83727',
                    '123456',
                    '123456',
                    '',
                    '',
                    '0223939889',
                    '700',
                    '00034566543000',
                  ]);
                  setMemeber({
                    account: 'bob83727',
                    password: '123456',
                    rePassword: '123456',
                    name: googleInfo.name,
                    email: googleInfo.email,
                    phone: '0223939889',
                    address1: '',
                    address2: '',
                    address3: '',
                    bankcode: '700',
                    bankaccount: '00034566543000',
                  });
                }}
              >
                加入會員
              </h1>
            </div>
            {/* form input */}
            {inputItem.map((it, i) => {
              return (
                <div key={i} className="row mt-4 mt-lg-5">
                  <div className="col-4 d-none d-lg-block">
                    <h5 className="text-center text-info fw-bold">
                      {it.title}
                    </h5>
                  </div>
                  <div className={'col col-lg-7 ' + (it.class ? it.class : '')}>
                    <input
                      required={it.req}
                      type={it.type}
                      className="form-control"
                      placeholder={it.preset}
                      maxLength={it.max}
                      minLength={it.min}
                      onChange={handleChange}
                      name={it.name}
                      value={it.value ? it.value : a[i]}
                      disabled={it.disabled ? it.disabled : false}
                    ></input>
                  </div>
                  {/* {errors[it.name]} */}
                </div>
              );
            })}

            <div className="row mt-4 mt-lg-5">
              <div className="col-4  d-none d-lg-block">
                <h5 className="text-center text-info fw-bold">聯絡地址</h5>
              </div>
              <div className="col-7 d-flex justify-content-between">
                <div className="d-none d-lg-block w-40">
                  <select
                    className="form-select"
                    onChange={cityFunc}
                    name="address1"
                    required
                  >
                    <option selected>請選擇城市</option>
                    <option value="台北市">台北市</option>
                    <option value="新北市">新北市</option>
                    <option value="桃園市">桃園市</option>
                    <option>台中市</option>
                    <option>台南市</option>
                    <option>高雄市</option>
                    <option>新竹縣</option>
                    <option>苗栗縣</option>
                    <option>彰化縣</option>
                    <option>南投縣</option>
                    <option>雲林縣</option>
                    <option>嘉義縣</option>
                    <option>屏東縣</option>
                    <option>宜蘭縣</option>
                    <option>花蓮縣</option>
                    <option>台東縣</option>
                    <option>澎湖縣</option>
                    <option>金門縣</option>
                    <option>連江縣</option>
                    <option>基隆市</option>
                    <option>新竹市</option>
                    <option>嘉義市</option>
                  </select>
                </div>
                <div className="d-none d-lg-block w-40">
                  <select
                    className="form-select"
                    name="address2"
                    onChange={handleChange}
                    required
                  >
                    <option selected>請選擇地區</option>
                    {subcity(city).map((v, i) => {
                      return (
                        <option key={i} value={v}>
                          {v}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-4 d-none d-lg-block"></div>
              <div className="col-7 d-none d-lg-block">
                <input
                  type="text"
                  className="form-control"
                  placeholder="請輸入地址"
                  name="address3"
                  onChange={handleChange}
                  required
                ></input>
              </div>
            </div>

            {/* button */}
            <div className="d-flex d-lg-block">
              <div className="d-lg-flex justify-content-center mt-lg-5 mb-4">
                <button
                  className="btn btn-primary-300 me-2 me-lg-5 col-2"
                  type="submit"
                >
                  送出
                </button>
                <button type="reset" className="btn btn-primary-300 col-2">
                  清除
                </button>
              </div>
              {/* 登入Link */}
              <div className="d-flex mb-3 justify-content-center align-items-center">
                <div className="mx-1">
                  <h6 className="text-gray-200 m-auto">已經是會員了 ?</h6>
                </div>
                <div className="d-flex align-items-center">
                  <Link
                    to="/login"
                    className="text-decoration-none text-primary-300 d-none d-lg-inline"
                    onClick={() => {
                      setGoogleInfo({
                        email: '',
                        name: '',
                      });
                    }}
                  >
                    點我登入
                  </Link>
                  {/* mobile */}
                  <Link
                    to="/login"
                    className="text-decoration-none text-primary-300 d-lg-none"
                  >
                    登入
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* footer */}
        {/* <footer className="bg-gray-100 text-center">Footer</footer> */}
      </div>
    </>
  );
}

export default RegisterGoogle;
