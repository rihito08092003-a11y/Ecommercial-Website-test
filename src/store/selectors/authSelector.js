import { createSelector } from "reselect";

const selectAuthBranch = (state) => state.auth;

const selectAuth = createSelector(selectAuthBranch, (auth) => auth);
const selectUser = createSelector(selectAuth, (auth) => auth.user);
const selectSession = createSelector(selectAuth, (auth) => auth.session);
const selectIsLoading = createSelector(selectAuth, (auth) =>
  Boolean(auth.isLoading)
);
const selectIsInitialized = createSelector(selectAuth, (auth) =>
  Boolean(auth.isInitialized)
);
const selectIsLoggedIn = createSelector(
  selectAuth,
  (auth) => Boolean(auth.isLoggedIn)
);
const selectAuthError = createSelector(selectAuth, (auth) => auth.error);

const authSelector = {
  selectAuth,
  selectUser,
  selectSession,
  selectIsLoading,
  selectIsInitialized,
  selectIsLoggedIn,
  selectAuthError,
};

export default authSelector;
