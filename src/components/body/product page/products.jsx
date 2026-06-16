import { useSelector } from "react-redux";
import useScrollToTop from "../../../hooks/useScrollToTop";
import productSelector from "../../../store/selectors/productSelector";
import ProductCard from "../../product-card";
import SecondaryText from "../../secondary-text";
import Title from "../../section-title";

const ProductPage = () => {
  const products = useSelector(productSelector.selectProducts);
  useScrollToTop();
  return (
    <>
      <main className="primary-body center grid">
        <SecondaryText text="Our Product" />
        <Title title="Explore our Products" />
        <section className="grid products-list">
          {products.map((item) => (
            <ProductCard product={item} key={item.id} />
          ))}
        </section>
      </main>
    </>
  );
};

export default ProductPage;
