import { useEffect, useState } from "react";
import axios from "axios";
// import { useGetToken } from "./useGetToken";

export function useGetProducts() {
  const [products, setProducts] = useState([]);
  // const { headers } = useGetToken();

  const fetchProducts = async () => {
    const fetchedProducts = await axios.get("http://localhost:3000/products");
    // setProducts(fetchedProducts.data.products);
    setProducts(fetchedProducts.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products };
}
