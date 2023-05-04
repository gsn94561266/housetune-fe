import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Main/main.scss';
import { Link } from 'react-router-dom';

function ProductsBrowse({ browse, setBrowse }) {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          className: 'center',
          centerMode: true,
          arrows: false,
          slidesToShow: 2,
          centerPadding: '20px',
        },
      },
    ],
  };
  return (
    <>
      <section className="main container pt-2 pb-md-5 pb-3 px-md-4 bg-gray browse">
        <div className="d-md-flex justify-content-between">
          <p className="text-info-dark p-md-3 mb-2">您最近瀏覽的商品</p>
          <p
            className="fs-sml text-info p-md-3 browse-text mb-2"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setBrowse([]);
            }}
          >
            清除最近瀏覽
          </p>
        </div>
        <div className="mx-2 row">
          {browse.length <= 5 ? (
            browse.map((v, i) => {
              const img = v.img.split(',');
              return (
                <div
                  className="col-auto d-flex justify-content-center p-md-3 p-2"
                  key={v.prod_id}
                >
                  <div className="card border border-0 card-shadow card-browse">
                    <div>
                      <Link to={`/products/${v.prod_id}`}>
                        <img
                          src={`${process.env.REACT_APP_IMAGE_URL}/images/products/${v.categoryR_name}/${img[0]}`}
                          className="card-img-top bg-gray-200 object-cover product-img"
                          alt="..."
                        />
                      </Link>
                    </div>
                    <div className="card-body text-left">
                      <h5 className="card-title text-info">NT $ {v.price}</h5>
                      <h6 className="card-title text-gray-300 text-truncate pb-1 mb-0">
                        {v.name}
                      </h6>
                      {v.amount === 0 ? (
                        <p className="card-text text-danger">已售完</p>
                      ) : (
                        <p className="card-text text-primary-200">
                          僅剩 {v.amount} 件 !
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <Slider {...settings}>
              {browse.map((v, i) => {
                const img = v.img.split(',');
                return (
                  <div
                    className="col-2 d-flex justify-content-center p-md-3 p-2"
                    key={v.prod_id}
                  >
                    <div className="card border border-0 card-shadow">
                      <div>
                        <Link to={`/products/${v.prod_id}`}>
                          <img
                            src={`${process.env.REACT_APP_IMAGE_URL}/images/products/${v.categoryR_name}/${img[0]}`}
                            className="card-img-top bg-gray-200 object-cover product-img"
                            alt="..."
                          />
                        </Link>
                      </div>
                      <div className="card-body text-left">
                        <h5 className="card-title text-info">NT $ {v.price}</h5>
                        <h6 className="card-title text-gray-300 text-truncate pb-1 mb-0">
                          {v.name}
                        </h6>
                        {v.amount === 0 ? (
                          <p className="card-text text-danger">已售完</p>
                        ) : (
                          <p className="card-text text-primary-200">
                            僅剩 {v.amount} 件 !
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          )}
        </div>
      </section>
    </>
  );
}

export default ProductsBrowse;
