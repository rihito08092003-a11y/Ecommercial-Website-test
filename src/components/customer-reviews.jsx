const CustomerReview = (props) => {
  return (
    <div className="customer-review-card grid">
      <div className="review-stars" aria-label="5 star rating">
        ★★★★★
      </div>
      <h3 className="fs-500 font-clrs">{props.title}</h3>
      <p className="fs-400 font-clrs low-opacity">{props.reviews}</p>
    </div>
  );
};

export default CustomerReview;
