import SecondaryText from "../../secondary-text";
import Title from "../../section-title";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actionType from "../../../store/actions/auth";
import authSelector from "../../../store/selectors/authSelector";

const SignUpForm = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const auth = useSelector(authSelector.selectAuth);

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(actionType.userRegisterFetch(user));
  };

  return (
    <>
      {auth.isLogined ? <Navigate to="/auth/profile" replace /> : null}
      <section className="grid auth-card-wrap">
        <SecondaryText text="Sign Up" />
        <Title title="Create Account" />
        <form className="grid center form-container" onSubmit={onSubmit}>
          <div className="form-control grid">
            <label className="font-clrs mid-opacity" htmlFor="register-email">
              Email Address
            </label>
            <input
              type="email"
              className="border-btn fs-300 font-clrs"
              id="register-email"
              name="email"
              value={user.email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-control grid">
            <label className="font-clrs mid-opacity" htmlFor="register-password">
              Create Password
            </label>
            <input
              type="password"
              className="border-btn fs-300 font-clrs"
              id="register-password"
              name="password"
              value={user.password}
              onChange={onChange}
              minLength="6"
              required
            />
          </div>
          {auth.error ? <p className="auth-error">{auth.error}</p> : null}
          <button
            className="btn primary-bg fs-300 width-btn"
            type="submit"
            disabled={auth.isLoading}
          >
            <strong>{auth.isLoading ? "Creating..." : "Create Account"}</strong>
          </button>
          <div className="auth-links">
            <Link className="font-clrs fs-300 auth-link-strong" to="/auth/login">
              <strong>Login</strong>
            </Link>
          </div>
        </form>
      </section>
    </>
  );
};

export default SignUpForm;
