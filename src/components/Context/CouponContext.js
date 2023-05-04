import { createContext, useContext } from 'react';

export const CouponContext = createContext();

export function useBeforeCoupon() {
  return useContext(CouponContext);
}
