import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import '../Checkout.scss';

function Breadcrumb() {
  const location = useLocation();
  return (
    <>
      {/* 麵包屑(禁用超連結className="link-gray-400 pe-none") */}
      <div>
        <nav>
          <ol className="list-unstyled d-flex align-items-center">
            <li>
              <Link
                to={'/cart'}
                className="fs-7 link-primary-300 text-decoration-none"
              >
                訂購清單
              </Link>
            </li>
            <i className="fa-solid fa-angle-right fs-8 px-2"></i>
            <li>
              <Link
                to={'/cart/checkout/information'}
                className={
                  location.pathname === '/checkout/information'
                    ? 'fs-7 link-gray-400 text-decoration-none pe-none'
                    : 'fs-7 link-primary-300 text-decoration-none'
                }
              >
                客戶資料
              </Link>
            </li>
            <i className="fa-solid fa-angle-right fs-8 px-2"></i>
            <li>
              <Link
                to={'/cart/checkout/shipping'}
                className={
                  location.pathname === '/checkout/shipping'
                    ? 'fs-7 link-gray-400 text-decoration-none pe-none'
                    : 'fs-7 link-primary-300 text-decoration-none'
                }
              >
                運費
              </Link>
            </li>
            <i className="fa-solid fa-angle-right fs-8 px-2"></i>
            <li>
              <Link
                to={'/cart/checkout/payment'}
                className={
                  location.pathname === '/checkout/payment'
                    ? 'fs-7 link-gray-400 text-decoration-none pe-none'
                    : 'fs-7 link-primary-300 text-decoration-none'
                }
              >
                付款
              </Link>
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
}

export default Breadcrumb;
