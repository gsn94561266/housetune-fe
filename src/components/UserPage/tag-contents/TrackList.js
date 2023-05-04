import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Context/Authcontext';

// 從user 裡面的 like 撈
function TrackList() {
  const { userinfo } = useAuth();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const [LikedList, setLikedList] = useState([]);
  const [Liked, setLiked] = useState([]);

  useEffect(() => {
    async function getLiked() {
      let res = await axios.post('http://localhost:3001/api/user/liked', {
        id: userinfo.id,
      });
      setLikedList(res.data.likedProduct);
      setLiked(JSON.parse(res.data.liked[0].liked));
    }
    getLiked();
  }, [userinfo, Liked]);
  //刪除
  async function EditLiked(newLike) {
    let likeJson = JSON.stringify(newLike);
    await axios.put('http://localhost:3001/api/user/liked/edit', {
      likeJson,
      id: userinfo.id,
    });
  }
  return (
    <>
      <div className="border border-primary-200 px-3 mb-3">
        <table className="table table-rwd border-primary-100 text-gray-300 border-none">
          <thead className="border-bottom border-primary-100">
            <tr className="text-center text-info">
              <th>收藏商品</th>
            </tr>
          </thead>
          <tbody>
            {LikedList.map((val, index) => {
              return (
                <tr
                  key={val.prod_id}
                  className="row text-center position-relative"
                >
                  {/* RWD 刪除 */}
                  <td className="position-absolute rwd-deleteBtn d-md-none d-block">
                    <button
                      className="btn"
                      onClick={() => {
                        console.log('delete');
                      }}
                    >
                      X
                    </button>
                  </td>
                  <td className="col-sm-3 col-12 justify-content-center">
                    <div className="tdHeight w-75  d-flex flex-column  justify-content-center">
                      {val.prod_id ? (
                        <img
                          className="w-100"
                          src={`${
                            process.env.REACT_APP_IMAGE_URL
                          }/images/products/${val.category_name}/${
                            val.img.split(',')[0]
                          }`}
                          alt="img1"
                        />
                      ) : (
                        <img
                          className="w-100"
                          src={`${
                            process.env.REACT_APP_IMAGE_URL
                          }/images/used/${val.img.split(',')[0]}`}
                          alt="img1"
                        />
                      )}
                    </div>
                  </td>
                  <td className="col-12 col-sm-3">
                    <div className="tdHeight h-100 text-start d-flex align-items-center">
                      <div>
                        <span className="fw-bold">{val.name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="col-12 col-sm-2">
                    <div className="h-100 w-100 d-md-flex text-start justify-content-center align-items-center">
                      <div className="text-gray-200">
                        <span className="fw-bold">價格: NT$</span>
                        {val.price}
                      </div>
                    </div>
                  </td>
                  <td className="col-12 col-sm-2">
                    <div className="h-100 w-100 text-start d-flex flex-column text-center justify-content-evenly">
                      <button
                        className="btn btn-primary-300 btn-rect"
                        onClick={() => {
                          if (val.prod_id) {
                            return navigate(`/products/${val.prod_id}`);
                          } else {
                            return navigate(`/usedproducts/${val.useP_id}`);
                          }
                        }}
                      >
                        顯示更多
                      </button>
                    </div>
                  </td>
                  <td className="col-12 col-sm-2">
                    <div className="h-100 text-start d-none d-md-flex align-items-center justify-content-center">
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <a
                        role="button"
                        onClick={() => {
                          const newLike = Liked.filter((v) => {
                            return v !== val.prod_id && v !== val.useP_id;
                          });

                          EditLiked(newLike);
                        }}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TrackList;
