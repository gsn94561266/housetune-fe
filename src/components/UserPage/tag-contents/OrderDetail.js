import React from 'react';
import { Fragment } from 'react';

function OrderDetail(props) {
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
      {props.list
        .filter((s) => {
          return s.ordL_id === props.index;
        })
        .map((v, i) => {
          const Subtotal = props.detail.reduce(
            (acc, num) => acc + num.total,
            0
          );
          return (
            <Fragment>
              {/* 購買商品清單 */}
              {props.detail.map((det, index) => {
                const SubPrice = det.total / det.quantity;
                return (
                  <Fragment key={index}>
                    <td className="col-sm-2 col-12 justify-content-center">
                      <div className="tdHeight  d-flex flex-column  justify-content-center">
                        {det.prod_id < 2001 ? (
                          <img
                            className="w-100"
                            src={`${
                              process.env.REACT_APP_IMAGE_URL
                            }/images/products/${det.categoryR_name}/${
                              String(det.imgs).split(',')[0]
                            }`}
                            alt="img1"
                          />
                        ) : (
                          <img
                            className="w-100"
                            src={`${
                              process.env.REACT_APP_IMAGE_URL
                            }/images/used/${String(det.imgs).split(',')[0]}`}
                            alt="img1"
                          />
                        )}
                      </div>
                    </td>
                    <td className="col-4">
                      <div className="tdHeight text-start d-flex flex-column justify-content-center">
                        <p className="fw-bold">{det.name}</p>
                        <div className="text-gray-200">款式 : {det.shape}</div>
                      </div>
                    </td>
                    <td
                      className="col-2 d-flex align-items-center"
                      data-th="價格"
                    >
                      <div className="tdHeight text-info d-flex flex-column justify-content-center">
                        NT$ {SubPrice}
                      </div>
                    </td>
                    <td
                      className="col-2 d-flex align-items-center"
                      data-th="數量"
                    >
                      <div className="tdHeight text-info  d-flex flex-column justify-content-center">
                        {det.quantity}
                      </div>
                    </td>
                    <td
                      className="col-2 d-flex align-items-center"
                      data-th="小計"
                    >
                      <div className="tdHeight text-info  d-flex flex-column justify-content-center">
                        NT$ {det.total}
                      </div>
                    </td>
                  </Fragment>
                );
              })}

              {/* <hr className="col-12 py-0" /> */}
              {/* 金額 */}

              <td key={v.ordL_id}>
                <div className="total-cash ">
                  <div className="d-sm-flex justify-content-sm-end border-primary-100  border-top border-bottom">
                    <div className=" cash-detail ">
                      <div className="d-flex ">
                        小計:<span>NT${Subtotal}</span>
                      </div>

                      <div className="d-flex justify-content-between">
                        優惠券折扣:
                        {props.coupon.map((n) => {
                          return (
                            <span>
                              -NT${n.discount == null ? 0 : n.discount}
                            </span>
                          );
                        })}
                      </div>

                      <div className="d-flex justify-content-between">
                        運費:<span>NT$0</span>
                      </div>
                      <div>
                        合計:<span>NT${v.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* 詳細資訊 */}
                  <div className="every-details row ">
                    <div className="about-order col-12 col-md-6">
                      <ul className="list-unstyled text-align">
                        <li className="title">
                          <span>訂單資訊</span>
                        </li>
                        <li className="row">
                          <span className="col-3 text-start">訂單號碼:</span>
                          <span className="col-4 text-start">{v.ordL_id}</span>
                        </li>
                        <li className="row">
                          <span className="col-3 text-start">訂單信箱:</span>
                          <span className="col-4 text-start">{v.email}</span>
                        </li>
                        <li className="row">
                          <span className="col-3">訂單日期:</span>
                          <span className="col-5">{v.order_date}</span>
                        </li>
                        <li className="row">
                          <span className="col-3">訂單狀態:</span>
                          <span className="col-4">{orderState(v.state)}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="about-customer col-12 col-md-6">
                      <ul className="list-unstyled text-align">
                        <li className="title">
                          <span className="">顧客資訊</span>
                        </li>
                        <li className="row">
                          <span className="col-3">名稱:</span>
                          <span className="col-4">{v.name}</span>
                        </li>
                        <li className="row">
                          <span className="col-3">電話號碼:</span>
                          <span className="col-4">{v.phone}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="about-deliever col-12 col-md-6">
                      <ul className="list-unstyled text-align">
                        <li className="title">
                          <span>送貨資訊</span>
                        </li>
                        <li className="row">
                          <span className="col-3">寄送方式:</span>
                          <span className="col-4">宅配</span>
                        </li>
                        <li className="row">
                          <span className="col-3">送貨狀態:</span>
                          <span className="col-4">運送中</span>
                        </li>
                        <li className="row">
                          <span className="col-3">收件人姓名:</span>
                          <span className="col-4">{v.name}</span>
                        </li>
                        <li className="row">
                          <span className="col-3">電話號碼:</span>
                          <span className="col-4">{v.phone}</span>
                        </li>
                        <li className="row">
                          <span className="col-3">配送編號:</span>
                          <span className="col-4">{'E0A' + v.ordL_id}</span>
                        </li>
                        <li className="row">
                          <span className="col-3">地址</span>
                          <span className="col-5">{v.address}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="about-payments col-12 col-md-6">
                      <ul className="list-unstyled text-align">
                        <li className="title">
                          <span className="">付款方式</span>
                        </li>
                        <li className="row">
                          <span className="col-3">付款資訊:</span>
                          <span className="col-4">
                            {v.payment === 1
                              ? '綠界科技'
                              : v.payment === 2
                              ? 'LINE Pay'
                              : 'ATM 轉帳 / 銀行匯款'}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </td>
            </Fragment>
          );
        })}
    </>
  );
}

export default OrderDetail;
