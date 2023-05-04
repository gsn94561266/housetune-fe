import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './components/Context/Authcontext';
import { CouponContext } from './components/Context/CouponContext';

// 頁面元件
// layout branch
import NotFound from './components/NotFound';
import Information from './components/Checkout/Information';
import Shipping from './components/Checkout/Shipping';
import Payment from './components/Checkout/Payment';
import Thankyou from './components/Checkout/Thankyou';
// inspiration branch
import Inspiration from './components/Inspiration/Inspiration';
import InspDetail1 from './components/Inspiration/Insp_detail1';
import AddUsedProducts from './components/UsedProducts/AddUsedProducts';
import EditUsedProducts from './components/UsedProducts/EditUsedProducts';

// usedproducts
import UsedProducts from './components/UsedProducts/UsedProducts';
import UsedProductsDetail from './components/UsedProducts/UsedProductsDetail';

// home-page branch
import PersonalStore from './components/PersonalStore/PersonalStore';
import { CategoryContext } from './components/Context/CategoryContext';
import Main from './components/Main';
import Products from './components/Products/Products';
import ProductDetail from './components/Products/ProductsDetail';

// seller-center
import SellerCenter from './components/PersonalStore/SellerCenter';
import SellerMain from './components/PersonalStore/SellerMain';
import SalesProduct from './components/PersonalStore/SalesProduct';
import SalesOrder from './components/PersonalStore/SalesOrder';
import AllOrder from './components/PersonalStore/SalesOrderContent/AllOrder';
import UnPaid from './components/PersonalStore/SalesOrderContent/UnPaid';
import ToShip from './components/PersonalStore/SalesOrderContent/ToShip';
import Completed from './components/PersonalStore/SalesOrderContent/Completed';
import Cancelled from './components/PersonalStore/SalesOrderContent/Cancelled';

// user-page branch
import UserPage from './components/UserPage/UserPage';
import UpdatePassword from './components/UserPage/UpdatePassword';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ForgotPage from './components/Login/ForgotPage';
import ResetPassword from './components/Login/ResetPassword';
import RatingCount from './components/RatingCount';

// 排版元件
import Header from './components/HeaderFooter/Header';
import Footer from './components/HeaderFooter/Footer';

// 匯入 CartProvider
import { CartProvider } from './utils/useCart';

//google登入
import { GoogleContext } from './components/Context/Googlecontext';
import RegisterGoogle from './components/Register/RegisterGoogle';
import GoogleBundle from './components/Register/GoogleBundle';

//聊天室
import Chaticon from './components/Chat/Chaticon';
import Chat from './components/Chat/Chat';
import { ChatContext } from './components/Context/Chatcontext';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3001');

