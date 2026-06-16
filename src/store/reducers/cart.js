import { cartActionType } from "../actions/cart";
import { normalizeProduct } from "../../utils/product";

const cartReducer = (state = { cart: [] }, action) => {
  switch (action.type) {
    case cartActionType.addProduct: {
      const { id, amount } = action.payload;
      const product = normalizeProduct(action.payload);
      const currentAmount = Number(amount) || 1;
      const item = state.cart.find((item) => item.id === id);

      if (item) {
        return {
          ...state,
          cart: state.cart.map((cartItem) =>
            cartItem.id === id
              ? {
                  ...cartItem,
                  amount: (Number(cartItem.amount) || 1) + currentAmount,
                }
              : cartItem,
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...product, amount: currentAmount }],
      };
    }
    case cartActionType.editProduct: {
      const { id, amount } = action.payload;
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, amount: Math.max(1, amount) } : item,
        ),
      };
    }
    case cartActionType.removeProduct: {
      const { id } = action.payload;
      const newState = {
        ...state,
        cart: [...state.cart.filter((item) => item.id !== id)],
      };

      return { ...newState };
    }

    case cartActionType.clearProduct: {
      return {
        ...state,
        cart: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default cartReducer;
