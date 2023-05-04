import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import './SellerCenter.scss';
import { useAuth } from '../Context/Authcontext';
import axios from 'axios';

function SalesOrder() {
  const { userinfo } = useAuth();
  const [data, setData] = useState([]);

  // 商品資料
  useEffect(() => {
    try {
      (async () => {
        const res = await axios.post(
          'http://localhost:3001/api/seller/usedproduct',
          {
            id: userinfo.id,
          }
        );
        setData(res.data);
      })();
    } catch (e) {
      console.error(e);
    }
  }, [userinfo]);

  // 訂單
  const [OrderToShip, setOrderToShip] = useState([]);
  const [OrderCancelled, setOrderCancelled] = useState([]);
  useEffect(() => {
    try {
      async function getOrderToShip() {
        let res = await axios.post(
          'http://localhost:3001/api/seller/order/state',
          {
            state: 2,
            id: userinfo.id,
          }
        );
        setOrderToShip(res.data);
      }
      async function getOrderCancelled() {
        let res = await axios.post(
          'http://localhost:3001/api/seller/order/state',
          {
            state: 4,
            id: userinfo.id,
          }
        );
        setOrderCancelled(res.data);
      }
      getOrderToShip();
      getOrderCancelled();
    } catch (e) {
      console.error(e);
    }
  }, [userinfo]);

  return (
    <>
      <main className="text-center seller-main mt-5">
        <div className="row row-cols-1 row-cols-md-4 g-5">
          <Link
            to="/seller/product"
            className="text-decoration-none text-gray-400"
          >
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">商品總數</h5>
                  <p className="card-text">{data.length}</p>
                </div>
              </div>
            </div>
          </Link>
          <Link
            to="/seller/order/toship"
            className="text-decoration-none text-gray-400"
          >
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">待出貨</h5>
                  <p className="card-text">{OrderToShip.length}</p>
                </div>
              </div>
            </div>
          </Link>
          <Link
            to="/seller/order/cancelled"
            className="text-decoration-none text-gray-400"
          >
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">不成立</h5>
                  <p className="card-text">{OrderCancelled.length}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </>
  );
}

export default SalesOrder;
