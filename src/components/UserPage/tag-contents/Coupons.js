import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Context/Authcontext';
import { useEffect, useState } from 'react';
import copy from 'copy-to-clipboard';

// 在 user 裡面的 valid coupon
// 先把優惠券的格式變成一行
// 再把撈過來的資料（要轉格式 看小賴老師的git）透過 map撈出來
// 應該不用做分頁

function Coupons(props) {
  const navigate = useNavigate();
  const { userinfo, setUserInfo, isLoggedIn, setIsLoggedIn } = useAuth();

  const [addCoupon, setAddCoupons] = useState(false);

  // 優惠券名稱
  const [coupon, setCoupon] = useState('');
  // 優惠券細節
  const [couponDisplay, setCouponDisplay] = useState([]);

  function handleUseCoupon() {
    // 新增優惠券 ＝> 加入user.validCoupon
    // 前端再從 user table裡面撈
    setAddCoupons(false);
    async function getCoupon() {
      try {
        let res = await axios.put(`http://localhost:3001/api/user/addcoupons`, {
          coupon,
        });
        // console.log(res.data);
        if (res.data !== '無此優惠券') {
          alert('使用成功！');
          setAddCoupons(true);
        } else {
          alert('無此優惠券或不符合資格!');
        }
      } catch (err) {
        alert('發生不可預期的錯誤!');
        console.log(err);
      }
    }
    getCoupon();
  }

  useEffect(() => {
    async function getUserCoupon() {
      let result = await axios.get(
        'http://localhost:3001/api/user/usercoupons'
      );
      const coupons = result.data;
      setCouponDisplay(coupons);
    }
    getUserCoupon();
  }, [addCoupon]);

  return (
    <>
      <div className="user-coupons pt-2">
        <div className="coupon-informations pb-1">
          {/* 小標 */}
          <div className="pb-3">
            <span className="px-3">
              <i className="fa-solid fa-ticket text-info"></i>
              <span className="fw-bold text-info px-3">優惠券</span>
            </span>
          </div>
          {/* 內容 */}
          <div className="receive-coupons">
            {/* 輸入欄 */}
            <div className="row">
              <div className="col-12 col-md-6  d-flex align-items-center justify-content-evenly">
                <input
                  type="text"
                  value={coupon}
                  className="form-control w-75"
                  placeholder="輸入優惠券代碼..."
                  onChange={(e) => {
                    setCoupon(e.target.value);
                  }}
                />
                <button
                  className="btn btn-primary-300"
                  onClick={() => {
                    handleUseCoupon();
                  }}
                >
                  領取
                </button>
              </div>
            </div>
            {/* 優惠券列表 */}
            <div className="px-3 pt-4">
              <table className="table table-rwd text-gray-300 text-center w-100">
                {/* 標題 */}
                <thead>
                  <tr className="row text-center tr-only-hide">
                    <th className="col-2">優惠券項目</th>
                    <th className="col-2">折扣</th>
                    <th className="col-2">優惠券類型</th>
                    <th className="col-2">使用門檻</th>
                    <th className="col-2">使用期限</th>
                    <th className="col-2"></th>
                  </tr>
                </thead>
                {/* 優惠券詳細內容 */}
                <tbody>
                  {couponDisplay.length > 0 &&
                    couponDisplay.map((v, i) => {
                      return (
                        <tr
                          className="row text-center align-items-center"
                          key={i}
                        >
                          <td className="col-2" data-th="優惠券項目">
                            {v.coupon_name}
                          </td>
                          <td className="col-2" data-th="折扣">
                            ${v.discount}
                          </td>
                          <td className="col-2" data-th="優惠券類型">
                            {v.type}
                          </td>
                          <td className="col-2" data-th="使用門檻">
                            低消 {v.min_expense}
                          </td>
                          <td className="col-2" data-th="使用期限">
                            {v.start_date}~{v.end_date}
                          </td>
                          <td
                            className="col-2 d-flex justify-content-center"
                            data-th=""
                          >
                            <button
                              className="col-12 counponHover btn btn-white bg-orange"
                              onClick={() => {
                                copy(v.coupon_name);
                                alert('已複製優惠券代碼!');
                                navigate('/cart');
                              }}
                            >
                              使用
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Coupons;
