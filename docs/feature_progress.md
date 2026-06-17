# Feature Progress Audit

Audit date: 2026-06-17

## Decision Table

| Area | Finding | Decision | Priority |
| --- | --- | --- | --- |
| Auth session | App logged-in state now initializes from `supabase.auth.getSession()` and updates through `supabase.auth.onAuthStateChange()`. | Fixed in auth session refactor. | Done |
| Auth localStorage | Auth no longer uses a manually stored token as the login source of truth. | Fixed; Supabase session is authoritative. | Done |
| Product detail | Product detail route tries cached products, then fetches with `productApi.get(idOrSlug)`. | Fixed. | Done |
| Product action payloads | Product list and detail now use separate actions and state fields, so one product cannot replace the products array. | Fixed. | Done |
| Checkout card data | Checkout no longer collects raw payment fields. | Fixed; payment remains pending. | Done |
| Supabase schema | `supabase/schema.sql` now creates required tables, indexes, RLS, and order policies. | Fixed; run before seed. | Done |
| README | `README.md` now documents the app, setup, Supabase SQL order, deploy steps, limitations, and future work. | Fixed. | Done |
| Public manifest | `public/manifest.json` exists for the CRA manifest link. | Fixed. | Done |
| SPA deploy fallback | Vercel and Netlify configs rewrite SPA deep links to `index.html`. | Fixed. | Done |
| Product action types | Product actions now use `products/request`, `products/success`, `products/failure`, `productDetail/request`, `productDetail/success`, and `productDetail/failure`. | Fixed. | Done |
| Auth selectors | Wrong loading selector was replaced with `selectIsLoading`, plus user/session/initialized/error selectors. | Fixed. | Done |
| Product detail API | `productApi.get(idOrSlug)` is connected and supports numeric id, uuid id, or slug. | Fixed. | Done |
| Placeholder reset | Forgot password calls Supabase `resetPasswordForEmail`. | Fixed. | Done |
| Placeholder content | Blog, contact, static legal/company pages are placeholder copy. | Replace with real content or mark as intentionally static. | Medium |
| Old labels | Product cards no longer check unrelated old category labels. | Fixed. | Done |
| Category slugs | Header/footer links, route config, category UI, API filtering, and seed slugs now use standard skincare slugs. | Fixed. | Done |
| Cart persistence | Cart reducer is persisted with `redux-persist`. | Fixed. | Done |
| Checkout order | Checkout inserts into `orders` and `order_items`, then clears cart on success. | Fixed for demo Supabase deploy. | Done |
| Checkout data | Contact and shipping form data are stored in local checkout component state. | Fixed. | Done |
| Checkout empty cart | Checkout validates non-empty cart before advancing/order creation and shows empty cart text in the summary. | Fixed. | Done |
| Logged-out checkout | `/checkout` remains protected and place order validates logged-in user state. | Fixed for account checkout. | Done |

## Auth

### Login Flow

- UI: `src/components/body/auth page/form.jsx`.
- On submit, dispatches `authAction.loginUser(email, password)`.
- Action calls `authService.login({ email, password })`.
- API calls `supabase.auth.signInWithPassword({ email, password })`.
- Returned `session` and mapped `user` are stored in Redux auth state.
- UI redirects to `/auth/profile` when `isLoggedIn`.

Weak points:

- Remaining limitation: user display name only exists when Supabase user metadata has `full_name`.

### Register Flow

- UI: `src/components/body/auth page/sign-up-form.jsx`.
- On submit, dispatches `registerUser(email, password)`.
- API calls `supabase.auth.signUp({ email, password })`.
- If Supabase returns a session, action stores the session/user state.
- If no token is returned, action dispatches failure with an email confirmation message.

Weak points:

- No profile row creation.
- No name/full_name collection despite `mapUser` reading `user_metadata.full_name`.
- Email confirmation still depends on Supabase project settings.

### Logout Flow

- Header/profile dispatch `authAction.logoutUser()`.
- Action calls `supabase.auth.signOut()` when configured.
- Dispatches logout to clear Redux auth state after Supabase signout.

Weak points:

- Remaining limitation: logout does not clear cart or checkout state.

### Password Reset Flow

- UI: `src/components/body/auth page/forgot-password.jsx`.
- Form dispatches `resetPassword(email)`.
- API calls `supabase.auth.resetPasswordForEmail(email)`.

