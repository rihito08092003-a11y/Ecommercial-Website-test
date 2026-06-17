import authService from "../../API/authApi";

export const authenActionType = {
  request: "auth/request",
  initialized: "auth/initialized",
  sessionChanged: "auth/sessionChanged",
  logout: "auth/logout",
  failure: "auth/failure",
  resetPasswordSuccess: "auth/resetPasswordSuccess",
};

let authSubscription = null;

const getErrorMessage = (error, fallback) =>
  error.response?.data?.message || error.message || fallback;

const request = () => ({
  type: authenActionType.request,
});

const initialized = (payload) => ({
  type: authenActionType.initialized,
  payload,
});

const sessionChanged = (payload) => ({
  type: authenActionType.sessionChanged,
  payload,
});

const failure = (payload) => ({
  type: authenActionType.failure,
  payload,
});

const initializeAuth = () => async (dispatch) => {
  try {
    dispatch(request());
    const data = await authService.getSession();
    dispatch(initialized(data));

    if (!authSubscription) {
      authSubscription = authService.onAuthStateChange((sessionData) => {
        dispatch(sessionChanged(sessionData));
      });
    }

    return data;
  } catch (error) {
    const message = getErrorMessage(error, "Auth initialization failed");
    dispatch(failure(message));
    throw error;
  }
};

const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(request());
    const data = await authService.login({ email, password });
    dispatch(sessionChanged(data));
    return data;
  } catch (error) {
    const message = getErrorMessage(error, "Login failed");
    dispatch(failure(message));
    throw error;
  }
};

const registerUser = (email, password) => async (dispatch) => {
  try {
    dispatch(request());
    const data = await authService.register({ email, password });

    if (data.session) {
      dispatch(sessionChanged(data));
    } else {
      dispatch(
        failure(
          "Account created. Please check your email to confirm before logging in.",
        ),
      );
    }

    return data;
  } catch (error) {
    const message = getErrorMessage(error, "Register failed");
    dispatch(failure(message));
    throw error;
  }
};

const logoutUser = () => async (dispatch) => {
  try {
    await authService.logout();
  } finally {
    dispatch({ type: authenActionType.logout });
  }
};

const resetPassword = (email) => async (dispatch) => {
  try {
    dispatch(request());
    const data = await authService.resetPassword(email);
    dispatch({
      type: authenActionType.resetPasswordSuccess,
      payload: "Password reset email sent. Please check your inbox.",
    });
    return data;
  } catch (error) {
    const message = getErrorMessage(error, "Password reset failed");
    dispatch(failure(message));
    throw error;
  }
};

const userLoginFetch = (user) => loginUser(user.email, user.password);
const userRegisterFetch = (user) => registerUser(user.email, user.password);

const actionType = {
  initializeAuth,
  loginUser,
  registerUser,
  logoutUser,
  resetPassword,
  logout: logoutUser,
  failure,
  userLoginFetch,
  userRegisterFetch,
};

export default actionType;
