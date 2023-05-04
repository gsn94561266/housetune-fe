import { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './main.scss';
import NewArrival from '../Layout/NewArrival';
import { useCategory } from '../Context/CategoryContext';

function Main() {
  const { setCategoryProduct } = useCategory();
  // slider設定
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, left: '80px', zIndex: 1 }}
        onClick={onClick}
      />
    );
  }
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, right: '80px', zIndex: 1 }}
        onClick={onClick}
      />
    );
  }
  const settingsBanner = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots) => (
      <div
        style={{
          position: 'absolute',
          bottom: '1px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ul style={{ padding: '0px', margin: '0px' }}>{dots}</ul>
      </div>
    ),
    customPaging: (i) => <div className="slick-paging"></div>,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };
  const settingsCategory = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          className: 'center',
          centerMode: true,
          centerPadding: '80px',
          slidesToShow: 1,
          speed: 500,
          rows: 2,
          slidesPerRow: 1,
          arrows: false,
        },
      },
    ],
  };

  // 首頁slider圖片
  const ImageSlider = [
    `${process.env.REACT_APP_IMAGE_URL}/images/main/house1.webp`,
    `${process.env.REACT_APP_IMAGE_URL}/images/main/house2.jpg`,
    `${process.env.REACT_APP_IMAGE_URL}/images/main/house3.webp`,
    `${process.env.REACT_APP_IMAGE_URL}/images/main/house4.webp`,
  ];

  // 分類變數
  // const CategoryText = [
  //   '房間分類 / Room Category',
  //   '傢俱分類 / Furniture Category',
  // ];
  const RoomCategory = [
    {
      img: `${process.env.REACT_APP_IMAGE_URL}/images/main/room-category1.webp`,
      text: '客廳 / Living room',
      path: '/products/category/1',
    },
    {
      img: `${process.env.REACT_APP_IMAGE_URL}/images/main/room-category2.webp`,
      text: '廚房 / Kitchen',
      path: '/products/category/2',
    },
    {
      img: `${process.env.REACT_APP_IMAGE_URL}/images/main/room-category3.webp`,
      text: '臥室 / Bedroom',
      path: '/products/category/3',
    },
    {
      img: `${process.env.REACT_APP_IMAGE_URL}/images/main/room-category4.webp`,
      text: '浴室 / Bathroom',
      path: '/products/category/4',
    },
  ];
  const FurnitureCategory = [
    {
      img: `${process.env.REACT_APP_IMAGE_URL}/images/main/sofa.webp`,
      text: '沙發 / Sofa',
      path: '/products',
      context: ['1'],
    },
    {
      img: `${process.env.REACT_APP_IMAGE_URL}/images/main/chair.webp`,
      text: '椅子 / Chairs',
      path: '/products',
      context: ['2'],
    },
    {
      img: `${process.env.REACT_APP_IMAGE_URL}/images/main/table.webp`,
      text: '桌子 / Table',
      path: '/products',
      context: ['3'],
    },
    {
      img: `${process.env.REACT_APP_IMAGE_URL}/images/main/cupboard.webp`,
      text: '櫥櫃 / Cupboard',
      path: '/products',
      context: ['4'],
    },
    {
      img: `${process.env.REACT_APP_IMAGE_URL}/images/main/beds.webp`,
      text: '床 / Beds',
      path: '/products',
      context: ['5'],
    },
    {
      img: `${process.env.REACT_APP_IMAGE_URL}/images/main/lighting.webp`,
      text: '燈 / Lighting',
      path: '/products',
      context: ['6'],
    },
    {
      img: `${process.env.REACT_APP_IMAGE_URL}/images/main/textile.webp`,
      text: '紡織 / Textile',
      path: '/products',
      context: ['7'],
    },
    {
      img: `${process.env.REACT_APP_IMAGE_URL}/images/main/decorations.webp`,
      text: '裝飾 / Decorations',
      path: '/products',
      context: ['8'],
    },
    {
      img: `${process.env.REACT_APP_IMAGE_URL}/images/main/Kitchen-Utensils.webp`,
      text: '廚具 / Kitchenware',
      path: '/products',
      context: ['9'],
    },
    {
      img: `${process.env.REACT_APP_IMAGE_URL}/images/main/bathroom.webp`,
      text: '浴室 / Bathroom',
      path: '/products',
      context: ['10'],
    },
  ];
  const [category, setCategory] = useState('房間分類 / Room Category');

  return (
    <>
      <div className="main">
        <Slider {...settingsBanner}>
          {ImageSlider.map((v, i) => {
            return (
              <div key={i} className="d-flex justify-content-center slider">
                <img className="object-cover-main" src={v} alt="#/" />
              </div>
            );
          })}
        </Slider>
        <main className="bg-orange">
          <section className="text-center py-5 d-none d-md-block">
            <h1 className="text-info-dark">
              如果選擇忽略Housetune，那後果可想而知
            </h1>
            <h5 className="text-info">
              這是不可避免的，領悟其中的道理也不是那麼的困難，Housetune改變了我的命運
            </h5>
          </section>

          <section className="container-fluid py-md-5 py-3">
            <div className="d-flex justify-content-center mb-4">
              {category === '房間分類 / Room Category' && (
                <button
                  onClick={() => {
                    setCategory('傢俱分類 / Furniture Category');
                  }}
                  className="text-info-dark border border-0 bg-transparent"
                >
                  房間分類 / Room Category{' '}
                  <i className="fa-solid fa-angle-down fa-2xs"></i>
                </button>
              )}
              {category === '傢俱分類 / Furniture Category' && (
                <button
                  onClick={() => {
                    setCategory('房間分類 / Room Category');
                  }}
                  className="text-info-dark border border-0 bg-transparent"
                >
                  傢俱分類 / Furniture Category{' '}
                  <i className="fa-solid fa-angle-down fa-2xs"></i>
                </button>
              )}
            </div>
            <div className="container">
              <div className="row text-center">
                {category === '房間分類 / Room Category' &&
                  RoomCategory.map((v, i) => {
                    return (
                      <div
                        key={i}
                        className="col d-flex justify-content-center"
                      >
                        <a href={v.path} className="text-decoration-none">
                          <div className="card border border-0 mb-4">
                            <img
                              src={v.img}
                              className="card-img-top"
                              alt="#/"
                            />
                            <div className="card-body card-body-category d-flex align-items-center justify-content-center">
                              <h6 className="card-title text-info mb-0">
                                {v.text}
                              </h6>
                            </div>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                {category === '傢俱分類 / Furniture Category' && (
                  <div className="">
                    <Slider {...settingsCategory}>
                      {FurnitureCategory.map((v, i) => {
                        const { img, text } = v;
                        return (
                          <div
                            key={i}
                            className="d-flex justify-content-center"
                          >
                            <Link
                              to={v.path}
                              className="text-decoration-none"
                              onClick={() => {
                                setCategoryProduct(v.context);
                              }}
                            >
                              <div className="card border border-0 mb-4">
                                <img
                                  src={img}
                                  className="card-img-top"
                                  alt="#/"
                                />
                                <div className="card-body card-body-category d-flex align-items-center justify-content-center">
                                  <h6 className="card-title text-info mb-0">
                                    {text}
                                  </h6>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </Slider>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section>
            <p className="text-info-dark text-center">新品推薦 / New Arrival</p>
            <NewArrival />
          </section>

          <section className="container py-md-5 py-3">
            <p className="text-info-dark text-center">佈置靈感 / Inspiration</p>
            <div className="row">
              <div className="col-md-7">
                <a href="/inspiration">
                  <img
                    className="object-cover"
                    src={`${process.env.REACT_APP_IMAGE_URL}/images/main/TopicExplore.jpeg`}
                    alt="#/"
                  />
                </a>
              </div>
              <div className="col-md-5">
                <p className="text-gray-300 text-md-start text-center mt-md-0 mt-4 explore-text">
                  我們可以很篤定的說，這需要花很多時間來嚴謹地論證。佈置靈感的出現，重寫了人生的意義。羅素講過，無聊，對於道德家來說是一個嚴重的問題，因為人類的罪過半數以上都是源於對它的恐懼。
                  <br />
                  <br />
                  但願各位能從這段話中獲得心靈上的滋長。佈置靈感似乎是一種巧合，但如果我們從一個更大的角度看待問題，這似乎是一種不可避免的事實。
                  <br />
                  <br />
                  總而言之，我們不得不相信，在人類的歷史中，我們總是盡了一切努力想搞懂主題探索。
                </p>
              </div>
            </div>
          </section>

          <section className="container py-md-5 py-2">
            <p className="text-info-dark text-center mb-0">購物流程</p>
            <div>
              <img
                alt="#/"
                src={`${process.env.REACT_APP_IMAGE_URL}/images/main/original_fix.png`}
                className="object-cover"
              />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Main;
