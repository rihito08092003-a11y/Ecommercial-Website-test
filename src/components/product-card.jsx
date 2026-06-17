import { Link, useNavigate } from "react-router-dom";
import numberWithCommas from "./display";
import ProductImage from "./product-image";
import { getDiscount, normalizeProduct } from "../utils/product";

const ProductCard = (props) => {
  const navigate = useNavigate();
  const product = normalizeProduct(props.product);
  const { price, name, category, newest, id, slug, image } = product;
  const discount = getDiscount(product);
  const hasOldPrice = Number(price.old) > Number(price.actual);

  const goToCollection = (event, path) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(path);
  };

  return (
    <Link className="re product-card grid" to={`/product/${slug || id || ""}`}>
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
        <span className="tag yellow-tag">{category || "Skincare"}</span>
        <h3 className="fs-400 font-clrs">{name}</h3>
        <div className="flex product-card-info-pricetag fs-300 font-clrs">
          <p className="fs-300 font-clrs">{numberWithCommas(price.actual)}₫</p>
          {hasOldPrice ? (
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
