import React from 'react';
import { useState } from 'react';
import './userPage.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/Authcontext';

// 頁籤
import UserDatas from './tag-contents/UserDatas';
import Coupons from './tag-contents/Coupons';
import Orders from './tag-contents/Orders';
import TrackList from './tag-contents/TrackList';

function UserPage(props) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const tags = ['個人資訊', '優惠券', '訂單', '追蹤清單'];
  const [selectedTag, setSelectedTag] = useState('個人資訊');

  // 控制點選的頁籤狀態
  function handleChangeTags(e) {
    e.preventDefault();
    let selectName = e.currentTarget.getAttribute('name');
    setSelectedTag(selectName);
  }

  // 根據狀態切換內容
  function changeContent() {
    if (selectedTag === '個人資訊') return <UserDatas />;
    if (selectedTag === '優惠券') return <Coupons />;
    if (selectedTag === '訂單') return <Orders />;
    if (selectedTag === '追蹤清單') return <TrackList />;
  }

  return (
    <>
      {/* 未登入會員 */}
      <div className={isLoggedIn ? 'd-none' : ''}>
        <div className="bg-orange pb-5 text-center py-5 ">
          <i className="fa-solid fa-person-walking-arrow-right text-primary-300 fs-4 mx-2 " />
          <Link
            to="/login"
            className=" link-primary-300 text-decoration-none fw-bolder fs-7 "
          >
            請先登入會員
          </Link>
        </div>
      </div>
      {/* 已登入會員 */}
      <div className={isLoggedIn ? '' : 'd-none'}>
        <div className="bg-orange pb-4">
          <main className="container">
            <section className="login-status">
              <div className="pt-4 pb-3 d-flex justify-content-between justify-content-sm-start"></div>
            </section>
            <section className="top-message">
              <div className="w-100 border border-primary-100 pt-3 pb-1 px-3 text-info ">
                <div className="row px-2">
                  <div className="col-12 col-sm-9 col-md-10">
                    <h4 className="fw-bold ">歡迎成為賣家 !</h4>
                    <div className="d-flex align-items-center">
                      <i className="fa-solid fa-shop mx-2" />
                      <p className="pt-3">開始拍賣囉 !</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center col-12 col-sm-3 col-md-2 pb-2">
                    <button
                      className="btn btn-primary-300 w-100 px-4"
                      onClick={() => {
                        navigate('/seller');
                      }}
                    >
                      個人賣場
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <section className="user-menu border border-top-0 border-primary-100 mt-3">
              {/* 頁籤 */}
              <div className="page-tags">
                <ul className="list-unstyled d-flex">
                  {tags.map((val, index) => {
                    return (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <a
                        key={index}
                        name={val}
                        className={`change-tag text-decoration-none col-3 text-center text-gray-300 py-3 border border-primary-100 bg-gray-100 ${
                          index === 0 ? 'border-start-0 ' : ''
                        } ${index === 3 ? 'border-end-0' : ''} ${
                          selectedTag === val ? 'border-bottom-0 bg-orange' : ''
                        }`}
                        role="button"
                        onClick={handleChangeTags}
                      >
                        <li>{val}</li>
                      </a>
                    );
                  })}
                </ul>
              </div>
              {/* 細節內容 */}
              <div className="container">{changeContent()}</div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

export default UserPage;
