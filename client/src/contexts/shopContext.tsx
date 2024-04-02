import { createContext, useState } from "react";

interface IShopContext {
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateItemCount: (newAmount: number, itemId: string) => void;
}

const defaultVal: IShopContext = {
  addToCart: () => null,
  removeFromCart: () => null,
  updateItemCount: () => null,
};

export const ShopContext = createContext<IShopContext>(defaultVal);

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState<{ string: number } | {}>({});

  const addToCart = (itemId: string) => {};

  const removeFromCart = (itemId: string) => {};

  const updateItemCount = (newAmount: number, itemId: string) => {};

  const contextVal: IShopContext = {};
  return (
    <ShopContext.Provider value={contextVal}>{children}</ShopContext.Provider>
  );
};
