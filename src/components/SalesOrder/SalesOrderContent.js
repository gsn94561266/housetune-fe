import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import './SalesOrder.scss';

function SalesOrderContent() {
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
    //搜尋欄位
    <div className="container bg-orange m-auto">
      <div className="container p-2 ">
        <div className="input-group my-2">
          <button
            class="btn btn-primary-300 dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            訂單編號
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item " href="#">
                訂單編號
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                訂單日期
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                買家帳號
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                商品
              </a>
            </li>
          </ul>
          <input
            type="text"
            class="form-control"
            aria-label="Text input with 2 dropdown buttons"
          />
          <button
            class="btn btn-primary-300 "
            type="button"
            aria-expanded="false"
          >
            搜尋
          </button>
        </div>
        {/* 呈現訂單 */}
        <div className="bg-white border p-2 m-2 ">
          {salesOrderContent.map((product, index) => {
            return (
              <div key={product.ordL_id}>
                <p className="m-1">買家帳號：{product.buyer_id} </p>
                <hr />
                <div class="row order-list-upper bg-white align-items-center justify-content-around m-auto p-3 my-2">
                  <img
                    class="d-block  col-3 img-fluid"
                    src={`${process.env.REACT_APP_IMAGE_URL}/images/used/${product.img}`}
                    alt={product.name}
                  />
                  <div class="  col-3  row align-items-center d-flex justify-content-between ">
                    <div class=" p-auto ">
                      <p>
                        <strong>
                          {product.name}
                          {/* Menu Curiosity Cabinet H168cm 珍古系列 橡木 收納 櫥櫃 */}
                        </strong>
                      </p>
                      <p>
                        <strong> 款式 </strong>
                        {/* 橡木原色(Natural Oak) */}
                        {product.style}
                      </p>
                    </div>
                  </div>
                  <div class="col-2 ">
                    <p>
                      <strong>價格</strong>
                      NT$
                      {product.price}
                    </p>
                  </div>
                  <div class="col-2 row  ">
                    <p class="  ">{product.state}</p>
                  </div>
                  <button className=" col-2  btn btn-primary-300">
                    查看詳情
                  </button>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SalesOrderContent;
