import axios from 'axios';
import { useEffect, useState } from 'react';
import BreadCrumb from '../Layout/BreadCrumb';
import UsedProductsList from './UsedProductsList';
import _ from 'lodash';
import './UsedProductsDetail.scss';
import { useAuth } from '../Context/Authcontext';

function UsedProducts() {
  const [usedProducts, setUsedProducts] = useState([]);
  const { userinfo, isLoggedIn } = useAuth();

  //排序
  const [sort, setSort] = useState('');
  const [liked, setLiked] = useState([]);
  //取得收藏
  useEffect(() => {
    try {
      async function getLiked() {
        let res = await axios.get('http://localhost:3001/api/products/liked');
        if (res.data[0].liked) {
          setLiked(JSON.parse(res.data[0].liked));
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
        async function addLiked() {
          let likeJson = JSON.stringify(liked);
          const userId = userinfo.id;
          let res = await axios.put('http://localhost:3001/api/products', {
            likeJson,
            userId,
          });
        }
        addLiked();
      } catch (e) {
        console.error(e);
      }
    }
  }, [liked]);

  //列出所有二手商品
  useEffect(() => {
    async function getUsedProducts() {
      try {
        let res = await axios.get(`http://localhost:3001/usedproducts/`);
        setUsedProducts(res.data);
      } catch (e) {
        console.error(e);
      }
    }
    getUsedProducts();
  }, []);

  //列出排序二手產品
  // useEffect(() => {
  //   async function getUsedProducts() {
  //     try {
  //       let res = await axios.get(
  //         `http://localhost:3001/usedproducts/?sort=${sort}`
  //       );
  //       setUsedProducts(res.data);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  //   getUsedProducts();
  // }, [sort]);

  // // 呈現products
  const [usedProductsDisplay, setUsedProductsDisplay] = useState([]);

  // 分類
  const [cats, setCats] = useState([]);
  //'沙發', '椅子','桌子','櫥櫃',
  const catOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const catText = [
    '沙發',
    '椅子',
    '桌子',
    '櫥櫃',
    '床',
    '燈具',
    '織品',
    '裝飾',
    '櫥具',
    '浴室用品',
  ];

  // 價格區間
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  //使用期間
  const [years, setYears] = useState([]);
  //'1年內', '1-3op0年','3-5年','5-10年','10年以上'
  const yearOptions = [1, 2, 3, 4, 5];
  const yearText = ['1年內', '1 - 3年', '3 - 5年', '5 - 10年', '10年以上'];

  const [ratings, setRatings] = useState([]);
  //'四星以上','3-4',2-3','2以下'
  const ratingsOptions = [5, 4, 3, 2, 1, 0];
  const ratingsText = [
    '5分',
    '4 - 5分',
    '3 - 4分',
    '2 - 3分',
    '1 - 2分',
    '0 - 1分',
  ];

  //分頁
  const [pageNow, setPageNow] = useState(1); // 預設為第1頁
  const [perPage, setPerPage] = useState(99999); // 預設為每頁有2筆
  const [pageTotal, setPageTotal] = useState(0); // 預設總頁數為0

  // 分類篩選條件categoryArray : array
  const getCatUsedProducts = (usedProductsArray, categoryArray) => {
    return usedProductsArray.filter((v, i) => {
      return categoryArray.includes(v.category_product); //每項產品只有一個分類
    });
  };

  //價格篩選條件
  const getUsedProductsPriceRange = (usedProductsArray, from, to) => {
    // convert to number
    const nFrom = Number(from);
    const nTo = Number(to);
    return usedProductsArray.filter((v, i) => {
      return v.price >= nFrom && v.price <= nTo;
    });
  };
  //年份篩選條件
  const getUsedProductsYearRange = (usedProductsArray, yearRange) => {
    const products = usedProductsArray.map((v, i) => {
      const now = new Date().getFullYear();
      const howOld = now - v.bought_in;
      //先分類
      if (howOld <= 1) {
        return { ...v, yearRangeType: 1 };
      }
      if (howOld > 1 && howOld <= 3) {
        return { ...v, yearRangeType: 2 };
      }
      if (howOld > 3 && howOld <= 5) {
        return { ...v, yearRangeType: 3 };
      }
      if (howOld > 5 && howOld <= 10) {
        return { ...v, yearRangeType: 4 };
      }
      return { ...v, yearRangeType: 5 };
    });
    return products.filter((v, i) => {
      return yearRange.includes(v.yearRangeType); //每項產品只有一個分類
    });
  };

  //賣家評價篩選
  const getSellerRatings = (usedProductsArray, ratings) => {
    return usedProductsArray.filter((v, i) => {
      return ratings.includes(Math.floor(v.rating));
    });
  };

  //排序
  const handleSort = (usedProductsArray, sortBy) => {
    let newProducts = [...usedProductsArray];

    // 以價格排序-由少至多
    if (sortBy == '1') {
      newProducts = [...usedProductsArray].sort((a, b) => a.price - b.price);
    }

    if (sortBy == '2') {
      newProducts = [...usedProductsArray].sort((a, b) => b.price - a.price);
    }
    //舊＝>新
    if (sortBy == '3') {
      newProducts = [...usedProductsArray].sort(
        (a, b) => a.bought_in - b.bought_in
      );
    }
    if (sortBy == '4') {
      newProducts = [...usedProductsArray].sort(
        (a, b) => b.bought_in - a.bought_in
      );
    }
    // 預設用id 小至大
    if (sortBy === '' && usedProductsArray.length > 0) {
      newProducts = [...usedProductsArray].sort((a, b) => a.id - b.id);
    }

    return newProducts;
  };

  useEffect(() => {
    let newUsedProductsArray = [...usedProducts];

    if (cats.length > 0) {
      newUsedProductsArray = getCatUsedProducts(newUsedProductsArray, cats);
    }
    if (from !== '' || to !== '') {
      newUsedProductsArray = getUsedProductsPriceRange(
        newUsedProductsArray,
        from,
        to
      );
    }
    if (years.length !== 0) {
      newUsedProductsArray = getUsedProductsYearRange(
        newUsedProductsArray,
        years
      );
    }

    if (ratings.length !== 0) {
      newUsedProductsArray = getSellerRatings(newUsedProductsArray, ratings);
    }
    if (sort !== '') {
      newUsedProductsArray = handleSort(newUsedProductsArray, sort);
    }

    // 拆分頁
    //  _.chunk([1,2,3,4], 2) => [[1,2],[3,4]]
    const pageArray = _.chunk(newUsedProductsArray, perPage);
    if (pageArray.length > 0) {
      setUsedProductsDisplay(pageArray);
      setPageTotal(pageArray.length);
    } else {
      setUsedProductsDisplay([]);
      setPageTotal(0);
    }
  }, [usedProducts, cats, from, to, years, ratings, sort]);
  return (
    <>
      <div className="bg-orange used-product pb-4">
        <div className="container">
          <BreadCrumb />
          <h3 className="mb-md-5 mb-2 mt-md-0 mt-2 text-info-dark">二手專區</h3>
          <div className="d-flex justify-content-between border-0">
            <div className="col-2 d-none d-lg-block text-info">
              <h5 className="text-info">條件設定</h5>
              <hr className="simple" />
              <div
                className="accordion accordion-flush text-info"
                id="accordionPanelsStayOpenExample"
              >
                <div className="accordion-item text-info">
                  <h2
                    className="accordion-header"
                    id="panelsStayOpen-headingOne"
                  >
                    <button
                      className="accordion-button collapsed bg-orange ps-0"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseOne"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseOne"
                    >
                      分類
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseOne"
                    className="accordion-collapse collapse text-info"
                    aria-labelledby="panelsStayOpen-headingOne"
                  >
                    <div className="accordion-body bg-orange ps-0">
                      {catOptions.map((v, i) => {
                        return (
                          <div className="form-check text-info" key={i}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={v}
                              id="flexCheckDefault"
                              checked={cats.includes(v)}
                              onChange={(e) => {
                                const value = Number(e.target.value);
                                if (cats.includes(value)) {
                                  setCats(
                                    cats.filter((v2, i2) => {
                                      return v2 !== value;
                                    })
                                  );
                                } else {
                                  setCats([...cats, value]);
                                }
                              }}
                            />

                            <label
                              className="form-check-label fs-sml"
                              htmlFor="flexCheckDefault"
                            >
                              {catText[v - 1]}
                              {/* （ {v.category_product=} ） */}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="accordion-item text-info">
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
                    className="accordion-collapse collapse text-info"
                    aria-labelledby="panelsStayOpen-headingTwo"
                  >
                    <div className="accordion-body bg-orange ps-0">
                      <div className="d-flex pb-2 align-items-center">
                        <h6 className="px-1 text-primary-200 mb-0 fs-sml">$</h6>
                        <input
                          className="w-100 fs-sml"
                          type="number"
                          name="points"
                          min="0"
                          max="10"
                          value={from}
                          placeholder="From"
                          onChange={(e) => {
                            setFrom(e.target.value);
                          }}
                        />
                      </div>
                      <div className="d-flex pb-2 align-items-center">
                        <h6 className="px-1 text-primary-200 mb-0 fs-sml">$</h6>
                        <input
                          className="w-100 fs-sml"
                          type="number"
                          name="points"
                          min="0"
                          max="10"
                          value={to}
                          placeholder="To"
                          onChange={(e) => {
                            setTo(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item text-info">
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
                      使用年份
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseThree"
                    className="accordion-collapse collapse text-info"
                    aria-labelledby="panelsStayOpen-headingThree"
                  >
                    <div className="accordion-body bg-orange ps-0">
                      {yearOptions.map((v, i) => {
                        return (
                          <div className="form-check" key={i}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={v}
                              id="flexCheckDefault"
                              checked={years.includes(v)}
                              onChange={(e) => {
                                const value = Number(e.target.value);
                                if (years.includes(value)) {
                                  setYears(
                                    years.filter((v2, i2) => {
                                      return v2 !== value;
                                    })
                                  );
                                } else {
                                  setYears([...years, value]);
                                }
                              }}
                            />
                            <label
                              className="form-check-label fs-sml"
                              htmlFor="flexCheckDefault"
                            >
                              {yearText[v - 1]}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="accordion-item text-info">
                  <h2
                    className="accordion-header"
                    id="panelsStayOpen-headingFour"
                  >
                    <button
                      className="accordion-button collapsed bg-orange ps-0"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseFour"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseFour"
                    >
                      賣家評價
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseFour"
                    className="accordion-collapse collapse text-info"
                    aria-labelledby="panelsStayOpen-headingFour"
                  >
                    <div className="accordion-body bg-orange ps-0">
                      {ratingsOptions.map((v, i) => {
                        return (
                          <div className="form-check" key={i}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={v}
                              id="flexCheckDefault"
                              checked={ratings.includes(v)}
                              onChange={(e) => {
                                const value = Number(e.target.value);
                                if (ratings.includes(value)) {
                                  setRatings(
                                    ratings.filter((v2, i2) => {
                                      return v2 !== value;
                                    })
                                  );
                                } else {
                                  setRatings([...ratings, value]);
                                }
                              }}
                            />
                            <label
                              className="form-check-label fs-sml"
                              htmlFor="flexCheckDefault"
                            >
                              {ratingsText[i]}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-9">
              <div className="d-flex  mb-md-0">
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
                <div className="d-flex align-items-center">
                  <div className="pe-3 d-none d-md-block">
                    <h6 className="text-info-dark ps-0 col">排序依據</h6>
                  </div>
                  <div>
                    <select
                      className="form-select-xl mb-2 text-gray-300 fs-sml"
                      aria-label="Default select example"
                      onChange={(e) => {
                        setSort(Number(e.target.value));
                      }}
                    >
                      <option value="">精選</option>
                      <option value="1">價格（從低到高）</option>
                      <option value="2">價格（從高到低）</option>
                      <option value="3">購買年份（從舊到新）</option>
                      <option value="4">購買年份（從新到舊）</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* TODO:MODAL */}
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
                        <div className="accordion-item text-info">
                          <h2
                            className="accordion-header"
                            id="panelsStayOpen-headingOne"
                          >
                            <button
                              className="accordion-button collapsed bg-white ps-0"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#panelsStayOpen-collapseOne"
                              aria-expanded="false"
                              aria-controls="panelsStayOpen-collapseOne"
                            >
                              分類
                            </button>
                          </h2>
                          <div
                            id="panelsStayOpen-collapseOne"
                            className="accordion-collapse collapse text-info"
                            aria-labelledby="panelsStayOpen-headingOne"
                          >
                            <div className="accordion-body ps-0">
                              {catOptions.map((v, i) => {
                                return (
                                  <div className="form-check text-info" key={i}>
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      value={v}
                                      id="flexCheckDefault"
                                      checked={cats.includes(v)}
                                      onChange={(e) => {
                                        const value = Number(e.target.value);
                                        if (cats.includes(value)) {
                                          setCats(
                                            cats.filter((v2, i2) => {
                                              return v2 !== value;
                                            })
                                          );
                                        } else {
                                          setCats([...cats, value]);
                                        }
                                      }}
                                    />

                                    <label
                                      className="form-check-label fs-sml"
                                      htmlFor="flexCheckDefault"
                                    >
                                      {catText[v - 1]}
                                      {/* （ {v.category_product=} ） */}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* 價格 */}

                        <div className="accordion-item text-info">
                          <h2
                            className="accordion-header"
                            id="panelsStayOpen-headingTwo"
                          >
                            <button
                              className="accordion-button collapsed bg-white ps-0"
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
                            className="accordion-collapse collapse text-info"
                            aria-labelledby="panelsStayOpen-headingTwo"
                          >
                            <div className="accordion-body ps-0">
                              <div className="d-flex pb-2 align-items-center">
                                <h6 className="px-1 text-primary-200 mb-0 fs-sml">
                                  $
                                </h6>
                                <input
                                  className="w-100 fs-sml"
                                  type="number"
                                  name="points"
                                  min="0"
                                  max="10"
                                  value={from}
                                  placeholder="From"
                                  onChange={(e) => {
                                    setFrom(e.target.value);
                                  }}
                                />
                              </div>
                              <div className="d-flex pb-2 align-items-center">
                                <h6 className="px-1 text-primary-200 mb-0 fs-sml">
                                  $
                                </h6>
                                <input
                                  className="w-100 fs-sml"
                                  type="number"
                                  name="points"
                                  min="0"
                                  max="10"
                                  value={to}
                                  placeholder="To"
                                  onChange={(e) => {
                                    setTo(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/*年份  */}
                        <div className="accordion-item text-info">
                          <h2
                            className="accordion-header"
                            id="panelsStayOpen-headingThree"
                          >
                            <button
                              className="accordion-button collapsed bg-white ps-0"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#panelsStayOpen-collapseThree"
                              aria-expanded="false"
                              aria-controls="panelsStayOpen-collapseThree"
                            >
                              使用年份
                            </button>
                          </h2>
                          <div
                            id="panelsStayOpen-collapseThree"
                            className="accordion-collapse collapse text-info"
                            aria-labelledby="panelsStayOpen-headingThree"
                          >
                            <div className="accordion-body ps-0">
                              {yearOptions.map((v, i) => {
                                return (
                                  <div className="form-check" key={i}>
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      value={v}
                                      id="flexCheckDefault"
                                      checked={years.includes(v)}
                                      onChange={(e) => {
                                        const value = Number(e.target.value);
                                        if (years.includes(value)) {
                                          setYears(
                                            years.filter((v2, i2) => {
                                              return v2 !== value;
                                            })
                                          );
                                        } else {
                                          setYears([...years, value]);
                                        }
                                      }}
                                    />
                                    <label
                                      className="form-check-label fs-sml"
                                      htmlFor="flexCheckDefault"
                                    >
                                      {yearText[v - 1]}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        {/* 賣家評價 */}
                        <div className="accordion-item text-info">
                          <h2
                            className="accordion-header"
                            id="panelsStayOpen-headingFour"
                          >
                            <button
                              className="accordion-button collapsed bg-white ps-0"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#panelsStayOpen-collapseFour"
                              aria-expanded="false"
                              aria-controls="panelsStayOpen-collapseFour"
                            >
                              賣家評價
                            </button>
                          </h2>
                          <div
                            id="panelsStayOpen-collapseFour"
                            className="accordion-collapse collapse text-info"
                            aria-labelledby="panelsStayOpen-headingFour"
                          >
                            <div className="accordion-body ps-0">
                              {ratingsOptions.map((v, i) => {
                                return (
                                  <div className="form-check" key={i}>
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      value={v}
                                      id="flexCheckDefault"
                                      checked={ratings.includes(v)}
                                      onChange={(e) => {
                                        const value = Number(e.target.value);
                                        if (ratings.includes(value)) {
                                          setRatings(
                                            ratings.filter((v2, i2) => {
                                              return v2 !== value;
                                            })
                                          );
                                        } else {
                                          setRatings([...ratings, value]);
                                        }
                                      }}
                                    />
                                    <label
                                      className="form-check-label fs-sml"
                                      htmlFor="flexCheckDefault"
                                    >
                                      {ratingsText[i]}
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
              {/* usedProducts 改為usedProductsDisplay */}
              <UsedProductsList
                usedProducts={
                  pageTotal > 0 ? usedProductsDisplay[pageNow - 1] : []
                }
                getCatUsedProducts={getCatUsedProducts}
                getUsedProductsPriceRange={getUsedProductsPriceRange}
                getUsedProductsYearRange={getUsedProductsYearRange}
                liked={liked}
                setLiked={setLiked}
              />
            </div>
          </div>
          {/* <div className="pagination">
            {Array(pageTotal)
              .fill(1)
              .map((v, i) => {
                return (
                  <a
                    key={i}
                    href="#/"
                    onClick={() => {
                      setPageNow(i + 1);
                    }}
                  >
                    {i + 1}
                  </a>
                );
              })}
          </div> */}
        </div>
      </div>
    </>
  );
}

export default UsedProducts;
