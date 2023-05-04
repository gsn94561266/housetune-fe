import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UsedProductsDetail.scss';
import { useState } from 'react';
import { useCart } from '../../utils/useCart';
import { Modal, Button } from 'react-bootstrap';
import { useAuth } from '../Context/Authcontext';
import ReactPaginate from 'react-paginate';

function UsedProductsList({
  usedProducts,
  liked,
  setLiked,
  getCatUsedProducts,
  getUsedProductsPriceRange,
  getUsedProductsYearRange,
  getSellerRatings,
}) {
  let navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  // 加入購物車彈跳視窗及訊息
  const [show, setShow] = useState(false);
  const [resultMsg, setResultMsg] = useState({});
  const { addItem, items, clearCart } = useCart();
  const MessageMap = {
    1: '新增成功！',
    2: '該商品已存在購物車！',
    3: '購物車內含有官方或其他賣家的商品，是否清空購物車？',
  };
  function addToCart(v) {
    const item = {
      ...v,
      quantity: 1,
    };
    // 購物車為空直接 + 進去
    if (items.length === 0) {
      addItem({
        ...item,
        id: item.useP_id,
        seller_id: item.seller_id,
      });
      setResultMsg(MessageMap[1]);
    } else {
      // 購物車內可以有多位賣家的 id
      // 先確認是否存在 seller_id ， 再確認有沒有這筆商品的 id
      let itemObj = items[0];
      const keys = Object.keys(itemObj);
      if (keys.includes('seller_id') === true) {
        // 若賣家不同 => 清空購物車
        if (v.seller_id !== items[0].seller_id) {
          setResultMsg(MessageMap[3]);
        } else {
          let found = items.find((obj) => {
            return obj.id === item.useP_id;
          });
          if (found === undefined) {
            addItem({
              ...item,
              id: item.useP_id,
              seller_id: item.seller_id,
            });
            setResultMsg(MessageMap[1]);
          } else {
            setResultMsg(MessageMap[2]);
          }
        }
      } else {
        setResultMsg(MessageMap[3]);
      }
    }
    setShow(true);
  }
  // 商品分頁
  const [ProductOffset, setProductOffset] = useState(0);
  const ProductPerPage = 8;
  const ProductEndOffset = ProductOffset + ProductPerPage;
  const ProductCurrentItems = usedProducts.slice(
    ProductOffset,
    ProductEndOffset
  );
  const ProductPageCount = Math.ceil(usedProducts.length / ProductPerPage);
  const ProductPageClick = (event) => {
    const newOffset = (event.selected * ProductPerPage) % usedProducts.length;
    setProductOffset(newOffset);
    window.scrollTo(0, 0);
  };

  return (
    <div className="usedProduts-body row g-1">
      {ProductCurrentItems.map((v, i) => {
        return (
          <div
            className="col-6 col-md-3 d-flex justify-content-center p-md-3 p-2"
            key={v.useP_id}
          >
            <div className="card border border-0 card-shadow position-relative">
              <div className="product-img">
                <img
                  style={{ cursor: 'pointer' }}
                  src={`${process.env.REACT_APP_IMAGE_URL}/images/used/${
                    v.img.split(',')[0]
                  }`}
                  className="card-img-top bg-gray-200 object-cover"
                  alt={v.product_name}
                  onClick={() => {
                    navigate(`/usedproducts/${v.useP_id}`);
                  }}
                />
              </div>
              <div className="card-body text-left py-4">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title text-info">NT $ {v.price}</h5>
                  <p>
                    {/* 沒有登入的愛心 */}
                    {!isLoggedIn && (
                      <Link to={'/login'}>
                        <i
                          style={{ cursor: 'pointer' }}
                          className="fa-regular fa-heart text-info"
                        ></i>
                      </Link>
                    )}
                    {/* 登入後的愛心 */}
                    {isLoggedIn && liked.includes(v.useP_id) && (
                      <i
                        className="fa-solid fa-heart text-danger"
                        onClick={() => {
                          setLiked(
                            liked.filter((v2, i2) => {
                              return v2 !== v.useP_id;
                            })
                          );
                        }}
                        style={{ cursor: 'pointer' }}
                      ></i>
                    )}
                    {isLoggedIn && !liked.includes(v.useP_id) && (
                      <i
                        onClick={() => {
                          setLiked([...liked, v.useP_id]);
                        }}
                        style={{ cursor: 'pointer' }}
                        className="fa-regular fa-heart text-info"
                      ></i>
                    )}
                  </p>
                </div>
                <h6 className="card-title text-gray-300">{v.name}</h6>
                <p className="card-text text-gray-300">賣家：{v.seller_name}</p>
              </div>
              <div className="card-body pt-0 card-btn card-shadow bg-white d-none d-md-block">
                <button
                  className="btn btn-primary-300 fs-sml w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => {
                    addToCart(v);
                  }}
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <ReactPaginate
        breakLabel="..."
        nextLabel="下一頁>"
        onPageChange={ProductPageClick}
        pageRangeDisplayed={5}
        pageCount={ProductPageCount}
        previousLabel="<上一頁"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-btn"
        nextLinkClassName="page-btn"
        activeLinkClassName="active"
      />
      {/* 彈出視窗 */}
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-info fw-bold">提醒</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="fw-bolder d-flex align-items-center"
          style={{ minHeight: '5rem' }}
        >
          {resultMsg}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-white"
            variant="secondary"
            onClick={() => {
              setShow(false);
            }}
          >
            關閉
          </Button>
          {resultMsg === MessageMap[3] ? (
            <Button
              className="btn btn-primary-300"
              variant="primary"
              onClick={() => {
                setShow(false);
                clearCart();
              }}
            >
              確認
            </Button>
          ) : (
            <Button
              className="clearBtn btn btn-primary-300"
              variant="primary"
              onClick={() => {
                setShow(false);
              }}
            >
              確認
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default UsedProductsList;
