import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BreadCrumb from '../Layout/BreadCrumb';
import './UsedProductsDetail.scss';
import NewArrival from '../Layout/NewArrival';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../utils/useCart';
import { Modal, Button } from 'react-bootstrap';

function UsedProductsDetail() {
  const [usedProduct, setUsedProduct] = useState([]);
  const [rating, setRating] = useState([]);
  const { usedProdId } = useParams(); //解構復值寫法 把右邊的useParams存的值（是個物件）交給prodId
  useEffect(() => {
    const seller = usedProduct.map((v) => {
      return v.seller_id;
    })[0];
    async function getUsedProduct() {
      try {
        let res = await axios.get(
          `http://localhost:3001/usedproduct/${usedProdId}`,
          { seller }
        ); //變數名需要和route 裡的變數名一樣
        // console.log('res.data', res.data); //[{…}]陣列裡的物件
        setUsedProduct(res.data);
        setRating(res.data.rating);
      } catch (e) {
        console.error(e);
      }
    }
    getUsedProduct();
  }, []);
  const settings = {
    customPaging: function (index) {
      return (
        <a href="#/">
          {usedProduct.map((v, i) => {
            const imgArray = v.img.split(',');
            return (
              <img
                key={v.useP_id}
                className="object-cover"
                alt=""
                src={`${process.env.REACT_APP_IMAGE_URL}/images/used/${imgArray[index]}`}
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

  return (
    <>
      <div className="used-product">
        <main className="bg-orange">
          {/* 商品資訊 */}
          <section className="container">
            <BreadCrumb></BreadCrumb>
            <div className="row">
              {/* Slider */}
              <div className="col-md-6 product-slider">
                <Slider {...settings}>
                  {usedProduct.map((v, i) => {
                    const img = v.img.split(',');
                    return img.map((v2, i2) => {
                      return (
                        <div
                          key={v.useP_id}
                          className="product-slider-img bg-white"
                        >
                          <img
                            className="object-contain"
                            alt=""
                            src={`${process.env.REACT_APP_IMAGE_URL}/images/used/${v2}`}
                          ></img>
                        </div>
                      );
                    });
                  })}
                </Slider>
              </div>
              {/* 右側內容 */}
              {usedProduct.map((v, i) => {
                return (
                  <div className="col-md-6" key={v.useP_id}>
                    <h3 className="text-info-dark">{v.product_name}</h3>
                    <h6 className="text-info">NT$ {v.price}</h6>
                    <div className="pt-2"></div>
                    {/* 數量、加入購物車 */}
                    <div className="row pt-2">
                      <p className="text-gray-400 col-5">
                        <span className="text-primary-200">
                          數量: {v.amount}
                        </span>
                      </p>
                      <div className="col-7">
                        <button
                          className="btn btn-cart bg-gray border border-2 border-primary-200 text-primary-300 btn-cart w-100 h-100"
                          onClick={() => {
                            addToCart(v);
                          }}
                        >
                          加入購物車
                        </button>
                      </div>
                    </div>
                    {/* 賣家、購入年份：2019  */}
                    <div>
                      <div className="py-2">
                        <p className="fs-6 text-gray-400 fs-sml mb-0">
                          {/* TODO:幾則評論 */}
                          賣家：
                          <Link
                            to={`/${v.account}`}
                            className="text-primary-300 btn-cart col-md-5 col-auto btn-seller"
                          >
                            {v.name}
                          </Link>
                        </p>
                      </div>
                      <div className="py-2">
                        <p className="fs-6 text-gray-400 fs-sml mb-0">
                          購入年份：{v.bought_in}
                        </p>
                      </div>
                    </div>
                    {/* 產品敘述、賣家按鈕 */}
                    <div className="d-flex flex-md-column flex-column-reverse">
                      <div className="py-2 py-md-4">
                        <p className="fs-6 text-gray-400 fs-sml mb-0 pt-1">
                          產品敘述： <br />
                          {v.description}
                        </p>
                      </div>
                      <div className="pt-3 row justify-content-around gx-1 gx-md-0">
                        {/* <Link
                          to={`/${v.account}`}
                          className="btn bg-gray border border-2 border-primary-200 text-primary-300 btn-cart col-md-5 col-auto btn-seller"
                        >
                          前往{v.name}的賣場
                        </Link> */}

                        {/* <Link
                          to=""
                          className="btn bg-gray border border-2 border-primary-200 text-primary-300 btn-cart col-md-5 col-auto btn-seller"
                        >
                          傳送訊息給{v.name}
                        </Link> */}
                      </div>
                    </div>
                    <div className="pt-md-4 pt-3">
                      <p className="text-gray-400 fs-sml">規格尺寸 </p>
                      <p className="text-gray-400 fs-sml">
                        尺寸： 寬 80cm x 高 78cm x 深 73cm
                      </p>
                      <p className="text-gray-400 fs-sml"> 座位高度： 45 cm</p>
                      <p className="text-gray-400 fs-sml">
                        材質： 金屬結構，鋁質椅腳，表面羊毛紡織包覆（90%
                        羊毛，10% 尼龍）
                      </p>
                      <p className="text-gray-400 fs-sml">產地： 挪威</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 二手商品說明 */}
          <section className="container pt-4">
            <div className="row pt-5">
              <p className="col-md-6 text-gray-400 fs-sml">
                <span className="d-block pb-2">二手商品說明：</span>
                Housetune二手專區僅作為媒合平台，幫助有年齡的傢俱們找到更需要他的主人及處理收付款相關事宜，後續出貨問題或實物與描述不符需退換貨等情事，需自行與賣家聯絡，並鼓勵踴躍給予賣家評價，協助Housetuner擁有一個更佳的平台！
              </p>
            </div>
          </section>

          {/* 全新家具slider */}
          <section className="container mt-3 p-2">
            <div className=" bg-md-gray">
              <p className="text-info-dark text-center pt-2">
                不滿意？直接入手高品質全新傢俱！
              </p>
              <NewArrival />
            </div>
          </section>
        </main>
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
    </>
  );
}

export default UsedProductsDetail;
