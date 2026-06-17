const StateFour = (props) => {
  if (props.orderId) {
    return (
      <section className="grid border-btn" id="detail-page">
        <h3 className="fs-400 font-clrs">Order Placed</h3>
        <div className="grid center form-container">
          <p className="font-clrs">Your order was created successfully.</p>
          <p className="font-clrs">Order ID: {props.orderId}</p>
          <p className="auth-helper font-clrs">
            Payment is pending and will be handled by a payment provider later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="grid border-btn" id="detail-page">
      <h3 className="fs-400 font-clrs">Place Order</h3>
      <form
        className="grid center form-container"
        onSubmit={(event) => {
          event.preventDefault();
          props.onPlaceOrder();
        }}
      >
        <div className="form-control grid">
          <p className="auth-helper font-clrs">
            Payment is pending and will be handled by a payment provider later.
          </p>
        </div>
        <div className="form-control grid">
          <p className="font-clrs">Total: {props.totals.total.toLocaleString()}₫</p>
        </div>
        {props.error ? <p className="auth-error">{props.error}</p> : null}
        <button
          className="btn primary-bg fs-300 width-btn"
          type="submit"
          disabled={props.isSubmitting}
        >
          <strong>{props.isSubmitting ? "Placing..." : "Place Order"}</strong>
        </button>
      </form>
    </section>
  );
};

export default StateFour;
