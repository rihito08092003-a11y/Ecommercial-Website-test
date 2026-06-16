const StateThree = (props) => {
  return (
    <section className="grid border-btn" id="detail-page">
      <h3 className="fs-400 font-clrs">Billing Details</h3>
      <form
        className="grid center form-container"
        onSubmit={(event) => {
          event.preventDefault();
          props.CheckOutState("+");
        }}
      >
        <div className="form-control flex" id="billing">
          <input
            type="checkbox"
            className="border-btn fs-300 font-clrs"
            required
            id="bill"
            name="bill"
          />
          <label className="font-clrs mid-opacity" htmlFor="bill">
            Same as shipping address
          </label>
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
