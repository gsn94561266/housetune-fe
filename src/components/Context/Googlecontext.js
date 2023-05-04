import { createContext, useContext } from 'react';

export const GoogleContext = createContext();

export function useGoogle() {
  return useContext(GoogleContext);
}