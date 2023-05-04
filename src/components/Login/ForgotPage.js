import React, { useState } from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ForgotPage() {
  const { toEmail } = useParams();
  const [templateParams, setTemplateParams] = useState({
    to_name: '',
    link: '<a href="http://localhost:3000/password/edit">變更密碼</a>',
    to_email: toEmail || '',
    reset_link: '<a href="http://localhost:3000/forgot">此</a>',
  });
  const [res, setRes] = useState({ result: '', text: '' });

  const sendEmail = (e) => {
    e.preventDefault();
    (async function getName() {
      let res = await axios.get(
        `http://localhost:3001/api/auth/forgot?toEmail=${templateParams.to_email}`
      );
      if (res.data.data.length > 0) {
        setTemplateParams({
          ...templateParams,
          to_name: res.data.data[0].name,
        });

        emailjs
          .send(
            'service_i4gdgpe',
            'template_ho17oor',
            {
              ...templateParams,
              link: `<a href="http://localhost:3000/password/edit?token=${res.data.token}">變更密碼</a>`,
              to_name: res.data.data[0].name,
            },
            'eDoGYNwaGS951-5ZH'
          )
          .then(
            function (response) {
              // console.log('SUCCESS!', response.status, response.text);
              setRes({
                result: 'SUCCESS',
                text: '您將在幾分鐘後收到一封電子郵件，內有重新設定密碼的步驟說明。',
              });
            },
            function (error) {
              // console.log('FAILED...', error);
              setRes({
                result: 'FAILED',
                text: '讀取資料失敗，請稍後再試一次',
              });
            }
          );
      } else {
        setRes({ result: 'FAILED', text: '您輸入的 Email 沒有查詢到帳號' });
      }
    })();
  };

  return (
    <>
      <main className="pageBG bg-orange py-lg-5 py-4">
        {/* <header className="bg-primary text-center">Header</header> */}
        <div className="pageImg">
          <div className="container">
            <form
              action=""
              method=""
              className="formStyle"
              onSubmit={sendEmail}
            >
              <div className="mb-4">
                <h3 className="title text-center text-info fw-bold">
                  重設您的密碼
                </h3>
              </div>
              {res.result !== 'SUCCESS' && (
                <div className="row d-flex justify-content-start justify-content-lg-center">
                  <div className="col-12 col-lg-8">
                    <h6 className="text-info-dark text-center">
                      系統將會寄發Email給您，請至輸入的信箱內查詢。
                    </h6>
                  </div>
                </div>
              )}
              <div className="row d-flex justify-content-center">
                <div className="col-12 col-lg-8">
                  {res.result !== 'SUCCESS' && (
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Email"
                      value={templateParams.to_email}
                      onChange={(e) => {
                        setTemplateParams({
                          ...templateParams,
                          to_email: e.target.value,
                        });
                      }}
                      required
                    ></input>
                  )}
                  {res.result === 'FAILED' && (
                    <div>
                      <p className="text-danger">{res.text}</p>
                    </div>
                  )}
                  {res.result === 'SUCCESS' && (
                    <div className="border border-gray-100 mb-3 bg-gray pt-2 px-2 rounded shadow-sm">
                      <p className="text-info-dark text-center fw-semibold">
                        {res.text}
                      </p>
                    </div>
                  )}
                  {res.result !== 'SUCCESS' && (
                    <div className="mt-4 mb-3 d-flex justify-content-center">
                      <button
                        className="btn btn-primary-300 w-100"
                        type="submit"
                        value="Send"
                      >
                        取得信件
                      </button>
                    </div>
                  )}
                  <div className="text-center">
                    <Link
                      to="/login"
                      className="text-info fw-semibold text-decoration-none text-center pb-1"
                    >
                      會員登錄
                    </Link>
                    <br />
                    <Link
                      to="/register"
                      className="text-decoration-none fw-semibold text-primary-300 text-center"
                    >
                      點我加入會員
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* <footer className="bg-gray-100 text-center">Footer</footer> */}
      </main>
    </>
  );
}

export default ForgotPage;
