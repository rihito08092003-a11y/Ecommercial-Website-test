# Project Structure

Real current tree up to 3 levels deep, excluding `.git` and `node_modules`.

```text
.
├── build/
│   ├── asset-manifest.json
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   └── static/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   └── manifest.json
├── src/
│   ├── API/
│   │   ├── authApi.js
│   │   ├── productApi.js
│   │   └── supabaseClient.js
│   ├── asset/
│   │   ├── bag.png
│   │   ├── icons8-graph-64.png
│   │   ├── icons8-heart-50.png
│   │   ├── icons8-heart-filled-50 .png
│   │   ├── icons8-info-48.png
│   │   ├── icons8-new-50.png
│   │   ├── icons8-sale-50.png
│   │   ├── icons8-successful-delivery-50.png
│   │   └── sad.png
│   ├── components/
│   │   ├── body/
│   │   ├── footer/
│   │   ├── header/
│   │   ├── layout/
│   │   ├── blog-card.jsx
│   │   ├── categories-card.jsx
│   │   ├── customer-reviews.jsx
│   │   ├── display.js
│   │   ├── product-card.jsx
│   │   ├── product-image.jsx
│   │   ├── review-card.jsx
│   │   ├── secondary-text.jsx
│   │   └── section-title.jsx
│   ├── hooks/
│   │   └── useScrollToTop.js
│   ├── store/
│   │   ├── actions/
│   │   ├── reducers/
│   │   ├── selectors/
│   │   └── store.js
│   ├── utils/
│   │   └── product.js
│   ├── App.css
│   ├── App.jsx
│   └── index.jsx
├── supabase/
│   ├── schema.sql
│   └── seed-products.sql
├── .env.example
├── .env
├── .gitignore
├── netlify.toml
├── package-lock.json
├── package.json
├── vercel.json
└── README.md
```

Notes:

- `build/` is present locally, but `.gitignore` excludes `/build`.
- `public/manifest.json` is referenced by `public/index.html` but is not present.
- `public/_redirects` is not present.
- `docs/` was created for this audit.
- `supabase/schema.sql` must be run before `supabase/seed-products.sql`.
