import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useScrollToTop from "../../../hooks/useScrollToTop";
import cartAction from "../../../store/actions/cart";
import cartSelector from "../../../store/selectors/cartSelector";
import numberWithCommas from "../../display";
import SecondaryText from "../../secondary-text";
import Title from "../../section-title";
import "./body.css";
import CartCard from "./cart-card";
import { getLineTotal } from "../../../utils/product";
const ShoppingCart = () => {
  useScrollToTop();
  const cartList = useSelector(cartSelector.cartProducts);
  let [amount, setAmount] = useState(0);
  const dispatch = useDispatch();
  const countPrice = () => {
    setAmount(
      cartList
        .map(getLineTotal)
        .reduce((prev, curr) => prev + curr, 0),
    );
  };

  const HandleClear = () => {
    dispatch(cartAction.clearProduct());
  };

  useEffect(() => {
    const total = cartList
      .map(getLineTotal)
      .reduce((prev, curr) => prev + curr, 0);
    setAmount(total);
  }, [cartList]);

  return (
    <>
      <main className="primary-body center grid">
        <section className="grid">
          <SecondaryText text="Your Cart" />
          <Title title="Shopping cart" />
          <button
            className="btn priamry-btn fs-300 background-clrs border-btn"
            style={{ "--width": "8rem" }}
            onClick={() => HandleClear()}
          >
            <strong>Clear All</strong>
          </button>
        </section>
        <section className="grid cart-layout">
          <div className="grid cart-items">
            {cartList.length ? (
              cartList.map((item) => (
                <CartCard key={item.id} product={item} count={countPrice} />
              ))
            ) : (
              <div className="empty-cart grid">
                <h3 className="font-clrs">Your cart is empty</h3>
                <p className="font-clrs">Browse products and add your favorites.</p>
                <Link className="btn primary-bg fs-300" to="/product">
                  Shop products
                </Link>
              </div>
            )}
          </div>
          <section className="flex-col-not-center cart-total borderdiv">
            <h3 className="fs-400 font-clrs">Cart Total</h3>
            <div>
              <p className="fs-300 font-clrs">Subtotal:</p>
              <p className="font-clrs">{numberWithCommas(amount)}₫</p>
            </div>
            <div>
              <p className="fs-300 font-clrs">Tax:</p>
              <p className="font-clrs">
                {numberWithCommas((amount * 10) / 100)}₫
              </p>
            </div>
            <div>
              <p className="fs-300 font-clrs">Shipping:</p>
              <p className=" font-clrs">{numberWithCommas(amount ? 25000 : 0)}₫</p>
            </div>
            <div>
              <h4 className="fs-300 font-clrs">Total:</h4>
              <p className="font-clrs">
                {numberWithCommas(
                  amount ? (amount * 10) / 100 + amount + 25000 : 0,
                )}
                ₫
              </p>
            </div>
            <Link
              className="btn primary-bg fs-300 priamry-btn center"
              to="/checkout"
            >
              <strong className="center font-clrs">Check Out</strong>
            </Link>
          </section>
        </section>
      </main>
    </>
  );
};

export default ShoppingCart;
