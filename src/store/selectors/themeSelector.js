import { createSelector } from "reselect";

const selectTheme = (state) => state.theme;

const selectThemes = createSelector(selectTheme, (theme) => theme.theme);

const themesSelector = {
  selectThemes,
};

export default themesSelector;
