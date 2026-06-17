import { Link } from "react-router-dom";
import SecondaryText from "../../secondary-text";
import Title from "../../section-title";
import "./body.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authAction from "../../../store/actions/auth";
import authSelector from "../../../store/selectors/authSelector";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector(authSelector.selectIsLoading);
  const error = useSelector(authSelector.selectAuthError);

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await dispatch(authAction.resetPassword(email));
      setMessage("Password reset email sent. Please check your inbox.");
    } catch {
      setMessage("");
    }
  };

  return (
    <main className="primary-body auth-page grid center">
      <section className="grid auth-card-wrap">
        <SecondaryText text="Account Help" />
        <Title title="Reset your password" />
        <form className="grid center form-container" onSubmit={onSubmit}>
          <div className="form-control grid">
            <label className="font-clrs mid-opacity" htmlFor="forgot-email">
              Email Address
            </label>
            <input
              type="email"
              className="border-btn fs-300 font-clrs"
              id="forgot-email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          {message ? <p className="auth-helper font-clrs">{message}</p> : null}
          {error ? <p className="auth-error">{error}</p> : null}
          <button
            className="btn primary-bg fs-300 width-btn"
            type="submit"
            disabled={isLoading}
          >
            <strong>{isLoading ? "Sending..." : "Send reset link"}</strong>
          </button>
          <div className="auth-links">
            <Link className="font-clrs fs-300 auth-link-strong" to="/auth/login">
              Back to login
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ForgotPassword;
