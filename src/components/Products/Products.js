import { Link, useNavigate, useParams } from 'react-router-dom';
import BreadCrumb from '../Layout/BreadCrumb';
import './Products.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../Context/Authcontext';
import { useCategory } from '../Context/CategoryContext';
import { Modal, Button } from 'react-bootstrap';

// 購物車
import { useCart } from '../../utils/useCart';

function Products() {
  // 登入登出
  const { userinfo, isLoggedIn } = useAuth();
  const { categoryProduct, searchProduct } = useCategory();
  const {
    categoryRoom,
    currentPage,
    currentSort,
    currentStock,
    currentCategory,
    currentMin,
    currentMax,
    currentSearch,
  } = useParams();
  const [products, setProducts] = useState([]);

  let navigate = useNavigate();
  // 將 currentPage 轉換為10進為表示的整數
  const [page, setPage] = useState(parseInt(currentPage, 10) || 1);
  const [totalPage, setTotalPage] = useState(0);
  // 排序依據
  const [sort, setSort] = useState(currentSort || '');
  // Filter 功能，供貨情況
  const [stockFilter, setStockFilter] = useState(currentStock || []);
  // Filter 功能，價格
  const [minPriceFilter, setMinPriceFilter] = useState(currentMin || '');
  const [maxPriceFilter, setMaxPriceFilter] = useState(currentMax || '');
  // Filter 功能，分類
  const [categoryFilter, setCategoryFilter] = useState(
    currentCategory || categoryProduct || []
  );

  // 條件設定資料抓取
  // 供貨情況
  const [stock, setStock] = useState([]);
  const [categoryAmount, setCategoryAmount] = useState([]);
  const [category, setCategory] = useState([]);

  // 儲存 select 狀態
  const [shape, setShape] = useState('藍色 Blue');
  const [amount, setAmount] = useState('1');
  const [inputDisplay, setInputDisplay] = useState('none');
  // 抓取點擊購物車的資料
  const [cart, setCart] = useState([]);

  // 收藏
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
      try {
        async function liked() {
          let likeJson = JSON.stringify(like);
          const userId = userinfo.id;
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

  // 抓取產品資料
  useEffect(() => {
    try {
      async function getProducts() {
        let res;
        if (categoryRoom) {
          res = await axios.get(
            `http://localhost:3001/api/products/category/${categoryRoom}?currentSort=${sort}&currentStock=${stockFilter}&currentCategory=${categoryFilter}&currentMin=${minPriceFilter}&currentMax=${maxPriceFilter}&page=${page}`
          );
        } else {
          res = await axios.get(
            `http://localhost:3001/api/products?currentSort=${sort}&currentStock=${stockFilter}&currentCategory=${categoryFilter}&currentMin=${minPriceFilter}&currentMax=${maxPriceFilter}&currentSearch=${searchProduct}&page=${page}`
          );
        }
        setProducts(res.data.data);
        setTotalPage(res.data.pagination.totalPage);
        setStock(res.data.stock);
        setCategory(res.data.category);
        setCategoryAmount(res.data.categoryAmount);
      }
      getProducts();
    } catch (e) {
      console.error(e);
    }
  }, [
    categoryRoom,
    page,
    sort,
    stockFilter,
    categoryFilter,
    minPriceFilter,
    maxPriceFilter,
    searchProduct,
  ]);

  function Number(min, max) {
    const array = [];
    for (let i = min; i <= max; i++) {
      array.push(i);
    }
    return array;
  }

  const sortOptions = ['', 1, 2, 3, 4, 5, 6];
  const srotMap = {
    '': '精選',
    1: '依字母順序 A 到 Z',
    2: '依字母順序 Z 到 A',
    3: '價格 (從低到高)',
    4: '價格 (從高到低)',
    5: '日期 (從舊到新)',
    6: '日期 (從新到舊)',
  };

  const categoryRoomMap = {
    1: '客廳 / Living room',
    2: '廚房 / Kitchen',
    3: '臥室 / Bedroom',
    4: '浴室 / Bathroom',
    '': '其他',
  };

  // 條件設定，分類，中英轉換
  const categoryProductMap = {
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
    '': '其他',
  };

  function getPageAll(totalPage) {
    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  function getPage(page, totalPage) {
    const pages = [];
    if (page < 3) {
      for (let i = 1; i <= page + 2; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPage);
    } else if (page === 3) {
      if (totalPage < 7) {
        for (let i = 1; i <= page + 2; i++) {
          pages.push(i);
        }
        pages.push(totalPage);
      } else {
        for (let i = 1; i <= page + 2; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPage);
      }
    } else if (page === 4) {
      pages.push(1);
      if (totalPage > 7) {
        for (let i = page - 2; i <= page + 2; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPage);
      } else {
        for (let i = page - 2; i <= totalPage; i++) {
          pages.push(i);
        }
      }
    } else if (page > 4) {
      pages.push(1);
      pages.push('...');
      if (totalPage <= page + 3) {
        for (let i = page - 2; i <= totalPage; i++) {
          pages.push(i);
        }
      } else if (totalPage === page) {
        for (let i = totalPage - 2; i <= totalPage; i++) {
          pages.push(i);
        }
      } else {
        for (let i = page - 2; i <= page + 2; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPage);
      }
    }
    return pages;
  }

  // 購物車
  useEffect(() => {
    setCompleteAdd(false);
  }, [shape, amount]);

  const { addItem, items, clearCart } = useCart();

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
    const item = {
      ...cart,
      quantity: parseInt(amount, 10),
    };
    // 判斷購買數量超過庫存 則不能再加進購物車
    // console.log(item);
    // console.log(items);

    let overBuy = false;
    let buyingItemIndex;
    // 判斷 選取的產品 購買數量不超過庫存
    // cart.amount 是庫存
    // items[i].quantity 是購物車該項目的數量

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
        // 沒找到 => 加進去
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
              if (items[i].quantity === cart.amount) {
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
        if (+amount + items[buyingItemIndex].quantity > +cart.amount) {
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
      <main className="bg-orange product">
        <div className="container">
          <BreadCrumb />
          {categoryRoom ? (
            <h3 className="mb-md-5 mb-2 mt-md-0 mt-2 text-info-dark">
              {categoryRoomMap[categoryRoom]}
            </h3>
          ) : (
            <h3 className="mb-md-5 mb-2 mt-md-0 mt-2 text-info-dark">
              {searchProduct ? `${searchProduct} 的搜尋結果` : '所有商品'}
            </h3>
          )}
          <div className="d-flex justify-content-between border-0">
            {/* 左側條件設定 */}
            <div className="col-2 d-none d-lg-block ">
              <h5 className="text-info">條件設定</h5>
              <hr className="simple" />
              <div className="accordion accordion-flush">
                {/* 供貨情況 */}
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="panelsStayOpen-headingOne"
                  >
                    <button
                      className="accordion-button bg-orange ps-0"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseOne"
                      aria-expanded="true"
                      aria-controls="panelsStayOpen-collapseOne"
                    >
                      供貨情況
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="panelsStayOpen-headingOne"
                  >
                    <div className="accordion-body bg-orange ps-0">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="InStock"
                          id="InStock"
                          onChange={(e) => {
                            const value = e.target.value;
                            if (stockFilter.includes(value)) {
                              const newStockFilter = stockFilter.filter(
                                (v, i) => {
                                  return v !== value;
                                }
                              );
                              setStockFilter(newStockFilter);
                            } else {
                              const newStockFilter = [...stockFilter, value];
                              setStockFilter(newStockFilter);
                            }
                          }}
                        />
                        <label
                          className="form-check-label fs-sml text-info"
                          htmlFor="InStock"
                        >
                          有庫存({stock.inStock})
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="OutStock"
                          id="OutStock"
                          onChange={(e) => {
                            const value = e.target.value;
                            if (stockFilter.includes(value)) {
                              const newStockFilter = stockFilter.filter(
                                (v, i) => {
                                  return v !== value;
                                }
                              );
                              setStockFilter(newStockFilter);
                            } else {
                              const newStockFilter = [...stockFilter, value];
                              setStockFilter(newStockFilter);
                            }
                          }}
                        />
                        <label
                          className="form-check-label fs-sml text-info"
                          htmlFor="OutStock"
                        >
                          無庫存({stock.outStock})
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 價格 */}
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="panelsStayOpen-headingTwo"
                  >
                    <button
                      className="accordion-button collapsed bg-orange ps-0"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseTwo"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseTwo"
                    >
                      價格
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="panelsStayOpen-headingTwo"
                  >
                    <div className="accordion-body bg-orange ps-0">
                      <div className="d-flex pb-2 align-items-center">
                        <h6 className="px-1 text-primary-200 mb-0 fs-sml">$</h6>
                        <input
                          type="number"
                          name="points"
                          min="0"
                          max="10"
                          placeholder="From"
                          className="w-100 fs-sml"
                          value={minPriceFilter}
                          onChange={(e) => {
                            setMinPriceFilter(e.target.value);
                          }}
                        />
                      </div>
                      <div className="d-flex align-items-center">
                        <h6 className="px-1 text-primary-200 mb-0 fs-sml">$</h6>
                        <input
                          type="number"
                          name="points"
                          min="0"
                          max="10"
                          placeholder="To"
                          className="w-100 fs-sml"
                          value={maxPriceFilter}
                          onChange={(e) => {
                            setMaxPriceFilter(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* 分類 */}
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="panelsStayOpen-headingThree"
                  >
                    <button
                      className="accordion-button collapsed bg-orange ps-0"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseThree"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseThree"
                    >
                      分類
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="panelsStayOpen-headingThree"
                  >
                    <div className="accordion-body bg-orange ps-0">
                      {category.map((v, i) => {
                        return (
                          <div className="form-check" key={v.id}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={v.id}
                              id={v.name}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (categoryFilter.includes(value)) {
                                  const newCategoryFilter =
                                    categoryFilter.filter((v2, i) => {
                                      return v2 !== value;
                                    });
                                  setCategoryFilter(newCategoryFilter);
                                } else {
                                  const newCategoryFilter = [
                                    ...categoryFilter,
                                    value,
                                  ];
                                  setCategoryFilter(newCategoryFilter);
                                }
                              }}
                              checked={categoryFilter.includes(`${v.id}`)}
                            />
                            <label
                              className="form-check-label text-info fs-sml"
                              htmlFor={v.name}
                            >
                              {categoryProductMap[v.name]}(
                              {categoryAmount[i]['total']})
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 右側排序、商品列表 */}
            <div className="col-12 col-lg-9 ">
              {/* 條件設定、排序依據 */}
              <div className="d-flex mb-1 mb-md-0">
                {/* 條件設定 */}
                <div className="d-flex align-items-center d-md-none">
                  <div className="pe-3">
                    <button
                      className="text-info-dark ps-0 col border-0 bg-orange"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModalFilter"
                    >
                      <span className="d-md-none d-inline">
                        <i className="fa-solid fa-filter"></i>
                      </span>
                      條件設定
                    </button>
                  </div>
                </div>
                {/* 排序依據 */}
                <div className="d-flex align-items-center">
                  <div className="pe-3 d-block d-md-none">
                    <button
                      className="text-info-dark ps-0 col border-0 bg-orange"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModalSort"
                    >
                      <span>
                        <i className="fa-solid fa-sort"></i>{' '}
                      </span>
                      排序依據
                    </button>
                  </div>
                  <div className="pe-3 d-none d-md-block">
                    <h6 className="text-info-dark ps-0 col">排序依據</h6>
                  </div>
                  <div className="d-none d-md-block">
                    <select
                      className="form-select-xl mb-2 text-gray-300 fs-sml"
                      aria-label="Default select example"
                      value={sort}
                      onChange={(e) => {
                        setSort(e.target.value);
                      }}
                    >
                      <option value="">精選</option>
                      <option value="1">依字母順序Ａ到Ｚ</option>
                      <option value="2">依字母順序Ｚ到Ａ</option>
                      <option value="3">價格（從低到高）</option>
                      <option value="4">價格（從高到低）</option>
                      <option value="5">日期（從舊到新）</option>
                      <option value="6">日期（從新到舊）</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* 商品列表 */}
              <div className="row">
                {products.map((v, i) => {
                  const img = v.img.split(',');
                  return (
                    <div
                      className="col-6 col-md-3 d-flex justify-content-center p-md-3 p-2"
                      key={v.prod_id}
                    >
                      <div className="card border border-0 card-shadow position-relative">
                        <div className="product-img">
                          <img
                            style={{ cursor: 'pointer' }}
                            src={`${process.env.REACT_APP_IMAGE_URL}/images/products/${v.categoryR_name}/${img[0]}`}
                            className="card-img-top bg-gray-200 object-cover"
                            alt="..."
                            onClick={() => {
                              navigate(`/products/${v.prod_id}`);
                            }}
                          />
                        </div>
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
                          <h6 className="card-title text-gray-300">{v.name}</h6>

                          {v.amount === 0 ? (
                            <p className="card-text text-danger">已售完</p>
                          ) : (
                            <p className="card-text text-primary-200">
                              僅剩 {v.amount} 件 !
                            </p>
                          )}
                          <button
                            className="btn btn-primary-300 fs-sml w-100 d-block d-md-none"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => {
                              setCart(v);
                              setShape('藍色 Blue');
                              setAmount('1');
                              setInputDisplay('none');
                            }}
                          >
                            加入購物車
                          </button>
                        </div>
                        <div className="card-body pt-0 card-btn card-shadow bg-white d-none d-md-block">
                          <button
                            className="btn btn-primary-300 fs-sml w-100"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => {
                              // 給預設值
                              setCompleteAdd(false);
                              setCart(v);
                              setShape('藍色 Blue');
                              setAmount('1');
                              setInputDisplay('none');
                            }}
                          >
                            加入購物車
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* 頁碼 */}
              <div>
                <ul className="d-flex justify-content-center list-unstyled text-primary-300 pt-3 page align-items-center">
                  {/* 上一頁 */}
                  {page !== 1 && (
                    <li
                      className="px-1 fs-sml"
                      onClick={() => {
                        setPage(page - 1);
                        window.scrollTo(0, 200);
                        if (categoryRoom) {
                          navigate(
                            `/products/category/${categoryRoom}?page=${
                              page - 1
                            }`
                          );
                        } else {
                          navigate(`/products?page=${page - 1}`);
                        }
                      }}
                    >
                      {'<'} 上一頁
                    </li>
                  )}
                  {totalPage > 5 &&
                    getPage(page, totalPage).map((v, i) => {
                      return (
                        <li
                          className={page === v ? 'fw-bold px-2' : 'px-2'}
                          key={v}
                          onClick={() => {
                            if (v === '...') {
                              return;
                            } else {
                              setPage(v);
                              window.scrollTo(0, 200);
                              if (categoryRoom) {
                                navigate(
                                  `/products/category/${categoryRoom}?page=${v}`
                                );
                              } else {
                                navigate(`/products?page=${v}`);
                              }
                            }
                          }}
                        >
                          {v}
                        </li>
                      );
                    })}
                  {totalPage <= 5 &&
                    getPageAll(totalPage).map((v, i) => {
                      return (
                        <li
                          className={page === v ? 'fw-bold px-2' : 'px-2'}
                          key={v}
                          onClick={() => {
                            setPage(v);
                            window.scrollTo(0, 200);
                            if (categoryRoom) {
                              navigate(
                                `/products/category/${categoryRoom}?page=${v}`
                              );
                            } else {
                              navigate(`/products?page=${v}`);
                            }
                          }}
                        >
                          {v}
                        </li>
                      );
                    })}
                  {/* 下一頁 */}
                  {page !== totalPage && (
                    <li
                      className="px-1 fs-sml"
                      onClick={() => {
                        setPage(page + 1);
                        window.scrollTo(0, 200);
                        if (categoryRoom) {
                          navigate(
                            `/products/category/${categoryRoom}?page=${
                              page + 1
                            }`
                          );
                        } else {
                          navigate(`/products?page=${page + 1}`);
                        }
                      }}
                    >
                      下一頁{' >'}
                    </li>
                  )}
                </ul>
              </div>
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
            <div className="modal-content rounded-0">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5 text-info"
                  id="exampleModalLabel"
                >
                  條件設定
                </h1>
                <button
                  type="button"
                  className="btn-close fs-sml"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="accordion accordion-flush">
                  {/* 供貨情況 */}
                  <div className="accordion-item border-bottom-1">
                    <h2
                      className="accordion-header border-0"
                      id="panelsStayOpen-headingOne"
                    >
                      <button
                        className="accordion-button bg-white ps-0 text-info-dark border-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseOne"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne"
                      >
                        供貨情況
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="panelsStayOpen-headingOne"
                    >
                      <div className="accordion-body bg-white ps-0 bord">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="InStock"
                            id="ModalInStock"
                            onClick={(e) => {
                              const value = e.target.value;
                              if (stockFilter.includes(value)) {
                                const newStockFilter = stockFilter.filter(
                                  (v, i) => {
                                    return v !== value;
                                  }
                                );
                                setStockFilter(newStockFilter);
                              } else {
                                const newStockFilter = [...stockFilter, value];
                                setStockFilter(newStockFilter);
                              }
                            }}
                          />
                          <label
                            className="form-check-label fs-sml text-info"
                            htmlFor="ModalInStock"
                          >
                            有庫存({stock.inStock})
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="OutStock"
                            id="ModalOutStock"
                            onClick={(e) => {
                              const value = e.target.value;
                              if (stockFilter.includes(value)) {
                                const newStockFilter = stockFilter.filter(
                                  (v, i) => {
                                    return v !== value;
                                  }
                                );
                                setStockFilter(newStockFilter);
                              } else {
                                const newStockFilter = [...stockFilter, value];
                                setStockFilter(newStockFilter);
                              }
                            }}
                          />
                          <label
                            className="form-check-label fs-sml text-info"
                            htmlFor="ModalOutStock"
                          >
                            無庫存({stock.outStock})
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 價格 */}
                  <div className="accordion-item border-0">
                    <h2
                      className="accordion-header border-0"
                      id="panelsStayOpen-headingTwo"
                    >
                      <button
                        className="accordion-button collapsed bg-white ps-0 text-info-dark border-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseTwo"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseTwo"
                      >
                        價格
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="panelsStayOpen-headingTwo"
                    >
                      <div className="accordion-body bg-white ps-0">
                        <div className="d-flex pb-2 align-items-center">
                          <h6 className="px-1 text-primary-200 mb-0 fs-sml">
                            $
                          </h6>
                          <input
                            type="number"
                            name="points"
                            min="0"
                            max="10"
                            placeholder="From"
                            className="w-100 fs-sml"
                            value={minPriceFilter}
                            onChange={(e) => {
                              setMinPriceFilter(e.target.value);
                            }}
                          />
                        </div>
                        <div className="d-flex align-items-center">
                          <h6 className="px-1 text-primary-200 mb-0 fs-sml">
                            $
                          </h6>
                          <input
                            type="number"
                            name="points"
                            min="0"
                            max="10"
                            placeholder="To"
                            className="w-100 fs-sml"
                            value={maxPriceFilter}
                            onChange={(e) => {
                              setMaxPriceFilter(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 分類 */}
                  <div className="accordion-item border-0">
                    <h2
                      className="accordion-header border-0"
                      id="panelsStayOpen-headingThree"
                    >
                      <button
                        className="accordion-button collapsed bg-white ps-0 text-info-dark border-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseThree"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseThree"
                      >
                        分類
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="panelsStayOpen-headingThree"
                    >
                      <div className="accordion-body bg-white ps-0">
                        {category.map((v, i) => {
                          return (
                            <div className="form-check" key={v.id}>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={v.id}
                                id={`modal${v.name}`}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (categoryFilter.includes(value)) {
                                    const newCategoryFilter =
                                      categoryFilter.filter((v2, i) => {
                                        return v2 !== value;
                                      });
                                    setCategoryFilter(newCategoryFilter);
                                  } else {
                                    const newCategoryFilter = [
                                      ...categoryFilter,
                                      value,
                                    ];
                                    setCategoryFilter(newCategoryFilter);
                                  }
                                }}
                              />
                              <label
                                className="form-check-label text-info fs-sml"
                                htmlFor={`modal${v.name}`}
                              >
                                {categoryProductMap[v.name]}(
                                {categoryAmount[i]['total']})
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* modal Sort 彈跳視窗 */}
        <div
          className="modal fade"
          id="exampleModalSort"
          tabIndex="-1"
          aria-labelledby="exampleModalSort"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-0">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5 text-info"
                  id="exampleModalLabel"
                >
                  排序依據
                </h1>
                <button
                  type="button"
                  className="btn-close fs-sml"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {sortOptions.map((v, i) => {
                  return (
                    <button
                      key={v}
                      className={
                        sort === v
                          ? 'btn bg-primary-300 border-1 border-primary-300 text-white w-100 fs-sml my-1'
                          : 'btn bg-white border-1 border-primary-300 text-primary-300 w-100 fs-sml my-1'
                      }
                      onClick={() => {
                        setSort(v);
                      }}
                    >
                      {srotMap[v]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* modal Cart 彈跳視窗 */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-0 border-0">
              <div className="modal-header border-0">
                <h1
                  className="modal-title fs-5 text-gray-300"
                  id="staticBackdropLabel"
                >
                  {cart.name}
                </h1>
                <button
                  type="button"
                  className="btn-close fs-sml"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body border-0 pt-0">
                <h5 className="card-title text-info pb-3">NT $ {cart.price}</h5>
                {/* 選擇款式 */}
                {cart.amount > 0 ? (
                  <div className="form-floating">
                    <select
                      className="form-select text-gray-400"
                      id="floatingSelect"
                      value={shape}
                      onChange={(e) => {
                        setShape(e.target.value);
                      }}
                    >
                      <option value="藍色 Blue" className="text-gray-400">
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
                {cart.amount > 0 && (
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
                            {Number(1, cart.amount >= 10 ? 9 : cart.amount).map(
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
                            {cart.amount >= 10 && (
                              <option value="10" className="text-gray-400">
                                10 +
                              </option>
                            )}
                          </select>
                          <label htmlFor="floatingSelect" className="label-fs">
                            數量
                          </label>
                        </div>
                      )}
                      {inputDisplay === 'block' && (
                        <input
                          type="number"
                          className="form-control bg-white shadow-none"
                          min={0}
                          max={cart.amount}
                          value={amount}
                          onKeyUp={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^\d]/g,
                              ''
                            );
                          }}
                          onChange={(e) => {
                            if (e.target.value > cart.amount) {
                              e.target.value = cart.amount;
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
                          // data-bs-toggle="modal"
                          data-bs-target="#MsgModal"
                        >
                          加入購物車
                        </button>
                      ) : (
                        <button
                          className={`btn btn-primary-300 border border-2 border-success text-white btn-cart w-100 h-100`}
                          data-bs-target="#MsgModal"
                          onClick={(e) => {
                            // 再次點即可重新添加
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
                {/* 庫存狀態 */}
                <div className="py-2">
                  <p className="fs-6 text-gray-400 fs-sml mb-0">
                    庫存狀態 :
                    <span className="text-danger">
                      {' '}
                      {cart.amount === 0
                        ? '已售完'
                        : `僅剩 ${cart.amount} 件 !`}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
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

export default Products;
