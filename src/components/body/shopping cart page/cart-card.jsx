import { useDispatch } from "react-redux";
import cartAction from "../../../store/actions/cart";

import numberWithCommas from "../../display";
import ProductImage from "../../product-image";
import { normalizeProduct } from "../../../utils/product";

const CartCard = (props) => {
  const product = normalizeProduct(props.product);
  const { id, image, name, amount, price } = product;
  const dispatch = useDispatch();
  const cartAmount = Number(amount) || 1;

  const HandleAmount = (e) => {
    if (e === "-") {
      if (cartAmount === 1) {
        dispatch(cartAction.removeProduct({ id: id }));
      } else {
        dispatch(cartAction.editProduct({ id: id, amount: cartAmount - 1 }));
      }
    } else if (e === "+") {
      dispatch(cartAction.editProduct({ id: id, amount: cartAmount + 1 }));
    }
  };

  const clearProduct = () => {
    dispatch(cartAction.removeProduct({ id: id }));
  };

  return (
    <div className="cart-card flex-col-not-center borderdiv">
      <ProductImage link={image} title={name} />
      <div className="flex-column">
        <h3 className="fs-400 font-clrs name-tag">{name}</h3>
        <div className="flex-column">
          <p className="fs-300 font-clrs">{numberWithCommas(price.actual)}₫</p>
          <div className="flex btn-align">
            <div className="amount-btn flex background-clrs center">
              <button
                className="btn font-clrs background-clrs"
              onClick={() => HandleAmount("-")}
              aria-label="Decrease quantity"
            >
              -
              </button>
              <p className="font-clrs">{cartAmount}</p>
              <button
                className="btn small-circle font-clrs background-clrs"
                onClick={() => {
                  HandleAmount("+");
                }}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              className="btn clear-btn border-btn font-clrs background-clrs"
              onClick={() => clearProduct()}
              aria-label="Remove product"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
