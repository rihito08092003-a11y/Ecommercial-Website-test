import { authenActionType } from "../actions/auth";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  auth: {
    account: null,
    token: localStorage.getItem("token"),
    isLogined: Boolean(localStorage.getItem("token")),
    isLoading: false,
    error: null,
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authenActionType.request:
      return {
        ...state,
        auth: {
          ...state.auth,
          isLoading: true,
          error: null,
        },
      };
    case authenActionType.login:
    case authenActionType.register:
      return {
        ...state,
        auth: {
          account: action.payload.user || action.payload.account || null,
          token: action.payload.jwt || action.payload.token || null,
          isLogined: true,
          isLoading: false,
          error: null,
        },
      };
    case authenActionType.failure:
      return {
        ...state,
        auth: {
          ...state.auth,
          isLoading: false,
          error: action.payload,
        },
      };
    case authenActionType.logout:
      return {
        ...state,
        auth: {
          account: null,
          token: null,
          isLogined: false,
          isLoading: false,
          error: null,
        },
      };
    default:
      return state;
  }
};

const persistConfig = {
  keyPrefix: "c2Shop",
  key: "Auth",
  storage,
};

export default persistReducer(persistConfig, authReducer);
