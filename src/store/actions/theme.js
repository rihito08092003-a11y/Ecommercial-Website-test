export const themeType = {
  themeToggle: "theme/ThemeToggle",
};

const toggleTheme = (payload) => ({
  type: themeType.themeToggle,
  payload,
});

const toggleAction = {
  toggleTheme,
};

export default toggleAction;
