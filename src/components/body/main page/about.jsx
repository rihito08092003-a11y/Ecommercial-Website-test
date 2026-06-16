import ReviewCard from "../../review-card";
import SecondaryText from "../../secondary-text";
import Title from "../../section-title";
import Box from "../../../asset/icons8-successful-delivery-50.png";
const About = () => {
  return (
    <section className="grid about-section">
      <SecondaryText text="Why Us" center={true} />
      <Title title="Why People Choose Us" center={true} />
      <div className="review-container grid">
        <ReviewCard
          title="Easy Returns"
          text="Our return policy is simple and that is why customers love our shop"
          link={Box}
        />
        <ReviewCard
          title="Customer Service"
          text="We offer amazing customer service no matter what happens"
          link={Box}
        />
        <ReviewCard
          title="High Quality"
          text="All of our products go through very strict inspection before we dispatch them"
          link={Box}
        />
      </div>
    </section>
  );
};

export default About;
