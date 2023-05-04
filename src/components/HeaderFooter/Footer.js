import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FooterItems } from './MenuItems';

import './Layout.scss';

function Footer() {
  const location = useLocation();
  // accordion
  const state = [
    { index: 0, state: false },
    { index: 1, state: false },
    { index: 2, state: false },
    { index: 3, state: false },
  ];
  const [click, setClick] = useState(state);
  const [select, setSelect] = useState([]);
  const handleToggle = (e, index) => {
    let newState = click;
    newState[index].state = !newState[index].state;
    setClick(newState);

    const filtered = click.filter((i) => {
      return i.state === true;
    });
    setSelect(filtered);
  };

  function Accordion(index) {
    if (window.innerWidth < 992)
      return (
        <>
          <div>
            <ul
              className={
                click[index].state
                  ? 'accordion-menu active mt-2 py-3'
                  : 'accordion-menu mt-2'
              }
            >
              {FooterItems[index].submenu.map((item, index) => {
                return (
                  <Link
                    key={index}
                    to={item.path}
                    className="text-decoration-none text-info-dark"
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    <li className="py-3 list-unstyled">{item.title}</li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </>
      );
  }

  // 以下頁面不要顯示 FOOTER
  if (
    location.pathname === '/cart/checkout/information' ||
    location.pathname === '/cart/checkout/shipping' ||
    location.pathname === '/cart/checkout/payment' ||
    location.pathname === '/cart/checkout/thankyou' ||
    location.pathname === '/seller' ||
    location.pathname === '/seller/product' ||
    location.pathname === '/seller/rating' ||
    location.pathname === '/seller/order' ||
    location.pathname === '/seller/order/unpaid' ||
    location.pathname === '/seller/order/toship' ||
    location.pathname === '/seller/order/completed' ||
    location.pathname === '/seller/order/cancelled' ||
    location.pathname === '/seller/order' ||
    location.pathname === '/seller/product/add' ||
    location.pathname.includes('/seller/product/edit/') ||
    location.pathname === '*'
  ) {
    return <></>;
  }

  return (
    <>
      <footer className="bg-grullo">
        <div className="container-lg p-4 p-lg-5">
          <div className="row pb-4">
            {FooterItems.map((item, index) => {
              return (
                <div
                  key={index}
                  className="col-12 col-lg border-none border-bottom-lg border-danger-lg mb-3"
                >
                  <div
                    className="d-flex justify-content-between align-items-center"
                    onClick={(e) => handleToggle(e, index)}
                  >
                    <h6 className="mb-3 text-gray-400 footer-title">
                      {item.title}
                    </h6>
                    {click[index].state ? (
                      <i className="fa-solid fa-minus bg-gray-100 p-2 fs-8 d-inline d-lg-none" />
                    ) : (
                      <i className="fa-solid fa-angle-down fs-8 p-2 d-inline d-lg-none" />
                    )}
                  </div>
                  {/* Accordion */}
                  {item.submenu && Accordion(index)}

                  {item.submenu.map((item, index) => {
                    return (
                      <ul
                        key={index}
                        className="list-unstyled fs-7 d-none d-lg-block"
                      >
                        <li className="mb-2">
                          <Link
                            to={item.path}
                            className="link-gray-300 text-decoration-none"
                          >
                            {item.title}
                          </Link>
                        </li>
                      </ul>
                    );
                  })}
                </div>
              );
            })}
            <div className="col-12 col-lg-2 mb-3">
              <h6 className="mb-3 text-gray-400">追蹤我們</h6>
              <ul className="list-unstyled d-flex">
                <li className="mb-2">
                  <Link
                    to="/"
                    className="link-gray-300 text-decoration-none me-3"
                  >
                    <i className="fa-brands fa-square-facebook fs-5" />
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/"
                    className="link-gray-300 text-decoration-none me-3"
                  >
                    <i className="fa-brands fa-instagram fs-5" />
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/"
                    className="link-gray-300 text-decoration-none me-3"
                  >
                    <i className="fa-brands fa-line fs-5" />
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/" className="link-gray-300 text-decoration-none">
                    <i className="fa-solid fa-square-envelope fs-5" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center text-gray-300 fs-8">
            版權所有 © 2022 • Housetune
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
