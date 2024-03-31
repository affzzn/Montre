import { useGetProducts } from "../../hooks/useGetProducts";

function Shop() {
  const { products } = useGetProducts();

  return (
    <div className="shop">
      <div className="products">{}</div>
    </div>
  );
}

export default Shop;
