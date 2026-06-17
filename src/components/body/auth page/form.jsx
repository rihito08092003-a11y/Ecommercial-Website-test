import SecondaryText from "../../secondary-text";
import Title from "../../section-title";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import actionType from "../../../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import authSelector from "../../../store/selectors/authSelector";

const Form = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(authSelector.selectIsLoggedIn);
  const isLoading = useSelector(authSelector.selectIsLoading);
  const error = useSelector(authSelector.selectAuthError);

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(actionType.loginUser(user.email, user.password));
  };

  return (
    <>
      {isLoggedIn ? <Navigate to="/auth/profile" replace /> : null}
      <section className="grid auth-card-wrap">
        <SecondaryText text="Login" />
        <Title title="Login to Your Account" />
        <form className="grid center form-container" onSubmit={onSubmit}>
          <div className="form-control grid">
            <label className="font-clrs mid-opacity" htmlFor="email">
              Your Email
            </label>
            <input
              type="email"
              className="border-btn fs-300 font-clrs"
              required
              id="email"
              name="email"
              value={user.email}
              onChange={onChange}
            />
          </div>
          <div className="form-control grid">
            <label className="font-clrs mid-opacity" htmlFor="password">
              Your Password
            </label>
            <input
              type="password"
              className="border-btn fs-300 font-clrs"
              required
              id="password"
              name="password"
              value={user.password}
              onChange={onChange}
            />
          </div>
          {error ? <p className="auth-error">{error}</p> : null}
          <button
            className="btn primary-bg fs-300 width-btn"
            type="submit"
            disabled={isLoading}
          >
            <strong>{isLoading ? "Logging in..." : "Login"}</strong>
          </button>
          <div className="auth-links">
            <Link className="font-clrs fs-300 auth-link-strong" to="/auth/register">
              <strong>Create Account</strong>
            </Link>
            <Link
              className="font-clrs under-line low-opacity"
              to="/auth/forgot-password"
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </section>
    </>
  );
};

export default Form;
