import { useContext } from "react";
import { IProduct } from "../../models/interfaces";
import { IShopContext, ShopContext } from "../../contexts/shopContext";

interface Props {
  product: IProduct;
}

export default function Product(props: Props) {
  const { _id, productName, description, price, stockQuantity, imageURL } =
    props.product;

  const { addToCart, getCartItemCount } = useContext<IShopContext>(ShopContext);

  const count = getCartItemCount(_id);
  return (
    <div className="product">
      <img src={imageURL} alt="" />
      <div className="description">
        <h3>{productName}</h3>
        <p>{description}</p>
        <p>${price}</p>
        <button className="addToCartBttn" onClick={() => addToCart(_id)}>
          Add to Cart <>({count})</>
        </button>
        <div className="stock-quantity">
          {stockQuantity === 0 && <p>Out of Stock</p>}
        </div>
      </div>
    </div>
  );
}
