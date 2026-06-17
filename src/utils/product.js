export const normalizeProduct = (product = {}) => {
  const price = product.price || {};
  const actual = Number(price.actual ?? price.current ?? price.sale ?? 0);
  const old = Number(price.old ?? price.original ?? price.regular ?? 0);
  const name = product.name || product.title || "Untitled product";
  const image = product.img || product.image || product.thumbnail || "";
  const category = product.category || "Skincare";
  const slug = product.slug || String(product.id ?? product._id ?? name);
  const categorySlug =
    product.categorySlug ||
    product.category_slug ||
    category.toLowerCase().replace(/\s+/g, "-");
  const description =
    product.desc ||
    product.description ||
    "A carefully selected product for a simple, effective skincare routine.";

  return {
    ...product,
    id: product.id ?? product._id ?? slug,
    slug,
    name,
    image,
    img: image,
    category,
    categorySlug,
    description,
    desc: description,
    price: {
      ...price,
      actual,
      old,
    },
    newest: Boolean(product.newest || product.isNew || product.featured),
    soldCount: Number(product.soldCount ?? product.sold_count ?? 0),
  };
};

export const getDiscount = (product = {}) => {
  const normalized = normalizeProduct(product);
  const { actual, old } = normalized.price;

  if (!actual || !old || old <= actual) {
    return 0;
  }

  return Math.round(100 - (actual / old) * 100);
};

export const getLineTotal = (product = {}) => {
  const normalized = normalizeProduct(product);
  return normalized.price.actual * (Number(product.amount) || 1);
};

export const getCartTotals = (cart = []) => {
  const subtotal = cart.map(getLineTotal).reduce((prev, curr) => prev + curr, 0);
  const tax = subtotal * 0.1;
  const shippingFee = subtotal ? 25000 : 0;
  const total = subtotal + tax + shippingFee;

  return {
    subtotal,
    tax,
    shippingFee,
    total,
  };
};
