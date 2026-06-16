import { Link } from "react-router-dom";

const CategoriesCard = (props) => {
  return (
    <Link className="category-card" to={props.to || "/product"}>
      <img
        className="category-card-icon"
        src={props.link}
        alt=""
        aria-hidden="true"
      />
      <div>
        <h3 className="font-clrs fs-400">{props.title}</h3>
        <p className="font-clrs">{props.text || "Shop curated essentials"}</p>
      </div>
      <span>Explore</span>
    </Link>
  );
};

export default CategoriesCard;
