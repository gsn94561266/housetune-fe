import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Context/Authcontext';

function UserDatas(props) {
  const { userinfo } = useAuth();

  const [member, setMemeber] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bankcode: '',
    bankaccount: '',
  });

  axios.defaults.withCredentials = true;

  useEffect(() => {
    async function getUser() {
      let res = await axios.get('http://localhost:3001/api/user/data');
      // console.log(res.data.data);
      setMemeber({
        name: res.data.data[0].name,
        email: res.data.data[0].email,
        phone: res.data.data[0].phone,
        address: res.data.data[0].address,
        bankcode: res.data.data[0].bank_code,
        bankaccount: res.data.data[0].bank_account,
      });
    }
    getUser();
  }, []);

  function handleChange(e) {
    setMemeber({ ...member, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let res = await axios.put('http://localhost:3001/api/user/update', {
        id: userinfo.id,
        member,
      });
      // console.log(res.data);
      alert(res.data.msg);
      // navigate('/login');
    } catch (e) {
      // console.log(e.response);
      alert(e.response.data.errors[0]['msg']);
    }
  }

  return (
    <>
      <div className="user-details pt-2">
        <form onSubmit={handleSubmit}>
          <div className="user-informations pb-1">
            <div className="member-class pb-3">
              <span className="px-3">
                <i className="fa-solid fa-image-portrait text-info"></i>
                <span className="fw-bold text-info px-3">
                  {userinfo.account}
                </span>
              </span>
              <button
                disabled
                className="btn btn-primary-300 rounded rounded-5 px-4"
              >
                一般會員
              </button>
            </div>
            <div className="details">
              <div className="row update-inputs px-3 pb-5">
                {/* 更改資料表 */}
                <div className="row">
                  {/* 姓名 */}
                  <div className="col-12 col-md-6  align-items-center pt-5">
                    <div className="row align-items-center">
                      <label
                        className="col-12 col-sm-4 text-info fw-bold "
                        htmlFor="userName"
                      >
                        姓名
                      </label>
                      <div className="col-12 col-sm-8">
                        <input
                          className="w-100 form-control bg-white"
                          type="text"
                          id="userName"
                          value={member.name}
                          onChange={handleChange}
                          name="name"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  {/* Email */}
                  <div className="col-12 col-md-6  align-items-center pt-5">
                    <div className="row align-items-center">
                      <label
                        htmlFor="userEmail"
                        className="col-12 col-sm-4 text-info fw-bold"
                      >
                        Email
                      </label>
                      <div className="col-12 col-sm-8">
                        <input
                          className="w-100 form-control bg-white"
                          id="userEmail"
                          type="email"
                          value={member.email}
                          onChange={handleChange}
                          name="email"
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  {/* 電話 */}
                  <div className="col-12 col-md-6 align-items-center pt-5">
                    <div className="row align-items-center">
                      <label
                        htmlFor="userPhone"
                        className="col-12 col-sm-4 text-info fw-bold"
                      >
                        連絡電話
                      </label>
                      <div className="col-12 col-sm-8">
                        <input
                          id="userPhone"
                          type="text"
                          className="w-100 form-control bg-white"
                          value={member.phone}
                          onChange={handleChange}
                          name="phone"
                          maxLength="11"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* 地址 */}
                  <div className="col-12 col-md-6 align-items-center pt-5">
                    <div className="row align-items-center">
                      <label
                        htmlFor="userAddress"
                        className="col-12 col-sm-4 text-info fw-bold"
                      >
                        地址
                      </label>
                      <div className="col-12 col-sm-8">
                        <input
                          id="userAddress"
                          type="text"
                          className="w-100 form-control bg-white"
                          value={member.address}
                          onChange={handleChange}
                          name="address"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  {/* Bank_code */}
                  <div className="col-12 col-md-6  align-items-center pt-5">
                    <div className="row align-items-center">
                      <label
                        htmlFor="userBank_code"
                        className="col-12 col-sm-4 text-info fw-bold"
                      >
                        銀行代碼
                      </label>
                      <div className="col-12 col-sm-8">
                        <input
                          className="w-100 form-control bg-white"
                          id="userBank_code"
                          type="bankcode"
                          value={member.bankcode}
                          onChange={handleChange}
                          name="bankcode"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  {/*  Bank_account */}
                  <div className="col-12 col-md-6  align-items-center pt-5">
                    <div className="row align-items-center">
                      <label
                        htmlFor="userBank_account"
                        className="col-12 col-sm-4 text-info fw-bold"
                      >
                        銀行帳號
                      </label>
                      <div className="col-12 col-sm-8">
                        <input
                          className="w-100 form-control bg-white"
                          id="userBank_account"
                          type="bankaccount"
                          value={member.bankaccount}
                          onChange={handleChange}
                          name="bankaccount"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  {/*  password */}
                  <div className="col-12 col-md-6  align-items-center pt-5">
                    <div className="row align-items-center">
                      <label
                        htmlFor="userpassword"
                        className="col-12 col-sm-4 text-info fw-bold"
                      >
                        密碼
                      </label>
                      <div className="col-12 col-sm-8">
                        <Link
                          to="/updatepwd"
                          className="text-decoration-none text-primary-300 d-none d-lg-inline"
                        >
                          修改密碼
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end px-4">
              <div className="sava-btn pe-3 py-3 ">
                <button
                  type="submit"
                  className="btn btn-primary-300 px-3"
                  // onClick={handleSubmit}
                >
                  儲存
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserDatas;
