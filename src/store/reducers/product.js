import { actionType } from "../actions/product";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actionType.FetchProduct:
      const newState = { ...state };
      newState.products = action.payload;
      return newState;
    default:
      return state;
  }
};

const persistConfig = {
  keyPrefix: "c2Shop",
  key: "Language",
  storage,
};

export default persistReducer(persistConfig, productReducer);
