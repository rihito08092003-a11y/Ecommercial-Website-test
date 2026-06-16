import SecondaryText from "../../secondary-text";
import Title from "../../section-title";
import BlogCard from "../../blog-card";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <section className="grid re">
      <SecondaryText text="Skincare Products" center={true} />
      <Title title="Check Out our Blog" center={true} />
      <div className="blog-container">
        <BlogCard
          title="Morning Skincare Routine: 10 Top Tips for you"
          width={true}
        />
      </div>
      <Link className="btn primary-bg fs-300 priamry-btn center" to="/blog">
        <strong>View All</strong>
      </Link>
    </section>
  );
};

export default Blog;
