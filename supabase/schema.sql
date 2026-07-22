-- Run this in the Supabase SQL editor (or via `supabase db push`) to set up the schema.

create extension if not exists "pgcrypto";

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text,
  phone text not null,
  email text not null,
  category text,
  problem_description text not null,
  proposed_solution text,
  language text not null check (language in ('ru', 'kz')),
  status text not null default 'new' check (status in ('new', 'reviewed', 'in_progress', 'resolved'))
);

create index if not exists submissions_created_at_idx on public.submissions (created_at desc);
create index if not exists submissions_category_idx on public.submissions (category);

-- Row Level Security: writes only happen through the server-side API route
-- using the service role key, which bypasses RLS. Keep the table locked down
-- for the anon/public role.
alter table public.submissions enable row level security;
