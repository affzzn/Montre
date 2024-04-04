import { useContext } from "react";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IProduct } from "../../models/interfaces";
import { IShopContext, ShopContext } from "../../contexts/shopContext";
import CartItem from "./CartItem";
import "./Checkout.css";

function Checkout() {
  const { getCartItemCount, getTotalCartAmount } =
    useContext<IShopContext>(ShopContext);

  const { products } = useGetProducts();

  const totalAmount = getTotalCartAmount();
  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {products.map((p: IProduct) => {
          if (getCartItemCount(p._id) > 0) {
            return <CartItem product={p} key={p._id} />;
          } else {
            <h2>Your Cart is Empty</h2>;
          }
        })}
      </div>
      <div className="checkout">
        <p>Subtotal: ${totalAmount}</p>
        <button>Continue Shopping</button>
        <button>Checkout</button>
      </div>
    </div>
  );
}

export default Checkout;
