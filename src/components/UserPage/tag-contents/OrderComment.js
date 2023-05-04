import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactStars from 'react-stars';
import { useAuth } from '../../Context/Authcontext';

import { Fragment } from 'react';

function OrderComment(props) {
  axios.defaults.withCredentials = true;
  const { userinfo } = useAuth();
  const [rating, setRating] = useState([]);

  useEffect(() => {
    async function getRating() {
      let res = await axios.post('http://localhost:3001/api/user/rating', {
        id: userinfo.id,
      });
      setRating(res.data);
    }
    getRating();
  }, [userinfo]);

  const [comment, setCommet] = useState([]);
  const [stars, setStars] = useState([]);

  async function handleSubmit(prodId, index) {
    if (stars === 0) {
      return window.alert('請先輸入星星');
    }
    let userId = userinfo.id;
    let hour = new Date(Date.now()).getHours();
    let minute = new Date(Date.now()).getMinutes();
    let second = new Date(Date.now()).getSeconds();
    let fulltime =
      new Date(Date.now()).getFullYear() +
      '-' +
      (new Date(Date.now()).getMonth() + 1) +
      '-' +
      new Date(Date.now()).getDate() +
      ' ' +
      hour +
      ':' +
      minute +
      ':' +
      second;
    let res = await axios.post('http://localhost:3001/api/user/ordercomment', {
      stars: stars[index],
      comment: comment[index],
      prodId,
      userId,
      fulltime,
    });
    setRating(res.data);
  }

  return (
    <Fragment>
      {props.detail.map((v, i) => {
        let a = [];
        for (let j = 0; j < rating.length; j++) {
          if (v.prod_id === rating[j].product_id) {
            a.push(1);
          }
        }
        return (
          <div key={i}>
            <div className={a.length > 0 ? 'd-none' : 'row align-items-center'}>
              <td className="col-sm-2 col-12 justify-content-center">
                <div className="tdHeight">
                  {v.prod_id < 2001 ? (
                    <img
                      className="w-100"
                      src={`${
                        process.env.REACT_APP_IMAGE_URL
                      }/images/products/${v.categoryR_name}/${
                        String(v.imgs).split(',')[0]
                      }`}
                      alt="img1"
                    />
                  ) : (
                    <img
                      className="w-100"
                      src={`${
                        process.env.REACT_APP_IMAGE_URL
                      }/images/products/used/${String(v.imgs).split(',')[0]}`}
                      alt="img1"
                    />
                  )}
                </div>
              </td>
              <td className="col-12 col-sm-10">
                <div className="tdHeight text-start d-flex flex-column w-100">
                  <p className="fw-bold">{v.name}</p>
                  <div className="text-gray-200">款式 : {v.shape}</div>
                  {/* 評價 */}
                  <div className="stars">
                    <span>評價 : </span>
                    <ReactStars
                      value={stars[i] ? stars[i] : 0}
                      count={5}
                      onChange={(newRating) => {
                        const newStars = [...stars];
                        newStars[i] = newRating;
                        setStars(newStars);
                      }}
                      size={24}
                      color1={'#ced4da'}
                      color2={'#f4d78e'}
                      half={false}
                    />
                  </div>
                  {/* 留言 */}
                  <div className="comment-area">
                    <label className="form-label">留言</label>
                    <textarea
                      value={comment[i] ? comment[i] : ''}
                      className="form-control"
                      rows="2"
                      onChange={(e) => {
                        const newComment = [...comment];
                        newComment[i] = e.target.value;
                        setCommet(newComment);
                      }}
                    ></textarea>
                  </div>
                </div>
              </td>
              {/* 發布按鈕 */}
              <td className="col-12 my-2">
                <div className="save-comment d-sm-flex justify-content-sm-end px-3">
                  <button
                    className="btn btn-primary-300 px-3 col-auto"
                    onClick={() => {
                      handleSubmit(v.prod_id, i);
                    }}
                  >
                    發布
                  </button>
                </div>
              </td>
            </div>

            {/* 購買商品2 */}
            {rating
              .filter((s) => s.product_id === v.prod_id)
              .map((f, i) => {
                return (
                  <div key={i} className="row align-items-center">
                    <td className="col-sm-3 col-12 justify-content-center">
                      <div className="tdHeight d-flex flex-column justify-content-center">
                        {f.product_id < 2001 ? (
                          <img
                            className="w-100"
                            src={`${
                              process.env.REACT_APP_IMAGE_URL
                            }/images/products/${v.categoryR_name}/${
                              String(v.imgs).split(',')[0]
                            }`}
                            alt="img1"
                          />
                        ) : (
                          <img
                            className="w-100"
                            src={`${
                              process.env.REACT_APP_IMAGE_URL
                            }/images/products/used/${
                              String(v.imgs).split(',')[0]
                            }`}
                            alt="img1"
                          />
                        )}
                      </div>
                    </td>

                    <td className="col-9">
                      <div className="tdHeight text-start d-flex flex-column w-100">
                        <p className="fw-bold">{v.name}</p>
                        <div className="text-gray-200">款式 : {v.shape}</div>
                        {/* 評價 */}
                        <div className="stars">
                          <span>評價 : </span>
                          <ReactStars
                            count={5}
                            size={24}
                            color2={'#ffd700'}
                            value={f.stars}
                            half={false}
                            edit={false}
                          />
                        </div>
                        {/* 留言 */}
                        <div className="comment-area">
                          <p>{f.comment}</p>
                        </div>
                      </div>
                    </td>
                    {/* <td>
                      <hr className="py-0" />
                    </td> */}
                  </div>
                );
              })}
          </div>
        );
      })}
    </Fragment>
  );
}

export default OrderComment;
