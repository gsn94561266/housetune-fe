import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/Authcontext';
import axios from 'axios';
import { useCart } from '../../utils/useCart';
import './Checkout.scss';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Geocode from 'react-geocode';

function Thankyou() {
  const { clearCart } = useCart();
  const { userinfo, isLoggedIn } = useAuth();
  const [completeMsg, setCompleteMsg] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [payment, setPayment] = useState(0);

  // 判斷登入狀態
  if (!isLoggedIn) {
    // alert('請從正常管道進入!');
    // navigate('/');
  }
  useEffect(() => {
    clearCart();
    (async () => {
      let res = await axios.get('http://localhost:3001/api/payment/checkorder');
      setOrderNumber(res.data.ordL_id);
      setPayment(res.data.payment);
    })();
    setCompleteMsg(JSON.parse(localStorage.getItem('myAddress')));
  }, []);

  // 地址
  const apiKey = process.env.REACT_APP_API_KEY;
  const address = `${completeMsg.district + completeMsg.address}`;
  const googleAddress = `${
    completeMsg.city + completeMsg.district + completeMsg.address
  }`;
  const [position, setPosition] = useState({ lat: 25.045, lng: 121.529 });
  Geocode.setApiKey(apiKey);
  useEffect(() => {
    const getGeocode = async () => {
      const response = await Geocode.fromAddress(googleAddress);
      const { lat, lng } = response.results[0].geometry.location;
      setPosition({ lat, lng });
    };
    getGeocode();
  }, [googleAddress]);
console.log(process.env.REACT_APP_API_KEY)
  return (
    <>
      <main className="checkout-thankyou">
        <section className="col-auto bg-white py-4">
          <div className="thankyou-wrapper">
            <div className="py-4">
              <Link to="/">
                <img
                  src={`${process.env.REACT_APP_IMAGE_URL}/images/logo.png`}
                  alt=""
                  className="logo-image"
                />
              </Link>
            </div>
            <div className="d-flex align-items-center">
              <i className="fa-regular fa-circle-check fs-1 text-primary-300" />
              <div className="px-3">
                <span className="fs-7">訂單編號：{orderNumber}</span>
                <h5>感謝您，{userinfo.name}！</h5>
              </div>
            </div>

            <div className="border border-gray-100 rounded-3 my-4">
              <div className="map map-index position-relative">
                <LoadScript googleMapsApiKey={apiKey}>
                  <GoogleMap
                    mapContainerStyle={{
                      height: '300px',
                      width: '100wh',
                    }}
                    center={position}
                    zoom={15}
                  >
                    <Marker position={position} />
                  </GoogleMap>
                </LoadScript>
              </div>
              <div className="p-4">
                <h5 className="fs-5 mb-4">您的訂單已確認</h5>
                <div className="fs-6">
                  <h6 className="text-info fw-bold">
                    {payment === 3
                      ? '謝謝您的惠顧，以下是您的匯款資訊，請在三日內匯款完成。'
                      : '謝謝您的惠顧，我們將盡快寄出商品，期待您再度光臨Housetune。'}
                  </h6>
                  {payment === 3 ? (
                    <>
                      <p>銀行匯款資訊：</p>
                      <p>銀行：玉山銀行 岡山分行</p>
                      <p>帳號：0956-942-000990</p>
                      <p>戶名：浩斯度股份有限公司</p>
                      <p>
                        您好！此訂單將為您保留 3 天,
                        如三天內未付款，訂單將被取消。
                      </p>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
            <div className="border border-gray-100 rounded-3 my-4">
              <div className="p-4">
                <h5 className="fs-6 mb-4">訂單更新</h5>
                <div className="fs-7 d-flex flex-column">
                  <span>您會透過電子郵件取得運送和配送資訊更新。</span>
                </div>
              </div>
            </div>
            <div className="border border-gray-100 rounded-3 my-4">
              <div className="p-4">
                <h5 className="fs-6">客戶資訊</h5>
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div className="py-4">
                      <h3 className="fs-7 fw-bold">聯絡資訊</h3>
                      <div className="fs-7">
                        <span>{userinfo.email}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="fs-7 fw-bold">運送地址</h3>
                      <address className="fs-7">
                        {completeMsg.lastName + completeMsg.firstName}
                        <br />
                        {address}
                        <br />
                        {completeMsg.postcode + ',' + completeMsg.city}
                        <br />
                        {completeMsg.country}
                        <br />
                        {completeMsg.phone}
                      </address>
                    </div>
                    <div className="py-2">
                      <h3 className="fs-7 fw-bold fw-bold">運送方式</h3>
                      <div className="fs-7">
                        <span>Free Shipping</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="py-4">
                      <h3 className="fs-7 fw-bold">付款方式</h3>
                      <div className="fs-7">
                        <span>
                          {payment === 1
                            ? '綠界科技'
                            : payment === 2
                            ? 'LINE Pay'
                            : 'ATM 轉帳 / 銀行匯款'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="fs-7 fw-bold">帳單地址</h3>
                      <address className="fs-7">
                        {completeMsg.firstName + completeMsg.lastName}
                        <br />
                        {address}
                        <br />
                        {completeMsg.postcode + ',' + completeMsg.city}
                        <br />
                        {completeMsg.country}
                        <br />
                        {completeMsg.phone}
                      </address>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 底部按鈕 */}
            <div className="col-12 d-flex justify-content-between align-items-center mb-3">
              <div className="fs-7">
                是否需要幫忙？
                <Link
                  to={'/checkout/information'}
                  className="text-decoration-none link-primary-300"
                >
                  <span>聯絡我們</span>
                </Link>
              </div>
              <a href="/">
                <button className="btn btn-primary-300">回到首頁</button>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Thankyou;
