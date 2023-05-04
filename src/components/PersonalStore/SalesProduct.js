import axios from 'axios';
import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/Authcontext';

import Table from './ProductTable';
import './SellerCenter.scss';

function Myproduct() {
  const { userinfo } = useAuth();
  axios.defaults.withCredentials = true;

  const columns = useMemo(
    () => [
      {
        Header: '商品名稱',
        accessor: 'name',
      },
      {
        Header: '商品圖',
        accessor: (data) => (
          <img
            src={`${process.env.REACT_APP_IMAGE_URL}/images/used/${
              data.img.split(',')[0]
            }`}
            alt=""
          />
        ),
      },
      {
        Header: '價格',
        accessor: 'price',
      },
      {
        Header: '商品數量',
        accessor: 'amount',
      },
      {
        Header: '創建日期',
        accessor: 'created_at',
      },
      {
        Header: '商品狀態',
        accessor: 'valid',
        Cell: (props) => {
          return props.value === 1 ? (
            <button className="btn btn-gray-100" disabled>
              已上架
            </button>
          ) : (
            <button className="btn btn-gray-400" disabled>
              已下架
            </button>
          );
        },
      },
      {
        Header: '操作',
        accessor: (value) => (
          <div>
            <a href={`product/edit/${value.useP_id}`}>
              <button className="btn btn-info">編輯</button>
            </a>
            <button
              className="btn btn-success"
              onClick={() =>
                validChange(value.useP_id, value.valid, userinfo.id)
              }
            >
              {value.valid === 1 ? '下架' : '上架'}
            </button>
            <Link to={`/usedproducts/${value.useP_id}`}>
              <button className="btn btn-warning">預覽</button>
            </Link>
            <button
              data-bs-toggle="modal"
              data-bs-target={`#deleteModal-${value.useP_id}`}
              className="btn btn-danger text-white"
            >
              刪除
            </button>

            {/* delete-Modal */}
            <div
              className="modal fade"
              id={`deleteModal-${value.useP_id}`}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-body p-5 fs-5">{`確定刪除 "${value.name}"`}</div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-primary-300"
                      data-bs-dismiss="modal"
                    >
                      取消
                    </button>
                    <button
                      data-bs-dismiss="modal"
                      className="btn btn-danger text-white"
                      onClick={() => deleteProduct(value.useP_id, userinfo.id)}
                    >
                      刪除
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
    [userinfo]
  );

  const [data, setData] = useState([]);
  // 抓資料
  useEffect(() => {
    try {
      async function AllProduct() {
        const res = await axios.post(
          'http://localhost:3001/api/seller/usedproduct',
          {
            id: userinfo.id,
          }
        );
        setData(res.data);
      }
      AllProduct();
    } catch (e) {
      console.error(e);
    }
  }, [userinfo]);

  // 上下架
  async function validChange(id, valid, user_id) {
    if (valid === 1) {
      valid = 0;
    } else {
      valid = 1;
    }
    const res = await axios.put('http://localhost:3001/api/seller/valid', {
      id,
      valid,
      user_id,
    });
    setData(res.data);
  }

  // 刪除
  async function deleteProduct(id, user_id) {
    const res = await axios.post('http://localhost:3001/api/seller/delete', {
      id,
      user_id,
    });
    setData(res.data);
  }

  return (
    <>
      <div className="my-product my-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fw-bold my-4">{data.length} 件商品</h5>
          <Link to="add">
            <button className="btn btn-primary-300 col-auto">新增商品</button>
          </Link>
        </div>
        {data.length === 0 ? (
          <div className="text-center p-5 fs-4">找不到商品</div>
        ) : (
          <Table columns={columns} data={data} />
        )}
      </div>
    </>
  );
}
export default Myproduct;