Decision: completed for basic reset email sending.

### Supabase Session Usage

- Present: sign-in, sign-up, sign-out, session restore, auth state subscription, and reset password email.

### localStorage Token Usage

- Auth no longer reads or writes a manual login token.
- Supabase client storage remains responsible for Supabase's own session persistence.
- Auth reducer is still wrapped in `persistReducer`, but with an empty whitelist so it does not persist stale auth state.

Decision: completed.

### Protected Route Logic

- `ProtectedRoute` in `src/App.jsx` waits for `selectIsInitialized`/`selectIsLoading`, then checks `selectIsLoggedIn`.
- Protects `/checkout` and `/auth/profile`.
- Redirects unauthenticated users to `/auth/login`.

Weak point: loading state currently renders `null` rather than a visible loading screen.

### Guest Route Logic

- `GuestRoute` in `src/App.jsx` waits for initialization, then checks `selectIsLoggedIn`.
- Redirects logged-in users from login/register to `/auth/profile`.

Weak point: loading state currently renders `null` rather than a visible loading screen.

## Products

### Product List Fetch

- `src/App.jsx` dispatches `productAction.fetchProducts()` once on mount.
- `productApi.getAll()` queries `products` joined with `categories(name, slug)`, filters `active = true`, and orders by `created_at desc`.
- Mock products are returned only when `REACT_APP_USE_MOCK_PRODUCTS=true` or Supabase is not configured.

Weak points:

- Remaining limitation: category pages filter the already-loaded Redux list; they do not yet request a category-specific API query.

### Product Detail Fetch

- `productApi.get(idOrSlug)` supports numeric ids, uuid ids, and slugs.
- `fetchProductDetail(idOrSlug)` checks the cached list first, then calls the API.
- `ProductBody` dispatches detail fetch by the route parameter.

Decision: completed.

### Selected Product State

- Dedicated `selectedProduct` state exists.
- Product detail still prefers matching cached products to avoid unnecessary API calls.

### Product Reducer Shape

- Current shape: `{ products: [], selectedProduct: null, loading: false, selectedLoading: false, error: null }`.
- List success writes only `products`.
- Detail success writes only `selectedProduct`.

Decision: completed.

### Product Action Types

- Used list actions: `products/request`, `products/success`, `products/failure`.
- Used detail actions: `productDetail/request`, `productDetail/success`, `productDetail/failure`.

### Mock Product Fallback

- `src/API/productApi.js` has six mock products with ids, slugs, display categories, and category slugs.
- Mock fallback is explicit through `REACT_APP_USE_MOCK_PRODUCTS=true` or missing Supabase config.

Decision: acceptable for local demo fallback.

### Category Slug Consistency

- Seed slugs: `serums`, `moisturizers`, `cleansers`, `eye-care`, `masks`, `suncare`, `toners`, `treatments`.
- Header/footer links use standard slugs: `serums`, `moisturizers`, `cleansers`, `eye-care`, `masks`, `suncare`, `toners`, `treatments`.
- Route config uses the same standard slugs.
- Category filters use `categorySlug` values and display mapped labels.
- `Night Care` was removed because it does not map to a seed category.

Decision: completed.

## Cart

### Add Item

- `ProductInfo.addItemToCart` dispatches `cartAction.addProduct`.
- Reducer normalizes product and increments amount if item exists.

### Edit Item

- Shopping cart card dispatches `editProduct({ id, amount })`.
- Reducer clamps amount to at least 1.

Weak point:

- `CartCard` keeps local `cartAmount` state that can drift from Redux props.
- Decrement logic checks original `amount` prop instead of local next value.

### Remove Item

- Shopping cart and checkout cart cards dispatch `removeProduct({ id })`.

### Clear Cart

- Shopping cart page dispatches `clearProduct()`.

### Persistence After Refresh

- Cart reducer is wrapped in `persistReducer` using key `Cart`.
- Refresh keeps cart contents.

Decision: completed.

### Total Calculation

- Uses `getLineTotal(product)` from `src/utils/product.js`.
- Shopping cart adds tax at 10% and flat shipping of 25000 VND when amount > 0.
- Shopping cart and checkout both use `getCartTotals`, which is based on `getLineTotal`.

Decision: completed.

## Checkout

### Checkout Steps

