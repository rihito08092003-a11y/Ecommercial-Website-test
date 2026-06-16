import { useEffect, useState } from "react";
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
  const [param, setParam] = useState(null);
  useScrollToTop();
  const location = useLocation();
  useEffect(() => {
    let queryParams = new URLSearchParams(location.search);
    let singleValue = queryParams.get("search");
    if (!singleValue) return;
    setParam(singleValue);
  }, [location]);

  return (
    <main className="primary-body center grid">
      <SecondaryText text="Search Results" />
      <Title title={`${param ? '"' + param + '"' : "All"} Products`} />

      {param ? (
        products.filter((item) =>
          item.name.toLowerCase().includes(param.toLowerCase())
        ).length > 0 ? (
          <section className="grid products-list">
            {products
              .filter((item) =>
                item.name.toLowerCase().includes(param.toLowerCase())
              )
              .map((item) => (
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
          {products.map((item) => (
            <ProductCard product={item} key={item.id} />
          ))}
        </section>
      )}
    </main>
  );
};

export default SearchPage;