function App() {
  const [googleInfo, setGoogleInfo] = useState({
    email: '',
    name: '',
  });
  const [userinfo, setUserInfo] = useState({
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [chat, setChat] = useState(false);
  const [reciever, setReciever] = useState('官方客服');
  const [recieverId, setRecieverId] = useState(1);
  const [message, setMessage] = useState('');
  const [begin, setBegin] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [room, setRoom] = useState('test123');
  const [otherReciever, setOtherReciever] = useState('');
  const [switchZone, setSwitchZone] = useState(false);
  const [newMessage, setNewMessage] = useState([]);
  const [chatListAccount, setChatListAccount] = useState([]);
  // 商品
  const [categoryProduct, setCategoryProduct] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  axios.defaults.withCredentials = true;
  //重新整理時要一次資料
  useEffect(() => {
    axios.get('http://localhost:3001/api/auth/member').then((res) => {
      setIsLoggedIn(res.data.loggedIn);
      if (res.data.userInfo) {
        setUserInfo(res.data.userInfo);
      }
      // console.log(res.data.userInfo);
    });
  }, []);

  const [couponInfo, setCouponInfo] = useState({});
  const [isUsed, setIsUsed] = useState(false);

  return (
    <GoogleContext.Provider value={{ googleInfo, setGoogleInfo }}>
      <ChatContext.Provider
        value={{
          chat,
          setChat,
          reciever,
          setReciever,
          recieverId,
          setRecieverId,
          message,
          setMessage,
          begin,
          setBegin,
          messageList,
          setMessageList,
          room,
          setRoom,
          otherReciever,
          setOtherReciever,
          switchZone,
          setSwitchZone,
          newMessage,
          setNewMessage,
          chatListAccount,
          setChatListAccount,
        }}
      >
        <CartProvider>
          <AuthContext.Provider
            value={{ userinfo, setUserInfo, isLoggedIn, setIsLoggedIn }}
          >
            <CouponContext.Provider
              value={{ couponInfo, setCouponInfo, isUsed, setIsUsed }}
            >
              <CategoryContext.Provider
                value={{
                  categoryProduct,
                  setCategoryProduct,
                  searchProduct,
                  setSearchProduct,
                }}
              >
                <BrowserRouter>
                  <Header />
                  <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/products" element={<Products />} />
                    <Route
                      path="/products/:prodId"
                      element={<ProductDetail />}
                    />
                    <Route
                      path="/products/category/:categoryRoom"
                      element={<Products />}
                    ></Route>

                    <Route exact path="inspiration">
                      <Route index={true} element={<Inspiration />} />
                      <Route path="detail1" element={<InspDetail1 />} />
                    </Route>

                    {/* used */}
                    <Route path="usedproducts" element={<UsedProducts />} />
                    <Route
                      path="usedproducts/:usedProdId"
                      element={<UsedProductsDetail />}
                    />

                    {/* user */}
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route
                      path="/register/google"
                      element={<RegisterGoogle />}
                    />
                    <Route path="/google/bundle" element={<GoogleBundle />} />
                    <Route path="forgot" element={<ForgotPage />} />
                    <Route path="password/edit" element={<ResetPassword />} />
                    <Route path="register" element={<Register />} />
                    <Route path="user" element={<UserPage />} />
                    <Route path="updatepwd" element={<UpdatePassword />} />

                    {/* ckeckout */}
                    <Route path="cart" element={<Cart />} />
                    <Route
                      path="/cart/checkout/information"
                      element={<Information />}
                    />
                    <Route
                      path="/cart/checkout/shipping"
                      element={<Shipping />}
                    />
                    <Route
                      path="/cart/checkout/payment"
                      element={<Payment />}
                    />
                    <Route
                      path="/cart/checkout/thankyou"
                      element={<Thankyou />}
                    />

                    {/* personal-store */}
                    <Route
                      path=":userAcct"
                      element={<PersonalStore socket={socket} />}
                    />
                    <Route path="seller" element={<SellerCenter />}>
                      <Route index element={<SellerMain />} />
                      <Route path="product" element={<SalesProduct />} />
                      <Route path="order" element={<SalesOrder />}>
                        <Route index element={<AllOrder />} />
                        <Route path="unpaid" element={<UnPaid />} />
                        <Route path="toship" element={<ToShip />} />
                        <Route path="completed" element={<Completed />} />
                        <Route path="cancelled" element={<Cancelled />} />
                      </Route>
                    </Route>
                    <Route
                      path="seller/product/add"
                      element={<AddUsedProducts />}
                    />
                    <Route
                      path="seller/product/edit/:useP_id"
                      element={<EditUsedProducts />}
                    />

                    {/* RatingCount */}
                    <Route path="setrating" element={<RatingCount />} />

                    {/* notfound */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Footer />
                  <Chaticon />
                  <Chat socket={socket} />
                </BrowserRouter>
              </CategoryContext.Provider>
            </CouponContext.Provider>
          </AuthContext.Provider>
        </CartProvider>
      </ChatContext.Provider>
    </GoogleContext.Provider>
  );
}

export default App;
