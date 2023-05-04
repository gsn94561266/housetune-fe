import { createContext, useContext } from 'react';

export const CategoryContext = createContext();

export function useCategory() {
  return useContext(CategoryContext);
}
