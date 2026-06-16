import { Link } from "react-router-dom";
import SecondaryText from "../../secondary-text";
import Title from "../../section-title";
import "./body.css";

const ForgotPassword = () => {
  return (
    <main className="primary-body auth-page grid center">
      <section className="grid auth-card-wrap">
        <SecondaryText text="Account Help" />
        <Title title="Reset your password" />
        <form
          className="grid center form-container"
          onSubmit={(event) => event.preventDefault()}
        >
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
              required
            />
          </div>
          <p className="auth-helper font-clrs">
            Password reset email is ready to connect once the backend endpoint is
            available.
          </p>
          <button className="btn primary-bg fs-300 width-btn" type="submit">
            <strong>Send reset link</strong>
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
