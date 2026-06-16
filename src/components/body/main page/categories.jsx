import SecondaryText from "../../secondary-text";
import Title from "../../section-title";
import CategoriesCard from "../../categories-card";
import sale from "../../../asset/icons8-sale-50.png";
import graph from "../../../asset/icons8-graph-64.png";
import news from "../../../asset/icons8-new-50.png";

const Categories = () => {
  return (
    <section className="grid re">
      <SecondaryText text="Explore Categories" center={true} />
      <Title title="Browse products by category" center={true} />
      <div className="categories-card">
        <CategoriesCard
          title="On Sale"
          text="Limited deals on daily essentials"
          link={sale}
          to="/onsale"
        />
        <CategoriesCard
          title="Trending"
          text="Loved products people reorder"
          link={graph}
          to="/trending"
        />
        <CategoriesCard
          title="Newest"
          text="Fresh arrivals for your routine"
          link={news}
          to="/newest"
        />
      </div>
    </section>
  );
};

export default Categories;
