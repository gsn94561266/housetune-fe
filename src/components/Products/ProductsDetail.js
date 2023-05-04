import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BreadCrumb from '../Layout/BreadCrumb';
import './Products.scss';
import ProductsFeatured from './ProductsFeatured';
import ProductsBrowse from './ProductsBrowse';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import zhTw from '../zh-tw';
import { useAuth } from '../Context/Authcontext';
import { useCart } from '../../utils/useCart';
import { Modal, Button } from 'react-bootstrap';

function ProductsDetail() {
  // 登入登出
  const { userinfo, isLoggedIn } = useAuth();
  const { prodId } = useParams();
  // 抓取產品名稱、分類資料
  const [product, setProdcut] = useState([]);
  console.log(product)
  const [rating, setRating] = useState([]);
  const [catagory, setCategory] = useState(0);
  // 儲存 select 狀態
  const [shape, setShape] = useState('藍色 Blue');
  const [amount, setAmount] = useState('1');
  const [inputDisplay, setInputDisplay] = useState('none');
  // 收藏
  const [userId, setUserId] = useState(userinfo.user_id || 0);
  const [like, setLike] = useState(userinfo.liked || []);
  // 瀏覽紀錄
  const [browse, setBrowse] = useState([]);

  // 進入頁面取得收藏資料，localStorage
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
    let browseStorage = JSON.parse(localStorage.getItem('brwose'));
    setBrowse(browseStorage || []);
  }, []);

  // 加入收藏
  useEffect(() => {
    if (isLoggedIn) {
      setUserId(userinfo.id);
      try {
        async function liked() {
          let likeJson = JSON.stringify(like);
          let res = await axios.put('http://localhost:3001/api/products', {
            likeJson,
            userId,
          });
          // console.log(res.data);
        }
        liked();
      } catch (e) {
        console.error(e);
      }
    }
  }, [like]);

  // 瀏覽紀錄存入localStorage
  useEffect(() => {
    localStorage.setItem('brwose', JSON.stringify(browse));
  }, [browse]);

  // 抓取產品資料，localStorage
  useEffect(() => {
    window.scrollTo(0, 150);
    try {
      async function getProd() {
        let res = await axios.get(
          `http://localhost:3001/api/products/${prodId}`
        );
        // console.log(res.data.rating[0].stars);
        setProdcut(res.data.data);
        setRating(res.data.rating);
        // 瀏覽紀錄
        if (browse) {
          let browseStorage = localStorage.getItem('brwose');
          const newBrowse = JSON.parse(browseStorage).filter((v, i) => {
            return v.prod_id !== res.data.data[0].prod_id;
          });
          setBrowse([res.data.data[0], ...newBrowse]);
        }

        let res2 = await axios.get(
          `http://localhost:3001/api/products/${res.data.data[0].category_product}/${prodId}`
        );
        setCategory(res2.data);
      }
      getProd();
    } catch (e) {
      console.error(e);
    }
  }, [prodId]);

  function Number(min, max) {
    const array = [];
    for (let i = min; i <= max; i++) {
      array.push(i);
    }
    return array;
  }

  function Star() {
    let star = 0;
    for (let i = 0; i < rating.length; i++) {
      star += rating[i].stars;
    }
    star = star / rating.length;
    star = star.toFixed(1);
    return star;
  }

  const solidStar = {
    1: (
      <span>
        <i className="fa-solid fa-star"></i>
      </span>
    ),
    2: (
      <span>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
      </span>
    ),
    3: (
      <span>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
      </span>
    ),
    4: (
      <span>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
      </span>
    ),
    5: (
      <span>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
      </span>
    ),
  };
  const regularStar = {
    0: (
      <span>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
      </span>
    ),
    1: (
      <span>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
      </span>
    ),
    2: (
      <span>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
      </span>
    ),
    3: (
      <span>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
      </span>
    ),
    4: (
      <span>
        <i className="fa-regular fa-star"></i>
      </span>
    ),
  };
  // slide 設定
  const settings = {
    customPaging: function (index) {
      return (
        <a href="#/">
          {product.map((v, i) => {
            const img = v.img.split(',');
            return (
              <img
                key={v.prod_id}
                className="object-cover"
                alt=""
                src={`${process.env.REACT_APP_IMAGE_URL}/images/products/${v.categoryR_name}/${img[index]}`}
              />
            );
          })}
        </a>
      );
    },
    arrows: false,
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  // 購物車
  const { addItem, items, clearCart } = useCart();

  useEffect(() => {
    setCompleteAdd(false);
  }, [shape, amount]);

  // 訊息框
  const [resultMsg, setResultMsg] = useState({});
  const [completeAdd, setCompleteAdd] = useState(false);
  const [show, setShow] = useState(false);

  const MessageMap = {
    1: '新增成功!',
    2: '新增失敗 請重新選擇數量!',
    3: '已達購買數量上限!',
    4: '購物車內含有非官方商品，是否清空購物車？',
  };

  function addToCart() {
    let thisProduct = product[0];
    const item = {
      ...thisProduct,
      quantity: parseInt(amount, 10),
    };
    // 判斷購買數量超過庫存 則不能再加進購物車
    // console.log(item);
    // console.log(items);

    let overBuy = false;
    let buyingItemIndex;

    // 判斷 選取的產品 購買數量不超過庫存
    // 購物車為空直接 + 進去
    if (items.length === 0) {
      addItem({
        ...item,
        id: item.prod_id + `-${shape}`,
        shape: shape,
      });
      setResultMsg(MessageMap[1]);
      setCompleteAdd(true);
    } else {
      // 確認有沒有這筆商品的 id
      // 多判斷有無 seller_id (是否存在二手商品)
      let itemObj = items[0];
      const keys = Object.keys(itemObj);
      if (keys.includes('seller_id') === true) {
        setResultMsg(MessageMap[4]);
        setShow(true);
      } else {
        let found = items.find((obj) => {
          return obj.id === item.prod_id + `-${shape}`;
        });
        if (found === undefined) {
          addItem({
            ...item,
            id: item.prod_id + `-${shape}`,
            shape: shape,
          });
          setResultMsg(MessageMap[1]);
          setCompleteAdd(true);
        } else {
          for (let i in items) {
            // 單純判斷 id
            if (items[i].id === item.prod_id + `-${shape}`) {
              if (items[i].quantity === thisProduct.amount) {
                overBuy = true;
                buyingItemIndex = i;
                setResultMsg(MessageMap[3]);
                setCompleteAdd(true);
              } else {
                overBuy = false;
                buyingItemIndex = i;
                confirmAmounts();
              }
            }
          }
        }
      }
    }

    // 如果超過庫存數 不要 addItem
    function confirmAmounts() {
      if (overBuy === false) {
        // 購物車 + 選取 <= 庫存 => 可以新增
        // 購物車 + 選取 > 庫存 => 新增失敗
        if (+amount + items[buyingItemIndex].quantity > +thisProduct.amount) {
          setResultMsg(MessageMap[2]);
          setCompleteAdd(true);
        } else {
          addItem({
            ...item,
            id: item.prod_id + `-${shape}`,
            shape: shape,
          });
          setResultMsg(MessageMap[1]);
          setCompleteAdd(true);
        }
      }
    }
  }

  return (
    <>
      <div className="bg-orange">
        <main className="product">
          {/* 商品資訊 */}
          <section className="container">
            <BreadCrumb></BreadCrumb>
            <div className="row">
              {/* Slider */}
              <div className="col-md-6 product-slider">
                <Slider {...settings}>
                  {product.map((v, i) => {
                    const img = v.img.split(',');
                    /* console.log(images); */
                    return img.map((v2, i2) => {
                      return (
                        <div key={v.prod_id} className="product-slider-img">
                          <img
                            className="object-cover"
                            alt=""
                            src={`${process.env.REACT_APP_IMAGE_URL}/images/products/${v.categoryR_name}/${v2}`}
                          ></img>
                        </div>
                      );
                    });
                  })}
                </Slider>
              </div>
              {/* 右側內容 */}
              {product.map((v, i) => {
                return (
                  <div className="col-md-6" key={v.prod_id}>
                    <h3 className="text-info-dark">{v.name}</h3>
                    <h6 className="text-info">NT$ {v.price}</h6>
                    {/* 選擇款式 */}
                    {v.amount > 0 ? (
                      <div className="form-floating">
                        <select
                          className="form-select text-gray-400"
                          id="floatingSelect"
                          value={shape}
                          onChange={(e) => {
                            setShape(e.target.value);
                          }}
                        >
                          <option value="藍色Blue" className="text-gray-400">
                            藍色 Blue
                          </option>
                          <option value="深灰色Gray" className="text-gray-400">
                            深灰色 Gray
                          </option>
                          <option value="綠色Green" className="text-gray-400">
                            綠色 Green
                          </option>
                          <option value="白色White" className="text-gray-400">
                            白色 White
                          </option>
                        </select>
                        <label htmlFor="floatingSelect" className="label-fs">
                          款式
                        </label>
                      </div>
                    ) : (
                      /* 售完 */
                      <div className="text-info-dark">商品已售完</div>
                    )}
                    {/* 數量、加入購物車 */}
                    {v.amount > 0 && (
                      <div className="row pt-2">
                        <div className="col-5">
                          {inputDisplay === 'none' && (
                            <div className="form-floating">
                              <select
                                className="form-select text-gray-400"
                                id="floatingSelect"
                                value={amount}
                                onChange={(e) => {
                                  setAmount(e.target.value);
                                  if (e.target.value === '10') {
                                    setInputDisplay('block');
                                  }
                                }}
                              >
                                <option value="" disabled>
                                  請選擇數量
                                </option>
                                {Number(1, v.amount >= 10 ? 9 : v.amount).map(
                                  (v2, i) => {
                                    return (
                                      <option
                                        key={v2}
                                        value={v2}
                                        className="text-gray-400"
                                      >
                                        {v2}
                                      </option>
                                    );
                                  }
                                )}
                                {v.amount >= 10 && (
                                  <option value="10" className="text-gray-400">
                                    10 +
                                  </option>
                                )}
                              </select>
                              <label
                                htmlFor="floatingSelect"
                                className="label-fs"
                              >
                                數量
                              </label>
                            </div>
                          )}
                          {inputDisplay === 'block' && (
                            <input
                              type="number"
                              className="form-control bg-white shadow-none"
                              min={0}
                              max={product[0].amount}
                              value={amount}
                              onKeyUp={(e) => {
                                e.target.value = e.target.value.replace(
                                  /[^\d]/g,
                                  ''
                                );
                              }}
                              onChange={(e) => {
                                if (e.target.value > product[0].amount) {
                                  e.target.value = product[0].amount;
                                }
                                if (e.target.value <= 0) {
                                  e.target.value = 1;
                                }
                                setAmount(e.target.value);
                              }}
                            />
                          )}
                        </div>
                        <div className="col-7">
                          {!completeAdd ? (
                            <button
                              className="btn btn-cart bg-gray border border-2 border-primary-200 text-primary-300 btn-cart w-100 h-100"
                              onClick={() => {
                                addToCart();
                              }}
                            >
                              加入購物車
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary-300 border border-2 border-success text-white btn-cart w-100 h-100"
                              onClick={(e) => {
                                e.preventDefault();
                                setTimeout(() => {
                                  setCompleteAdd(false);
                                }, 100);
                              }}
                            >
                              {resultMsg}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                    {/* 庫存狀態  */}
                    <div>
                      <div className="py-2 d-flex justify-content-between align-items-center">
                        <p className="fs-6 text-gray-400 fs-sml mb-0">
                          庫存狀態 :
                          <span className="text-danger">
                            {' '}
                            {v.amount === 0
                              ? '已售完'
                              : `僅剩 ${v.amount} 件 !`}
                          </span>
                        </p>
                        <p className="fs-5 mb-0">
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
                          {isLoggedIn && like.includes(v.prod_id) && (
                            <i
                              className="fa-solid fa-heart text-danger"
                              onClick={() => {
                                const newLike = like.filter((v2, i2) => {
                                  return v2 !== v.prod_id;
                                });
                                setLike(newLike);
                              }}
                              style={{ cursor: 'pointer' }}
                            ></i>
                          )}
                          {isLoggedIn && !like.includes(v.prod_id) && (
                            <i
                              onClick={() => {
                                const newLike = [...like, v.prod_id];
                                setLike(newLike);
                              }}
                              style={{ cursor: 'pointer' }}
                              className="fa-regular fa-heart text-info"
                            ></i>
                          )}
                        </p>
                      </div>
                      <div className="py-2">
                        {v.prod_id >= 193 ? (
                          <p className="text-gray-400 fs-sml mb-0">
                            {v.description}
                          </p>
                        ) : (
                          <p className="text-gray-400 fs-sml mb-0">
                            出自 Anderssen & Voll
                            的設計作品，此系列沙發是在挪威西海岸製作的，造型極度簡約，沙發坐墊上的分割線，以及內層加強座墊蓬鬆度的設計，讓座墊擁有抱枕般厚度，表達了
                            Anderssen & Voll
                            對空氣美學的理解，並用極細的鋼材椅腳展現整體設計的優雅感。
                          </p>
                        )}
                      </div>
                      <div className="py-2 py-md-4">
                        <p className="text-gray-400 fs-sml mb-0">
                          商品出貨與期貨等候時間說明：
                        </p>
                        <ul className="text-gray-400 fs-sml mb-0">
                          <li>若庫存顯示有現貨，約 5 - 7 工作天出貨</li>
                          <li>
                            若庫存顯示為預購，需向國外原廠客訂預購，期貨時間約 5
                            - 6 個月左右到台灣
                          </li>
                          <li>
                            庫存查詢或其他訂購問題，歡迎利用線上即時通或客服專線：02-000-0000
                            #10
                          </li>
                        </ul>
                        <p className="text-gray-400 fs-sml mb-0">
                          本公司為 Muuto
                          台灣總代理正式授權經銷商，銷售全系列商品，商品出貨時均以原廠包裝寄送，並提供完整售後服務及原廠保固。
                        </p>
                      </div>
                    </div>
                    {/* 規格尺寸 */}
                    <div className="pt-4">
                      <p className="text-gray-400 fs-sml">規格尺寸 </p>
                      <p className="text-gray-400 fs-sml">
                        尺寸： 寬 80cm x 高 78cm x 深 73cm
                      </p>
                      <p className="text-gray-400 fs-sml"> 座位高度： 45 cm</p>
                      <p className="text-gray-400 fs-sml">
                        材質： 金屬結構，鋁質椅腳，表面羊毛紡織包覆（90%
                        羊毛，10% 尼龍）
                      </p>
                      <p className="text-gray-400 fs-sml">
                        保固： Housetune 家具與燈飾商品提供 2 年保固
                      </p>
                      <p className="text-gray-400 fs-sml">產地： 挪威</p>
                      <p className="text-gray-400 fs-sml mb-1">編號：</p>
                      <ul className="text-gray-400 fs-sml">
                        <li>藍色 / 15041-160</li>
                        <li>深灰色 / 15041-180</li>
                        <li>綠色 / 15041-550</li>
                        <li>深紅色 / 15041-660</li>
                      </ul>
                      <p className="text-gray-400 fs-sml mb-1">分享：</p>
                      <ul className="d-flex list-unstyled">
                        <li className="mb-2">
                          <Link
                            to="/"
                            className="link-gray-300 text-decoration-none me-3"
                          >
                            <i className="fa-brands fa-square-facebook fs-5" />
                          </Link>
                        </li>
                        <li className="mb-2">
                          <Link
                            to="/"
                            className="link-gray-300 text-decoration-none me-3"
                          >
                            <i className="fa-brands fa-instagram fs-5" />
                          </Link>
                        </li>
                        <li className="mb-2">
                          <Link
                            to="/"
                            className="link-gray-300 text-decoration-none me-3"
                          >
                            <i className="fa-brands fa-line fs-5" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 評價 */}
          <section className="container pb-md-5 pb-3">
            <div className="bg-gray p-md-5 p-3">
              <p className="text-info-dark">
                商品評價{' '}
                {rating.length > 0 && <span> ({rating.length} 則)</span>}
              </p>
              {rating.length < 1 && (
                <div className="border-bottom border-gray-200 pt-3">
                  <p className="mb-2">尚未有任何評價</p>
                </div>
              )}
              {rating.length > 0 && (
                <div className="bg-white p-3">
                  {/* 商品星星 */}
                  <div>
                    <p className="h3 text-info-dark mb-0">
                      <span className="pe-2">
                        <i className="fa-solid fa-star"></i>
                      </span>
                      <span className="fw-bold">{Star()}</span>
                    </p>
                  </div>
                </div>
              )}
              {/* 客人評價 */}
              <div>
                {rating.length > 0 &&
                  rating.map((v, i) => {
                    return (
                      <div
                        key={v.ratP_id}
                        className="border-bottom border-gray-200 pt-3"
                      >
                        <p className="mb-2">{v.user_name}</p>
                        <p className="text-gray-200 mb-2">
                          {moment(`${v.posted_at}`, 'YYYYMMDD').fromNow()}
                          <span className="text-gray-400 ps-2">
                            {solidStar[v.stars]}
                            {regularStar[v.stars]}
                          </span>
                        </p>
                        <p className="text-gray-400 mb-2">{v.comment}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </main>
        {/* 相關商品推薦 */}
        <ProductsFeatured catagory={catagory}></ProductsFeatured>

        {/* 最近瀏覽商品 */}
        {browse && browse.length > 1 && (
          <section className="pb-5">
            <ProductsBrowse
              browse={browse}
              setBrowse={setBrowse}
            ></ProductsBrowse>
          </section>
        )}
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
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductsDetail;
