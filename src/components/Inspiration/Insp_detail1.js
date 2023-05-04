import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import BreadCrumb from '../Layout/BreadCrumb';

function Insp_detail1() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const [show6, setShow6] = useState(false);
  const [show7, setShow7] = useState(false);
  const [show8, setShow8] = useState(false);
  return (
    <>
      <div className="insp_1">
        <div className="position-relative container pb-5">
          <div>
            <BreadCrumb />
            {/* <p className="crumb text-primary-200">
              <Link
                to="/inspiration"
                className="text-decoration-none text-primary-200"
              >
                佈置靈感
              </Link>
              {'>'}小小冒險家的航海風臥室
            </p> */}
            <h3 className="text-center text-info-dark mt-lg-5 mt-3 title">
              小小冒險家的航海風臥室
            </h3>
            <h6 className="mx-3 text-center my-5 title-description">
              集合印花寢具、兇猛鯊魚毛巾和富有教育意義的遊戲，打造屬於小小探險家的舒適空間，成為啟程探索七大洋之前的完美玩樂天地。
            </h6>
            <div className="content">
              <div className="row">
                <div className="col-lg-9 col-12 mx-auto position-relative">
                  <img
                    className="w-100 d-block mx-auto"
                    src={`${process.env.REACT_APP_IMAGE_URL}/images/insp_details/1.jpeg`}
                    alt="大圖"
                    onMouseLeave={() => {
                      setShow1(false);
                      setShow2(false);
                      setShow3(false);
                    }}
                  />
                  <div
                    className="insp1_btn1 position-absolute"
                    onMouseEnter={() => {
                      setShow1(true);
                      setShow2(false);
                      setShow3(false);
                    }}
                  >
                    <div className="hover-button-out d-flex justify-content-center align-items-center">
                      <div className="hover-button-inner"></div>
                    </div>
                  </div>
                  <div
                    className="insp1_btn2 position-absolute"
                    onMouseEnter={() => {
                      setShow2(true);
                      setShow1(false);
                      setShow3(false);
                    }}
                  >
                    <div className="hover-button-out d-flex justify-content-center align-items-center">
                      <div className="hover-button-inner"></div>
                    </div>
                  </div>
                  <div
                    className="insp1_btn3 position-absolute"
                    onMouseEnter={() => {
                      setShow3(true);
                      setShow1(false);
                      setShow2(false);
                    }}
                  >
                    <div className="hover-button-out d-flex justify-content-center align-items-center">
                      <div className="hover-button-inner"></div>
                    </div>
                  </div>
                  <Link
                    to="/products/193"
                    className={
                      'row w-30 rounded-pill bg-white position-absolute prod1-1 shadow ' +
                      (show1 ? '' : 'd-none')
                    }
                    onMouseEnter={() => {
                      setShow1(true);
                    }}
                  >
                    <div className="col-6 p-0">
                      <img
                        className="w-100 rounded-pill"
                        src={`${process.env.REACT_APP_IMAGE_URL}/images/insp_details/1-1.webp`}
                        alt="1-1商品圖"
                      />
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-center p-0 pe-1">
                      <h6>BLAVINGAD</h6>
                      <h6 className="d-flex justify-content-between">
                        <span>藍鯨填充玩具</span>
                        <span>{'>'}</span>
                      </h6>
                      <h6>$749</h6>
                    </div>
                  </Link>
                  <Link
                    to="/products/194"
                    className={
                      'row w-30 rounded-pill bg-white position-absolute prod1-2 shadow ' +
                      (show2 ? '' : 'd-none')
                    }
                    onMouseEnter={() => {
                      setShow2(true);
                    }}
                  >
                    <div className="col-6 p-0">
                      <img
                        className="w-100 rounded-pill"
                        src={`${process.env.REACT_APP_IMAGE_URL}/images/insp_details/1-2.webp`}
                        alt="1-2商品圖"
                      />
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-center p-0 pe-1">
                      <h6>BLAVINGAD</h6>
                      <h6 className="d-flex justify-content-between">
                        <span>鯨魚單人被套組</span>
                        <span>{'>'}</span>
                      </h6>
                      <h6>$599</h6>
                    </div>
                  </Link>
                  <Link
                    to="/products/195"
                    className={
                      'row w-40 rounded-4 bg-white position-absolute prod1-3 shadow ' +
                      (show3 ? '' : 'd-none')
                    }
                    onMouseEnter={() => {
                      setShow3(true);
                    }}
                  >
                    <div className="col-6 p-0 d-flex justify-content-center">
                      <img
                        className="w-75"
                        src={`${process.env.REACT_APP_IMAGE_URL}/images/insp_details/1-3.webp`}
                        alt="1-3商品圖"
                      />
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-center p-0 pe-1">
                      <h6>KURA</h6>
                      <h6 className="d-flex justify-content-between">
                        <span>松木翻轉式兒童床</span>
                        <span>{'>'}</span>
                      </h6>
                      <h6>$8990</h6>
                    </div>
                  </Link>
                </div>
              </div>
              {/* <svg class="position-absolute svg1" width="972" height="547">
                <a href="https://www.google.com">
                  <path
                    d="M224 222 L250 194 L310 186 L370 194 L379 177 L394 197 L542 203 L475 242 L358 267 L257 264 Z"
                    fill="transparent"
                  />
                </a>
              </svg> */}
              <div className="row">
                <div className="col-lg-9 col-12 d-lg-flex mx-auto justify-content-between mt-5">
                  <div className="card maincard">
                    <div className="position-relative">
                      <img
                        src={`${process.env.REACT_APP_IMAGE_URL}/images/insp_details/2.jpeg`}
                        className="card-img-top"
                        alt="小圖1"
                        onMouseLeave={() => {
                          setShow4(false);
                        }}
                      />
                      <div
                        className="insp1_btn4 position-absolute"
                        onMouseEnter={() => {
                          setShow4(true);
                        }}
                      >
                        <div className="hover-button-out d-flex justify-content-center align-items-center">
                          <div className="hover-button-inner"></div>
                        </div>
                      </div>
                      <Link
                        to="/products/194"
                        className={
                          'row w-75 rounded-pill bg-white position-absolute prod2-1 shadow ' +
                          (show4 ? '' : 'd-none')
                        }
                        onMouseEnter={() => {
                          setShow4(true);
                        }}
                        onMouseLeave={() => {
                          setShow4(false);
                        }}
                      >
                        <div className="col-6 p-0">
                          <img
                            className="w-100 rounded-pill"
                            src={`${process.env.REACT_APP_IMAGE_URL}/images/insp_details/2-1.webp`}
                            alt="2-1商品圖"
                          />
                        </div>
                        <div className="col-6 d-flex flex-column justify-content-center p-0 pe-1">
                          <h6>BLAVINGAD</h6>
                          <h6 className="d-flex justify-content-between">
                            <span>鯨魚單人被套組</span>
                            <span>{'>'}</span>
                          </h6>
                          <h6>$599</h6>
                        </div>
                      </Link>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title text-info-dark fw-bold">
                        與藍鯨共度美好時光
                      </h5>
                      <p className="subtitle text-gray-300">
                        即使是探險家，也需要在冒險一整天後找個地方好好休息。這張以100%純棉製成的被套佈滿藍鯨圖案，成為最好的探險夥伴。​
                      </p>
                    </div>
                  </div>
                  <div className="card maincard mt-lg-0 mt-3">
                    <div className="position-relative">
                      <img
                        src={`${process.env.REACT_APP_IMAGE_URL}/images/insp_details/3.jpeg`}
                        className="card-img-top"
                        alt="小圖2"
                        onMouseLeave={() => {
                          setShow5(false);
                        }}
                      />
                      <div
                        className="insp1_btn5 position-absolute"
                        onMouseEnter={() => {
                          setShow5(true);
                        }}
                      >
                        <div className="hover-button-out d-flex justify-content-center align-items-center">
                          <div className="hover-button-inner"></div>
                        </div>
                      </div>
                      <Link
                        to="/products/196"
                        className={
                          'row w-75 rounded-pill bg-white position-absolute prod3-1 shadow ' +
                          (show5 ? '' : 'd-none')
                        }
                        onMouseEnter={() => {
                          setShow5(true);
                        }}
                        onMouseLeave={() => {
                          setShow5(false);
                        }}
                      >
                        <div className="col-6 p-0">
                          <img
                            className="w-100 rounded-pill"
                            src={`${process.env.REACT_APP_IMAGE_URL}/images/insp_details/3-1.webp`}
                            alt="3-1商品圖"
                          />
                        </div>
                        <div className="col-6 d-flex flex-column justify-content-center p-0 pe-1">
                          <h6>BLAVINGAD</h6>
                          <h6 className="d-flex justify-content-between">
                            <span>海豚填充玩具</span>
                            <span>{'>'}</span>
                          </h6>
                          <h6>$299</h6>
                        </div>
                      </Link>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title text-info-dark fw-bold">
                        鯊魚出沒！
                      </h5>
                      <p className="subtitle text-gray-300">
                        配上鯊魚兜帽的毛巾以100%純棉製成，把沐浴和遊戲時間變成真正的冒險。棉質毛巾布柔軟舒適，吸水力強，是前往海灘探險的必備！​​​
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-9 col d-lg-flex mx-auto justify-content-between mt-5">
                  <div className="card maincard">
                    <div className="position-relative">
                      <img
                        src={`${process.env.REACT_APP_IMAGE_URL}/images/insp_details/4.jpeg`}
                        className="card-img-top"
                        alt="小圖3"
                        onMouseLeave={() => {
                          setShow6(false);
                          setShow7(false);
                          setShow8(false);
                        }}
                      />
                      <div
                        className="insp1_btn6 position-absolute"
                        onMouseEnter={() => {
                          setShow6(true);
                          setShow7(false);
                          setShow8(false);
                        }}
                      >
                        <div className="hover-button-out d-flex justify-content-center align-items-center">
                          <div className="hover-button-inner"></div>
                        </div>
                      </div>
                      <div
                        className="insp1_btn7 position-absolute"
                        onMouseEnter={() => {
                          setShow7(true);
                          setShow6(false);
                          setShow8(false);
                        }}
                      >
                        <div className="hover-button-out d-flex justify-content-center align-items-center">
                          <div className="hover-button-inner"></div>
                        </div>
                      </div>
                      <div
                        className="insp1_btn8 position-absolute"
                        onMouseEnter={() => {
                          setShow8(true);
                          setShow6(false);
                          setShow7(false);
                        }}
                      >
                        <div className="hover-button-out d-flex justify-content-center align-items-center">
                          <div className="hover-button-inner"></div>
                        </div>
                      </div>
                      <Link
                        to="/products/198"
                        className={
                          'row w-75 rounded-4 bg-white position-absolute prod4-2 shadow ' +
                          (show6 ? '' : 'd-none')
                        }
                        onMouseEnter={() => {
                          setShow6(true);
                        }}
                        onMouseLeave={() => {
                          setShow6(false);
                        }}
                      >
                        <div className="col-6 p-0">
                          <img
                            className="w-100 rounded-4"
                            src={`${process.env.REACT_APP_IMAGE_URL}/images/insp_details/4-2.webp`}
                            alt="4-2商品圖"
                          />
                        </div>
                        <div className="col-6 d-flex flex-column justify-content-center p-0 pe-1">
                          <h6>BLAVINGAD</h6>
                          <h6 className="d-flex justify-content-between">
                            <span>章魚填充玩具</span>
                            <span>{'>'}</span>
                          </h6>
                          <h6>$499</h6>
                        </div>
                      </Link>
                      <Link
                        to="/products/197"
                        className={
                          'row w-75 rounded-4 bg-white position-absolute prod4-1 shadow ' +
                          (show7 ? '' : 'd-none')
                        }
                        onMouseEnter={() => {
                          setShow7(true);
                        }}
                        onMouseLeave={() => {
                          setShow7(false);
                        }}
                      >
                        <div className="col-6 p-0">
                          <img
                            className="w-100 rounded-4"
                            src={`${process.env.REACT_APP_IMAGE_URL}/images/insp_details/4-1.webp`}
                            alt="4-1商品圖"
                          />
                        </div>
                        <div className="col-6 d-flex flex-column justify-content-center p-0 pe-1">
                          <h6>BLAVINGAD</h6>
                          <h6 className="d-flex justify-content-between">
                            <span>章魚靠枕套</span>
                            <span>{'>'}</span>
                          </h6>
                          <h6>$249</h6>
                        </div>
                      </Link>
                      <Link
                        to="/products/199"
                        className={
                          'row w-75 rounded-4 bg-white position-absolute prod4-3 shadow ' +
                          (show8 ? '' : 'd-none')
                        }
                        onMouseEnter={() => {
                          setShow8(true);
                        }}
                        onMouseLeave={() => {
                          setShow8(false);
                        }}
                      >
                        <div className="col-6 p-0">
                          <img
                            className="w-100 rounded-4"
                            src={`${process.env.REACT_APP_IMAGE_URL}/images/insp_details/4-3.webp`}
                            alt="4-3商品圖"
                          />
                        </div>
                        <div className="col-6 d-flex flex-column justify-content-center p-0 pe-1">
                          <h6>BLAVINGAD</h6>
                          <h6 className="d-flex justify-content-between">
                            <span>彩色釣魚玩具</span>
                            <span>{'>'}</span>
                          </h6>
                          <h6>$439</h6>
                        </div>
                      </Link>
                    </div>

                    <div className="d-lg-none d-block card-body">
                      <h5 className="card-title text-info-dark fw-bold">
                        環保釣魚課
                      </h5>
                      <p className="subtitle text-gray-300 mt-4">
                        這個遊戲包含兩根釣魚竿和11個不同形狀，孩子要釣起可以回收的廢物，從中學會保持海洋潔淨的重要性！​​​
                      </p>
                    </div>
                  </div>
                  <div
                    className="d-lg-block d-none"
                    style={{ width: 48 + '%' }}
                  >
                    <h5 className="card-title text-info-dark fw-bold">
                      環保釣魚課
                    </h5>
                    <p className="subtitle text-gray-300 mt-4">
                      這個遊戲包含兩根釣魚竿和11個不同形狀，孩子要釣起可以回收的廢物，從中學會保持海洋潔淨的重要性！​​​
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-9 col-12 mx-auto mt-5 text-lg-start text-center">
                  <h5 className="text-info-dark fw-bold">
                    大海是我家--其他點子
                  </h5>
                  <p className="subtitle text-gray-300 mt-4 text-lg-start text-center">
                    從海洋汲取靈感，為幼兒以至青少年塑造奇妙又充滿想像力的空間。​
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-9 col-12 d-lg-flex mx-auto justify-content-start mt-4">
                  <div className="card subcard ">
                    <img
                      src={`${process.env.REACT_APP_IMAGE_URL}/images/02.jpeg`}
                      className="card-img-top"
                      alt="其他主題1"
                    />
                    <div className="card-body bg-gray-300">
                      <h5 className="card-title text-white fw-bold">
                        為小小夢想家而設
                      </h5>
                      <p className="subtitle text-white">
                        以舒適的寢具、可擁抱的柔軟絨毛玩具和夢幻燈具，為孩子創造寫意的空間。
                      </p>
                    </div>
                  </div>
                  <div className="card subcard ms-lg-5 mt-lg-0 mt-5">
                    <img
                      src={`${process.env.REACT_APP_IMAGE_URL}/images/01.jpeg`}
                      className="card-img-top"
                      alt="其他主題2"
                    />
                    <div className="card-body  bg-gray-400">
                      <h5 className="card-title text-white fw-bold">
                        創意樂園
                      </h5>
                      <p className="subtitle text-white">
                        透過填色等創意活動，鼓勵小小藝術家從海洋尋找創作靈感。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button className="btn btn-primary-300 d-block mx-auto mt-5">
                <Link
                  to="/inspiration"
                  className="text-white text-decoration-none"
                >
                  回佈置靈感
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Insp_detail1;
