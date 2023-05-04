import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../Context/Authcontext';
import { useChat } from '../Context/Chatcontext';
import axios from 'axios';
import moment from 'moment';
import ReactStars from 'react-stars';
import ReactPaginate from 'react-paginate';
import BreadCrumb from '../Layout/BreadCrumb';
import './PersonalStore.scss';
import { useCart } from '../../utils/useCart';
import { Modal, Button } from 'react-bootstrap';

function PersonalStore({ socket }) {
  const { userinfo, isLoggedIn } = useAuth();
  const { userAcct } = useParams();
  let navigate = useNavigate();

  // 儲存 select 狀態
  const [shape, setShape] = useState('');
  const [amount, setAmount] = useState('');
  // 抓取點擊購物車的資料
  const [cart, setCart] = useState([]);

  // 抓商品、評價、分類
  const [products, setProducts] = useState([]);
  const [rating, setRating] = useState([]);
  const [category, setCategory] = useState([]);
  const [buyer, setBuyer] = useState([]);
  useEffect(() => {
    try {
      async function getProducts() {
        let res = await axios.get(
          `http://localhost:3001/api/seller/${userAcct}`
        );
        setProducts(res.data.data);
        setRating(res.data.rating);
        setCategory(res.data.category);
        setBuyer(res.data.buyer);
      }
      getProducts();
    } catch (e) {
      console.error(e);
    }
  }, [userAcct]);

  const {
    chat,
    setChat,
    reciever,
    setReciever,
    recieverId,
    setRecieverId,
    message,
    setMessage,
    begin,
    setBegin,
    messageList,
    setMessageList,
    room,
    setRoom,
    otherReciever,
    setOtherReciever,
    switchZone,
    setSwitchZone,
    newMessage,
    setNewMessage,
    chatListAccount,
    setChatListAccount,
  } = useChat();
  axios.defaults.withCredentials = true;
  async function handleMessage() {
    setChat(true);
    setBegin(true);
    socket.emit('join_room', userinfo.account);
    // console.log(userAcct);
    // setReciever(userAcct);
    let response1 = await axios.post('http://localhost:3001/api/chat/getlist', {
      userId: userinfo.id,
    });
    console.log(response1.data);
    setChatListAccount(response1.data);
    let response = await axios.post('http://localhost:3001/api/chat/switch', {
      otherReciever: userAcct,
    });
    if (response.data.length === 0) {
      alert('無此用戶');
    } else if (response.data[0].account === userinfo.account) {
      alert('寄件者與收件者為同一用戶');
    } else if (response.data[0].name === reciever) {
      alert('已在與此用戶通訊中');
    } else {
      setMessageList([]);
      setReciever(response.data[0].name);
      setRecieverId(response.data[0].user_id);
      setBegin(!begin);
      setRoom(userAcct);
    }
  }

  // 收藏
  const [userId, setUserId] = useState(0);
  const [like, setLike] = useState([]);
  // 取得收藏資料
  useEffect(() => {
    try {
      async function getLiked() {
        let res = await axios.get('http://localhost:3001/api/products/liked');
        if (res.data[0].liked) {
          setLike(JSON.parse(res.data[0].liked));
        }
      }
      getLiked();
    } catch (e) {
      console.error(e);
    }
  }, []);
  // 加入收藏
  useEffect(() => {
    if (isLoggedIn) {
      setUserId(userinfo.id);
      try {
        async function liked() {
          let likeJson = JSON.stringify(like);
          await axios.put('http://localhost:3001/api/products', {
            likeJson,
            userId,
          });
        }
        liked();
      } catch (e) {
        console.error(e);
      }
    }
  }, [isLoggedIn, userinfo.id, userId, like]);

  // 分類篩選
  const [productsFilter, setProductsFilter] = useState([]);
  const [checkedState, setCheckedState] = useState();
  useEffect(() => {
    setProductsFilter(products);
    setCheckedState(new Array(category.length).fill(false));
  }, [products, category]);
  const categoryTranslate = {
    Sofa: '沙發',
    Chair: '椅子',
    Table: '桌子',
    Storage: '儲櫃',
    Bed: '床',
    Lighting: '燈',
    Textile: '紡織',
    Decor: '裝飾',
    Kitchenware: '廚具',
    Bathroomset: '浴室',
  };
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);

    const newFilter = updatedCheckedState.reduce(
      (sum, currentState, index) =>
        currentState
          ? [
              ...sum,
              ...products.filter((v) => {
                return v.category_product === index + 1;
              }),
            ]
          : sum,
      []
    );
    setProductsFilter(newFilter);

    if (newFilter.length === 0) {
      setProductsFilter(products);
    }
  };

  // 評價篩選
  const [ratingFilter, setRatingFilter] = useState([]);
  useEffect(() => {
    setRatingFilter(rating);
  }, [rating]);
  const ratingOnClick = (count) => {
    const newFilter = rating.filter((v) => {
      return v.stars === count;
    });
    setRatingFilter(newFilter);
    if (count === 0) {
      setRatingFilter(rating);
    }
    RatingScroll.current.scrollIntoView();
  };

  // 平均星星數
  const averageStar =
    Math.round(
      (rating.reduce((acc, pilot) => acc + pilot.stars, 0) / rating.length) * 10
    ) / 10;

  // 商品分頁
  const [ProductOffset, setProductOffset] = useState(0);
  const ProductPerPage = 12;
  const ProductEndOffset = ProductOffset + ProductPerPage;
  const ProductCurrentItems = productsFilter.slice(
    ProductOffset,
    ProductEndOffset
  );
  const ProductPageCount = Math.ceil(productsFilter.length / ProductPerPage);
  const ProductPageClick = (event) => {
    const newOffset = (event.selected * ProductPerPage) % productsFilter.length;
    setProductOffset(newOffset);
    window.scrollTo(0, 0);
  };
  // 評價分頁
  const RatingScroll = useRef();
  const [RatingOffset, setRatingOffset] = useState(0);
  const RatingPerPage = 4;
  const RatingEndOffset = RatingOffset + RatingPerPage;
  const RatingCurrentItems = ratingFilter.slice(RatingOffset, RatingEndOffset);
  const RatingPageCount = Math.ceil(ratingFilter.length / RatingPerPage);
  const RatingPageClick = (event) => {
    const newOffset = (event.selected * RatingPerPage) % ratingFilter.length;
    setRatingOffset(newOffset);
    RatingScroll.current.scrollIntoView();
  };

  // 加入購物車彈跳視窗及訊息
  const [show, setShow] = useState(false);
  const [resultMsg, setResultMsg] = useState({});
  const { addItem, items, clearCart } = useCart();
  // console.log('prodDetail', prodDetail);
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
    console.log(item);
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

  return (
    <>
      <main className="bg-orange personal-store">
        <div className="container">
          <BreadCrumb />
          <div className="d-flex justify-content-between border-0">
            {/* 左側條件設定 */}
            <div className="col-2 d-none d-lg-block">
              <h4 className="mb-5 text-info-dark">
                <p>
                  <span className="fw-bold">{userAcct}</span> 的賣場
                </p>
                <button
                  className={isLoggedIn ? 'btn btn-primary-300 my-2' : 'd-none'}
                  onClick={handleMessage}
                >
                  <i className="fa-solid fa-comment-dots me-2" />
                  聊聊
                </button>
              </h4>
              <h5 className="text-info">分類</h5>
              <hr className="simple" />

              {/* 分類 */}
              {category.map((v, i) => {
                return (
                  <div key={v.id} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={v.id}
                      checked={checkedState[i]}
                      onChange={() => handleOnChange(i)}
                    />
                    <label className="form-check-label text-info fs-sml">
                      {categoryTranslate[v.name]}(
                      {
                        products.filter((i) => {
                          return i.category_product === v.id;
                        }).length
                      }
                      )
                    </label>
                  </div>
                );
              })}
            </div>

            {/* 右側排序、商品列表 */}
            <div className="col-12 col-lg-9">
              <h3 className="text-info-dark d-block d-md-none my-3">
                <span className="fw-bold">{userAcct}</span> 的賣場
                <button
                  className={isLoggedIn ? 'btn btn-primary-300 mx-4' : 'd-none'}
                  onClick={handleMessage}
                >
                  <i className="fa-solid fa-comment-dots me-2" />
                  聊聊
                </button>
              </h3>
              <div className="bg-white p-4 shadow-sm">
                <p className="text-info-dark pt-2">
                  商品:
                  <span className="m-2 text-primary-200 fw-bold">
                    {products.length}
                  </span>
                </p>
                <p className="text-info-dark">
                  評價:
                  <span
                    className="m-2 text-primary-200 fw-bold"
                    role="button"
                    onClick={() => {
                      RatingScroll.current.scrollIntoView();
                    }}
                  >
                    {isNaN(averageStar) ? 0 : averageStar} ({rating.length}
                    個評價)
                  </span>
                </p>
              </div>
              <div className="d-flex mt-3">
                {/* 條件設定 */}
                <div className="d-flex align-items-center d-md-none">
                  <div className="pe-3">
                    <button
                      className="text-info-dark ps-0 col border-0 bg-orange"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModalFilter"
                    >
                      <span className="d-md-none d-inline">
                        <i className="fa-solid fa-filter" />
                      </span>
                      <span className="m-2">分類</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* 商品列表 */}
              <div className="row">
                {ProductCurrentItems.map((v, i) => {
                  const img = v.img.split(',');
                  return (
                    <div
                      className="col-6 col-md-3 d-flex justify-content-center p-md-3 p-2"
                      key={i}
                    >
                      <div className="card border border-0 card-shadow position-relative">
                        <img
                          role="button"
                          src={`${process.env.REACT_APP_IMAGE_URL}/images/used/${img[0]}`}
                          className="card-img-top bg-gray-200"
                          alt={v.name}
                          onClick={() => {
                            navigate(`/usedproducts/${v.useP_id}`);
                          }}
                        />
                        <div className="card-body text-left">
                          <div className="d-flex justify-content-between">
                            <h5 className="card-title text-info">
                              NT $ {v.price}
                            </h5>
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
                              {isLoggedIn && like.includes(v.useP_id) && (
                                <i
                                  className="fa-solid fa-heart text-danger"
                                  onClick={() => {
                                    const newLike = like.filter((v2) => {
                                      return v2 !== v.useP_id;
                                    });
                                    setLike(newLike);
                                  }}
                                  style={{ cursor: 'pointer' }}
                                ></i>
                              )}
                              {isLoggedIn && !like.includes(v.useP_id) && (
                                <i
                                  onClick={() => {
                                    const newLike = [...like, v.useP_id];
                                    setLike(newLike);
                                  }}
                                  style={{ cursor: 'pointer' }}
                                  className="fa-regular fa-heart text-info"
                                ></i>
                              )}
                            </p>
                          </div>
                          <h6 className="card-title text-gray-300">{v.name}</h6>
                          <button className="btn btn-primary-300 fs-sml w-100 d-block d-md-none">
                            加入購物車
                          </button>
                        </div>
                        <div className="card-body pt-0 card-btn card-shadow bg-white d-none d-md-block">
                          <button
                            className="btn btn-primary-300 fs-sml w-100"
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
              </div>
              {/* 賣場評價 */}
              <section
                className="container pb-md-5 pb-3 px-0 my-5"
                ref={RatingScroll}
              >
                <div className="bg-gray p-md-5 p-3">
                  <h5 className="text-info-dark mb-4">賣場評價</h5>
                  <div className="bg-white p-3 d-lg-flex align-items-center justify-content-between">
                    <div className="m-3">
                      <p className="h3 text-info-dark">
                        <span className="fw-bold">
                          {isNaN(averageStar) ? 0 : averageStar}
                        </span>
                        /<span className="fs-5">5</span>
                      </p>

                      {/* 星星 */}
                      <ReactStars
                        count={5}
                        size={30}
                        color1={'#ced4da'}
                        color2={'#da5260'}
                        value={averageStar}
                        edit={false}
                        half={true}
                      />
                    </div>
                    <div className="m-3">
                      <button
                        className="btn btn-outline-primary-300 m-2"
                        onClick={() => ratingOnClick(0)}
                      >
                        全部
                      </button>
                      <button
                        className="btn btn-outline-primary-300 m-2"
                        onClick={() => ratingOnClick(5)}
                      >
                        5 星 ({rating.filter((v) => v.stars === 5).length})
                      </button>
                      <button
                        className="btn btn-outline-primary-300 m-2"
                        onClick={() => ratingOnClick(4)}
                      >
                        4 星 ({rating.filter((v) => v.stars === 4).length})
                      </button>
                      <button
                        className="btn btn-outline-primary-300 m-2"
                        onClick={() => ratingOnClick(3)}
                      >
                        3 星 ({rating.filter((v) => v.stars === 3).length})
                      </button>
                      <button
                        className="btn btn-outline-primary-300 m-2"
                        onClick={() => ratingOnClick(2)}
                      >
                        2 星 ({rating.filter((v) => v.stars === 2).length})
                      </button>

                      <button
                        className="btn btn-outline-primary-300 m-2"
                        onClick={() => ratingOnClick(1)}
                      >
                        1 星 ({rating.filter((v) => v.stars === 1).length})
                      </button>
                    </div>
                  </div>

                  {RatingCurrentItems.map((v, i) => {
                    const img = v.img.split(',');
                    return (
                      <div
                        key={i}
                        className="pt-3 border-bottom border-1 border-gray-200"
                      >
                        <div className="d-md-flex justify-content-between">
                          <p className="mb-2">
                            {buyer
                              .filter((v2) => {
                                return v.user_id === v2.user_id;
                              })
                              .map((v3) => v3.account)}
                          </p>
                          <div className="text-gray-200 mb-2 d-flex align-items-start">
                            <p className="me-3">
                              {moment(`${v.posted_at}`, 'YYYYMMDD').fromNow()}
                            </p>
                            <ReactStars
                              count={5}
                              size={20}
                              color1={'#ced4da'}
                              color2={'#da5260'}
                              value={v.stars}
                              edit={false}
                            />
                          </div>
                        </div>
                        <div className="d-md-flex align-items-center justify-content-between">
                          <div className="col-3 col-md-2">
                            <img
                              src={`${process.env.REACT_APP_IMAGE_URL}/images/used/${img[0]}`}
                              alt=""
                              className="object-cover pb-3 pe-4"
                            />
                          </div>
                          <p className="col-md-6 text-gray-400 fw-bold">
                            {v.name}
                          </p>
                          <p className="col-md-3 text-gray-400 fs-7">
                            {v.comment}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="下一頁>"
                    onPageChange={RatingPageClick}
                    pageRangeDisplayed={5}
                    pageCount={RatingPageCount}
                    previousLabel="<上一頁"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageLinkClassName="page-num"
                    previousLinkClassName="page-btn"
                    nextLinkClassName="page-btn"
                    activeLinkClassName="active"
                  />
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* modal Filter 彈跳視窗 */}
        <div
          className="modal fade"
          id="exampleModalFilter"
          tabIndex="-1"
          aria-labelledby="exampleModalFilter"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-0 border-none">
              <div className="modal-header">
                <h1 className="modal-title fs-5 text-info px-2">分類</h1>
                <button
                  type="button"
                  className="btn-close fs-sml"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-4">
                {/* 分類 */}
                {category.map((v, i) => {
                  return (
                    <div key={v.id} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={v.id}
                        checked={checkedState[i]}
                        onChange={() => handleOnChange(i)}
                      />
                      <label className="form-check-label text-info fs-sml">
                        {categoryTranslate[v.name]}(
                        {
                          products.filter((i) => {
                            return i.category_product === v.id;
                          }).length
                        }
                        )
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
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
      </main>
    </>
  );
}

export default PersonalStore;
