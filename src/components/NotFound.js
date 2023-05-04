import { Link } from 'react-router-dom';

function NotFound(props) {
  return (
    <>
      <div className="text-center p-5 m-5">
        <i class="fa-solid fa-link-slash fs-3 p-4 text-primary-300"></i>
        <h4 className="m-0">404</h4>
        <h4 className="p-4">找不到此網頁</h4>
        <Link to={'/'} className="btn btn-primary-300 px-4">
          回首頁
        </Link>
      </div>
    </>
  );
}

export default NotFound;
