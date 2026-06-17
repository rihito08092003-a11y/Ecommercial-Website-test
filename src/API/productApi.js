import { normalizeProduct } from "../utils/product";
import supabase, { isSupabaseConfigured } from "./supabaseClient";

const mockProducts = [
  {
    id: 1,
    slug: "premium-facial-serum",
    name: "Premium Facial Serum",
    price: { actual: 459900, original: 650000 },
    category: "Serums",
    categorySlug: "serums",
    image: "",
    description: "Advanced facial serum with hyaluronic acid",
  },
  {
    id: 2,
    slug: "hydrating-face-cream",
    name: "Hydrating Face Cream",
    price: { actual: 389900, original: 550000 },
    category: "Moisturizers",
    categorySlug: "moisturizers",
    image: "",
    description: "Rich moisturizing cream for all skin types",
  },
  {
    id: 3,
    slug: "gentle-cleanser",
    name: "Gentle Cleanser",
    price: { actual: 259900, original: 350000 },
    category: "Cleansers",
    categorySlug: "cleansers",
    image: "",
    description: "pH-balanced facial cleanser",
  },
  {
    id: 4,
    slug: "eye-care-complex",
    name: "Eye Care Complex",
    price: { actual: 429900, original: 600000 },
    category: "Eye Care",
    categorySlug: "eye-care",
    image: "",
    description: "Anti-aging eye treatment cream",
  },
  {
    id: 5,
    slug: "night-treatment-mask",
    name: "Night Treatment Mask",
    price: { actual: 529900, original: 750000 },
    category: "Masks",
    categorySlug: "masks",
    image: "",
    description: "Intensive overnight recovery mask",
  },
  {
    id: 6,
    slug: "spf-50-sunscreen",
    name: "SPF 50 Sunscreen",
    price: { actual: 359900, original: 499900 },
    category: "Suncare",
    categorySlug: "suncare",
    image: "",
    description: "Broad spectrum UV protection",
  },
];

const useMockProducts = process.env.REACT_APP_USE_MOCK_PRODUCTS === "true";
const canUseMockProducts = useMockProducts || !isSupabaseConfigured;
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const mapSupabaseProduct = (item) =>
  normalizeProduct({
    id: item.id,
    slug: item.slug,
    name: item.name,
    description: item.description,
    image: item.image_url,
    category: item.categories?.name,
    categorySlug: item.categories?.slug,
    price: {
      actual: item.price_actual,
      old: item.price_old,
    },
    newest: item.is_new,
    stock: item.stock,
    soldCount: item.sold_count,
  });

const getMockProducts = () => mockProducts.map(normalizeProduct);

const findMockProduct = (idOrSlug) => {
  const value = String(idOrSlug);
  return getMockProducts().find(
    (product) => String(product.id) === value || product.slug === value,
  );
};

const productApi = {
  getAll: async (params) => {
    if (useMockProducts) {
      const products = getMockProducts();
      return {
        products: params?.category
          ? products.filter((item) => item.categorySlug === params.category)
          : products,
      };
    }

    if (!isSupabaseConfigured) {
      return { products: getMockProducts() };
    }

    try {
      let query = supabase
        .from("products")
        .select("*, categories!inner(name, slug)")
        .eq("active", true)
        .order("created_at", { ascending: false });

      if (params?.category) {
        query = query.eq("categories.slug", params.category);
      }

      const { data, error } = await query;
      if (error) throw error;

      return {
        products: (data || []).map(mapSupabaseProduct),
      };
    } catch (error) {
      if (canUseMockProducts) {
        console.warn("API Error: Using mock data", error.message);
        return { products: getMockProducts() };
      }

      throw error;
    }
  },
  get: async (idOrSlug) => {
    if (useMockProducts) {
      return { product: findMockProduct(idOrSlug) || null };
    }

    if (!isSupabaseConfigured) {
      return { product: findMockProduct(idOrSlug) || null };
    }

    try {
      const value = String(idOrSlug);
      const isNumericId = /^\d+$/.test(value);
      let query = supabase
        .from("products")
        .select("*, categories(name, slug)")
        .eq("active", true);

      if (isNumericId || uuidPattern.test(value)) {
        query = query.eq("id", isNumericId ? Number(value) : value);
      } else {
        query = query.eq("slug", value);
      }

      const { data, error } = await query.maybeSingle();

      if (error) throw error;

      return {
        product: data ? mapSupabaseProduct(data) : null,
      };
    } catch (error) {
      if (canUseMockProducts) {
        console.warn("API Error: Using mock data for product", idOrSlug);
        return { product: findMockProduct(idOrSlug) || null };
      }

      throw error;
    }
  },
};

export default productApi;
