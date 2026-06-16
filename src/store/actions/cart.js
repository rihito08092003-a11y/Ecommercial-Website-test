export const cartActionType = {
  addProduct: "cart/addProduct",
  removeProduct: "cart/removeProduct",
  editProduct: "cart/editProduct",
  clearProduct: "cart/clearProduct",
};

const addProduct = (payload) => ({
  type: cartActionType.addProduct,
  payload,
});

const removeProduct = (payload) => ({
  type: cartActionType.removeProduct,
  payload,
});

const editProduct = (payload) => ({
  type: cartActionType.editProduct,
  payload,
});

const clearProduct = () => ({
  type: cartActionType.clearProduct,
});

const cartAction = {
  addProduct,
  removeProduct,
  editProduct,
  clearProduct,
};

export default cartAction;
