import { useEffect, useState } from "react";
import axios from "axios";
import { useGetToken } from "./useGetToken";

export function useGetProducts() {
  const [products, setProducts] = useState([]);
  const { headers } = useGetToken();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await axios.get(
          "http://localhost:3000/product",
          { headers }
        );
        setProducts(fetchedProducts.data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return { products };
}
