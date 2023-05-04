import { Link, useLocation } from 'react-router-dom';
import { pathnameLocale } from '../config';

function BreadCrumb(props) {
  const location = useLocation();

  const formatTextLocale = (pathname) => {
    // 將網址分割成陣列，'/product/baby/birth' -> ['','product','baby', 'birth']
    const pathArray = pathname.split('/');

    // 對照 config 轉成中文，to ['','產品','嬰兒', '初生兒']
    const pathArrayLocale = pathArray.map((v, i) => {
      // 空值轉空值
      if (!v) return '';

      // id類的最後結尾params會忽略
      if (Number(v)) return '';

      // 判斷 v 是否在 pathnameLocale 內，在的話回傳 pathnameLocale[v]，不在回傳 v
      return pathnameLocale[v] ? pathnameLocale[v] : v;
    });

    // 轉為bs樣式
    const listArray = pathArrayLocale.map((v, i, array) => {
      // 第一個 與 id類(數字類型)的最後結尾params會忽略, 首頁不需要
      if (i === 0 || v === '') return '';

      // 最後一個的樣式(現在所在的頁面)，加 active
      // 參考 https://getbootstrap.com/docs/5.3/components/breadcrumb/
      if (i === array.length - 1) {
        return (
          <li
            key={i}
            className="breadcrumb-item active text-primary-200"
            aria-current="page"
          >
            {v}
          </li>
        );
      }

      // 其它中間樣式
      // ['','product','baby', 'birth'] -> baby <Link to={pathArray.slice(0, 3).join('/')}> ->  /product/baby
      return (
        <li key={i} className="breadcrumb-item">
          <Link
            to={pathArray.slice(0, i + 1).join('/')}
            className="text-decoration-none text-primary-300"
          >
            {v}
          </Link>
        </li>
      );
    });
    return listArray;
  };

  return (
    <>
      <nav aria-label="breadcrumb" className="py-md-3 py-1">
        <ol className="breadcrumb fs-sml mb-0">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none text-gray-400">
              首頁
            </Link>
          </li>
          {formatTextLocale(location.pathname)}
        </ol>
      </nav>
    </>
  );
}

export default BreadCrumb;
