# Setup And Run

## Project

This is a Create React App project.

## Install

```bash
npm install
```

## Environment

Use `.env.example` as the template for a local `.env` file:

```text
REACT_APP_SUPABASE_URL=...
REACT_APP_SUPABASE_ANON_KEY=...
REACT_APP_USE_MOCK_PRODUCTS=false
```

Do not commit `.env`; it is ignored by `.gitignore`.

## Run Locally

```bash
npm start
```

The CRA dev server normally runs at `http://localhost:3000`.

## Build

```bash
npm run build
```

## Test

```bash
npm test -- --watchAll=false
```

Final validation result: CRA found no test files and exited with code 1. Add tests or run with `--passWithNoTests` only if that behavior is acceptable for CI.

## Final Validation Commands

```bash
npm install
npm run build
npm test -- --watchAll=false
```

`npm run build` compiled successfully during final validation.

## Supabase Setup

Run SQL in this order:

1. `supabase/schema.sql`
2. `supabase/seed-products.sql`

`schema.sql` creates:

- `public.categories`
- `public.products`
- `public.profiles`
- `public.orders`
- `public.order_items`
- indexes and RLS policies required for catalog reads and owned order access

## Deploy Notes

- Vercel uses `vercel.json` to rewrite all routes to `index.html`.
- Netlify uses `netlify.toml` to build `npm run build`, publish `build`, and redirect all routes to `index.html`.
- Configure Supabase environment variables in the host dashboard. Do not deploy a real `.env` file.
