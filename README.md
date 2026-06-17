# Ecommercial Website

Ecommercial Website is a skincare e-commerce demo built with React, Redux, React Router, and Supabase. It includes a connected product catalog, auth, persistent cart, protected checkout, and pending-order creation for demo deployments.

## Tech Stack

- React 18 and Create React App
- React Router DOM 6
- Redux, Redux Thunk, Reselect, Redux Persist
- Supabase Auth and Postgres
- Vercel or Netlify static hosting

## Features

- Skincare product catalog loaded from Supabase
- Product detail routes by id or slug
- Category, sale, newest, trending, and search views
- Supabase login, registration, logout, and password reset
- Persistent cart with subtotal, tax, shipping fee, and total
- Protected checkout for logged-in users
- Pending order and order item creation in Supabase
- Safe checkout demo flow with no raw card data collection

## Local Setup

Install dependencies:

```bash
npm install
```

Copy the environment template:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

## Environment Variables

```text
REACT_APP_SUPABASE_URL=
REACT_APP_SUPABASE_ANON_KEY=
REACT_APP_USE_MOCK_PRODUCTS=false
```

Use real Supabase values only in local or host-provided environment variables. Do not commit `.env`.

`REACT_APP_USE_MOCK_PRODUCTS=true` can be used for local product-catalog demo data. Checkout still requires Supabase and does not create fake production orders.

## Supabase Setup

Create a Supabase project, then run the SQL files in this order from the Supabase SQL editor:

1. `supabase/schema.sql`
2. `supabase/seed-products.sql`

`schema.sql` creates:

- `categories`
- `products`
- `profiles`
- `orders`
- `order_items`
- indexes and row-level security policies

`seed-products.sql` inserts the skincare category and product data.

## Scripts

Start the development server:

```bash
npm start
```

Create a production build:

```bash
npm run build
```

Run tests once in CI-style mode:

```bash
npm test -- --watchAll=false
```

## Vercel Deploy

1. Import the repository into Vercel.
2. Set the environment variables from `.env.example`.
3. Use the default Create React App build command: `npm run build`.
4. Use `build` as the output directory.
5. Keep `vercel.json`; it rewrites SPA routes to `index.html`.

## Netlify Deploy

1. Import the repository into Netlify.
2. Set the environment variables from `.env.example`.
3. Build command: `npm run build`.
4. Publish directory: `build`.
5. Keep `netlify.toml`; it redirects SPA routes to `index.html`.

## SPA Rewrite Notes

The app uses `BrowserRouter`, so direct visits to routes such as `/product/premium-facial-serum` or `/checkout` must serve `index.html`. `vercel.json` and `netlify.toml` include this fallback behavior.

## Known Limitations

- Payment provider integration is not implemented; orders remain `payment_status = pending`.
- Checkout inserts orders and order items separately, without a database transaction wrapper.
- Profile rows are not auto-created by an auth trigger yet.
- Static content pages are placeholders.
- Product management/admin workflows are not implemented.

## Future Improvements

- Add payment provider checkout and webhook handling.
- Add profile creation trigger and profile editing UI.
- Add admin product/category/order management.
- Move order creation into a Supabase RPC for transactional safety.
- Replace placeholder static pages with real content.
