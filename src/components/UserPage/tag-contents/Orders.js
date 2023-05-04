import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/Authcontext';

import OrderDetail from './OrderDetail';
import OrderComment from './OrderComment';

function Orders() {
  const { userinfo } = useAuth();

  // 將訂單 map 出來
  axios.defaults.withCredentials = true;
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    async function getOrder() {
      let res = await axios.post('http://localhost:3001/api/user/order', {
        id: userinfo.id,
      });
      setOrderList(res.data);
    }
    getOrder();
  }, [userinfo]);

  // 查閱和評價的手風琴
  const [open, setOpen] = useState(-1);
  const [openComment, setOpenComment] = useState(-1);

  // 判斷訂單狀態
  function orderState(i) {
    if (i === 1) {
      return '尚未付款';
    } else if (i === 2) {
      return '待出貨';
    } else if (i === 3) {
      return '已完成';
    } else if (i === 4) {
      return '不成立';
    }
  }

  return (
    <>
      <div className="user-coupons pt-2">
        <div className="coupon-informations pb-1">
          {/* 內容 */}
          <div className="receive-coupons">
            {/* 優惠券列表 */}
            <div className="px-3 pt-4 d-flex">
              <table className="order-table table table-rwd text-gray-300 text-center w-100">
                {/* 標題 */}
                <thead>
                  <tr className="row text-center border-bottom border-primary-100 pb-3 tr-only-hide">
                    <th className="col-3">訂單號碼</th>
                    <th className="col-2">訂單日期</th>
                    <th className="col-2">合計</th>
                    <th className="col-2">訂單狀態</th>
                    <th className="col-3"></th>
                  </tr>
                </thead>
                {/* 優惠券詳細內容 */}
                <tbody>
                  {orderList.map((val, index) => {
                    const orderDetail = Object.values(
                      JSON.parse(val.product_id)
                    );
                    const couponDiscount = JSON.parse(val.couponInfo);
                    return (
                      <Fragment key={val.ordL_id}>
                        <tr
                          className={`row text-center align-items-center  ${
                            index === 0 ? '' : 'border-top'
                          }`}
                          id={val.ordL_id}
                        >
                          <td className="col-3" data-th="訂單號碼">
                            {val.ordL_id}
                          </td>
                          <td className="col-2" data-th="訂單日期">
                            {val.order_date}
                          </td>
                          <td className="col-2" data-th="合計">
                            NT${val.price}
                          </td>
                          <td className="col-2" data-th="訂單狀態">
                            {orderState(val.state)}
                          </td>
                          <td
                            className="col-3 row justify-content-around"
                            data-th=""
                          >
                            <button
                              className={`btn ${
                                val.ordL_id === open
                                  ? 'btn-primary-300'
                                  : 'btn-white bg-orange'
                              }  col-5`}
                              onClick={(e) => {
                                e.preventDefault();
                                // 若點擊的 id 值等於狀態 則讓狀態關閉
                                // 否則關閉
                                if (val.ordL_id === open) {
                                  setOpen(-1);
                                } else {
                                  setOpen(val.ordL_id);
                                }
                              }}
                            >
                              查閱 {val.ordL_id === open ? '-' : '+'}
                            </button>
                            <button
                              className={`btn ${
                                val.ordL_id === openComment
                                  ? 'btn-primary-300'
                                  : 'btn-white bg-orange'
                              }  col-5`}
                              onClick={() => {
                                if (val.ordL_id === openComment) {
                                  setOpenComment(-1);
                                } else {
                                  setOpenComment(val.ordL_id);
                                }
                              }}
                              disabled={val.state === 3 ? false : true}
                            >
                              評價 {val.ordL_id === openComment ? '-' : '+'}
                            </button>
                          </td>
                        </tr>
                        <tr
                          className={`open-detail row text-center align-items-center ${
                            val.ordL_id === open ? 'show' : 'hide'
                          }`}
                          id={val.ordL_id}
                        >
                          <OrderDetail
                            index={val.ordL_id}
                            open={open}
                            list={orderList}
                            detail={orderDetail}
                            coupon={couponDiscount}
                          />
                        </tr>
                        <tr
                          className={`open-detail row text-center align-items-center ${
                            val.ordL_id === openComment ? 'show' : 'hide'
                          }`}
                          id={val.ordL_id}
                        >
                          {val.state === 3 && (
                            <OrderComment
                              index={val.ordL_id}
                              openComment={openComment}
                              detail={orderDetail}
                            />
                          )}
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
