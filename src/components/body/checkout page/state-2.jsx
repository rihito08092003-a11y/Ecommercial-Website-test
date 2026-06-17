const StateTwo = (props) => {
  const { shipping, onShippingChange } = props;

  return (
    <section className="grid border-btn" id="detail-page">
      <h3 className="fs-400 font-clrs">Shipping Details</h3>
      <form
        className="grid center form-container"
        onSubmit={(event) => {
          event.preventDefault();
          props.CheckOutState("+");
        }}
      >
        <div className="form-control grid">
          <label className="font-clrs mid-opacity" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            className="border-btn fs-300 font-clrs"
            required
            id="name"
            name="name"
            placeholder="name"
            value={shipping.name}
            onChange={onShippingChange}
          />
        </div>
        <div className="form-control grid">
          <label className="font-clrs mid-opacity" htmlFor="street">
            Street Name
          </label>
          <input
            type="text"
            className="border-btn fs-300 font-clrs"
            required
            id="street"
            name="street"
            placeholder="street name"
            value={shipping.street}
            onChange={onShippingChange}
          />
        </div>
        <div className="form-control grid">
          <label className="font-clrs mid-opacity" htmlFor="house-number">
            House Number
          </label>
          <input
            type="text"
            className="border-btn fs-300 font-clrs"
            required
            id="house-number"
            name="house-number"
            placeholder="123"
            value={shipping.houseNumber}
            onChange={onShippingChange}
          />
        </div>
        <div className="form-control grid">
          <label className="font-clrs mid-opacity" htmlFor="country">
            Country
          </label>
          <input
            type="text"
            className="border-btn fs-300 font-clrs"
            required
            id="country"
            name="country"
            placeholder="vietnam"
            value={shipping.country}
            onChange={onShippingChange}
          />
        </div>
        <div className="form-control grid">
          <label className="font-clrs mid-opacity" htmlFor="zip-code">
            ZIP Code
          </label>
          <input
            type="number"
            className="border-btn fs-300 font-clrs"
            required
            id="zip-code"
            name="zip-code"
            placeholder="1000"
            value={shipping.zipCode}
            onChange={onShippingChange}
          />
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

export default StateTwo;
