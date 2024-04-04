import { useContext } from "react";
import { IProduct } from "../../models/interfaces";
import { IShopContext, ShopContext } from "../../contexts/shopContext";

interface Props {
  product: IProduct;
}

function cartItem(props: Props) {
  const { _id, imageURL, productName, description, price } = props.product;

  const { addToCart, removeFromCart, updateItemCount, getCartItemCount } =
    useContext<IShopContext>(ShopContext);

  const itemCount = getCartItemCount(_id);

  return (
    <div className="cartItem">
      <img src={imageURL} alt="" />
      <div className="description">
        <h3>{productName}</h3>
        <p>{description}</p>
        <p>Price: ${price}</p>
      </div>
      <div className="countHandler">
        <button onClick={() => removeFromCart(_id)}>-</button>
        <input
          type="number"
          value={itemCount}
          onChange={(event) => updateItemCount(Number(event.target.value), _id)}
        />
        <button onClick={() => addToCart(_id)}>+</button>
      </div>
    </div>
  );
}

export default cartItem;
