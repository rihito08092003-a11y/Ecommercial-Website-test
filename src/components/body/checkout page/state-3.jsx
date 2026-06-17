const StateThree = (props) => {
  const { contact, shipping, products, totals } = props;

  return (
    <section className="grid border-btn" id="detail-page">
      <h3 className="fs-400 font-clrs">Review Order</h3>
      <form
        className="grid center form-container"
        onSubmit={(event) => {
          event.preventDefault();
          props.CheckOutState("+");
        }}
      >
        <div className="form-control grid">
          <p className="font-clrs">Email: {contact.email}</p>
          <p className="font-clrs">Name: {contact.fullName}</p>
          <p className="font-clrs">Phone: {contact.phone}</p>
          <p className="font-clrs">
            Ship to: {shipping.houseNumber} {shipping.street}, {shipping.country}{" "}
            {shipping.zipCode}
          </p>
          <p className="font-clrs">{products.length} items in your order.</p>
          <p className="font-clrs">Total: {totals.total.toLocaleString()}₫</p>
        </div>
        <div className="form-control grid">
          <p className="auth-helper font-clrs">
            Payment is pending and will be handled by a payment provider later.
          </p>
        </div>
        <button
          className="btn primary-bg fs-300 width-btn"
          type="submit"
        >
          <strong>Continue</strong>
        </button>
      </form>
    </section>
  );
};

export default StateThree;
