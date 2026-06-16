import { useDispatch } from "react-redux";
import cartAction from "../../../store/actions/cart";

import numberWithCommas from "../../display";
import ProductImage from "../../product-image";
import { getLineTotal, normalizeProduct } from "../../../utils/product";

const CartCard = (props) => {
  const product = normalizeProduct(props.product);
  const { id, image, name } = product;
  const dispatch = useDispatch();

  const clearProduct = () => {
    dispatch(cartAction.removeProduct({ id: id }));
  };

  return (
    <div className="cart-checkout flex-col-not-center">
      <ProductImage link={image} title={name} />
      <div className="flex-column">
        <div className="flex-column">
          <h3 className="fs-400 font-clrs name-tag">{name}</h3>
          <p className="fs-300 font-clrs">{numberWithCommas(getLineTotal(product))}₫</p>
        </div>
        <div className="flex btn-align">
          <button
            className="btn clear-btn border-btn "
            onClick={() => clearProduct()}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
