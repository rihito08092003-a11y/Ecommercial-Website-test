import { Link } from "react-router-dom";
import SecondaryText from "../../secondary-text";
import Title from "../../section-title";

const About = () => {
  return (
    <main className="primary-body center grid">
      <section className="static-page info-page grid center">
        <SecondaryText text="About" center />
        <Title title="About Ecommercial Website" center />
        <p className="font-clrs">
          Ecommercial Website curates simple skincare essentials with clean presentation,
          reliable shopping flows, and a product catalog ready to connect to
          Supabase.
        </p>
        <Link className="btn primary-bg fs-300 center" to="/contact">
          Contact us
        </Link>
      </section>
    </main>
  );
};

export default About;
