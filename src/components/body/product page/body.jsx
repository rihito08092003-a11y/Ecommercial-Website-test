import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useScrollToTop from "../../../hooks/useScrollToTop";
import productAction from "../../../store/actions/product";
import productSelector from "../../../store/selectors/productSelector";
import "./body.css";
import Feature from "./feature";
import ProductInfo from "./product-info";
import RelatedProduct from "./related-product";
import Review from "./reviews";
import { normalizeProduct } from "../../../utils/product";
const ProductBody = () => {
  useScrollToTop();

  const dispatch = useDispatch();
  const products = useSelector(productSelector.selectProducts);
  const selectedProduct = useSelector(productSelector.selectSelectedProduct);
  const productsLoading = useSelector(productSelector.selectProductsLoading);
  const selectedLoading = useSelector(productSelector.selectSelectedProductLoading);
  const productError = useSelector(productSelector.selectProductError);
  const { id } = useParams();
  const [hasRequestedDetail, setHasRequestedDetail] = useState(false);
  const cachedProduct = products.find(
    (element) => String(element.id) === String(id) || element.slug === id,
  );
  const selectedMatchesRoute =
    selectedProduct &&
    (String(selectedProduct.id) === String(id) || selectedProduct.slug === id);
  const product = cachedProduct || (selectedMatchesRoute ? selectedProduct : null);

  useEffect(() => {
    if (!id) return;
    setHasRequestedDetail(false);
    dispatch(productAction.fetchProductDetail(id))
      .catch(() => {})
      .finally(() => {
        setHasRequestedDetail(true);
      });
  }, [dispatch, id]);

  if (
    !product &&
    (productsLoading || selectedLoading || (!hasRequestedDetail && !productError))
  ) {
    return (
      <main className="primary-body center grid">
        <section className="empty-category grid center">
          <h2 className="font-clrs">Loading product...</h2>
          <p className="font-clrs">We are preparing the latest product data.</p>
        </section>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="primary-body center grid">
        <section className="empty-category grid center">
          <h2 className="font-clrs">Product not found</h2>
          <p className="font-clrs">
            This product may have been removed or is still loading.
          </p>
        </section>
      </main>
    );
  }

  const normalizedProduct = normalizeProduct(product);

  return (
    <>
      <main className="primary-body center grid">
        <ProductInfo product={normalizedProduct} />
        <Feature desc={normalizedProduct.description} />
        <Review />
        <RelatedProduct products={products} currentProduct={normalizedProduct} />
      </main>
    </>
  );
};
export default ProductBody;
