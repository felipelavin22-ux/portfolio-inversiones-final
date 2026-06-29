-- Vault - Supabase schema and seed data

create extension if not exists pgcrypto;

create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  ticker text not null check (char_length(ticker) between 1 and 10),
  type text not null check (type in ('stock', 'crypto', 'bond', 'etf', 'real_estate', 'other')),
  currency text not null default 'USD' check (currency in ('USD', 'ARS', 'EUR')),
  target_allocation numeric(5,2) not null default 0 check (target_allocation >= 0 and target_allocation <= 100),
  created_at timestamptz not null default now(),
  unique(ticker, type)
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  asset_id uuid not null references public.assets(id) on delete cascade,
  type text not null check (type in ('buy', 'sell')),
  quantity numeric(18,8) not null check (quantity > 0),
  price_per_unit numeric(18,4) not null check (price_per_unit > 0),
  date date not null default current_date,
  notes text check (char_length(notes) <= 500),
  created_at timestamptz not null default now()
);

create index if not exists idx_transactions_asset_id on public.transactions(asset_id);
create index if not exists idx_transactions_date on public.transactions(date desc);

alter table public.assets enable row level security;
alter table public.transactions enable row level security;

drop policy if exists "Public read assets" on public.assets;
drop policy if exists "Public insert assets" on public.assets;
drop policy if exists "Public update assets" on public.assets;
drop policy if exists "Public delete assets" on public.assets;
drop policy if exists "Public read transactions" on public.transactions;
drop policy if exists "Public insert transactions" on public.transactions;
drop policy if exists "Public update transactions" on public.transactions;
drop policy if exists "Public delete transactions" on public.transactions;

create policy "Public read assets" on public.assets for select using (true);
create policy "Public insert assets" on public.assets for insert with check (true);
create policy "Public update assets" on public.assets for update using (true);
create policy "Public delete assets" on public.assets for delete using (true);
create policy "Public read transactions" on public.transactions for select using (true);
create policy "Public insert transactions" on public.transactions for insert with check (true);
create policy "Public update transactions" on public.transactions for update using (true);
create policy "Public delete transactions" on public.transactions for delete using (true);

insert into public.assets (id, name, ticker, type, currency, target_allocation) values
  ('a1000000-0000-0000-0000-000000000001', 'Apple Inc.', 'AAPL', 'stock', 'USD', 22),
  ('a1000000-0000-0000-0000-000000000002', 'Bitcoin', 'BTC', 'crypto', 'USD', 20),
  ('a1000000-0000-0000-0000-000000000003', 'Ethereum', 'ETH', 'crypto', 'USD', 14),
  ('a1000000-0000-0000-0000-000000000004', 'S&P 500 ETF', 'VOO', 'etf', 'USD', 32),
  ('a1000000-0000-0000-0000-000000000005', 'Bono AL30', 'AL30', 'bond', 'ARS', 12)
on conflict (ticker, type) do nothing;

insert into public.transactions (asset_id, type, quantity, price_per_unit, date, notes) values
  ('a1000000-0000-0000-0000-000000000001', 'buy', 5, 165, '2026-01-15', 'Primera compra del trimestre'),
  ('a1000000-0000-0000-0000-000000000001', 'sell', 1, 195, '2026-04-20', 'Toma parcial de ganancias'),
  ('a1000000-0000-0000-0000-000000000002', 'buy', 0.05, 42000, '2026-02-01', 'Entrada inicial'),
  ('a1000000-0000-0000-0000-000000000003', 'buy', 1.5, 2400, '2026-02-10', null),
  ('a1000000-0000-0000-0000-000000000004', 'buy', 4, 420, '2026-01-08', 'DCA mensual'),
  ('a1000000-0000-0000-0000-000000000005', 'buy', 100, 52, '2026-03-15', 'Cobertura en pesos');
