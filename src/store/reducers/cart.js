import { cartActionType } from "../actions/cart";
import { normalizeProduct } from "../../utils/product";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const toPositiveInteger = (value) => {
  const amount = Math.floor(Number(value));
  return Number.isFinite(amount) && amount > 0 ? amount : 1;
};

const cartReducer = (state = { cart: [] }, action) => {
  switch (action.type) {
    case cartActionType.addProduct: {
      const { amount } = action.payload;
      const product = normalizeProduct(action.payload);
      const { id } = product;
      const currentAmount = toPositiveInteger(amount);
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
      const nextAmount = toPositiveInteger(amount);
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, amount: nextAmount } : item,
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

const persistConfig = {
  keyPrefix: "c2Shop",
  key: "Cart",
  storage,
  whitelist: ["cart"],
};

export default persistReducer(persistConfig, cartReducer);
