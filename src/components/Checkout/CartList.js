import { async } from 'q';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../../utils/useCart';
import './Checkout.scss';
import { useBeforeCoupon } from '../Context/CouponContext';

function Checkout({ setPayment }) {
  const { cart, items } = useCart();
  // 引入使用 coupon 的狀態
  const { couponInfo, setCouponInfo, isUsed, setIsUsed } = useBeforeCoupon();
  // 判斷是官方 or 二手
  const [isSecond, setIsSecond] = useState(false);
  // 設定是否使用優惠券
  const [useCoupon, setUseCoupon] = useState(false);
  // 優惠券名稱
  const [coupon, setCoupon] = useState('');
  // 優惠券細節
  const [couponDetail, setCouponDetail] = useState({});

  // 判斷有 context 資料時
  const infoLength = Object.keys(couponInfo);

  useEffect(() => {
    if (items.length > 0) {
      let itemObj = items[0];
      const keys = Object.keys(itemObj);
      // 檢查是否有 seller_id
      if (keys.includes('seller_id') === false) {
        setIsSecond(false);
      } else {
        setIsSecond(true);
      }
    }
    if (!isUsed) {
      setUseCoupon(false);
    } else {
      setUseCoupon(true);
    }
    if (infoLength <= 0) {
      setCouponDetail({});
    } else {
      setCouponDetail({ ...couponInfo });
      setCoupon(couponInfo.coupon_name);
    }
  }, []);

  function handleUseCoupon() {
    setUseCoupon(false);
    setCouponDetail({});
    async function getCoupon() {
      try {
        // couponName = coupon;
        let res = await axios.get(
          `http://localhost:3001/api/usecoupon/coupons`,
          {
            params: { couponName: coupon },
          }
        );
        // console.log(res.data);
        let result = res.data[0];
        // console.log(result);
        if (result === undefined) {
          console.log('沒有這個優惠碼');
          alert('沒有這個優惠碼');
          // console.log(couponDetail);
        } else {
          setCouponDetail({ ...result });
          setUseCoupon(true);
          // context 部分
          setCouponInfo({ ...result });
          setIsUsed(true);
          alert('使用成功');
        }
      } catch (err) {
        alert('抓取優惠券錯誤!');
      }
    }
    getCoupon();
  }
  // 款項 購物車 - 優惠券 + 運費
  let payment =
    cart.cartTotal -
    (Object.keys(couponDetail).length === 0 ? '0' : couponDetail.discount);
  cart['finalPayment'] = payment;

  return (
    <>
      {/* 購物清單 */}
      <div className="checkout-list">
        <div className="py-4 border-bottom border-gray-100">
          {/* 購物車商品 */}
          {items.map((val, i) => {
            const img = val.img.split(',');

            // console.log(items);

            return (
              <div
                key={val.id}
                className="d-flex align-items-center justify-content-between py-4"
              >
                <div>
                  <div className="position-relative">
                    <img
                      className="procduct-image"
                      src={
                        !isSecond
                          ? `${process.env.REACT_APP_IMAGE_URL}/images/products/${val.categoryR_name}/${img[0]}`
                          : `${process.env.REACT_APP_IMAGE_URL}/images/used/${val.img}`
                      }
                      alt="/"
                    />
                    <div className="bg-gray-200 amount d-flex align-items-center justify-content-center">
                      <span className="text-white fs-8">{val.quantity}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="fs-7 fw-bold px-3 text-center">{val.name}</p>
                  <p className="fs-8 text-gray-300 px-3 text-center">
                    {!isSecond ? val.shape : '賣家 : ' + val.seller_name}
                  </p>
                </div>
                <div>
                  <span className="fs-7 fw-bold">{val.itemTotal}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 優惠券 */}
        <div className="py-5 border-bottom border-gray-100">
          <div className="row g-3">
            <div className="col-auto">
              <input
                type="text"
                value={coupon}
                className="form-control"
                placeholder="優惠券"
                onChange={(e) => {
                  setCoupon(e.target.value);
                }}
              />
            </div>
            <div className="col-auto">
              <button
                className="btn btn-primary-300"
                onClick={() => {
                  handleUseCoupon();
                }}
              >
                我要使用
              </button>
            </div>
          </div>
        </div>

        {/* 計算 */}
        <div className="py-4 border-bottom border-gray-100">
          <div className="d-flex justify-content-between my-2">
            <span className="fs-7">總金額</span>
            <span className="fs-7">${cart.cartTotal}</span>
          </div>
          <div className="d-flex justify-content-between my-2">
            <span className="fs-7">優惠券</span>
            <span className="fs-7">
              - $
              {Object.keys(couponDetail).length === 0
                ? '0'
                : couponDetail.discount}
            </span>
          </div>
          <div className="d-flex justify-content-between my-2">
            <span className="fs-7">運費</span>
            <span className="fs-7">$0</span>
          </div>
        </div>

        {/* 總計 */}
        <div className="d-flex justify-content-between align-items-center py-5">
          <div>
            <span>總計</span>
          </div>
          <div>
            <abbr className="fs-8 text-gray-200 mx-2">TWD</abbr>
            <strong>${payment}</strong>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
