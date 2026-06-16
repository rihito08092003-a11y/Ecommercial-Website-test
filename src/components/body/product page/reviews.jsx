import CustomerReview from "../../customer-reviews";
import SecondaryText from "../../secondary-text";
import Title from "../../section-title";

const Review = () => {
  return (
    <section className="grid">
      <SecondaryText text="Our Reviews" center={true} />
      <Title title="What our Customers are Saying" center={true} />
      <CustomerReview
        title="Amy Smith"
        reviews="This is the best website I have ordered something from. I highly recommend"
      />
      <div className="flex center button-align">
        <button className="btn left-right-nav image-cover-clrs"></button>
        <button className="btn left-right-nav image-cover-clrs"></button>
      </div>
    </section>
  );
};

export default Review;
