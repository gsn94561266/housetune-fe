import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/Authcontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../utils/useCart';
import { useBeforeCoupon } from '../Context/CouponContext';

import './Checkout.scss';

import CartList from './CartList';
import Breadcrumb from './element/Breadcrumb';
import Address from './element/Address';
import Mobile from './element/Mobile';

function Payment() {
  const [paySelected, setPaySelected] = useState('CreditCard');
  const [addressSelected, setAddressSelected] = useState('sameAddress');
  const { userinfo } = useAuth();
  const navigate = useNavigate();

  const payChange = (event) => {
    setPaySelected(event.target.value);
  };
  const addressChange = (event) => {
    setAddressSelected(event.target.value);
  };

  const { cart, items, isInCart, clearCart } = useCart();
  const { couponInfo, setCouponInfo, isUsed, setIsUsed } = useBeforeCoupon();

  // 取得地址資料
  const addressData = JSON.parse(localStorage.getItem('myAddress'));
  const address = `${addressData.district + addressData.address},${
    addressData.postcode + addressData.city
  },${addressData.country}`;
  // 取產品資訊
  const orderItems = items.map((val) => {
    return {
      prod_id: val.prod_id || val.useP_id,
      quantity: val.quantity,
      shape: val.shape,
      imgs: val.img,
      total: val.itemTotal,
      name: val.name,
      categoryR_name: val.categoryR_name,
      seller_id: val.seller_id || '1',
      seller_name: val.seller_name || '',
    };
  });
  const setCoupo1n = [{ ...couponInfo }];
  const orderMsg = {
    userId: userinfo.id, // userID
    address: address, // 地址
    price: cart.finalPayment, // 最終款項
    state: '1', // 訂單狀態
    note: '', // 備註
    products: orderItems, // 商品資訊
    shippingFee: 0,
    couponUse: setCoupo1n, // 使用優惠券資訊
  };
  const handleSubmit = async () => {
    const res = await axios.post('http://localhost:3001/api/payment/linePay', {
      data: JSON.stringify(orderMsg),
    });
    // console.log(res.data.paymentUrl);
    window.location.href = res.data.paymentUrl;
  };

  return (
    <>
      <main className="row m-0 checkout-payment">
        {/* Logo */}
        <div className="p-4 d-block d-lg-none">
          <Link to="/">
            <img
              src={`${process.env.REACT_APP_IMAGE_URL}/images/logo.png`}
              alt=""
              className="logo-image"
            />
          </Link>
        </div>

        {/* 手機版購物清單 */}
        <Mobile />

        <section className="col-12 col-lg-6 bg-white py-4">
          <div className="payment-wrapper">
            <div className="py-4 d-none d-lg-block">
              <Link to="/">
                <img
                  src={`${process.env.REACT_APP_IMAGE_URL}/images/logo.png`}
                  alt="logo"
                  className="logo-image"
                />
              </Link>
            </div>

            {/* 麵包屑 */}
            <Breadcrumb />

            {/* 資料 */}
            <div className="border border-gray-100 rounded-3 my-4">
              <div className="d-flex justify-content-between mx-4 py-3 border-bottom border-gray-100">
                <div className="row">
                  <span className="col-auto fs-7 information-title">聯絡</span>
                  <bdo className="col-auto fs-7">{userinfo.email}</bdo>
                </div>

                <Link
                  to="/cart/checkout/information"
                  className="text-decoration-none link-primary-300 fs-7 text-nowrap"
                >
                  變更
                </Link>
              </div>
              <div className="d-flex justify-content-between mx-4 py-3 border-bottom border-gray-100">
                <div className="row">
                  <span className="col-auto fs-7 information-title">
                    收貨地
                  </span>
                  <bdo className="col-auto fs-7">{address}</bdo>
                </div>

                <Link
                  to="/cart/checkout/information"
                  className="text-decoration-none link-primary-300 fs-7 text-nowrap"
                >
                  變更
                </Link>
              </div>
              <div className="d-flex justify-content-between mx-4 py-3">
                <div className="row">
                  <span className="col-12 col-lg-auto fs-7 information-title">
                    運送
                  </span>
                  <span className="col-12 col-lg-auto fs-7">
                    Free Shipping · 免費
                  </span>
                </div>
              </div>
            </div>

            {/* POST表單 */}
            <div className="row g-3">
              {/* 付款 */}
              <div className="py-4">
                <h5>付款</h5>
                <span className="text-gray-200 fs-7">
                  所有交易都受到安全加密。
                </span>

                <div className="border border-gray-100 rounded-3 my-4">
                  {/* 綠界科技 */}
                  <div
                    className="px-4 py-3 border-bottom border-gray-100"
                    onClick={() => {
                      setPaySelected('CreditCard');
                    }}
                  >
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="pay"
                        onChange={payChange}
                        checked={paySelected === 'CreditCard'}
                      />
                      <label className="d-flex justify-content-between fs-7">
                        綠界科技
                        <div>
                          <img
                            src={`${process.env.REACT_APP_IMAGE_URL}/images/payment/VISA.svg`}
                            alt="VISA"
                          />
                          <img
                            src={`${process.env.REACT_APP_IMAGE_URL}/images/payment/Mastercard.svg`}
                            alt="Mastercard"
                          />
                          <img
                            src={`${process.env.REACT_APP_IMAGE_URL}/images/payment/JCB.svg`}
                            alt="JCB"
                          />
                          <img
                            src={`${process.env.REACT_APP_IMAGE_URL}/images/payment/AMEX.svg`}
                            alt="AMEX"
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                  <div
                    className={
                      paySelected === 'CreditCard'
                        ? 'pay-content active bg-primary text-center py-4'
                        : 'pay-content bg-primary text-center'
                    }
                  >
                    <p className="fs-7">
                      按一下「立即付款」後，系統會將您重新導向至 綠界科技
                      <br />
                      支付，以安全地完成購買程序。
                    </p>
                  </div>

                  {/* LinePay */}
                  <div
                    className="px-4 py-3 border-bottom border-gray-100"
                    onClick={() => {
                      setPaySelected('LinePay');
                    }}
                  >
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="pay"
                        onChange={payChange}
                        checked={paySelected === 'LinePay'}
                      />
                      <label className="d-flex justify-content-between fs-7">
                        LINE Pay
                        <div>
                          <img
                            src={`${process.env.REACT_APP_IMAGE_URL}/images/payment/LinePay.svg`}
                            alt="LinePay"
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                  <div
                    className={
                      paySelected === 'LinePay'
                        ? 'pay-content active bg-primary text-center py-4'
                        : 'pay-content bg-primary text-center'
                    }
                  >
                    <p className="fs-7">
                      按一下「立即付款」後，系統會將您重新導向至 LINE Pay
                      <br />
                      支付，以安全地完成購買程序。
                    </p>
                  </div>

                  {/* ATM 轉帳 / 銀行匯款 */}
                  <div
                    className="px-4 py-3"
                    onClick={() => {
                      setPaySelected('Transfer');
                    }}
                  >
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="pay"
                        onChange={payChange}
                        checked={paySelected === 'Transfer'}
                      />
                      <label className="fs-7">ATM 轉帳 / 銀行匯款</label>
                    </div>
                  </div>
                  <div
                    className={
                      paySelected === 'Transfer'
                        ? 'pay-content active bg-primary text-center py-4'
                        : 'pay-content bg-primary text-center'
                    }
                  >
                    <p className="fs-7">
                      銀行匯款資訊：
                      <br />
                      <br />
                      銀行：玉山銀行 岡山分行
                      <br />
                      帳號：0956-942-000990
                      <br />
                      戶名：浩斯度股份有限公司
                    </p>
                  </div>
                </div>
              </div>

              {/* 帳單地址 */}
              <div>
                <h5>帳單地址</h5>
                <span className="text-gray-200 fs-7">
                  選擇與卡片或付款方式相符的地址。
                </span>
                <div className="border border-gray-100 rounded-3 my-4">
                  <div
                    className="px-4 py-3 border-bottom border-gray-100"
                    onClick={() => {
                      setAddressSelected('sameAddress');
                    }}
                  >
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="address"
                        onChange={addressChange}
                        checked={addressSelected === 'sameAddress'}
                      />
                      <label>與運送地址相同</label>
                    </div>
                  </div>
                  <div
                    className="px-4 py-3"
                    onClick={() => {
                      setAddressSelected('otherAddress');
                    }}
                  >
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="address"
                        onChange={addressChange}
                        checked={addressSelected === 'otherAddress'}
                      />
                      <label>使用其他帳單地址</label>
                    </div>
                  </div>
                  {/* 運送地址 */}
                  <div
                    className={
                      addressSelected === 'otherAddress'
                        ? 'pay-content active bg-primary text-center py-4'
                        : 'pay-content bg-primary text-center'
                    }
                  >
                    <div className="row g-3 mx-3">
                      <Address />
                    </div>
                  </div>
                </div>
              </div>

              {/* 底部按鈕 */}
              <div className="col-12 d-flex justify-content-between align-items-center pb-4">
                <div>
                  <Link
                    to={'/cart/checkout/shipping'}
                    className="text-decoration-none link-primary-300"
                  >
                    <i className="fa-solid fa-angle-left fs-7" />
                    <span className="px-2 fs-7">重新填寫運送方式</span>
                  </Link>
                </div>
                <form
                  method="get"
                  action={
                    paySelected === 'CreditCard'
                      ? 'http://localhost:3001/api/payment/creditPay'
                      : paySelected === 'LinePay'
                      ? 'http://localhost:3001/api/payment/linePay'
                      : 'http://localhost:3001/api/payment/transfer'
                  }
                >
                  <input
                    type="hidden"
                    name="orderMessage"
                    value={JSON.stringify(orderMsg)}
                  />
                  <button
                    className="btn btn-primary-300"
                    type={paySelected === 'LinePay' ? 'button' : 'submit'}
                    onClick={() => {
                      paySelected === 'LinePay' && handleSubmit();
                    }}
                  >
                    立即付款
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* 右側購物清單 */}
        <section className="col-12 col-lg-6 bg-primary py-5 d-none d-lg-block">
          <CartList />
        </section>
      </main>
    </>
  );
}

export default Payment;
