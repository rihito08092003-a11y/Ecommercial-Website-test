import ProductCard from "../../product-card";
import SecondaryText from "../../secondary-text";
import Title from "../../section-title";

const RelatedProduct = (props) => {
  const { products = [], currentProduct } = props;
  const filtered = products
    .filter(
      (item) =>
        String(item.id) !== String(currentProduct.id) &&
        item.category === currentProduct.category,
    )
    .slice(0, 3);

  if (!filtered.length) {
    return null;
  }

  return (
    <section className="grid">
      <SecondaryText text="Explore more" center={true} />
      <Title title="Related Products" center={true} />
      <div className="grid products-list">
        {filtered.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProduct;
