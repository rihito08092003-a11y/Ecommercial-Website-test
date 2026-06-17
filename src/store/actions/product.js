import productApi from "../../API/productApi";
import { normalizeProduct } from "../../utils/product";

export const actionType = {
  productsRequest: "products/request",
  productsSuccess: "products/success",
  productsFailure: "products/failure",
  productDetailRequest: "productDetail/request",
  productDetailSuccess: "productDetail/success",
  productDetailFailure: "productDetail/failure",
};

const productsRequest = () => ({
  type: actionType.productsRequest,
});

const productsSuccess = (payload) => ({
  type: actionType.productsSuccess,
  payload,
});

const productsFailure = (payload) => ({
  type: actionType.productsFailure,
  payload,
});

const productDetailRequest = () => ({
  type: actionType.productDetailRequest,
});

const productDetailSuccess = (payload) => ({
  type: actionType.productDetailSuccess,
  payload,
});

const productDetailFailure = (payload) => ({
  type: actionType.productDetailFailure,
  payload,
});

const getErrorMessage = (error) =>
  error.response?.data?.message || error.message || "Unable to fetch products";

const fetchProducts = (params) => async (dispatch) => {
  try {
    dispatch(productsRequest());
    const { products } = await productApi.getAll(params);
    dispatch(productsSuccess((products || []).map(normalizeProduct)));
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    dispatch(productsFailure(getErrorMessage(error)));
    throw error;
  }
};

const fetchProductDetail = (idOrSlug) => async (dispatch, getState) => {
  const products = getState().products?.products || [];
  const cachedProduct = products.find(
    (product) =>
      String(product.id) === String(idOrSlug) || product.slug === idOrSlug,
  );

  if (cachedProduct) {
    dispatch(productDetailSuccess(normalizeProduct(cachedProduct)));
    return cachedProduct;
  }

  try {
    dispatch(productDetailRequest());
    const { product } = await productApi.get(idOrSlug);
    const normalizedProduct = product ? normalizeProduct(product) : null;
    dispatch(productDetailSuccess(normalizedProduct));
    return normalizedProduct;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    dispatch(productDetailFailure(getErrorMessage(error)));
    throw error;
  }
};

const productAction = {
  fetchProducts,
  fetchProductDetail,
};

export default productAction;
