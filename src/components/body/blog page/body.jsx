import { Link } from "react-router-dom";
import SecondaryText from "../../secondary-text";
import Title from "../../section-title";

const Blog = () => {
  return (
    <main className="primary-body center grid">
      <section className="static-page info-page grid center">
        <SecondaryText text="Journal" center />
        <Title title="Blog" center />
        <p className="font-clrs">
          Skincare guides, product notes, and routine tips will live here. The
          route is ready for dynamic blog content when the database table is
          added.
        </p>
        <Link className="btn primary-bg fs-300 center" to="/product">
          Browse products
        </Link>
      </section>
    </main>
  );
};

export default Blog;