- `CheckoutState` starts at step `0`.
- Step 1: contact details.
- Step 2: shipping details.
- Step 3: review order.
- Step 4: place order.

### Where Form Data Is Stored

- Contact and shipping form data are stored in local checkout component state.

### Whether Order Is Created

- Yes, when Supabase is configured and the user is logged in.
- Inserts an `orders` row with pending order/payment status.
- Inserts `order_items` rows for each cart item.

### Whether Card Data Is Collected

- No. Checkout shows: "Payment is pending and will be handled by a payment provider later."

Decision: completed.

### Whether Cart Clears After Order

- Cart is cleared after successful order and order item insertion.

### Empty Cart Handling

- Step advancement requires cart items.
- Place order validates cart items.
- Summary shows a clear empty-cart message.

Decision: completed.

### Logged-Out Checkout Handling

- `/checkout` is protected by `ProtectedRoute`.
- Place order also validates logged-in user state.
- Guest checkout controls were removed.

Decision: completed for logged-in account checkout.

## Supabase

### Schema Availability

- `supabase/schema.sql` exists.
- It creates `categories`, `products`, `profiles`, `orders`, and `order_items`.
- It enables RLS and adds public read policies for categories/active products.
- It adds authenticated own-order and own-order-item read/create policies.

### Seed File Assumptions

- Run `supabase/schema.sql` first.
- Then run `supabase/seed-products.sql`.
- Seed slugs remain aligned: `serums`, `moisturizers`, `cleansers`, `eye-care`, `masks`, `suncare`, `toners`, `treatments`.
- It inserts category and product rows and uses `on conflict (slug)`.

### RLS Policies

- Anyone can read categories.
- Anyone can read active products.
- Authenticated users can read their own orders.
- Authenticated users can create their own orders.
- Authenticated users can read order items through owned orders.
- Authenticated users can create order items for owned orders.

### Tables

| Table | Status |
| --- | --- |
| `categories` | Created by `supabase/schema.sql`. |
| `products` | Created by `supabase/schema.sql`. |
| `profiles` | Created by `supabase/schema.sql`. |
| `orders` | Created by `supabase/schema.sql`. |
| `order_items` | Created by `supabase/schema.sql`. |

Decision: completed.

## Dead Or Disconnected Code

### Unused Imports

- No obvious unused imports in inspected source files.
- `StateFour` accepts `props` but does not use it.

### Unused Action Types

- Product action types were replaced with the required list/detail request/success/failure names.

### Unused Selectors

- Wrong auth loading selector was removed.

### Unused API Functions

- Product detail API is connected to the product detail route.
- `productApi.getAll(params)` still supports category params for future server-filtered category pages.

### Unused Components

- All source components appear reachable through routes or imported sections.
- `build/` contains generated artifacts and should not be treated as source.

### Placeholder Pages

- `src/components/body/blog page/body.jsx`
- `src/components/body/contact page/body.jsx`
- `src/components/body/static page/body.jsx`
- `src/components/body/about page/body.jsx` has mostly marketing placeholder copy.

### Old Category Labels

- Product cards use a skincare/neutral category badge and no old unrelated labels.

### Misleading Names

- Product persist config uses key `Products` and persists only the product list.
- Historical auth spelling issue was removed during the session refactor.
- Auth selector naming has been corrected.
- CSS class typo `priamry-btn` appears in JSX.
- Visible app naming now uses `Ecommercial Website`.

### Duplicate Logic

- Shopping cart and checkout still have separate cart card components with overlapping remove/display logic.
- Main page and product listing both map Redux products to `ProductCard`.
- Header and footer repeat category link arrays with slightly different labels.
- Totals now share `getCartTotals`.

## Files To Fix Next

- Payment: add Stripe or PayPal hosted checkout before production payment.
- Admin: add product/order management screens.
- Orders: add customer order history.
- Email: add reset/order confirmation templates in Supabase and the chosen email provider.
- SEO: add per-route metadata and product detail SEO.

## Final Validation

- Bad leftover search is clean for CRA placeholder description, old category labels, old product thunk name, wrong auth selector spelling, checkout card fields, and the old product persist key.
- `npm install` completed with existing audit warnings: 41 vulnerabilities reported by npm audit metadata.
- `npm run build` compiled successfully.
- `npm test -- --watchAll=false` exited with code 1 because no test files exist.
