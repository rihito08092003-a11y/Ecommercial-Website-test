import ReviewCard from "../../review-card";
import SecondaryText from "../../secondary-text";
import Title from "../../section-title";
import info from "../../../asset/icons8-info-48.png";

const Feature = (props) => {
  return (
    <section className="grid">
      <SecondaryText text="Product Feature" center={true} />
      <Title title="Explore the Features" center={true} />
      <div className="review-container grid">
        <ReviewCard title="Description" text={props.desc} link={info} />
      </div>
    </section>
  );
};

export default Feature;
