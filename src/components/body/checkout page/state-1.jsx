const StateOne = (props) => {
  const { contact, onContactChange } = props;

  return (
    <section className="grid border-btn" id="detail-page">
      <h3 className="fs-400 font-clrs">Contact Details</h3>
      <form
        className="grid center form-container"
        onSubmit={(event) => {
          event.preventDefault();
          props.CheckOutState("+");
        }}
      >
        <div className="form-control grid">
          <label className="font-clrs mid-opacity" htmlFor="email">
            Your Email
          </label>
          <input
            type="email"
            className="border-btn fs-300 font-clrs"
            required
            id="email"
            name="email"
            value={contact.email}
            onChange={onContactChange}
          />
        </div>
        <div className="form-control grid">
          <label className="font-clrs mid-opacity" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            className="border-btn fs-300 font-clrs"
            required
            id="fullName"
            name="fullName"
            value={contact.fullName}
            onChange={onContactChange}
          />
        </div>
        <div className="form-control grid">
          <label className="font-clrs mid-opacity" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            className="border-btn fs-300 font-clrs"
            required
            id="phone"
            name="phone"
            value={contact.phone}
            onChange={onContactChange}
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

export default StateOne;
