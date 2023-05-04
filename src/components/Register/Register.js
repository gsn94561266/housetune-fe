import React from 'react';
import './Register.scss';
import InputItem from './InputItem';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
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

function Register() {
  const navigate = useNavigate();
  // let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  const [member, setMemeber] = useState({
    account: '',
    password: '',
    rePassword: '',
    name: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    address3: '',
    bankcode: '',
    bankaccount: '',
  });
  const [a, setA] = useState([]);

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

  async function handleSubmit(e) {
    e.preventDefault();
    if (member.password !== member.rePassword) {
      alert('密碼輸入不一致，請修正');
      return;
    }
    try {
      let response = await axios.post(
        'http://localhost:3001/api/auth/register',
        member
      );
      alert(response.data);
      navigate('/login');
    } catch (e) {
      // console.log(e.response);
      alert(e.response.data.errors[0]['msg']);
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
                onMouseEnter={() => {
                  setA([
                    'user009',
                    '12345678',
                    '1234567',
                    '劉小昊',
                    'hao@gmail.com',
                    '0912345678',
                    '700',
                    '00012366432000',
                  ]);
                  setMemeber({
                    account: 'user009',
                    password: '12345678',
                    rePassword: '1234567',
                    name: '劉小昊',
                    email: 'hao@gmail.com',
                    phone: '0912345678',
                    address1: '',
                    address2: '',
                    address3: '',
                    bankcode: '700',
                    bankaccount: '700',
                  });
                }}
                onClick={() => {
                  setA([
                    'user009',
                    '12345678',
                    '12345678',
                    '劉小昊',
                    'hao@gmail.com',
                    '0912345678',
                    '700',
                    '00012366432000',
                  ]);
                  setMemeber({
                    account: 'user009',
                    password: '12345678',
                    rePassword: '12345678',
                    name: '劉小昊',
                    email: 'hao@gmail.com',
                    phone: '0912345678',
                    address1: '',
                    address2: '',
                    address3: '',
                    bankcode: '700',
                    bankaccount: '700',
                  });
                }}
              >
                加入會員
              </h1>
            </div>
            {/* form input */}
            {InputItem.map((it, i) => {
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
                      value={a[i] ? a[i] : null}
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

export default Register;
