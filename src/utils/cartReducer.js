// 設定 useCart 裡面的 function

// 初始化資料
export const initialState = {
  items: [],
  isEmpty: true,
  totalItems: 0,
  cartTotal: 0,
};

// const item = {
//   id: '',
//   quantity: 0,
//   name: '',
//   price: 0,
//   color: '',
//   size: '',
// }

/**
 * addItem only, duplicate item is not allow
 * @param  {} state
 * @param  {} action
 */

// addItem 傳入狀態及動作 => 新增一筆至購物車
// action 透過 id 傳送 payload 給 item
const addItem = (state, action) => {
  // 先查看是相同的 id
  const existingItemIndex = state.items.findIndex(
    (item) => item.id === action.payload.id
  );

  // 傳入的數量
  const payloadQuantity = action.payload.quantity;

  // 若已存在 數量+1
  if (existingItemIndex > -1) {
    const item = state.items[existingItemIndex];
    const id = item.id;

    // 若沒有數量 +1 ， 否則加上 payload 裡的數量
    const quantity = payloadQuantity
      ? item.quantity + payloadQuantity
      : item.quantity + 1;

    const action = {
      type: 'UPDATE_ITEM',
      payload: { id, quantity },
    };

    return updateItem(state, action);
  }
  return [...state.items, action.payload];
};

// 移除
const removeItem = (state, action) => {
  return state.items.filter((item) => item.id !== action.payload.id);
};

/**
 * upateItem (ex. quantity, color, name, price...)
 * ex. action = {type="UPDATE_ITEM", payload: {id:1, quantity:1, color:'red'}
 * @param  {} state
 * @param  {} action
 */

const updateItem = (state, action) => {
  const existingItemIndex = state.items.findIndex(
    (item) => item.id === action.payload.id
  );

  if (existingItemIndex > -1) {
    const newState = [...state.items];
    newState[existingItemIndex] = {
      ...newState[existingItemIndex],
      ...action.payload,
    };
    return newState;
  }

  return [...state.items];
};

const plusItemQuantityOnce = (state, action) => {
  const existingItemIndex = state.items.findIndex(
    (item) => item.id === action.payload.id
  );

  if (existingItemIndex > -1) {
    //const newState = [...state.items]
    const item = state.items[existingItemIndex];
    const id = item.id;
    const quantity = item.quantity + 1;

    const action = {
      type: 'UPDATE_ITEM',
      payload: { id, quantity },
    };

    return updateItem(state, action);
  }

  return [...state.items];
};

const minusItemQuantityOnce = (state, action) => {
  const existingItemIndex = state.items.findIndex(
    (item) => item.id === action.payload.id
  );

  if (existingItemIndex > -1) {
    const item = state.items[existingItemIndex];
    const id = item.id;
    const quantity = item.quantity > 1 ? item.quantity - 1 : 1;

    const action = {
      type: 'UPDATE_ITEM',
      payload: { id, quantity },
    };

    return updateItem(state, action);
  }

  return [...state.items];
};

const calculateItemTotals = (items) =>
  items.map((item) => ({
    ...item,
    itemTotal: item.price * item.quantity,
  }));

const calculateTotal = (items) =>
  items.reduce((total, item) => total + item.quantity * item.price, 0);

const calculateTotalItems = (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0);

const generateCartState = (state, items) => {
  const isEmpty = items.length === 0;

  return {
    ...initialState,
    ...state,
    items: calculateItemTotals(items),
    totalItems: calculateTotalItems(items),
    cartTotal: calculateTotal(items),
    isEmpty,
  };
};

// for useReducer init use
export const init = (items) => {
  return generateCartState({}, items);
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return generateCartState(state, addItem(state, action));
    case 'REMOVE_ITEM':
      return generateCartState(state, removeItem(state, action));
    case 'UPDATE_ITEM':
      return generateCartState(state, updateItem(state, action));
    case 'PLUS_ONE':
      return generateCartState(state, plusItemQuantityOnce(state, action));
    case 'MINUS_ONE':
      return generateCartState(state, minusItemQuantityOnce(state, action));
    case 'CLEAR_CART':
      return initialState;
    default:
      throw new Error('No action specified');
  }
};
