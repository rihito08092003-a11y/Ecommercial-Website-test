const StateFour = (props) => {
  return (
    <section className="grid border-btn" id="detail-page">
      <h3 className="fs-400 font-clrs">Payment Details</h3>
      <form
        className="grid center form-container"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="form-control grid">
          <div className="flex" id="payment">
            <div className="flex">
              <input
                type="radio"
                className="border-btn fs-300 font-clrs"
                required
                id="card"
                name="payment"
                value="creditCard"
              />
              <label className="font-clrs mid-opacity" htmlFor="card">
                Credit Card
              </label>
            </div>
            <div className="flex">
              <input
                type="radio"
                className="border-btn fs-300 font-clrs"
                required
                id="PayPal"
                name="payment"
                value="PayPal"
              />
              <label className="font-clrs mid-opacity" htmlFor="PayPal">
                PayPal
              </label>
            </div>
          </div>
        </div>
        <div className="form-control grid">
          <label className="font-clrs mid-opacity" htmlFor="card-number">
            Card Number
          </label>
          <input
            type="text"
            className="border-btn fs-300 font-clrs"
            required
            id="card-number"
            name="card-number"
            placeholder="4242 4242 4242 4242"
          />
        </div>
        <div className="form-control grid">
          <label className="font-clrs mid-opacity" htmlFor="expired-date">
            Expiry Date
          </label>
          <input
            type="text"
            className="border-btn fs-300 font-clrs"
            required
            id="expired-date"
            name="expired-date"
            placeholder="12/28"
          />
        </div>
        <div className="form-control grid">
          <label className="font-clrs mid-opacity" htmlFor="cvv">
            CVV
          </label>
          <input
            type="number"
            className="border-btn fs-300 font-clrs"
            required
            id="cvv"
            name="cvv"
            placeholder="123"
          />
        </div>
        <div className="form-control grid">
          <label className="font-clrs mid-opacity" htmlFor="billing-country">
            Country
          </label>
          <input
            type="text"
            className="border-btn fs-300 font-clrs"
            required
            id="billing-country"
            name="billing-country"
            placeholder="vietnam"
          />
        </div>
        <div className="form-control grid">
          <label className="font-clrs mid-opacity" htmlFor="billing-zip-code">
            ZIP Code
          </label>
          <input
            type="number"
            className="border-btn fs-300 font-clrs"
            required
            id="billing-zip-code"
            name="billing-zip-code"
            placeholder="1000"
          />
        </div>
        <button
          className="btn primary-bg fs-300 width-btn"
          type="submit"
        >
          <strong>Place Order</strong>
        </button>
      </form>
    </section>
  );
};

export default StateFour;
