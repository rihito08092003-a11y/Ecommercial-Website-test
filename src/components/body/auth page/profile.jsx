import { Link, useNavigate } from "react-router-dom";
import SecondaryText from "../../secondary-text";
import Title from "../../section-title";
import "./body.css";
import { useDispatch, useSelector } from "react-redux";
import authSelector from "../../../store/selectors/authSelector";
import authAction from "../../../store/actions/auth";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(authSelector.selectUser);
  const displayName = user?.name || user?.email || "Your account";

  const onLogout = () => {
    dispatch(authAction.logoutUser());
    navigate("/auth/login", { replace: true });
  };

  return (
    <>
      <main className="primary-body grid center">
        <section className="grid center form-container profile-card">
          <SecondaryText text="You're logged in" />
          <Title title={`Welcome back`} />
          <div className="profile-summary">
            <div className="profile-avatar" aria-hidden="true">
              {(displayName || "E").charAt(0).toUpperCase()}
            </div>
            <div className="profile-details">
              <h3 className="font-clrs">{displayName}</h3>
              {user?.email ? (
                <p className="profile-email font-clrs">{user.email}</p>
              ) : null}
              <span className="profile-status">
                {user?.emailConfirmed ? "Email confirmed" : "Signed in"}
              </span>
            </div>
          </div>
          <div className="flex profile-actions">
            <Link className="btn primary-bg fs-300 width-btn flex" to="/product">
              <strong className="center">Explore Products</strong>
            </Link>
            <button
              className="btn border-btn fs-300 width-btn font-clrs"
              type="button"
              onClick={onLogout}
            >
              <strong>Logout</strong>
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProfilePage;
