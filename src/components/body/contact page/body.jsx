import { Link } from "react-router-dom";
import SecondaryText from "../../secondary-text";
import Title from "../../section-title";

const Contact = () => {
  return (
    <main className="primary-body center grid">
      <section className="static-page info-page grid center">
        <SecondaryText text="Support" center />
        <Title title="Contact Us" center />
        <p className="font-clrs">
          Need help with an order, product setup, or account access? This page
          is ready for a contact form once support messaging is added.
        </p>
        <Link className="btn primary-bg fs-300 center" to="/product">
          Continue shopping
        </Link>
      </section>
    </main>
  );
};

export default Contact;
