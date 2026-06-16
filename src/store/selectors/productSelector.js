import { createSelector } from "reselect";

const selectProduct = (state) => state.products;

const selectProducts = createSelector(
  selectProduct,
  (product) => product.products
);

const productSelector = {
  selectProducts,
};

export default productSelector;
