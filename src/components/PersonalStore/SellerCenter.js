import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/Authcontext';
import './SellerCenter.scss';

function PersonalStore() {
  const { userinfo } = useAuth();
  const location = useLocation();
  let navigate = useNavigate();
  return (
    <>
      <div className="seller-center bg-orange">
        <header className="fixed-top bg-grullo d-flex justify-content-between shadow-sm mb-5 p-3 seller-header">
          <div className="d-flex align-items-center">
            <Link to="/seller" className="text-decoration-none">
              <img
                src={`${process.env.REACT_APP_IMAGE_URL}/images/logo.png`}
                alt="logo"
                className="logo-image"
              />
            </Link>
            <span className="fs-5 mx-2 fw-bold text-gray-400">
              {location.pathname === '/seller' && '賣家中心'}
              {location.pathname === '/seller/product' && (
                <div>
                  <i className="fa-solid fa-chevron-right fs-7 me-2 text-gray-300" />
                  <span>商品管理</span>
                </div>
              )}
              {location.pathname.includes('/seller/order') && (
                <div>
                  <i className="fa-solid fa-chevron-right fs-7 me-2 text-gray-300" />
                  <span>訂單管理</span>
                </div>
              )}
            </span>
          </div>
          <div className="d-flex align-items-center">
            <Link to="/user" className="text-decoration-none">
              <span className="fs-6 mx-2 fw-bold text-gray-400">
                {userinfo.name}
              </span>
            </Link>
            <a href="/">
              <button className="btn btn-gray-100">回首頁</button>
            </a>
          </div>
        </header>

        <main className="d-flex">
          <div className="seller-aside-box"></div>
          <aside className="bg-grullo pt-5 mt-2 seller-aside">
            <ul className="list-unstyled pt-5 ms-4">
              <li className="p-1">
                <Link
                  to={'/seller/product'}
                  className="link-primary-300 text-decoration-none text-center"
                  onClick={(e) => {}}
                >
                  <i className="fa-solid fa-bag-shopping p-2 aside-icon" />
                  商品管理
                </Link>
              </li>
              <li className="p-1">
                <Link
                  to={'/seller/order'}
                  className="link-primary-300 text-decoration-none text-center"
                >
                  <i className="fa-solid fa-clipboard-list p-2 aside-icon" />
                  訂單管理
                </Link>
              </li>
              <li
                className="p-1"
                onClick={() => {
                  navigate(`/${userinfo.account}`);
                }}
              >
                <Link className="link-primary-300 text-decoration-none text-center">
                  <i className="fa-solid fa-store p-2 aside-icon" />
                  個人賣場
                </Link>
              </li>
            </ul>
          </aside>
          <section className="mt-5 pt-5 p-5 seller-wrapper">
            <Outlet />
          </section>
        </main>
      </div>
    </>
  );
}

export default PersonalStore;
