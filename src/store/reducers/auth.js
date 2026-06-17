import { authenActionType } from "../actions/auth";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  user: null,
  session: null,
  isLoading: false,
  isInitialized: false,
  isLoggedIn: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authenActionType.request:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case authenActionType.initialized:
    case authenActionType.sessionChanged:
      return {
        ...state,
        user: action.payload.user || null,
        session: action.payload.session || null,
        isLoggedIn: Boolean(action.payload.session),
        isInitialized: true,
        isLoading: false,
        error: null,
      };
    case authenActionType.failure:
      return {
        ...state,
        isLoading: false,
        isInitialized: true,
        error: action.payload,
      };
    case authenActionType.resetPasswordSuccess:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case authenActionType.logout:
      return {
        ...state,
        user: null,
        session: null,
        isLoading: false,
        isInitialized: true,
        isLoggedIn: false,
        error: null,
      };
    default:
      return state;
  }
};

const persistConfig = {
  keyPrefix: "c2Shop",
  key: "Auth",
  storage,
  whitelist: [],
};

export default persistReducer(persistConfig, authReducer);
