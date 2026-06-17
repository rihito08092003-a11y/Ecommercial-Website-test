-- Ecommercial Website Supabase schema
-- Run before supabase/seed-products.sql.

create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  created_at timestamptz default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id),
  slug text unique not null,
  name text not null,
  description text,
  image_url text,
  price_actual numeric not null,
  price_old numeric,
  is_new boolean default false,
  stock integer default 0,
  sold_count integer default 0,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  email text not null,
  full_name text not null,
  phone text,
  shipping_address text not null,
  subtotal numeric not null,
  tax numeric not null,
  shipping_fee numeric not null,
  total numeric not null,
  status text not null default 'pending',
  payment_status text not null default 'pending',
  created_at timestamptz default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  product_name text not null,
  quantity integer not null,
  unit_price numeric not null,
  line_total numeric not null,
  created_at timestamptz default now()
);

create index if not exists products_slug_idx on public.products(slug);
create index if not exists products_category_id_idx on public.products(category_id);
create index if not exists products_active_idx on public.products(active);
create index if not exists categories_slug_idx on public.categories(slug);
create index if not exists orders_user_id_idx on public.orders(user_id);
create index if not exists order_items_order_id_idx on public.order_items(order_id);

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "Anyone can read categories" on public.categories;
create policy "Anyone can read categories"
on public.categories
for select
using (true);

drop policy if exists "Anyone can read active products" on public.products;
create policy "Anyone can read active products"
on public.products
for select
using (active = true);

drop policy if exists "Users can read own orders" on public.orders;
create policy "Users can read own orders"
on public.orders
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can create own orders" on public.orders;
create policy "Users can create own orders"
on public.orders
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can read own order items" on public.order_items;
create policy "Users can read own order items"
on public.order_items
for select
to authenticated
using (
  exists (
    select 1
    from public.orders
    where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
  )
);

drop policy if exists "Users can create order items for own orders" on public.order_items;
create policy "Users can create order items for own orders"
on public.order_items
for insert
to authenticated
with check (
  exists (
    select 1
    from public.orders
    where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
  )
);
