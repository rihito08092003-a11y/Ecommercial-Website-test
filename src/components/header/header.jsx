import { RiArrowDropRightFill } from "react-icons/ri";
import { NavLink, Link, Navigate } from "react-router-dom";
import "./header.css";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import cartSelector from "../../store/selectors/cartSelector";
import authSelector from "../../store/selectors/authSelector";
import authAction from "../../store/actions/auth";
import { FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from "react-icons/fi";

const categories = [
  ["On Sale", "/onsale"],
  ["Trending", "/trending"],
  ["Newest", "/newest"],
  ["Serums", "/serums"],
  ["Moisturizers", "/moisturizers"],
  ["Cleansers", "/cleansers"],
  ["Eye Care", "/eye-care"],
  ["Masks", "/masks"],
  ["Suncare", "/suncare"],
  ["Toners", "/toners"],
  ["Treatments", "/treatments"],
];

const Header = () => {
  const dispatch = useDispatch();
  const [isActive, setActive] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [searchContent, SetSearchContent] = useState("");
  const [goto, Setgoto] = useState(false);
  const [search, SetSearch] = useState(false);
  const cartList = useSelector(cartSelector.cartProducts);
  const isLoggedIn = useSelector(authSelector.selectIsLoggedIn);
  const handleNavClick = () => {
    setActive(false);
    setToggle(false);
  };

  const handleLogout = () => {
    dispatch(authAction.logoutUser());
    handleNavClick();
  };

  const onChangingValue = (e) => {
    e.preventDefault();
    SetSearchContent(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (searchContent.trim()) {
      Setgoto(true);
    }
  };

  useEffect(() => {
    if (goto) {
      Setgoto(false);
      setActive(false);
    }
  }, [goto]);

  return (
    <>
      {goto ? <Navigate to={`/search?search=${searchContent}`} /> : null}
      <header className="primary-header">
        <nav className="primary-navigation center" aria-label="Primary">
          <button
            className="nav-icon-btn nav-menu-toggle"
            type="button"
            onClick={() => setActive(!isActive)}
            aria-label="Toggle menu"
          >
            {isActive ? <FiX /> : <FiMenu />}
          </button>

          <Link id="logo" className="font-clrs" to="/" onClick={handleNavClick}>
            Ecommercial Website
          </Link>

          <form className="nav-search" onSubmit={onSubmit}>
            <FiSearch aria-hidden="true" />
            <input
              type="text"
              placeholder="Search skincare"
              name="search"
              value={searchContent}
              onChange={onChangingValue}
              aria-label="Search products"
            />
          </form>

          <div className={clsx("primary-navigation-panel", isActive && "open")}>
            <NavLink to="/" className="nav-link" onClick={handleNavClick}>
              Home
            </NavLink>

            <div className="nav-category">
              <button
                className="nav-link nav-category-btn"
                type="button"
                onClick={() => setToggle(!toggle)}
                aria-expanded={toggle}
              >
                Categories
                <RiArrowDropRightFill />
              </button>
              <div className={clsx("nav-category-menu", toggle && "open")}>
                {categories.map(([label, path]) => (
                  <NavLink
                    key={path}
                    to={path}
                    className="nav-category-link"
                    onClick={handleNavClick}
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>

            <NavLink to="/blog" className="nav-link" onClick={handleNavClick}>
              Blog
            </NavLink>
            <NavLink to="/about" className="nav-link" onClick={handleNavClick}>
              About
            </NavLink>
            <NavLink to="/contact" className="nav-link" onClick={handleNavClick}>
              Contact
            </NavLink>

            <div className="mobile-auth-actions">
              {isLoggedIn ? (
                <>
                  <Link
                    className="btn primary-bg fs-300"
                    to="/auth/profile"
                    onClick={handleNavClick}
                  >
                    Profile
                  </Link>
                  <button
                    className="btn secondary-nav-btn fs-300"
                    type="button"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  className="btn primary-bg fs-300"
                  to="/auth/login"
                  onClick={handleNavClick}
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          <div className="primary-navigation-actions">
            <button
              className="nav-icon-btn desktop-search-toggle"
              type="button"
              onClick={() => SetSearch(!search)}
              aria-label="Toggle search"
              title="Toggle search"
            >
              <FiSearch />
            </button>
            <form
              className={clsx("floating-search", search && "open")}
              onSubmit={onSubmit}
            >
              <input
                type="text"
                placeholder="Search skincare"
                name="search"
                value={searchContent}
                onChange={onChangingValue}
                aria-label="Search products"
              />
            </form>
            <Link
              className={clsx("nav-icon-btn nav-cart-link", cartList.length > 0 && "notempty")}
              to="/cart"
              aria-label="Shopping cart"
              title="Shopping cart"
            >
              <FiShoppingBag />
            </Link>
            <Link
              className={clsx("nav-icon-btn nav-profile-link", isLoggedIn && "notempty")}
              to={isLoggedIn ? "/auth/profile" : "/auth/login"}
              aria-label="User profile"
              title="User profile"
            >
              <FiUser />
            </Link>
            {!isLoggedIn ? (
              <Link className="btn primary-bg nav-login-btn" to="/auth/login">
                Login
              </Link>
            ) : (
              <button
                className="btn secondary-nav-btn nav-login-btn"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
