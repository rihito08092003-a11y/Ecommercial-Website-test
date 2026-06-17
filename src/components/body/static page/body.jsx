import { Link, useLocation } from "react-router-dom";
import SecondaryText from "../../secondary-text";
import Title from "../../section-title";

const content = {
  "/terms": ["Legal", "Terms of Service"],
  "/privacy": ["Legal", "Privacy Policy"],
  "/returns": ["Legal", "Return Policy"],
  "/shipping": ["Legal", "Shipping"],
  "/data-protection": ["Legal", "Data Protection"],
  "/team": ["Company", "Our Team"],
  "/careers": ["Company", "Careers"],
  "/vision": ["Company", "Vision"],
  "/culture": ["Company", "Culture"],
};

const StaticPage = () => {
  const { pathname } = useLocation();
  const [eyebrow, title] = content[pathname] || ["Ecommercial Website", "Information"];

  return (
    <main className="primary-body center grid">
      <section className="static-page grid center">
        <SecondaryText text={eyebrow} center />
        <Title title={title} center />
        <p className="font-clrs">
          This page is wired into the route system and ready for real content.
          Publish policy or company copy here when the content source is ready.
        </p>
        <Link className="btn primary-bg fs-300 center" to="/product">
          Browse products
        </Link>
      </section>
    </main>
  );
};

export default StaticPage;
