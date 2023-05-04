import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/Authcontext';
import './Checkout.scss';

import CartList from './CartList';
import Address from './element/Address';
import Breadcrumb from './element/Breadcrumb';
import Mobile from './element/Mobile';

function Information(props) {
  const [checked, setChecked] = useState(true);
  const { userinfo } = useAuth();

  return (
    <>
      <main className="row m-0 checkout-information">
        {/* Logo */}
        <div className="p-4 d-block d-lg-none">
          <Link to="/">
            <img
              src={`${process.env.REACT_APP_IMAGE_URL}/images/logo.png`}
              alt="logo"
              className="logo-image"
            />
          </Link>
        </div>

        {/* 手機版購物清單 */}
        <Mobile />

        <section className="col-12 col-lg-6 bg-white py-4">
          <div className="information-wrapper">
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

            {/* 聯絡資訊 */}
            <div className="py-4">
              <h5>聯絡資訊</h5>
              <div className="py-3">
                <h6 className="fs-7">
                  {userinfo.name} ({userinfo.email})
                </h6>
                {/* <Link
                  to={'/'}
                  className="fs-7 link-primary-300 text-decoration-none"
                >
                  如果不是, 請登出
                </Link> */}
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  defaultChecked={checked}
                  onChange={() => setChecked(!checked)}
                />
                <label className="form-check-label fs-7">
                  以電子郵件傳送最新消息和優惠活動給我
                </label>
              </div>
            </div>

            <div className="my-4">
              <h5>運送地址</h5>
              {/* 填寫運送地址 */}
              <form className="row g-3 my-2">
                <Address />

                {/* 底部按鈕 */}
                <div className="col-12 d-flex justify-content-between align-items-center mt-5">
                  <div>
                    <Link
                      to={'/cart'}
                      className="text-decoration-none link-primary-300"
                    >
                      <i className="fa-solid fa-angle-left fs-7" />
                      <span className="px-2 fs-7">回到訂購清單</span>
                    </Link>
                  </div>
                  <Link to={'/cart/checkout/shipping'}>
                    <button className="btn btn-primary-300">繼續結帳</button>
                  </Link>
                </div>
              </form>
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

export default Information;
