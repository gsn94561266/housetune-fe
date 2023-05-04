import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HeaderItems } from './MenuItems';
import axios from 'axios';
import { useAuth } from '../Context/Authcontext';
import { useGoogle } from '../Context/Googlecontext';
import { useCategory } from '../Context/CategoryContext';

import './Layout.scss';

// 購物車數字
import { useCart } from '../../utils/useCart';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCategoryProduct, setSearchProduct } = useCategory();
  //登入登出相關
  const { userinfo, setUserInfo, isLoggedIn, setIsLoggedIn } = useAuth();
  const { googleInfo, setGoogleInfo } = useGoogle();
  async function logout() {
    let response = await axios.post('http://localhost:3001/api/auth/logout');
    alert(response.data.msg);
    setIsLoggedIn(false);
    setUserInfo('');
    setUserInfo({
      id: '',
      account: '',
      name: '',
      phone: '',
      email: '',
      address: '',
      bankcode: '',
      bankaccount: '',
      liked: '',
      cart: '',
      validcoupons: '',
      invalidcoupons: '',
      rating: '',
      createdat: '',
    });
    setGoogleInfo({
      email: '',
      name: '',
    });
    navigate('/');
    setSidebar(false);
  }
  const [userDropdown, setUserDropdown] = useState(false);
  const userMouseEnter = () => {
    setUserDropdown(true);
  };
  const userMouseLeave = () => {
    setUserDropdown(false);
  };
  // 搜尋
  const [data, setData] = useState();
  const [filterData, setFilterData] = useState();
  const [searchWord, setSearchWord] = useState('');
  const [dataDisplay, setDataDisplay] = useState('display');

  useEffect(() => {
    try {
      async function getProduct() {
        let res = await axios.get('http://localhost:3001/api/seller/search');
        setData(res.data);
      }
      getProduct();
    } catch (e) {
      console.error(e);
    }
  }, [filterData]);

  const handleFilter = (e) => {
    setDataDisplay('display');
    const searchWord = e.target.value;
    const newFilter = data.filter((v) => {
      return v.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === '') {
      setFilterData([]);
    } else {
      setFilterData(newFilter);
    }
    setSearchWord(searchWord);
  };

  // -----dropdown-----
  const [dropdown, setDropdown] = useState(false);
  const onMouseEnter = () => {
    setDropdown(true);
  };
  const onMouseLeave = () => {
    setDropdown(false);
  };

  // 購物車
  const { cart } = useCart();

  function Dropdown(index) {
    return (
      <>
        <ul className={dropdown ? 'dropdown-main active' : 'dropdown-main'}>
          {HeaderItems[index].submenu.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className="text-decoration-none text-info-dark d-block p-3 ps-5"
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  // -----hamburger-----
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  useEffect(() => {
    // scroll control
    if (sidebar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [sidebar]);
  function Hamburger() {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center p-4">
          <div className={isLoggedIn ? 'd-none' : ''}>
            <i className="fa-solid fa-user text-primary-300 fs-5 mx-2" />
            <Link
              to="/login"
              className="link-primary-300 text-decoration-none fw-bolder fs-7"
              onClick={() => {
                setSidebar(false);
              }}
            >
              登入
            </Link>
          </div>
          <div className="d-flex">
            <Link
              to="/user"
              className={
                isLoggedIn
                  ? 'link-primary-300 text-decoration-none fw-bolder fs-7'
                  : 'd-none'
              }
              onClick={() => {
                setSidebar(false);
              }}
            >
              <i className="fa-solid fa-user text-primary-300 fs-5 mx-2" />
              {userinfo.name}
            </Link>
            <p
              role="button"
              onClick={logout}
              className={
                isLoggedIn
                  ? 'mx-4 text-primary-300 text-decoration-none fw-bolder fs-7'
                  : 'd-none'
              }
            >
              登出
            </p>
          </div>
          <div className="mx-4" onClick={showSidebar}>
            <i className="fa-solid fa-xmark text-primary-200 fs-7" />
          </div>
        </div>

        <ul>
          {HeaderItems.map((item, index) => {
            return (
              <li key={index} className="list-unstyled py-3">
                <div
                  className="d-flex justify-content-between"
                  onClick={(e) => handleToggle(e, index)}
                >
                  <Link
                    to={item.path}
                    className="text-decoration-none text-info-dark fw-bolder"
                    onClick={() => {
                      if (!item.submenu) {
                        setSidebar(false);
                      }
                    }}
                  >
                    {item.title}
                  </Link>
                  <div className="mx-5">
                    {item.submenu && (
                      <i className="fa-solid fa-angle-down fs-8" />
                    )}
                  </div>
                </div>
                {item.submenu && Accordion(index)}
              </li>
            );
          })}
          <div className="border-top border-gray-100 border-2 hamburger-bottom"></div>
        </ul>
      </>
    );
  }

  // -----accordion-----
  const state = [
    { index: 0, state: false },
    { index: 1, state: false },
    { index: 2, state: false },
    { index: 3, state: false },
    { index: 4, state: false },
  ];
  const [click, setClick] = useState(state);
  const [select, setSelect] = useState([]);
  const handleToggle = (e, index) => {
    let newState = click;
    newState[index].state = !newState[index].state;
    setClick(newState);

    const filtered = click.filter((i) => {
      return i.state === true;
    });
    setSelect(filtered);
  };

  function Accordion(index) {
    return (
      <>
        <ul
          className={
            click[index].state
              ? 'accordion-header active mt-4'
              : 'accordion-header'
          }
        >
          {HeaderItems[index].submenu.map((item, index) => {
            return (
              <li key={index} className="py-4 ps-3 list-unstyled">
                <Link
                  to={item.path}
                  className="text-decoration-none text-info-dark"
                  onClick={() => {
                    setSidebar(false);
                  }}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  // 以下頁面不要顯示 HEADER
  if (
    location.pathname === '/cart/checkout/information' ||
    location.pathname === '/cart/checkout/shipping' ||
    location.pathname === '/cart/checkout/payment' ||
    location.pathname === '/cart/checkout/thankyou' ||
    location.pathname === '/seller' ||
    location.pathname === '/seller/product' ||
    location.pathname === '/seller/rating' ||
    location.pathname === '/seller/order' ||
    location.pathname === '/seller/order/unpaid' ||
    location.pathname === '/seller/order/toship' ||
    location.pathname === '/seller/order/completed' ||
    location.pathname === '/seller/order/cancelled' ||
    location.pathname === '/seller/product/add' ||
    location.pathname.includes('/seller/product/edit/') ||
    location.pathname === '*'
  ) {
    return <></>;
  }

  return (
    <>
      <header className="bg-white">
        <div className="container-lg header-main">
          <div className="d-flex justify-content-between flex-wrap align-items-baseline py-4">
            <div className="d-block d-lg-none">
              <div className="p-2" onClick={showSidebar}>
                <i className="fa-solid fa-bars text-primary-300 fs-3" />
              </div>
              <div
                className={sidebar ? 'hamburger-menu active' : 'hamburger-menu'}
              >
                {Hamburger()}
              </div>
            </div>

            <Link
              to="/"
              onClick={() => {
                setSidebar(false);
              }}
            >
              <img
                src={`${process.env.REACT_APP_IMAGE_URL}/images/logo.png`}
                alt=""
                className="logo-image"
              />
            </Link>

            <div className="col-12 col-md-6 mx-0 order-1 order-md-0 pt-4 pt-md-0 mx-md-3 flex-md-wrap">
              <div className="input-group">
                <input
                  className="form-control py-2"
                  type="search"
                  onChange={handleFilter}
                  placeholder="您在尋找什麼 ?"
                  value={searchWord}
                />
                <button
                  className="btn btn-primary-300 px-3 rounded-end"
                  type="submit"
                  onClick={() => {
                    setSearchProduct(searchWord);
                    setDataDisplay('none');
                    setSearchWord('');
                    navigate('/products');
                  }}
                >
                  <i className="fa-solid fa-magnifying-glass text-light" />
                </button>

                {dataDisplay === 'display' && (
                  <div
                    className={
                      searchWord ? 'data-result position-absolute' : 'd-none'
                    }
                  >
                    {filterData?.map((v, i) => {
                      return (
                        <a
                          href={`/products/${v.prod_id}`}
                          className="d-block text-decoration-none data-item text-gray-400 py-3  px-3 d-flex align-items-center"
                          key={v.prod_id}
                        >
                          <img
                            style={{ cursor: 'pointer' }}
                            src={`${
                              process.env.REACT_APP_IMAGE_URL
                            }/images/products/${v.category_name}/${
                              v.img.split(',')[0]
                            }`}
                            className="bg-gray-200 search-img"
                            alt={`${v.name}`}
                          />
                          <span className="mx-3">{v.name}</span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="d-flex align-items-baseline">
              <div
                className={
                  isLoggedIn ? 'd-none' : 'd-none d-lg-flex align-items-center'
                }
              >
                <i className="fa-solid fa-user text-primary-300 fs-4 mx-2" />
                <Link
                  to="/login"
                  className="link-primary-300 text-decoration-none fw-bolder fs-7"
                >
                  登入
                </Link>
              </div>
              <p
                role="button"
                className="text-primary-300 pb-2 mx-4 d-lg-block d-none fw-bolder fs-7"
                onMouseEnter={userMouseEnter}
                onMouseLeave={userMouseLeave}
              >
                <i
                  className={
                    isLoggedIn
                      ? 'fa-solid fa-user text-primary-300 fs-4 mx-2'
                      : 'd-none'
                  }
                />
                {userinfo.name}
              </p>
              <div
                className={
                  isLoggedIn && userDropdown
                    ? 'rounded user-dropdown active'
                    : 'user-dropdown'
                }
                onMouseEnter={userMouseEnter}
                onMouseLeave={userMouseLeave}
              >
                <Link
                  to="/user"
                  className={
                    isLoggedIn
                      ? 'link-primary-300 text-decoration-none d-lg-block d-none fw-bolder fs-7 px-3 py-2'
                      : 'd-none'
                  }
                >
                  我的帳戶
                </Link>
                <span
                  role="button"
                  className={
                    isLoggedIn
                      ? 'text-primary-300 d-lg-block d-none fw-bolder fs-7 px-3 py-2'
                      : 'd-none'
                  }
                  onClick={logout}
                >
                  登出
                </span>
              </div>
              {/* 這邊還沒登入一樣顯示購物車 */}
              <div className="px-2">
                <Link to="/cart" className="position-relative">
                  <i className="fa-solid fa-cart-shopping text-primary-300 fs-4" />
                  <span
                    className={`${
                      cart.totalItems > 0 ? '' : 'd-none'
                    } cart-amount position-absolute text-decoration-none text-white`}
                  >
                    {cart.totalItems}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <nav className="d-none d-lg-block">
          <ul className="d-flex justify-content-center align-items-center list-unstyled nav-wrapper">
            {HeaderItems.map((item, index) => {
              return (
                <li
                  key={index}
                  className="px-3"
                  onMouseEnter={item.submenu && onMouseEnter}
                  onMouseLeave={item.submenu && onMouseLeave}
                  onClick={() => {
                    setCategoryProduct([]);
                    setSearchProduct('');
                  }}
                >
                  <Link
                    to={item.path}
                    className="nav-link text-info-dark fw-bolder py-3"
                  >
                    {item.title}
                    {item.submenu && (
                      <i className="fa-solid fa-angle-down fs-7 ms-2" />
                    )}
                  </Link>
                  {item.submenu && Dropdown(index)}
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
