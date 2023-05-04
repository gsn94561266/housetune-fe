import React, { useState } from 'react';
import { useEffect } from 'react';

import '../Checkout.scss';

function Address() {
  // firstName 名 lastName 姓
  const [address, setAddress] = useState({
    country: '台灣',
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    district: '',
    postcode: '',
    address: '',
    company: '',
  });
  // 載入時
  useEffect(() => {
    const savedAddress = localStorage.getItem('myAddress');
    if (savedAddress) {
      setAddress(JSON.parse(localStorage.getItem('myAddress')));
    }
  }, []);
  useEffect(() => {
    // 存入 Localstorage
    localStorage.setItem('myAddress', JSON.stringify(address));
  }, [address]);

  return (
    <>
      {/* 運送地址表單 */}
      <div className="form-floating">
        <select className="form-select" onChange={(e) => {}}>
          <option value="1">{address.address}</option>
          <option value="2">使用新的地址</option>
        </select>
        <label>已儲存的地址</label>
      </div>
      <div className="form-floating">
        <select className="form-select">
          <option value="TW">台灣</option>
        </select>
        <label>國家/地區</label>
      </div>
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          placeholder="名字"
          value={address.firstName}
          onChange={(e) => {
            const newAddress = { ...address, firstName: e.target.value };
            setAddress({ ...newAddress });
          }}
        />
      </div>
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          placeholder="姓氏"
          value={address.lastName}
          onChange={(e) => {
            const newAddress = { ...address, lastName: e.target.value };
            setAddress({ ...newAddress });
          }}
        />
      </div>
      <div className="col-md-12">
        <input
          type="text"
          className="form-control"
          placeholder="電話"
          maxLength={10}
          onKeyUp={(e) => {
            e.target.value = e.target.value.replace(/[^\d]/g, '');
          }}
          value={address.phone}
          onChange={(e) => {
            const newAddress = { ...address, phone: e.target.value };
            setAddress({ ...newAddress });
          }}
        />
      </div>
      <div className="col-md-4">
        <input
          type="text"
          className="form-control"
          placeholder="市"
          value={address.city}
          onChange={(e) => {
            const newAddress = { ...address, city: e.target.value };
            setAddress({ ...newAddress });
          }}
        />
      </div>
      <div className="col-md-4">
        <input
          type="text"
          className="form-control"
          placeholder="區"
          value={address.district}
          onChange={(e) => {
            const newAddress = { ...address, district: e.target.value };
            setAddress({ ...newAddress });
          }}
        />
      </div>
      <div className="col-md-4">
        <input
          type="text"
          className="form-control"
          placeholder="郵遞區號"
          value={address.postcode}
          onChange={(e) => {
            const newAddress = { ...address, postcode: e.target.value };
            setAddress({ ...newAddress });
          }}
        />
      </div>
      <div className="col-12">
        <input
          type="text"
          className="form-control"
          placeholder="地址"
          value={address.address}
          onChange={(e) => {
            const newAddress = { ...address, address: e.target.value };
            setAddress({ ...newAddress });
          }}
        />
      </div>
      <div className="col-12">
        <input
          type="text"
          className="form-control"
          placeholder="公司(選填)"
          value={address.company}
          onChange={(e) => {
            const newAddress = { ...address, company: e.target.value };
            setAddress({ ...newAddress });
          }}
        />
      </div>
    </>
  );
}

export default Address;
