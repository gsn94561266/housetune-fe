import { Link } from 'react-router-dom';
import BreadCrumb from '../Layout/BreadCrumb';

function UsedProducts() {
  return (
    <>
      <main className="bg-orange product">
        <div className="container">
          <BreadCrumb />
          <h3 className="mb-md-5 mb-2 mt-md-0 mt-2 text-info-dark">所有商品</h3>
          <div className="d-flex justify-content-between border-0">
            {/* 左側條件設定 */}
            <div className="col-2 d-none d-lg-block ">
              <h5 className="text-info">條件設定</h5>
              <hr className="simple" />
              <div className="accordion accordion-flush">
                {/* 分類 */}
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
                      分類
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
                        />
                        <label
                          className="form-check-label fs-sml text-info"
                          htmlFor="InStock"
                        >
                          有庫存(1)
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="OutStock"
                          id="OutStock"
                        />
                        <label
                          className="form-check-label fs-sml text-info"
                          htmlFor="OutStock"
                        >
                          無庫存(1)
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
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* 使用期限 */}
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
                      使用期限
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="panelsStayOpen-headingThree"
                  >
                    <div className="accordion-body bg-orange ps-0">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label text-info fs-sml">
                          所有(10)
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label text-info fs-sml">
                          所有(10)
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label text-info fs-sml">
                          所有(10)
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label text-info fs-sml">
                          所有(10)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 賣家評價 */}
                <div className="accordion-item">
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
                    className="accordion-collapse collapse"
                    aria-labelledby="panelsStayOpen-headingFour"
                  >
                    <div className="accordion-body bg-orange ps-0">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label text-info fs-sml">
                          所有(10)
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label text-info fs-sml">
                          所有(10)
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label text-info fs-sml">
                          所有(10)
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label text-info fs-sml">
                          所有(10)
                        </label>
                      </div>
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
                <div className="col-6 col-md-3 d-flex justify-content-center p-md-3 p-2">
                  <div className="card border border-0 card-shadow position-relative">
                    <div className="product-img">
                      <img
                        style={{ cursor: 'pointer' }}
                        src=""
                        className="card-img-top bg-gray-200 object-cover"
                        alt="..."
                      />
                    </div>
                    <div className="card-body text-left">
                      <div className="d-flex justify-content-between">
                        <h5 className="card-title text-info">NT $ 100</h5>
                        <p>
                          <Link to={'/login'}>
                            <i
                              style={{ cursor: 'pointer' }}
                              className="fa-regular fa-heart text-info"
                            ></i>
                          </Link>
                        </p>
                      </div>
                      <h6 className="card-title text-gray-300">商品名稱</h6>
                      <p className="card-text text-primary-200">僅剩 10 件 !</p>
                      <button
                        className="btn btn-primary-300 fs-sml w-100 d-block d-md-none"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        加入購物車
                      </button>
                    </div>
                    <div className="card-body pt-0 card-btn card-shadow bg-white d-none d-md-block">
                      <button
                        className="btn btn-primary-300 fs-sml w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        加入購物車
                      </button>
                    </div>
                  </div>
                </div>
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
                          />
                          <label
                            className="form-check-label fs-sml text-info"
                            htmlFor="ModalInStock"
                          >
                            有庫存(1)
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="OutStock"
                            id="ModalOutStock"
                          />
                          <label
                            className="form-check-label fs-sml text-info"
                            htmlFor="ModalOutStock"
                          >
                            無庫存(1)
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
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" />
                          <label className="form-check-label text-info fs-sml"></label>
                        </div>
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
                <button className="btn bg-white border-1 border-primary-300 text-primary-300 w-100 fs-sml my-1"></button>
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
                  名稱
                </h1>
                <button
                  type="button"
                  className="btn-close fs-sml"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body border-0 pt-0">
                <h5 className="card-title text-info pb-3">NT $ 100</h5>
                {/* 選擇款式 */}
                <div className="form-floating">
                  <select
                    className="form-select text-gray-400"
                    id="floatingSelect"
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
                {/* 數量、加入購物車 */}
                <div className="row pt-2">
                  <div className="col-5">
                    <div className="form-floating">
                      <select
                        className="form-select text-gray-400"
                        id="floatingSelect"
                      >
                        <option></option>
                        <option value="10" className="text-gray-400">
                          10 +
                        </option>
                      </select>
                      <label htmlFor="floatingSelect" className="label-fs">
                        數量
                      </label>
                    </div>
                  </div>
                  <div className="col-7">
                    <button
                      className="btn btn-cart bg-gray border border-2 border-primary-200 text-primary-300 btn-cart w-100 h-100"
                      // data-bs-toggle="modal"
                      data-bs-target="#MsgModal"
                    >
                      加入購物車
                    </button>
                  </div>
                </div>
                {/* 庫存狀態 */}
                <div className="py-2">
                  <p className="fs-6 text-gray-400 fs-sml mb-0">
                    庫存狀態 :<span className="text-danger"> 已售完</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default UsedProducts;
