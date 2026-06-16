import productApi from "../../API/productApi";
import { normalizeProduct } from "../../utils/product";

export const actionType = {
  FetchProduct: "product/fetchProducts",
  FetchProductAsync: "product/fetchProductsAsync",
};

const fetchProduct = (payload) => ({
  type: actionType.FetchProduct,
  payload,
});

const fetchProductAsync = (id) => async (dispatch) => {
  try {
    if (!id) {
      const { products } = await productApi.getAll();
      dispatch(fetchProduct((products || []).map(normalizeProduct)));
    } else {
      const { product } = await productApi.get(id);
      dispatch(fetchProduct(normalizeProduct(product)));
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    dispatch(fetchProduct([]));
  }
};

const productAction = {
  fetchProduct,
  fetchProductAsync,
};

export default productAction;
