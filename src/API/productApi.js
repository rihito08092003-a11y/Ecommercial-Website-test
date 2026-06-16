import { normalizeProduct } from "../utils/product";
import supabase, { isSupabaseConfigured } from "./supabaseClient";

const mockProducts = [
  {
    id: 1,
    name: "Premium Facial Serum",
    price: { actual: 459900, original: 650000 },
    category: "Serums",
    image: "",
    description: "Advanced facial serum with hyaluronic acid",
  },
  {
    id: 2,
    name: "Hydrating Face Cream",
    price: { actual: 389900, original: 550000 },
    category: "Moisturizers",
    image: "",
    description: "Rich moisturizing cream for all skin types",
  },
  {
    id: 3,
    name: "Gentle Cleanser",
    price: { actual: 259900, original: 350000 },
    category: "Cleansers",
    image: "",
    description: "pH-balanced facial cleanser",
  },
  {
    id: 4,
    name: "Eye Care Complex",
    price: { actual: 429900, original: 600000 },
    category: "Eye Care",
    image: "",
    description: "Anti-aging eye treatment cream",
  },
  {
    id: 5,
    name: "Night Treatment Mask",
    price: { actual: 529900, original: 750000 },
    category: "Masks",
    image: "",
    description: "Intensive overnight recovery mask",
  },
  {
    id: 6,
    name: "SPF 50 Sunscreen",
    price: { actual: 359900, original: 499900 },
    category: "Suncare",
    image: "",
    description: "Broad spectrum UV protection",
  },
];

const productApi = {
  getAll: async (params) => {
    try {
      if (!isSupabaseConfigured) {
        throw new Error("Supabase is not configured");
      }

      let query = supabase
        .from("products")
        .select("*, categories(name, slug)")
        .eq("active", true)
        .order("created_at", { ascending: false });

      if (params?.category) {
        query = query.eq("categories.slug", params.category);
      }

      const { data, error } = await query;
      if (error) throw error;

      return {
        products: (data || []).map((item) =>
          normalizeProduct({
            id: item.id,
            name: item.name,
            description: item.description,
            image: item.image_url,
            category: item.categories?.name,
            price: {
              actual: item.price_actual,
              old: item.price_old,
            },
            newest: item.is_new,
            stock: item.stock,
            soldCount: item.sold_count,
          }),
        ),
      };
    } catch (error) {
      console.warn("API Error: Using mock data", error.message);
      return { products: mockProducts.map(normalizeProduct) };
    }
  },
  get: async (id) => {
    try {
      if (!isSupabaseConfigured) {
        throw new Error("Supabase is not configured");
      }

      const { data, error } = await supabase
        .from("products")
        .select("*, categories(name, slug)")
        .eq("id", id)
        .single();

      if (error) throw error;

      return {
        product: normalizeProduct({
          id: data.id,
          name: data.name,
          description: data.description,
          image: data.image_url,
          category: data.categories?.name,
          price: {
            actual: data.price_actual,
            old: data.price_old,
          },
          newest: data.is_new,
          stock: data.stock,
          soldCount: data.sold_count,
        }),
      };
    } catch (error) {
      console.warn("API Error: Using mock data for ID", id);
      return {
        product:
          normalizeProduct(
            mockProducts.find((p) => p.id === parseInt(id)) || mockProducts[0],
          ),
      };
    }
  },
};

export default productApi;
