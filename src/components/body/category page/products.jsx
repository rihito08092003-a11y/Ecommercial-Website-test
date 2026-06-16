import ProductCard from "../../product-card";

const ProductContainer = ({ products }) => {
  if (!products.length) {
    return (
      <section className="empty-category grid center">
        <h3 className="font-clrs">No products found</h3>
        <p className="font-clrs">
          Try another filter or come back later for new arrivals.
        </p>
      </section>
    );
  }

  return (
    <section className="grid products-list">
      {products.map((item) => (
        <ProductCard product={item} key={item.id} />
      ))}
    </section>
  );
};

export default ProductContainer;
