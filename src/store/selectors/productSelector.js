import { createSelector } from "reselect";

const selectProduct = (state) => state.products;

const selectProducts = createSelector(
  selectProduct,
  (product) => product.products || []
);
const selectSelectedProduct = createSelector(
  selectProduct,
  (product) => product.selectedProduct
);
const selectProductsLoading = createSelector(selectProduct, (product) =>
  Boolean(product.loading)
);
const selectSelectedProductLoading = createSelector(selectProduct, (product) =>
  Boolean(product.selectedLoading)
);
const selectProductError = createSelector(selectProduct, (product) => product.error);

const productSelector = {
  selectProducts,
  selectSelectedProduct,
  selectProductsLoading,
  selectSelectedProductLoading,
  selectProductError,
};

export default productSelector;
