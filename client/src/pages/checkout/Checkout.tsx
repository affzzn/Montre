import { useContext } from "react";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IProduct } from "../../models/interfaces";
import { IShopContext, ShopContext } from "../../contexts/shopContext";
import CartItem from "./CartItem";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { getCartItemCount, getTotalCartAmount, checkout } =
    useContext<IShopContext>(ShopContext);

  const { products } = useGetProducts();
  const navigate = useNavigate();

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
          }
        })}
      </div>
      {totalAmount > 0 ? (
        <div className="checkout">
          <p>Subtotal: ${totalAmount.toFixed(2)}</p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          <button onClick={checkout}>Checkout</button>
        </div>
      ) : (
        <p>Your Cart is Empty</p>
      )}
    </div>
  );
}

export default Checkout;
