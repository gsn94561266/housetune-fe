import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../SellerCenter.scss';
import { useAuth } from '../../Context/Authcontext';

function AllOrder() {
  const { userinfo } = useAuth();
  axios.defaults.withCredentials = true;

  const [OrderList, setOrderList] = useState([]);
  useEffect(() => {
    try {
      async function getOrder() {
        let res = await axios.post('http://localhost:3001/api/seller/order', {
          id: userinfo.id,
        });
        setOrderList(res.data);
      }
      getOrder();
    } catch (e) {
      console.error(e);
    }
  }, [userinfo]);

  // 取消訂單
  async function stateChange(id, seller_id) {
    const res = await axios.put(
      'http://localhost:3001/api/seller/order/cancel/all',
      {
        id,
        seller_id,
      }
    );
    setOrderList(res.data);
  }

  // 搜尋
  const SelectInfo = ['請輸入訂單編號', '請輸入買家帳號', '請輸入商品名稱'];
  const [SelectItem, setSelectItem] = useState(0);
  const [SearchWord, setSearchWord] = useState('');
  const [SearchList, setSearchList] = useState([]);
  useEffect(() => {
    setSearchList(OrderList);
  }, [OrderList]);
  const selectValue = (e) => {
    setSelectItem(Number(e.target.value));
  };
  const handleFilter = (e) => {
    setSearchWord(e.target.value);
  };
  const searchClick = (e) => {
    e.preventDefault();
    if (SelectItem === 0) {
      const newFilter = OrderList?.filter((v) => {
        return String(v.ordL_id).includes(SearchWord);
      });
      setSearchList(newFilter);
    } else if (SelectItem === 1) {
      const newFilter = OrderList?.filter((v) => {
        return v.account.includes(SearchWord);
      });
      setSearchList(newFilter);
    } else if (SelectItem === 2) {
      const newFilter = OrderList?.filter((v) => {
        return Object.values(JSON.parse(v.product_id))
          .map((i) => {
            return i.name;
          })
          .includes(SearchWord);
      });
      setSearchList(newFilter);
    }
    if (SearchWord.length === 0) {
      setSearchList(OrderList);
    }
  };
  const resetClick = () => {
    setSearchWord('');
    setSearchList(OrderList);
  };

  // 狀態
  function Orderstate(state) {
    if (state === 1) {
      return '尚未付款';
    }
    if (state === 2) {
      return '待出貨';
    }
    if (state === 3) {
      return '已完成';
    }
    if (state === 4) {
      return '不成立';
    }
  }

  // 找不到訂單
  function OrderNone() {
    return (
      <>
        <div className="text-center p-5">
          <p className="fs-5 text-gray-300">找不到訂單</p>
        </div>
      </>
    );
  }

  const [click, setClick] = useState(false);
  const [select, setSelect] = useState();
  const handleToggle = (e, index) => {
    setClick(!click);
    setSelect(index);
  };

  return (
    // 搜尋欄位
    <div className="bg-white px-4 py-2">
      <div className="d-flex px-4 my-4">
        <form className="input-group">
          <select className="form-select" onChange={selectValue}>
            <option value="0">訂單編號</option>
            <option value="1">買家帳號</option>
            <option value="2">商品</option>
          </select>
          <input
            type="text"
            className="form-control"
            value={SearchWord}
            onChange={handleFilter}
            placeholder={SelectInfo[SelectItem]}
          />
          <button
            className="btn btn-primary-300 col-auto me-2"
            onClick={searchClick}
            type="submit"
          >
            搜尋
          </button>
        </form>
        <button
          type="reset"
          className="btn btn-outline-gray-300 col-auto"
          onClick={resetClick}
        >
          重置
        </button>
      </div>
      <h5 className="fw-bold mx-4">{SearchList.length} 訂單</h5>

      {/* 訂單清單 */}
      <div className="bg-white px-4">
        {SearchList == 0 && OrderNone()}
        {SearchList.map((list, index) => {
          const OrderDetail = Object.values(JSON.parse(list.product_id));
          const Date = list.order_date.slice(0, 10);
          const CouponDiscount = JSON.parse(list.couponInfo);
          const DetailTotal = OrderDetail.reduce(
            (acc, num) => acc + num.total,
            0
          );

          return (
            <div
              key={list.ordL_id}
              className="border border-gray-100 rounded my-4"
            >
              <div className="d-flex justify-content-between align-items-center border-bottom border-gray-100 p-2 bg-primary">
                <span>買家帳號：{list.account} </span>
                <span>訂單日期：{Date}</span>
              </div>
              <div className="row bg-white align-items-baseline justify-content-between mx-4 py-4">
                <div className="col-auto">
                  <strong>訂單編號 </strong>
                  {list.ordL_id}
                </div>
                <div className="col-2">
                  <strong>價格 </strong>
                  NT$
                  {list.price}
                </div>
                <div className="col-auto">
                  <strong>{Orderstate(list.state)}</strong>
                </div>
                <div className="col-auto">
                  <button
                    className="col-auto btn btn-danger text-white m-2"
                    data-bs-toggle="modal"
                    data-bs-target={`#cancelModal-${list.ordL_id}`}
                    disabled={list.state === 1 ? false : true}
                  >
                    取消訂單
                  </button>

                  <button
                    className="col-auto btn btn-primary-300 m-2"
                    onClick={(e) => handleToggle(e, index)}
                  >
                    查看詳情
                  </button>
                </div>
                {/* 取消訂單 Modal */}
                <div
                  className="modal fade"
                  id={`cancelModal-${list.ordL_id}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-body p-5 text-center fs-5">
                        {`確定取消 "${list.ordL_id}" 訂單`}
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-primary-300"
                          data-bs-dismiss="modal"
                        >
                          返回
                        </button>
                        <button
                          data-bs-dismiss="modal"
                          className="btn btn-danger text-white"
                          onClick={() => stateChange(list.ordL_id, userinfo.id)}
                        >
                          確定
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 訂單細節 */}
                <div
                  className={
                    index === select && click
                      ? 'accordion-menu active mt-4 rounded'
                      : 'accordion-menu rounded'
                  }
                >
                  {OrderDetail.map((detail, i) => {
                    return (
                      <div
                        key={i}
                        className="row align-items-center justify-content-around bg-white py-3 my-4 mx-2"
                      >
                        <img
                          className="col-2"
                          src={`${
                            process.env.REACT_APP_IMAGE_URL
                          }/images/used/${String(detail.imgs).split(',')[0]}`}
                          alt={detail.name}
                        />
                        <div className="col-2">
                          <strong>{detail.name}</strong>
                          <div>{detail.shape}</div>
                        </div>
                        <div className="col-1">
                          <strong>數量 </strong>
                          {detail.quantity}
                        </div>
                        <div className="col-2">
                          <strong>價格 </strong>
                          NT$
                          {detail.total}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div
                  className={
                    index === select && click
                      ? 'accordion-info active px-4'
                      : 'accordion-info px-4'
                  }
                >
                  <div className="d-flex justify-content-between border-top border-gray-200 pt-2">
                    <div className="d-flex flex-column p-2 fs-7">
                      <strong className="mb-3">買家資訊</strong>
                      <p>收件人: {list.name}</p>
                      <p>電話: {list.phone}</p>
                      <p>地址: {list.address}</p>
                      <p>訂單日期: {list.order_date}</p>
                    </div>
                    <div className="d-flex align-items-end fs-7">
                      <div className="p-2">
                        <p>商品小計:</p>
                        <p>優惠券:</p>
                        <p>運費:</p>
                        <p>訂單金額:</p>
                      </div>
                      <div className="d-flex flex-column align-items-end p-2">
                        <p>NT${DetailTotal}</p>
                        {CouponDiscount.map((n, i) => {
                          return (
                            <p key={i}>
                              - NT${n.discount == null ? 0 : n.discount}
                            </p>
                          );
                        })}
                        <p>NT${list.shippingFee}</p>
                        <p>NT{list.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllOrder;
