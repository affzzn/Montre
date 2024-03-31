import { useGetProducts } from "../../hooks/useGetProducts";
import Product from "./Product";

function Shop() {
  const { products } = useGetProducts();

  return (
    <div className="shop">
      <div className="products">
        {products.map((p) => (
          <Product p={p} />
        ))}
      </div>
    </div>
  );
}

export default Shop;
