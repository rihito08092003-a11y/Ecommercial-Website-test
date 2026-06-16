import { themeType } from "../actions/theme";

const themeReducer = (state = { theme: "light" }, action) => {
  switch (action.type) {
    case themeType.themeToggle:
      const newState = { ...state };
      newState.theme = action.payload;
      return newState;
    default:
      return state;
  }
};

export default themeReducer;
