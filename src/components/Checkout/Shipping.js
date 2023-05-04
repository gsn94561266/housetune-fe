import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Checkout.scss';

import CartList from './CartList';
import Breadcrumb from './element/Breadcrumb';
import Mobile from './element/Mobile';
import { useAuth } from '../Context/Authcontext';

function Shipping(props) {
  const [checked, setChecked] = useState(true);
  const { userinfo } = useAuth();

  const addressData = JSON.parse(localStorage.getItem('myAddress'));
  const address = `${addressData.district + addressData.address},${
    addressData.postcode + addressData.city
  },${addressData.country}`;

  return (
    <>
      <main className="row m-0 checkout-shipping">
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
          <div className="shipping-wrapper">
            <div className="py-4 d-none d-lg-block">
              <Link to="/">
                <img
                  src={`${process.env.REACT_APP_IMAGE_URL}/images/logo.png`}
                  alt=""
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
              <div className="d-flex justify-content-between mx-4 py-3">
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
            </div>

            {/* POST表單 */}
            <form className="row g-3" method="post">
              {/* 配送方式 */}
              <h5>配送方式</h5>
              <div className="border border-gray-100 rounded-3 my-4">
                <div className="d-flex justify-content-between mx-4 py-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      defaultChecked={checked}
                    />
                    <label className="fs-7">Free Shipping</label>
                  </div>
                  <div>
                    <span className="fs-7">免費</span>
                  </div>
                </div>
              </div>

              {/* 底部按鈕 */}
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <div>
                  <Link
                    to={'/cart/checkout/information'}
                    className="text-decoration-none link-primary-300"
                  >
                    <i className="fa-solid fa-angle-left fs-7" />
                    <span className="px-2 fs-7">重新填寫聯絡資料</span>
                  </Link>
                </div>
                <Link to={'/cart/checkout/payment'}>
                  <button className="btn btn-primary-300">繼續付款</button>
                </Link>
              </div>
            </form>
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

export default Shipping;
