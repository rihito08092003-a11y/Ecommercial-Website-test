import authService from "../../API/authApi";

export const authenActionType = {
  request: "auth/request",
  register: "auth/register",
  login: "auth/login",
  logout: "auth/logout",
  failure: "auth/failure",
};

const userLoginFetch = (user) => async (dispatch) => {
  try {
    dispatch(request());
    const data = await authService.login(user);
    const token = data.jwt || data.token;

    if (token) {
      localStorage.setItem("token", token);
    }

    dispatch(login(data));
    return data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Login failed";
    dispatch(failure(message));
    throw error;
  }
};

const userRegisterFetch = (user) => async (dispatch) => {
  try {
    dispatch(request());
    const data = await authService.register(user);
    const token = data.jwt || data.token;

    if (token) {
      localStorage.setItem("token", token);
      dispatch(register(data));
    } else {
      dispatch(
        failure(
          "Account created. Please check your email to confirm before logging in.",
        ),
      );
    }

    return data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Register failed";
    dispatch(failure(message));
    throw error;
  }
};

const request = () => ({
  type: authenActionType.request,
});

const register = (payload) => ({
  type: authenActionType.register,
  payload,
});

const login = (payload) => ({
  type: authenActionType.login,
  payload,
});

const logout = () => async (dispatch) => {
  try {
    await authService.logout();
  } finally {
    localStorage.removeItem("token");
    dispatch({ type: authenActionType.logout });
  }
};

const failure = (payload) => ({
  type: authenActionType.failure,
  payload,
});

const actionType = {
  register,
  login,
  logout,
  failure,
  userLoginFetch,
  userRegisterFetch,
};

export default actionType;
