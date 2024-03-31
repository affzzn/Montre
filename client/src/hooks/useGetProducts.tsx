import { useEffect, useState } from "react";
import axios from "axios";

export function useGetProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await axios.get(
          "http://localhost:3000/product"
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
