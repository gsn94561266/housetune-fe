import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Main/main.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';

function NewArrival() {
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

  const [newArrivalObject, setNewArrivalObject] = useState([]);

  useEffect(() => {
    async function GetNewArrival() {
      let res = await axios.get(
        'http://localhost:3001/api/products/newArrival'
      );
      // console.log(res.data);
      setNewArrivalObject(res.data);
    }
    GetNewArrival();
  }, []);
  return (
    <>
      <section className="main container pt-2 pb-md-5 pb-3">
        <div>
          <Slider {...settings}>
            {newArrivalObject.map((v, i) => {
              const img = v.img.split(',');
              return (
                <div
                  className="col-2 d-flex justify-content-center p-2"
                  key={v.prod_id}
                >
                  <a
                    href={`/products/${v.prod_id}`}
                    className="text-decoration-none"
                  >
                    <div className="card shadow-sm">
                      <div className="product-img">
                        <img
                          src={`${process.env.REACT_APP_IMAGE_URL}/images/products/${v.category_name}/${img[0]}`}
                          className="card-img-top object-cover"
                          alt="..."
                        />
                      </div>
                      <div className="card-body text-left">
                        <h5 className="card-title text-info">NT$ {v.price}</h5>
                        <h6 className="card-title text-gray-300 text-truncate mb-0 pb-2">
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
                  </a>
                </div>
              );
            })}
          </Slider>
        </div>
      </section>
    </>
  );
}

export default NewArrival;
