//rfce 快捷鍵
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import React from 'react';
import './SalesOrder.scss';

function SalesOrder() {
  const tabButtons = [
    { title: '全部', order: '*' },
    { title: '尚未付款', order: 1 },
    { title: '待出貨', order: 2 },
    { title: '已完成', order: 3 },
    { title: '不成立', order: 4 },
    { title: '退貨／退款', order: 5 },
  ];
  const [isActive, setActive] = useState('');
  const [salesOrderContent, setSalesOrderContent] = useState([]);
  useEffect(() => {
    async function getSalesOrderContent() {
      let response = await axios.get('http://localhost:3001/SalesOrder');
      setSalesOrderContent(response.data);
      // console.log(response.data);
    }
    getSalesOrderContent();
  }, []);

  return (
    //可以做滑左滑右的動畫
    <div className=" container bg-primary m-auto ">
      <ul className={'d-flex justify-content-center nav row  mt-2'}>
        {tabButtons.map((value, i) => {
          return (
            <li
              key={i}
              className={
                isActive === value.title
                  ? 'col nav-item border-top  border-start border-primary-300 p-0 '
                  : 'col nav-item border-top border-bottom border-start border-primary-300 p-0 '
              }
            >
              <Link
                to={value.path}
                className={
                  isActive === value.title //點的那個值裝回去isActive ＝＝ map 出來的值 就會變白色
                    ? 'nav-link text-info text-center mx-0 bg-white'
                    : 'nav-link text-info text-center mx-0 bg-gray '
                }
                onClick={(e) => {
                  setActive(value.title);
                }}
              >
                {value.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SalesOrder;
