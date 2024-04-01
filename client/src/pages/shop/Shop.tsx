import { useGetProducts } from "../../hooks/useGetProducts";
import Product from "./Product";
import "./Shop.css";

function Shop() {
  const { products } = useGetProducts();

  return (
    <div className="shop">
      <div className="products">
        {products.map((p) => (
          <Product key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default Shop;
