import { actionType } from "../actions/product";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  selectedLoading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.productsRequest:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionType.productsSuccess:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };
    case actionType.productsFailure:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionType.productDetailRequest:
      return {
        ...state,
        selectedLoading: true,
        selectedProduct: null,
        error: null,
      };
    case actionType.productDetailSuccess:
      return {
        ...state,
        selectedProduct: action.payload,
        selectedLoading: false,
        error: null,
      };
    case actionType.productDetailFailure:
      return {
        ...state,
        selectedLoading: false,
        selectedProduct: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

const persistConfig = {
  keyPrefix: "c2Shop",
  key: "Products",
  storage,
  whitelist: ["products"],
};

export default persistReducer(persistConfig, productReducer);
