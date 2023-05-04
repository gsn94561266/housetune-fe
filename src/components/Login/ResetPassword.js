import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/Authcontext';

function ResetPassword() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState({ pwd: '', rePwd: '' });
  const [res, setRes] = useState({
    state: '',
    message: '',
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.pwd !== password.rePwd) {
      alert('密碼輸入不一致，請修正');
      return;
    }

    const pathArray = location.search;
    const token = pathArray.replace('?token=', '');

    try {
      let res = await axios.put(`http://localhost:3001/api/auth/reset`, {
        password,
        token,
      });
      // console.log(res.data.state);
      setRes({
        state: res.data.state,
        message: res.data.message,
      });
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (res.state === 'SUCCESS') {
      alert('密碼重置成功');
      navigate('/login');
    }
  }, [res]);

  return (
    <>
      <main className="pageBG bg-orange py-lg-5 py-4">
        <div className="pageImg">
          <div className="container">
            <form
              action=""
              method=""
              className="formStyle"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <h3 className="title text-center text-info fw-bold">
                  設定新的密碼
                </h3>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-12 col-lg-8">
                  <input
                    required
                    className="form-control"
                    type="password"
                    placeholder="新密碼 (至少6個字元)"
                    maxLength="12"
                    minLength="6"
                    value={password.pwd}
                    onChange={(e) => {
                      setPassword({ ...password, pwd: e.target.value });
                    }}
                  ></input>
                  <input
                    required
                    className="form-control"
                    type="password"
                    placeholder="確認新密碼"
                    maxLength="12"
                    minLength="6"
                    value={password.rePwd}
                    onChange={(e) => {
                      setPassword({ ...password, rePwd: e.target.value });
                    }}
                  ></input>
                  {res.state === 'FAILED' && (
                    <div>
                      <p className="text-danger">{res.message}</p>
                    </div>
                  )}
                  <div className="mt-4 mb-5 d-flex justify-content-center">
                    <button className="btn btn-primary-300 w-100" type="submit">
                      更改密碼
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default ResetPassword;
