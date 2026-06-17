import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useScrollToTop from "../../../hooks/useScrollToTop";
import productSelector from "../../../store/selectors/productSelector";
import ProductCard from "../../product-card";
import SecondaryText from "../../secondary-text";
import Title from "../../section-title";
import Sad from "../../../asset/sad.png";

const SearchPage = () => {
  const products = useSelector(productSelector.selectProducts);
  useScrollToTop();
  const location = useLocation();
  const param = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    return (queryParams.get("search") || "").trim();
  }, [location.search]);
  const searchText = param.toLowerCase();
  const filteredProducts = useMemo(() => {
    if (!searchText) {
      return products;
    }

    return products.filter((item) => {
      const name = item.name?.toLowerCase() || "";
      const description = item.description?.toLowerCase() || "";
      const category = item.category?.toLowerCase() || "";

      return (
        name.includes(searchText) ||
        description.includes(searchText) ||
        category.includes(searchText)
      );
    });
  }, [products, searchText]);

  return (
    <main className="primary-body center grid">
      <SecondaryText text="Search Results" />
      <Title title={`${param ? '"' + param + '"' : "All"} Products`} />

      {param ? (
        filteredProducts.length > 0 ? (
          <section className="grid products-list">
            {filteredProducts.map((item) => (
              <ProductCard product={item} key={item.id} />
            ))}
          </section>
        ) : (
          <section className="grid">
            <div className="center grid" style={{ width: "100%" }}>
              <img
                src={Sad}
                alt="sad-face"
                style={{ width: "50%", aspectRatio: "1" }}
                className="font-clrs-bg circle center"
              />
              <h4 className="fs-300 font-clrs low-opacity text-center">
                Could Not found Product name "{param}" - Please try again
              </h4>
            </div>
          </section>
        )
      ) : (
        <section className="grid products-list">
          {filteredProducts.map((item) => (
            <ProductCard product={item} key={item.id} />
          ))}
        </section>
      )}
    </main>
  );
};

export default SearchPage;
