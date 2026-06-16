import { createSelector } from "reselect";

const selectAuthBranch = (state) => state.auth;

const selectIsloading = createSelector(selectAuthBranch, (auth) => auth.auth);
const selectAuth = createSelector(selectAuthBranch, (auth) => auth.auth);
const selectIsLoggedIn = createSelector(
  selectAuth,
  (auth) => Boolean(auth?.isLogined)
);

const authSelector = {
  selectIsloading,
  selectAuth,
  selectIsLoggedIn,
};

export default authSelector;
