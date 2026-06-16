import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import numberWithCommas from "./display";
import ProductImage from "./product-image";
import { getDiscount, normalizeProduct } from "../utils/product";

const ProductCard = (props) => {
  const navigate = useNavigate();
  const product = normalizeProduct(props.product);
  const { price, name, category, newest, id, image } = product;
  const discount = getDiscount(product);

  const goToCollection = (event, path) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(path);
  };

  const colorTag = (tag) => {
    switch (tag) {
      case "Đồ chơi trẻ em":
        return "yellow-tag";
      case "Mỹ phẩm":
        return "cya-tag";
      case "Nước hoa":
        return "blue-tag";
      default:
        return "yellow-tag";
    }
  };

  return (
    <Link className="re product-card grid" to={`/product/${id || ""}`}>
      <div className="product-card-media">
        <div className="product-badges">
          {discount ? (
            <span
              className="secondary-tag red-clrs"
              role="link"
              tabIndex="0"
              onClick={(event) => goToCollection(event, "/onsale")}
              onKeyDown={(event) => {
                if (event.key === "Enter") goToCollection(event, "/onsale");
              }}
            >
              {discount}% off
            </span>
          ) : null}
          {newest ? (
            <span
              className="secondary-tag primary-bg"
              role="link"
              tabIndex="0"
              onClick={(event) => goToCollection(event, "/newest")}
              onKeyDown={(event) => {
                if (event.key === "Enter") goToCollection(event, "/newest");
              }}
            >
              New
            </span>
          ) : null}
        </div>
        <ProductImage link={image} title={name} />
      </div>
      <div className="product-card-content">
        <span className={clsx("tag yellow-tag", colorTag(category))}>
          {category === "Đồ chơi trẻ em" ? "Đồ chơi" : category || "Shop"}
        </span>
        <h3 className="fs-400 font-clrs">{name}</h3>
        <div className="flex product-card-info-pricetag fs-300 font-clrs">
          <p className="fs-300 font-clrs">{numberWithCommas(price.actual)}₫</p>
          {price.old ? (
            <p className="old-price fs-200 font-clrs">
              {numberWithCommas(price.old)}₫
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
