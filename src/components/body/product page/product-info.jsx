import SecondaryText from "../../secondary-text";
import Heart from "../../../asset/icons8-heart-50.png";
import FillHeart from "../../../asset/icons8-heart-filled-50 .png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import cartAction from "../../../store/actions/cart";
import numberWithCommas from "../../display";
import ProductImage from "../../product-image";
import { normalizeProduct } from "../../../utils/product";

const ProductInfo = (props) => {
  const [isFav, setFav] = useState(false);
  const [amount, setAmount] = useState(1);
  const product = normalizeProduct(props.product);
  const { price, name, image, category, id, description } = product;
  const dispatch = useDispatch();

  const amountController = (param) => {
    if (param === "-" && amount > 1) {
      setAmount(amount - 1);
    }
    if (param === "+") {
      setAmount(amount + 1);
    }
  };

  const addItemToCart = () => {
    dispatch(
      cartAction.addProduct({
        ...product,
        id: id,
        name: name,
        amount: amount,
        price: price,
      }),
    );
  };
  return (
    <section className="product-detail">
      <div className="product-detail-media">
        <ProductImage link={image} title={name} />
      </div>
      <div className="product-detail-copy grid">
        <SecondaryText text="Selling Fast" />
        <h2 className="font-clrs fs-700">{name}</h2>
        <p className="font-clrs product-detail-description">{description}</p>
        <div className="product-detail-meta">
          <span className="tag yellow-tag">{category}</span>
          <span className="font-clrs">
            <span className="low-opacity">SKU: </span>
            {id}
          </span>
        </div>
        <div className="flex product-card-info-pricetag product-detail-price">
          {price.old ? (
            <p className="old-price fs-300 font-clrs">
              {numberWithCommas(price.old)}₫
            </p>
          ) : null}
          <p className="fs-400 font-clrs">{numberWithCommas(price.actual)}₫</p>
        </div>
        <div className="flex" id="product-navigation">
          <div className="amount-btn flex background-clrs center">
            <button
              className="btn font-clrs image-cover-clrs"
              onClick={() => amountController("-")}
            >
              -
            </button>
            <p className="font-clrs">{amount}</p>
            <button
              className="btn font-clrs image-cover-clrs"
              onClick={() => amountController("+")}
            >
              +
            </button>
          </div>
          <button
            className="btn primary-bg fs-300 priamry-btn"
            onClick={addItemToCart}
          >
            <strong>Add to Cart</strong>
          </button>
          <button
            className="btn left-right-nav image-cover-clrs img-btn"
            onClick={() => setFav(!isFav)}
          >
            <img src={isFav ? FillHeart : Heart} alt="fav" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;
