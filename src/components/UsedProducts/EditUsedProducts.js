import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import './AddUsedProducts.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../Context/Authcontext';
import { Switch, Modal } from '@douyinfe/semi-ui';

function EditUsedProducts({ setFiles, fid }) {
  const navigate = useNavigate();
  const { userinfo, setUserInfo, isLoggedIn, setIsLoggedIn } = useAuth();
  axios.defaults.withCredentials = true;

  // Infomation
  const [roomCat, setRoomCat] = useState(null);
  const [prodCat, setProdCat] = useState(null);
  const [prodNameLength, setProdNameLength] = useState(0);
  const [descLength, setDescLength] = useState(0);
  const [check1, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(true);
  const [check3, setCheck3] = useState(true);

  const { useP_id } = useParams();
  const [originValue, setOriginValue] = useState({
    img: '',
    imgs: [],
  });

  // edit (從後端取得的資料格式)
  // const [originValue, setOriginValue] = useState({
  //   useP_id: '',
  //   seller_id: '',
  //   img: '',
  //   name: '',
  //   category_room: '',
  //   category_product: '',
  //   description: '',
  //   original_price: '',
  //   price: '',
  //   amount: '',
  //   bought_in: '',
  //   valid: '',
  // });

  // checked判斷
  useEffect(() => {
    if (
      originValue.name &&
      originValue.category_room &&
      originValue.category_product &&
      originValue.description
    ) {
      setCheck1(true);
    } else {
      setCheck1(false);
    }
    if (originValue.original_price && originValue.price && originValue.amount) {
      setCheck2(true);
    } else {
      setCheck2(false);
    }
    if (originValue.bought_in) {
      setCheck3(true);
    } else {
      setCheck3(false);
    }

    if (originValue.name) {
      let length = originValue.name.split('').length;
      setProdNameLength(length);
    }
    if (originValue.description) {
      let length = originValue.description.split('').length;
      setDescLength(length);
    }
  }, [originValue]);

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(
        `http://localhost:3001/usedproduct/edit/${useP_id}`
      );
      console.log('這個使用者這筆訂單的資料', response.data[0]);
      response.data[0].imgs = response.data[0].img.split(',');
      setOriginValue(response.data[0]);
      setFileCount(response.data[0].imgs.length);
      setRoomCat(response.data[0].category_room);
      setProdCat(response.data[0].category_product);
    }
    fetchData();
  }, []);

  function handleChange(e) {
    setOriginValue({ ...originValue, [e.target.name]: e.target.value });
  }

  // FileUpload
  const [fileList, setFileList] = useState('');
  const [fileStored, setFileStored] = useState([]);
  function handUpload(e) {
    let length = e.target.files.length;
    let a = '';
    let b = [];
    for (let i = 0; i < length; i++) {
      a += ' ,';
      a += e.target.files[i].name;
    }
    setFileList(a);
    for (let i = 0; i < length; i++) {
      b.push(e.target.files[i]);
    }
    setFileStored(b);
  }

  // 選擇的檔案
  const [selectedFile, setSelectedFile] = useState([]);
  // 是否有檔案被挑選
  const [isFilePicked, setIsFilePicked] = useState(false);
  // 預覽圖片
  const [preview, setPreview] = useState([]);

  // 當選擇檔案更動時建立預覽圖
  useEffect(() => {
    if (!selectedFile) {
      setPreview('');
      return;
    }

    if (fileStored.length === 0) {
      return;
    }

    const preTmp = [];
    for (let i = 0; i < fileStored.length; i++) {
      preTmp.push(URL.createObjectURL(fileStored[i]));
    }
    setPreview(preTmp);
  }, [fileStored]);

  //
  //

  const [fileCount, setFileCount] = useState(0);

  useEffect(() => {
    setOriginValue({ ...originValue, imgs: fileStored, img: fileList });
    setFileCount(fileStored.length);
  }, [fileStored, fileList]);

  // 手機版發布 toggele
  const [checked, setChecked] = useState(false);
  function switchBtn() {
    setChecked(!checked);
  }

  useEffect(() => {
    if (checked === false) {
      setOriginValue({ ...originValue, valid: 0 });
    } else {
      setOriginValue({ ...originValue, valid: 1 });
    }
  }, [checked]);

  // SubmitBtn for Edit
  async function handleSubmit(e) {
    console.log(originValue);
    e.preventDefault();
    let formData = new FormData();
    formData.append('useP_id', originValue.useP_id);
    formData.append('id', userinfo.id);
    formData.append('img', originValue.img);
    if (originValue.imgs) {
      for (let i = 0; i < originValue.imgs.length; i++) {
        formData.append('imgs', originValue.imgs[i]);
      }
    }
    formData.append('name', originValue.name);
    formData.append('category_room', originValue.category_room);
    formData.append('category_product', originValue.category_product);
    formData.append('description', originValue.description);
    formData.append('original_price', originValue.original_price);
    formData.append('price', originValue.price);
    formData.append('amount', originValue.amount);
    formData.append('bought_in', originValue.bought_in);
    formData.append('valid', originValue.valid);
    let response = await axios.put(
      'http://localhost:3001/usedproduct/edit',
      formData
    );
    // 回到二手商品清單
    // alert(response.data.msg);
    // navigate('/seller/product');
  }

  // 彈出視窗
  const [visible, setVisible] = useState(false);
  function showDialog(e) {
    setVisible(true);
  }
  function handleOK(e) {
    // if (
    //   originValue.name.length &&
    //   originValue.categoryRoom.length &&
    //   originValue.categoryProduct.length &&
    //   originValue.description.length &&
    //   originValue.originalPrice.length &&
    //   originValue.price.length !== 0
    // ) {
    setVisible(false);
    navigate('/seller/product');
    // } else {
    //   setVisible(false);
    // }
  }
  function hadleCancel(e) {
    setVisible(false);
  }
  function handleAfterClose(e) {}
  return (
    <>
      <div className="add-used-products py-1">
        <div className="container">
          <div className="d-flex mt-lg-5">
            {/* side bar */}
            <div className="sidebar d-none d-lg-block left w-20">
              <div className="sidebar_list w-100 bg-white p-3">
                {' '}
                <div>
                  <input
                    type="checkbox"
                    id="basic"
                    name="basic"
                    checked={check1}
                  />
                  <label htmlFor="basic" className="ms-2">
                    基本資訊
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="sales"
                    name="sales"
                    checked={check2}
                  />
                  <label htmlFor="basic" className="ms-2">
                    銷售資訊
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="other"
                    name="other"
                    checked={check3}
                  />
                  <label htmlFor="other" className="ms-2">
                    其他
                  </label>
                </div>
              </div>
            </div>
            {/* form */}
            <form
              action=""
              method=""
              className="formStyle d-lg-block"
              onSubmit={handleSubmit}
            >
              <div className="w-100">
                {/* basicinfo */}
                <div className="infoStyle p-2">
                  <h4 className="d-none d-lg-block text-gray-400 fw-bold m-4">
                    基本資訊
                  </h4>
                  <div className="mobileStyle row mt-lg-5 align-items-center">
                    <div className="col-lg-1"></div>
                    <div className="d-none d-lg-inline col-lg-2 mb-3 dfaic">
                      <label htmlFor="pic">商品圖片</label>
                    </div>
                    <div className="col col-lg-8 d-flex">
                      <div className={originValue.imgs ? 'd-flex' : 'd-none'}>
                        {originValue.imgs.map((img, i) => {
                          return (
                            <div key={i} className="picBox text-center">
                              <img
                                className={
                                  originValue.imgs ? 'img-fluid' : 'd-none'
                                }
                                src={
                                  preview[i]
                                    ? preview[i]
                                    : `${process.env.REACT_APP_IMAGE_URL}/images/used/${img}`
                                }
                                alt=""
                              />
                            </div>
                          );
                        })}
                      </div>
                      {/* mobile fileUpload */}
                      <label className="custom-mobile-upload text-primary-300 d-lg-none">
                        + 新增圖片
                        <input
                          type="file"
                          multiple="multiple"
                          className="form-control"
                          onChange={handUpload}
                        />
                      </label>
                      {/* pad fileUpload */}
                      <div className="padStyle">
                        <label className="d-none d-lg-block custom-file-upload text-primary-300">
                          <i className="fa-regular fa-image mt-2"></i>
                          <h6 className="padText">新增圖片</h6>
                          <div className="padText">({fileCount}/5)</div>
                          <input
                            type="file"
                            multiple="multiple"
                            className="form-control"
                            onChange={handUpload}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mobileStyle row mt-3 mt-lg-5">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-2 mb-3 dfaic">
                      <label htmlFor="name">商品名稱</label>
                    </div>
                    <div className="col col-lg-8 d-flex name">
                      <input
                        type="text"
                        required
                        className="form-control bg-white"
                        placeholder="請輸入商品名稱"
                        maxLength="50"
                        name="name"
                        value={originValue.name ? originValue.name : ''}
                        onChange={(e) => {
                          let content = e.target.value;
                          let length = content.split('').length;
                          setProdNameLength(length);
                          handleChange(e);
                        }}
                      />
                      <div className="textLength form-control dfaic">
                        {prodNameLength}/50
                      </div>
                    </div>
                  </div>
                  <div className="row mt-lg-5">
                    <div className="col-lg-1"></div>
                    <div className="d-none d-lg-inline col-lg-2 mb-3 dfaic">
                      房間分類
                    </div>
                    <div className="d-none d-lg-inline  col col-lg-8">
                      <select
                        name="category_room"
                        required
                        className={
                          'form-control bg-white' +
                          (roomCat === null ? ' text-gray-100' : '')
                        }
                        value={
                          originValue.category_room
                            ? originValue.category_room
                            : ''
                        }
                        onChange={(e) => {
                          setRoomCat(e.target.value);
                          handleChange(e);
                        }}
                      >
                        <option value="" disabled>
                          請選擇房間分類
                        </option>
                        <option value="1">客廳</option>
                        <option value="2">廚房</option>
                        <option value="3">臥室</option>
                        <option value="4">浴室</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mt-lg-5">
                    <div className="d-none d-lg-inline col-lg-1"></div>
                    <div className="d-none d-lg-inline col-lg-2 mb-3 dfaic">
                      商品分類
                    </div>
                    <div className="d-none d-lg-inline col col-lg-8">
                      <select
                        name="category_product"
                        className={
                          'form-control bg-white' +
                          (prodCat === null ? ' text-gray-100' : '')
                        }
                        value={
                          originValue.category_product
                            ? originValue.category_product
                            : ''
                        }
                        onChange={(e) => {
                          setProdCat(e.target.value);
                          handleChange(e);
                        }}
                      >
                        <option value="" disabled>
                          請選擇商品分類
                        </option>
                        <option value="1">沙發</option>
                        <option value="2">椅子</option>
                        <option value="3">桌子</option>
                        <option value="4">儲藏</option>
                        <option value="5">床</option>
                        <option value="6">照明</option>
                        <option value="7">紡織品</option>
                        <option value="8">裝飾</option>
                        <option value="9">廚具</option>
                        <option value="10">浴室用具</option>
                      </select>
                    </div>
                  </div>
                  <div className="mobileStyle row mt-3 mt-lg-5">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-2 mb-3">商品描述</div>
                    <div className="col-lg-8">
                      <textarea
                        rows="6"
                        placeholder="請輸入商品描述"
                        required
                        minLength={10}
                        name="description"
                        value={
                          originValue.description ? originValue.description : ''
                        }
                        onChange={(e) => {
                          let content = e.target.value;
                          let length = content.split('').length;
                          setDescLength(length);
                          handleChange(e);
                        }}
                      ></textarea>
                      <p className="text-end">{descLength}/1000</p>
                    </div>
                  </div>
                </div>
                {/* salesinfo */}
                <div className="infoStyle d-none d-lg-block bg-white mt-5 p-3 ">
                  <h4 className="d-none d-lg-block text-gray-400 fw-bold m-4">
                    銷售資訊
                  </h4>
                  <div className="row mt-lg-5">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-2 mb-3 dfaic">原價(NT$)</div>
                    <div className="col-lg-4 name">
                      <input
                        className="form-control bg-white"
                        type="number"
                        name="original_price"
                        required
                        value={
                          originValue.original_price
                            ? originValue.original_price
                            : ''
                        }
                        min={1}
                        placeholder="請輸入原價"
                        onKeyUp={(e) => {
                          e.target.value = e.target.value.replace(/[^\d]/g, '');
                        }}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mt-3 mt-lg-5">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-2 mb-3 dfaic">售價(NT$)</div>
                    <div className="col-lg-4 name">
                      <input
                        className="form-control bg-white"
                        type="number"
                        name="price"
                        required
                        value={originValue.price ? originValue.price : ''}
                        min={0}
                        placeholder="請輸入售價"
                        onKeyUp={(e) => {
                          e.target.value = e.target.value.replace(/[^\d]/g, '');
                        }}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mt-3 mt-lg-5 mb-4">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-2 mb-3 dfaic">商品數量</div>
                    <div className="col-lg-4">
                      <input
                        className="form-control bg-white"
                        type="number"
                        name="amount"
                        required
                        value={originValue.amount ? originValue.amount : ''}
                        min={0}
                        placeholder="0"
                        onMouseUp={(e) => {
                          handleChange(e);
                        }}
                        onKeyUp={(e) => {
                          e.target.value = e.target.value.replace(/[^\d]/g, '');
                        }}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                {/* other */}
                <div className="infoStyle d-none d-lg-block bg-white mt-5 p-3">
                  <h4 className="d-none d-lg-block text-gray-400 fw-bold m-4">
                    其他
                  </h4>
                  <div className="row mt-lg-5">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-2 mb-3 dfaic">購入年份(西元)</div>
                    <div className="col-lg-4 name">
                      <input
                        className="form-control bg-white"
                        required
                        type="number"
                        name="bought_in"
                        value={
                          originValue.bought_in ? originValue.bought_in : ''
                        }
                        placeholder="1911"
                        min={1911}
                        max={2023}
                        onMouseUp={(e) => {
                          handleChange(e);
                        }}
                        onKeyUp={(e) => {
                          e.target.value = e.target.value.replace(/[^\d]/g, '');
                        }}
                        onChange={(e) => {
                          if (e.target.value.length <= 4) {
                            handleChange(e);
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="row mt-3 mt-lg-4 mb-4">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-2 mb-3 dfaic">是否發布</div>
                    <div className="col-lg-4">
                      <input
                        type="radio"
                        id="Y"
                        name="post"
                        checked={originValue.valid === 1}
                        value={1}
                        onChange={(e) => {
                          setOriginValue({
                            ...originValue,
                            valid: (e.target.value = 1),
                          });
                        }}
                      />
                      <label htmlFor="Y" className="ms-2">
                        是
                      </label>
                      <input
                        type="radio"
                        id="N"
                        name="post"
                        className="ms-3"
                        checked={originValue.valid === 0}
                        value={0}
                        onChange={(e) => {
                          setOriginValue({
                            ...originValue,
                            valid: (e.target.value = 0),
                          });
                        }}
                      />
                      <label htmlFor="N" className="ms-2">
                        否
                      </label>
                    </div>
                  </div>
                </div>
                {/* mobile productinfo */}
                <div className="bg-white d-lg-none w-100 mt-2">
                  <ul className="mobile_info list-unstyled">
                    <div className="row mt-1">
                      <li className="col-7">
                        <i className="fa-solid fa-list-ul"> 房間分類</i>
                      </li>
                      <select
                        name="category_room"
                        className={
                          'bg-white col-5 text-end' +
                          (roomCat === null ? ' text-gray-100' : '')
                        }
                        value={
                          originValue.category_room
                            ? originValue.category_room
                            : ''
                        }
                        onChange={(e) => {
                          setRoomCat(e.target.value);
                          handleChange(e);
                        }}
                      >
                        <option value="" disabled>
                          請選擇分類
                        </option>
                        <option value="1">客廳</option>
                        <option value="2">廚房</option>
                        <option value="3">臥室</option>
                        <option value="4">浴室</option>
                      </select>
                    </div>
                    <div className="row mt-3 mb-3">
                      <li className="col-7">
                        <i className="fa-solid fa-list-ul"> 商品分類</i>
                      </li>
                      <select
                        name="category_product"
                        className={
                          'bg-white col-5 text-end' +
                          (prodCat === null ? ' text-gray-100' : '')
                        }
                        value={
                          originValue.category_product
                            ? originValue.category_product
                            : ''
                        }
                        onChange={(e) => {
                          setProdCat(e.target.value);
                          handleChange(e);
                        }}
                      >
                        <option value="" disabled>
                          請選擇分類
                        </option>
                        <option value="1">沙發</option>
                        <option value="2">椅子</option>
                        <option value="3">桌子</option>
                        <option value="4">儲藏</option>
                        <option value="5">床</option>
                        <option value="6">照明</option>
                        <option value="7">紡織品</option>
                        <option value="8">裝飾</option>
                        <option value="9">廚具</option>
                        <option value="10">浴室用具</option>
                      </select>
                    </div>
                    <div className="row mt-3 mb-3">
                      <li className="col-7">
                        <i className="fa-solid fa-magnifying-glass-dollar">
                          {' '}
                          原價
                        </i>
                      </li>
                      <input
                        className="bg-white col-5 text-end"
                        type="number"
                        name="original_price"
                        value={
                          originValue.original_price
                            ? originValue.original_price
                            : ''
                        }
                        min={0}
                        placeholder="設定"
                        onKeyUp={(e) => {
                          e.target.value = e.target.value.replace(/[^\d]/g, '');
                        }}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="row mt-3 mb-3">
                      <li className="col-7">
                        <i className="fa-solid fa-comment-dollar"> 售價</i>
                      </li>
                      <input
                        className="bg-white col-5 text-end"
                        type="number"
                        name="price"
                        value={originValue.price}
                        min={0}
                        placeholder="設定"
                        onKeyUp={(e) => {
                          e.target.value = e.target.value.replace(/[^\d]/g, '');
                        }}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="row mt-3 mb-3">
                      <li className="col-7">
                        <i className="fa-solid fa-box"> 商品數量</i>
                      </li>
                      <input
                        className="bg-white col-5 text-end"
                        type="number"
                        name="amount"
                        value={originValue.amount}
                        min={0}
                        placeholder="0"
                        onMouseUp={(e) => {}}
                        onKeyUp={(e) => {
                          e.target.value = e.target.value.replace(/[^\d]/g, '');
                        }}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="row mt-3">
                      <li className="col-7">
                        <i className="fa-solid fa-calendar-days"> 購入年份</i>
                      </li>
                      <input
                        className="g-white col-5 text-end"
                        type="number"
                        name="bought_in"
                        value={
                          originValue.bought_in ? originValue.bought_in : ''
                        }
                        placeholder="1911"
                        min={1911}
                        max={2023}
                        onMouseUp={(e) => {}}
                        onKeyUp={(e) => {
                          e.target.value = e.target.value.replace(/[^\d]/g, '');
                        }}
                        onChange={(e) => {
                          if (e.target.value.length <= 4) {
                            handleChange(e);
                          }
                        }}
                      />
                    </div>
                    <div className="row mt-3 justify-content-between">
                      <li className="col-7">
                        <i className="fa-solid fa-arrow-up-from-bracket">
                          {' '}
                          是否發布
                        </i>
                      </li>
                      <Switch
                        className="toggle mx-2"
                        checked={checked}
                        onChange={switchBtn}
                        aria-label="a switch for valid"
                        size="large"
                      ></Switch>
                    </div>
                  </ul>
                </div>
                <div className="mt-lg-5 p-3 d-flex justify-content-center mb-lg-5">
                  <div className="d-none d-lg-block w-80"></div>
                  <div className="row">
                    <div className="col-6">
                      <Link to={'/seller/product'}>
                        <button className="bg-white">取消</button>
                      </Link>
                    </div>
                    <div className="col-6">
                      <button
                        type="submit"
                        className="text-white bg-primary-200"
                        onClick={showDialog}
                      >
                        修改
                      </button>
                      <Modal
                        className="fw-bold"
                        title="Housetune 大聲的說"
                        visible={visible}
                        onOk={handleOK}
                        afterClose={handleAfterClose}
                        onCancel={hadleCancel}
                        closeOnEsc={true}
                        okText={'確定'}
                        okButtonProps={{ type: 'secondary' }}
                      >
                        修改商品成功!!
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditUsedProducts;
