import SecondaryText from "../../secondary-text";
import Title from "../../section-title";

const Category = ({
  categories,
  categoryLabels,
  pageTitle,
  productCount,
  selectedCategory,
  setSelectedCategory,
  setSortBy,
  sortBy,
}) => {
  return (
    <section className="grid center category-hero">
      <SecondaryText text="Curated shop" />
      <Title title={pageTitle} />
      <p className="category-summary font-clrs">
        {productCount} products available. Filter quickly, compare prices, and
        choose the product that fits your routine.
      </p>
      <div className="filter flex">
        <label className="filter-control">
          <span className="font-clrs">Filter by</span>
          <select
            name="category"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "All categories" : categoryLabels[item] || item}
              </option>
            ))}
          </select>
        </label>
        <label className="filter-control">
          <span className="font-clrs">Sort by</span>
          <select
            name="sort"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="az">A to Z</option>
            <option value="za">Z to A</option>
            <option value="high-low">High to Low</option>
            <option value="low-high">Low to High</option>
          </select>
        </label>
      </div>
    </section>
  );
};

export default Category;
