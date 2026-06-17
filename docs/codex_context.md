# Codex Context

Audit date: 2026-06-17

## Framework

- React 18.1.0
- Create React App via `react-scripts` 5.0.1
- React Router DOM 6.3.0
- Redux 4 with `redux-thunk`, `react-redux`, `reselect`, and partial `redux-persist`
- Supabase JS 2.108.1

## App Type

Client-side e-commerce storefront for skincare products. It has product listing, category filtering, product detail display, cart, auth screens, profile, checkout stepper, and static informational pages.

## Backend Dependency

Supabase is the intended backend dependency.

- Products are fetched from `public.products` joined to `public.categories`.
- Auth uses Supabase email/password sign-in and sign-up.
- Checkout creates pending rows in `public.orders` and `public.order_items`.
- `supabase/schema.sql` defines the app tables, indexes, and RLS policies. `supabase/seed-products.sql` seeds skincare categories and products.

## Env Variables

Detected from `.env` and source:

- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`
- `REACT_APP_USE_MOCK_PRODUCTS`

Values are intentionally not recorded here.

## Current Feature Status

- Routing: Connected in `src/App.jsx`.
- Auth: Uses Supabase session recovery and auth state changes as the source of truth.
- Products: Product list and product detail are connected through separate Redux list/detail state. Product detail tries cached products first, then Supabase by id or slug.
- Cart: Connected to Redux actions/reducer and persisted with `redux-persist`.
- Checkout: Connected to Supabase order/order item inserts for logged-in users, stores local form data, clears cart after successful order, and leaves payment pending.
- Static/content pages: Mostly placeholders.

## Deploy Risks

- `public/manifest.json` exists for the CRA manifest link.
- `vercel.json` and `netlify.toml` provide SPA rewrites for BrowserRouter deep links.
- README now documents setup, Supabase SQL order, and Vercel/Netlify deployment.
- Supabase schema is defined in `supabase/schema.sql`; run it before `supabase/seed-products.sql`.
- Auth route guards wait for Supabase session initialization before redirecting.
- Checkout does not collect raw payment data; payment remains pending for a future payment provider.
- `build/` exists locally but is ignored; avoid treating it as source.

## Supabase SQL Files

- `supabase/schema.sql`: Creates categories, products, profiles, orders, and order_items tables; indexes; RLS; and read/create policies.
- `supabase/seed-products.sql`: Seeds aligned skincare categories and products after schema creation.

Execution order:

1. `supabase/schema.sql`
2. `supabase/seed-products.sql`

## Routing Control Files

- `src/index.jsx`: Wraps app with `BrowserRouter`, Redux provider, and `PersistGate`.
- `src/App.jsx`: Defines all routes, `ProtectedRoute`, and `GuestRoute`.
- `src/components/layout/main-layout.jsx`: Shared layout with header, outlet, and footer.
- `src/components/header/header.jsx`: Main navigation/search links.
- `src/components/footer/footer.jsx`: Footer navigation links.

## Auth Control Files

- `src/API/authApi.js`: Supabase `signInWithPassword`, `signUp`, `signOut`.
- `src/store/actions/auth.js`: Supabase session initialization, login, register, logout, reset password thunks.
- `src/store/reducers/auth.js`: Flat auth state with `user`, `session`, `isLoading`, `isInitialized`, `isLoggedIn`, and `error`.
- `src/store/selectors/authSelector.js`: Auth, user, session, loading, initialized, logged-in, and error selectors.
- `src/App.jsx`: `ProtectedRoute` and `GuestRoute`.
- `src/components/body/auth page/form.jsx`: Login form.
- `src/components/body/auth page/sign-up-form.jsx`: Register form.
- `src/components/body/auth page/forgot-password.jsx`: Supabase password reset form.
- `src/components/body/auth page/profile.jsx`: Profile/logout screen.

## Products Control Files

- `src/API/productApi.js`: Supabase product list/detail API, id/uuid/slug lookup, category filtering, and explicit mock fallback rules.
- `src/utils/product.js`: Product normalization, discount calculation, line total helper.
- `src/store/actions/product.js`: Product list/detail request, success, and failure thunks.
- `src/store/reducers/product.js`: Product list/detail state.
- `src/store/selectors/productSelector.js`: Product list/detail/loading/error selectors.
- `src/App.jsx`: Fetches product list on app mount.
- `src/components/body/product page/products.jsx`: Product listing page.
- `src/components/body/product page/body.jsx`: Product detail route reads cache first, then fetches detail by id or slug.
- `src/components/product-card.jsx`: Product card display and product links.
- `src/components/product-image.jsx`: Product image/fallback display.
- `src/components/body/category page/body.jsx`: Category, sale, newest, trending filters.
- `src/components/body/search page/body.jsx`: Search over Redux product list.

## Cart Control Files

- `src/store/actions/cart.js`: Add, edit, remove, clear actions.
- `src/store/reducers/cart.js`: Cart reducer.
- `src/store/selectors/cartSelector.js`: Cart selector.
- `src/components/body/product page/product-info.jsx`: Add to cart from product detail.
- `src/components/body/shopping cart page/body.jsx`: Cart summary, total, clear, checkout link.
- `src/components/body/shopping cart page/cart-card.jsx`: Quantity editing and removal.
- `src/components/body/checkout page/cart-card.jsx`: Checkout cart item removal.

## Checkout Control Files

- `src/App.jsx`: Protects `/checkout`.
- `src/components/body/checkout page/body.jsx`: Checkout page shell.
- `src/components/body/checkout page/checkout-state.jsx`: Stepper state, form data, Supabase order creation, and cart summary.
- `src/components/body/checkout page/state-1.jsx`: Contact details.
- `src/components/body/checkout page/state-2.jsx`: Shipping form.
- `src/components/body/checkout page/state-3.jsx`: Review order and pending payment note.
- `src/components/body/checkout page/state-4.jsx`: Place order and success screen.
- `src/components/body/checkout page/cart-card.jsx`: Checkout cart item display/removal.
