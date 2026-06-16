import { useState } from "react";

const ProductImage = (props) => {
  const [failed, setFailed] = useState(false);
  const title = props.title || "Product";
  const initials = title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="product-image image-cover-clrs">
      {props.link && !failed ? (
        <img src={props.link} alt={title} onError={() => setFailed(true)} />
      ) : (
        <div className="product-image-fallback" aria-label={title}>
          <span>{initials || "C2"}</span>
        </div>
      )}
    </div>
  );
};

export default ProductImage;
