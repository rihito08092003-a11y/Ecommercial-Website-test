import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import toggleAction from "../../store/actions/theme";
import "./footer.css";

const categoryLinks = [
  ["On Sale", "/onsale"],
  ["Featured", "/newest"],
  ["Serums", "/serums"],
  ["Moisturizers", "/moisturizers"],
  ["Cleansers", "/cleansers"],
  ["Eye Care", "/eye-care"],
  ["Masks", "/masks"],
  ["Suncare", "/suncare"],
  ["Toners", "/toners"],
  ["Treatments", "/treatments"],
];

const legalLinks = [
  ["Terms of Service", "/terms"],
  ["Privacy Policy", "/privacy"],
  ["Return Policy", "/returns"],
  ["Shipping", "/shipping"],
  ["Data Protection", "/data-protection"],
];

const companyLinks = [
  ["About", "/about"],
  ["Team", "/team"],
  ["Contact", "/contact"],
  ["Careers", "/careers"],
  ["Vision", "/vision"],
  ["Culture", "/culture"],
];

const Footer = () => {
  const [theme, setTheme] = useState("light");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleAction.toggleTheme(theme));
  }, [theme, dispatch]);

  return (
    <footer className="primary-footer grid center">
      <div className="footer-brand">
        <h3 className="font-clrs">Ecommercial Website</h3>
        <p className="fs-300 font-clrs">
          Premium skincare essentials curated for clean, simple routines.
        </p>
        <label className="switch" aria-label="Toggle dark mode">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={() => setTheme(theme === "light" ? "dark" : "light")}
          />
          <span className="slider round"></span>
        </label>
      </div>

      <div>
        <h3 className="font-clrs">Categories</h3>
        <ul className="grid footer-links">
          {categoryLinks.map(([label, path]) => (
            <li key={path}>
              <NavLink to={path}>{label}</NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-clrs">Legal</h3>
        <ul className="grid footer-links">
          {legalLinks.map(([label, path]) => (
            <li key={path}>
              <NavLink to={path}>{label}</NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-clrs">Company</h3>
        <ul className="grid footer-links">
          {companyLinks.map(([label, path]) => (
            <li key={path}>
              <NavLink to={path}>{label}</NavLink>
            </li>
          ))}
        </ul>
      </div>

      <p className="footer-bottom font-clrs">© 2026 Ecommercial Website. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
