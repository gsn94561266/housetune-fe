import { Link, Outlet, useLocation } from 'react-router-dom';
import './SellerCenter.scss';

function SalesOrder() {
  const location = useLocation();
  const tabButtons = [
    { title: '全部', path: '/seller/order' },
    { title: '尚未付款', path: '/seller/order/unpaid' },
    { title: '待出貨', path: '/seller/order/toship' },
    { title: '已完成', path: '/seller/order/completed' },
    { title: '不成立', path: '/seller/order/cancelled' },
  ];

  return (
    <>
      <div className="sales-order my-5">
        <div className="bg-primary m-auto sales-order-tabs">
          <ul className={'d-flex justify-content-center nav mt-2'}>
            {tabButtons.map((v, i) => {
              return (
                <li
                  key={i}
                  className={
                    v.path !== location.pathname
                      ? 'col border-bottom border-primary-300 nav-item'
                      : 'col border-primary-300 bg-white nav-item'
                  }
                >
                  <Link
                    to={v.path}
                    className="nav-link text-info text-center mx-0"
                  >
                    {v.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <main className="sales-order-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default SalesOrder;
