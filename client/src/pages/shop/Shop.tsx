import { useGetProducts } from "../../hooks/useGetProducts";
// import Product from "./Product";

function Shop() {
  const { products } = useGetProducts();

  return (
    <div className="shop">
      <div className="products">
        {products.map((p) => (
          <div>
            {p.productName} {p.price}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
