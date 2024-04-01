import { IProduct } from "../../models/interfaces";

interface Props {
  product: IProduct;
}

export default function Product(props: Props) {
  const { _id, productName, description, price, stockQuantity, imageURL } =
    props.product;

  return (
    <div className="product">
      <img src={imageURL} alt="" />
      <div className="description">
        <h3>{productName}</h3>
        <p>{description}</p>
        <p>${price}</p>
        <button className="addToCartBttn">Add to Cart</button>
        <div className="stock-quantity">
          {stockQuantity === 0 && <p>Out of Stock</p>}
        </div>
      </div>
    </div>
  );
}
