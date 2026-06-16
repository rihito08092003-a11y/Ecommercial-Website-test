import About from "./about";
import Blog from "./blog";
import "./body.css";
import Categories from "./categories";
import Home from "./home";
import ListProducts from "./products";
import Review from "./review";

const MainPage = () => {
  return (
    <>
      <main className="primary-body center grid">
        <Home />
        <Categories />
        <ListProducts />
        <About />
        <Review />
        <Blog />
      </main>
    </>
  );
};
export default MainPage;
