import CheckOutSection from "./checkout-section";
import CheckoutState from "./checkout-state";
import "./body.css";

const CheckOut = () => {
  return (
    <>
      <main className="primary-body center grid">
        <CheckOutSection />
        <CheckoutState />
      </main>
    </>
  );
};

export default CheckOut;
