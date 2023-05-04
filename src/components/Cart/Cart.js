// import { Link } from 'react-router-dom';
import './Cart.scss';
import { useState, useEffect } from 'react';
import { useCart } from '../../utils/useCart';
import { Link } from 'react-router-dom';
// 登入狀態引用
import { useAuth } from '../Context/Authcontext';


function Cart(props) {
  // 引用登入狀態
  const { userinfo, setUserInfo, isLoggedIn, setIsLoggedIn } = useAuth();
  const [isSecond, setIsSecond] = useState(false);

  // cart init
  // initialState = {
  //   items: [],
  //   isEmpty: true,
  //   totalItems: 0,
  //   cartTotal: 0,
  // }
  const {
    cart,
    items,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    isInCart,
    plusOne,
    minusOne,
  } = useCart();

  useEffect(() => {
    if (items.length > 0) {
      let itemObj = items[0];
      const keys = Object.keys(itemObj);
      // 檢查是否有 seller_id
      if (keys.includes('seller_id') === false) {
        setIsSecond(false);
      } else {
        setIsSecond(true);
      }
    }
  }, []);

  return (
    <div className="bg-orange py-5 cart">
      <div className="container bg-primary card py-5">
        <h4 className="px-2 fw-bold text-info">您的購物車清單</h4>

        {items.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center only-message-height">
            <h3 className="text-gray-300 fw-bold">
              這裡空空如也 ~ 快去購物吧 !
            </h3>
          </div>
        ) : (
          <>
            {items.map((val, i) => {
              const img = val.img.split(',');

              if (val.quantity > val.amount) {
                val.quantity = val.amount;
                return val.quantity, val.itemTotal;
              }
              val.itemTotal = val.quantity * val.price;

              return (
                <div
                  key={val.id}
                  className="row order-list-upper bg-white align-items-center justify-content-around m-auto p-3 my-2"
                >
                  {/* 商品圖 */}
                  <img
                    className="d-block col-sm-2 col-4 img-fluid"
                    //TODO:
                    src={
                      !isSecond
                        ? `${process.env.REACT_APP_IMAGE_URL}/images/products/${val.categoryR_name}/${img[0]}`
                        : `${process.env.REACT_APP_IMAGE_URL}/images/used/${val.img}`
                    }
                    alt=""
                  />
                  <div className=" col-sm-10 col-8  row align-items-center d-flex justify-content-between ">
                    <div className="col-sm-4 col-12 p-auto ">
                      {/* 品名 */}
                      <p className="fs-5">
                        <strong>{val.name}</strong>
                      </p>
                      {/* 款式 */}
                      <p>
                        <strong> {!isSecond ? '款式' : '賣家'} </strong>
                        {!isSecond ? val.shape : val.seller_name}
                      </p>
                      {/* 價格 */}
                      <p>
                        <strong>價格</strong>
                        NT$ {val.price}
                      </p>
                    </div>
                    {/* 數量 */}
                    <div className="mr-2 col-sm-3 row col-12 ">
                      {!isSecond ? (
                        <>
                          <button
                            type="button"
                            className="col-4 btn btn-primary-300"
                            onClick={() => {
                              minusOne(val.id);
                            }}
                          >
                            -
                          </button>
                          <button type="button" className="col-4 btn btn-light">
                            {val.quantity}
                          </button>
                          <button
                            type="button"
                            className="col-4 btn btn-primary-300"
                            onClick={() => {
                              plusOne(val.id);
                            }}
                          >
                            +
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            className="col-12 text-center btn btn-light"
                          >
                            {val.quantity}
                          </button>
                        </>
                      )}
                    </div>
                    <div className="col-sm-3 row col-12 ">
                      <p className=" col-sm-9 col-12 my-2 ">{val.itemTotal}</p>
                      <button
                        type="button"
                        className="btn btn-light col-sm-3 col-12 "
                        onClick={() => {
                          removeItem(val.id);
                        }}
                      >
                        <i className="fa-duotone fa-circle-xmark fa-solid fa-circle-xmark m-auto text-primary-200"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="row justify-content-center order-list-lower mt-4 px-2">
              <div className="col-12 order-2 order-sm-1 col-sm-6 d-inline-block ">
                {/* coupon */}
                <div className="d-flex justify-content-between w-100"></div>
                <hr />
                {/* 金額明細 */}
                <div className="div-price mt-4 d-flex flex-column justify-content-end">
                  <div className="d-flex justify-content-between">
                    <strong className="">總金額</strong>
                    <span>{cart.isEmpty ? '購物車為空' : cart.cartTotal}</span>
                  </div>
                  <div className=" d-flex justify-content-between">
                    <strong className="">運費</strong>
                    <span className=" ">0</span>
                  </div>
                </div>
              </div>
              <div className="col-12 order-1 order-sm-2 col-sm-6 ">
                <p className="text-gray-300 py-2">
                  如需填寫統編、公司抬頭，或其它需求，可備註於此欄中
                </p>
                <textarea
                  name=""
                  cols="30"
                  rows="12"
                  className="p-2 form-control"
                  placeholder="特殊需求備註："
                ></textarea>
              </div>
              <div className="order-3">
                <hr />
                <div className="d-flex justify-content-between ">
                  <strong className="">總金額</strong>
                  <p className="">NT$ {cart.cartTotal} </p>
                </div>
                <Link
                  to={isLoggedIn ? 'checkout/information' : '../login'}
                  className="w-100 m-auto text-center btn btn-light bg-primary-300 text-white mb-2 "
                  onClick={() => {
                    if (!isLoggedIn) alert('請先登入!');
                  }}
                >
                  結帳
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default Cart;
