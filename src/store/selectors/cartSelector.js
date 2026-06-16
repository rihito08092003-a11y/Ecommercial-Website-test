import { createSelector } from "reselect";

const cartProduct = (state) => state.cart;

const cartProducts = createSelector(cartProduct, (cart) => cart.cart);

const cartSelector = {
  cartProducts,
};

export default cartSelector;
