import { useState } from 'react';

// LocalStorage 設定
export default function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    // 偵測執行環境是否在瀏覽器上 ， 如果不是的話 return 初始值
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      // 將 localStorage 的 key assign 給 item
      const item = window.localStorage.getItem(key);
      // item 為真 將 JSON 字串轉為物件型態
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      // 檢查 value 的原型( prototype ) 是否為函式
      // 是的話將 storedValue 帶入 value 並 assign ， 若否 assign value
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== 'undefined') {
        // 將 key 和 valueToStore(轉為 JSON ) 存入 LocalStorage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
