import { Link } from "react-router-dom";
import ProductImage from "../../product-image";
import SecondaryText from "../../secondary-text";
import Title from "../../section-title";
import bagImage from "../../../asset/bag.png";

const Home = () => {
  return (
    <section className="grid hero-section" id="home-section">
      <div className="hero-copy">
        <SecondaryText text="Skincare Products" />
        <Title title="We offer the best products for your skin" />
        <p className="hero-description">
          Discover premium skincare formulated for every routine. Clean
          ingredients, gentle textures, and fast delivery for healthy glowing
          skin.
        </p>
        <div className="hero-actions">
          <Link to="/product" className="btn primary-bg fs-300 hero-button">
            Shop Now
          </Link>
          <Link to="/product" className="secondary-link fs-300">
            Browse products
          </Link>
        </div>
        <div className="hero-metrics">
          <span>
            <strong>120+</strong>
            Products
          </span>
          <span>
            <strong>4.9</strong>
            Rating
          </span>
          <span>
            <strong>24h</strong>
            Delivery
          </span>
        </div>
      </div>
      <div className="hero-image-wrapper">
        <div className="hero-visual-card">
          <span className="hero-badge">Clean beauty</span>
          <ProductImage link={bagImage} title="Hero product" />
          <div className="hero-floating-note">
            <strong>Daily routine</strong>
            <span>Curated skincare essentials</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
