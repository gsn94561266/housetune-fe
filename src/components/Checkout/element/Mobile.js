import React, { useState } from 'react';

import '../Checkout.scss';
import CartList from '../CartList';
function Address() {
  const [click, setClick] = useState();
  const handleToggle = () => setClick(!click);

  return (
    <>
      {/* 手機版購物清單 */}
      <div
        className="bg-primary d-flex justify-content-between align-items-center py-3 d-block d-lg-none"
        onClick={handleToggle}
      >
        <div className="d-flex align-items-center">
          <i className="fa-solid fa-cart-shopping text-info fs-7 p-2" />
          <span className="fs-7 text-info">顯示訂單摘要</span>
          <i className="fa-solid fa-angle-down fs-8 p-2" />
        </div>
        {/* <span className="fs-6 fw-bold">$29,000.00</span> */}
      </div>
      <section
        className={
          click
            ? 'mobile-list active bg-primary d-block d-lg-none'
            : 'mobile-list bg-primary d-block d-lg-none'
        }
      >
        <CartList />
      </section>
    </>
  );
}

export default Address;
