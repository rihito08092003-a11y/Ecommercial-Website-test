const ReviewCard = (props) => {
  return (
    <div className="product-review grid">
      <div className="circle font-clrs-bg flex">
        <img src={props.link} alt={props.link} />
      </div>
      <h3 className="fs-500 font-clrs">{props.title}</h3>
      <p className="fs-400 low-opacity font-clrs">{props.text}</p>
    </div>
  );
};

export default ReviewCard;
