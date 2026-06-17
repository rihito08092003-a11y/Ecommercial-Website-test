import "./body.css";
import Category from "./categories";
import ProductContainer from "./products";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import productSelector from "../../../store/selectors/productSelector";
import { getDiscount } from "../../../utils/product";

const routeConfig = {
  onsale: { title: "On Sale", type: "onsale" },
  featured: { title: "Featured", type: "newest" },
  trending: { title: "Trending", type: "trending" },
  newest: { title: "Newest", type: "newest" },
  serums: { title: "Serums", type: "category", slug: "serums" },
  moisturizers: { title: "Moisturizers", type: "category", slug: "moisturizers" },
  cleansers: { title: "Cleansers", type: "category", slug: "cleansers" },
  "eye-care": { title: "Eye Care", type: "category", slug: "eye-care" },
  masks: { title: "Masks", type: "category", slug: "masks" },
  suncare: { title: "Suncare", type: "category", slug: "suncare" },
  toners: { title: "Toners", type: "category", slug: "toners" },
  treatments: { title: "Treatments", type: "category", slug: "treatments" },
};

const categoryLabels = {
  serums: "Serums",
  moisturizers: "Moisturizers",
  cleansers: "Cleansers",
  "eye-care": "Eye Care",
  masks: "Masks",
  suncare: "Suncare",
  toners: "Toners",
  treatments: "Treatments",
};

const CategoryBody = () => {
  const { category } = useParams();
  const products = useSelector(productSelector.selectProducts);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const routeKey = (category || "").toLowerCase();
  const route = routeConfig[routeKey];
  const pageTitle = route?.title || "All Products";

  useEffect(() => {
    setSelectedCategory("all");
    setSortBy("featured");
  }, [routeKey]);

  const categories = useMemo(() => {
    const list = products.map((item) => item.categorySlug).filter(Boolean);
    return ["all", ...Array.from(new Set(list))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const baseProducts = products.filter((item) => {
      if (!route) {
        return true;
      }

      if (route.type === "onsale") {
        return getDiscount(item) > 0;
      }

      if (route.type === "newest") {
        return Boolean(item.newest);
      }

      if (route.type === "trending") {
        return Number(item.soldCount || item.sold_count || 0) > 0;
      }

      return (
        item.categorySlug === route.slug
      );
    });

    const selectedProducts =
      selectedCategory === "all"
        ? baseProducts
        : baseProducts.filter((item) => item.categorySlug === selectedCategory);

    return [...selectedProducts].sort((a, b) => {
      const priceA = a.price?.actual ?? a.price?.current ?? 0;
      const priceB = b.price?.actual ?? b.price?.current ?? 0;

      if (route?.type === "onsale" && sortBy === "featured") {
        return getDiscount(b) - getDiscount(a);
      }

      if (route?.type === "trending" && sortBy === "featured") {
        return (
          Number(b.soldCount || b.sold_count || 0) -
          Number(a.soldCount || a.sold_count || 0)
        );
      }

      if (route?.type === "newest" && sortBy === "featured") {
        return Number(b.id) - Number(a.id);
      }

      switch (sortBy) {
        case "az":
          return a.name.localeCompare(b.name);
        case "za":
          return b.name.localeCompare(a.name);
        case "high-low":
          return priceB - priceA;
        case "low-high":
          return priceA - priceB;
        default:
          return 0;
      }
    });
  }, [products, route, selectedCategory, sortBy]);

  return (
    <>
      <main className="primary-body center grid">
        <Category
          categories={categories}
          categoryLabels={categoryLabels}
          pageTitle={pageTitle}
          productCount={filteredProducts.length}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setSortBy={setSortBy}
          sortBy={sortBy}
        />
        <ProductContainer products={filteredProducts} />
      </main>
    </>
  );
};

export default CategoryBody;
