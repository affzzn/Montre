import { createContext, useState } from "react";
import { IProduct } from "../models/interfaces";
import { useGetProducts } from "../hooks/useGetProducts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface IShopContext {
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateItemCount: (newAmount: number, itemId: string) => void;
  getCartItemCount: (itemId: string) => number;
  getTotalCartAmount: () => number;
  checkout: () => void;
}

const defaultVal: IShopContext = {
  addToCart: () => null,
  removeFromCart: () => null,
  updateItemCount: () => null,
  getCartItemCount: () => 0,
  getTotalCartAmount: () => 0,
  checkout: () => null,
};

export const ShopContext = createContext<IShopContext>(defaultVal);

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState<{ string: number } | {}>({});

  const { products } = useGetProducts();

  const navigate = useNavigate();

  const getCartItemCount = (itemId: string): number => {
    if (itemId in cartItems) {
      return cartItems[itemId];
    }
    return 0;
  };

  const addToCart = (itemId: string) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId: string) => {
    if (!cartItems[itemId]) return;
    if (cartItems[itemId] === 0) return;

    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateItemCount = (newAmount: number, itemId: string) => {
    if (newAmount < 0) return;

    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const getTotalCartAmount = (): number => {
    // const { products } = useGetProducts();
    let totalAmount = 0;

    for (const i in cartItems) {
      if (cartItems[i] > 0) {
        let itemInfo: IProduct = products.find((p) => p._id === i);

        totalAmount += cartItems[i] * itemInfo.price;
        // return (totalAmount = 100);
      }
    }

    return totalAmount;
  };

  const checkout = async () => {
    const body = { customerID: localStorage.getItem("userID"), cartItems };

    try {
      await axios.post("http://localhost:3000/products/checkout", body);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const contextVal: IShopContext = {
    addToCart,
    removeFromCart,
    updateItemCount,
    getCartItemCount,
    getTotalCartAmount,
    checkout,
  };
  return (
    <ShopContext.Provider value={contextVal}>{children}</ShopContext.Provider>
  );
};
