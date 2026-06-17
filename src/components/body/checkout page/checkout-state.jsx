import clsx from "clsx";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import supabase, { isSupabaseConfigured } from "../../../API/supabaseClient";
import cartAction from "../../../store/actions/cart";
import authSelector from "../../../store/selectors/authSelector";
import cartSelector from "../../../store/selectors/cartSelector";
import numberWithCommas from "../../display";
import CartCard from "./cart-card";
import StateOne from "./state-1";
import StateTwo from "./state-2";
import StateThree from "./state-3";
import StateFour from "./state-4";
import { getCartTotals, getLineTotal, normalizeProduct } from "../../../utils/product";

const CheckoutState = () => {
  const [state, setState] = useState(0);
  const [contact, setContact] = useState({
    email: "",
    fullName: "",
    phone: "",
  });
  const [shipping, setShipping] = useState({
    name: "",
    street: "",
    houseNumber: "",
    country: "",
    zipCode: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector(cartSelector.cartProducts);
  const user = useSelector(authSelector.selectUser);
  const isLoggedIn = useSelector(authSelector.selectIsLoggedIn);
  const totals = useMemo(() => getCartTotals(products), [products]);

  const CheckOutState = (params) => {
    window.scrollTo(0, 0);
    setError("");
    if (params === "+" && state < 3 && products.length > 0) {
      setState(state + 1);
    } else if (params === "-" && state > 0) {
      setState(state - 1);
    }
  };

  const SelectState = (s) => {
    if (state > s) {
      setState(s);
    }
  };

  const handleContactChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };

  const handleShippingChange = (event) => {
    const fieldName = {
      "house-number": "houseNumber",
      "zip-code": "zipCode",
    }[event.target.name] || event.target.name;

    setShipping({
      ...shipping,
      [fieldName]: event.target.value,
    });
  };

  const validateCheckout = () => {
    if (!isSupabaseConfigured) {
      return "Supabase is not configured. Orders cannot be created in this demo.";
    }

    if (!isLoggedIn || !user?.id) {
      return "Please log in before placing an order.";
    }

    if (!products.length) {
      return "Your cart is empty.";
    }

    const requiredContact = [contact.email, contact.fullName, contact.phone];
    const requiredShipping = [
      shipping.name,
      shipping.street,
      shipping.houseNumber,
      shipping.country,
      shipping.zipCode,
    ];

    if ([...requiredContact, ...requiredShipping].some((value) => !value.trim())) {
      return "Please complete all required checkout fields.";
    }

    return "";
  };

  const handlePlaceOrder = async () => {
    const validationError = validateCheckout();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const shippingAddress = [
        shipping.houseNumber,
        shipping.street,
        shipping.country,
        shipping.zipCode,
      ]
        .filter(Boolean)
        .join(", ");

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          email: contact.email,
          full_name: contact.fullName,
          phone: contact.phone,
          shipping_address: shippingAddress,
          subtotal: totals.subtotal,
          tax: totals.tax,
          shipping_fee: totals.shippingFee,
          total: totals.total,
          status: "pending",
          payment_status: "pending",
        })
        .select("id")
        .single();

      if (orderError) throw orderError;

      const orderItems = products.map((item) => {
        const product = normalizeProduct(item);
        const quantity = Number(product.amount) || 1;
        const unitPrice = product.price.actual;

        return {
          order_id: order.id,
          product_id: product.id,
          product_name: product.name,
          quantity,
          unit_price: unitPrice,
          line_total: getLineTotal(product),
        };
      });

      const { error: orderItemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (orderItemsError) throw orderItemsError;

      dispatch(cartAction.clearProduct());
      setOrderId(order.id);
    } catch (checkoutError) {
      setError(checkoutError.message || "Unable to place order.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section>
        <div>
          <ul className="flex" id="check-out-bar">
            <li
              className={clsx(
                "fs-300",
                0 <= state && "primary-bg",
                0 <= state && "active-bar",
              )}
              onClick={() => SelectState(0)}
            >
              1
            </li>
            <li
              className={clsx(
                "fs-300",
                1 <= state && "primary-bg",
                1 <= state && "active-bar",
              )}
              onClick={() => SelectState(1)}
            >
              2
            </li>
            <li
              className={clsx(
                "fs-300",
                2 <= state && "primary-bg",
                2 <= state && "active-bar",
              )}
              onClick={() => SelectState(2)}
            >
              3
            </li>
            <li
              className={clsx(
                "fs-300",
                3 <= state && "primary-bg",
                3 <= state && "active-bar",
              )}
              onClick={() => SelectState(3)}
            >
              4
            </li>
          </ul>
        </div>
      </section>
      <div id="checkout-display" className="center">
        {state === 0 ? (
          <StateOne
            CheckOutState={CheckOutState}
            contact={contact}
            onContactChange={handleContactChange}
          />
        ) : state === 1 ? (
          <StateTwo
            CheckOutState={CheckOutState}
            shipping={shipping}
            onShippingChange={handleShippingChange}
          />
        ) : state === 2 ? (
          <StateThree
            CheckOutState={CheckOutState}
            contact={contact}
            shipping={shipping}
            products={products}
            totals={totals}
          />
        ) : (
          <StateFour
            totals={totals}
            error={error}
            isSubmitting={isSubmitting}
            onPlaceOrder={handlePlaceOrder}
            orderId={orderId}
          />
        )}
        <section className="grid border-btn" id="cart-page">
          <h3 className="fs-400 font-clrs">Cart</h3>
          <div className="grid" id="display-item">
            {products.length ? (
              products.map((item) => <CartCard product={item} key={item.id} />)
            ) : (
              <p className="font-clrs">Your cart is empty.</p>
            )}
          </div>
          <div className="flex checkout-cart-total">
            <p>Subtotal:</p>
            <p>{numberWithCommas(totals.subtotal)}₫</p>
          </div>
          <div className="flex checkout-cart-total">
            <p>Tax:</p>
            <p>{numberWithCommas(totals.tax)}₫</p>
          </div>
          <div className="flex checkout-cart-total">
            <p>Shipping:</p>
            <p>{numberWithCommas(totals.shippingFee)}₫</p>
          </div>
          <div className="flex checkout-cart-total">
            <p>Total:</p>
            <p>{numberWithCommas(totals.total)}₫</p>
          </div>
          <div className="grid">
            <Link
              className="font-clrs fs-300 btn border-btn width-btn"
              style={{
                backgroundColor: "transparent",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              to="/cart"
            >
              <strong>Edit Cart</strong>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default CheckoutState;
