import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BreadCrumb from '../Layout/BreadCrumb';
import './UsedProductsDetail.scss';
import NewArrival from '../Layout/NewArrival';

function UsedProductsDetail() {
  const settings = {
    customPaging: function (i) {
      return (
        <a href="#/">
          <img
            className="object-cover"
            alt=""
            src={`${process.env.REACT_APP_IMAGE_URL}/images/products/Abbon-${
              i + 1
            }.avif`}
          />
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
  return (
    <>
      <div className="used-product-detail">
        <main className="bg-orange">
          {/* 商品資訊 */}
          <section className="container">
            <BreadCrumb></BreadCrumb>
            <div className="row">
              {/* Slider */}
              <div className="col-md-6 product-slider">
                <Slider {...settings}>
                  <div>
                    <img
                      className="object-cover"
                      alt=""
                      src={`${process.env.REACT_APP_IMAGE_URL}/images/products/Abbon-1.avif`}
                    ></img>
                  </div>
                  <div>
                    <img
                      className="object-cover"
                      alt=""
                      src={`${process.env.REACT_APP_IMAGE_URL}/images/products/Abbon-2.avif`}
                    ></img>
                  </div>
                </Slider>
              </div>
              {/* 右側內容 */}
              <div className="col-md-6">
                <h3 className="text-info-dark">2LG 扶手椅</h3>
                <h6 className="text-info">NT$ 12,000</h6>
                <div className="pt-2">
                  <p className="text-gray-400">
                    <span className="text-primary-200">款式: </span>藍色 Blue
                  </p>
                </div>
                {/* 數量、加入購物車 */}
                <div className="row pt-2">
                  <p className="text-gray-400 col-5">
                    <span className="text-primary-200">數量: </span>1
                  </p>
                  <div className="col-7">
                    <button className="btn btn-cart bg-gray border border-2 border-primary-200 text-primary-300 btn-cart w-100 h-100">
                      加入購物車
                    </button>
                  </div>
                </div>
                {/* 賣家、購入年份：2019  */}
                <div>
                  <div className="py-2">
                    <p className="fs-6 text-gray-400 fs-sml mb-0">
                      賣家：abc1234（平均4.5分/10則評論）
                    </p>
                  </div>
                  <div className="py-2">
                    <p className="fs-6 text-gray-400 fs-sml mb-0">
                      購入年份：2019
                    </p>
                  </div>
                </div>
                {/* 產品敘述、賣家按鈕 */}
                <div className="d-flex flex-md-column flex-column-reverse">
                  <div className="py-2 py-md-4">
                    <p className="fs-6 text-gray-400 fs-sml mb-0 pt-1">
                      產品敘述： <br />
                      既然，就我個人來說，沙發對我的意義，不能不說非常重大。領悟其中的道理也不是那麼的困難。把沙發輕鬆帶過，顯然並不適合。沙發似乎是一種巧合，但如果我們從一個更大的角度看待問題，這似乎是一種不可避免的事實。鄧拓告訴我們，古今中外有學問的人，有成就的人，總是十分注意積累的。知識就是積累起來的。我們對什麼事都不應該像“過眼煙雲”。希望各位能用心體會這段話。
                    </p>
                  </div>
                  <div className="pt-3 row justify-content-around gx-1 gx-md-0">
                    <button className="btn bg-gray border border-2 border-primary-200 text-primary-300 btn-cart col-md-5 col-auto btn-seller">
                      前往abc1234的賣場
                    </button>
                    <button className="btn bg-gray border border-2 border-primary-200 text-primary-300 btn-cart col-md-5 col-auto btn-seller">
                      傳送訊息給abc1234
                    </button>
                  </div>
                </div>
                {/* 規格尺寸 */}
                <div className="pt-md-4 pt-3">
                  <p className="text-gray-400 fs-sml">規格尺寸 </p>
                  <p className="text-gray-400 fs-sml">
                    尺寸： 寬 80cm x 高 78cm x 深 73cm
                  </p>
                  <p className="text-gray-400 fs-sml"> 座位高度： 45 cm</p>
                  <p className="text-gray-400 fs-sml">
                    材質： 金屬結構，鋁質椅腳，表面羊毛紡織包覆（90% 羊毛，10%
                    尼龍）
                  </p>
                  <p className="text-gray-400 fs-sml">產地： 挪威</p>
                </div>
              </div>
            </div>
          </section>

          {/* 二手商品說明 */}
          <section className="container pt-4">
            <div className="row">
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
    </>
  );
}

export default UsedProductsDetail;
