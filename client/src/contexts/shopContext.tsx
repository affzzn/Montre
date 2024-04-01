import { createContext } from "react";

interface IShopContext {}

const defaultVal: IShopContext = {};

export const ShopContext = createContext<IShopContext>(defaultVal);

export const ShopContextProvider = ({ children }) => {
  const contextVal: IShopContext = {};
  return (
    <ShopContext.Provider value={contextVal}>{children}</ShopContext.Provider>
  );
};
