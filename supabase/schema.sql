-- Candori — minimal Supabase schema.
-- Run this once against a new Supabase project (SQL Editor, or `supabase db push`).
--
-- Design: only completion *dates* are stored server-side. Streak/week are
-- always derived client-side from this table (see src/lib/streak.ts) — no
-- denormalized counters to keep in sync. Reflections are NEVER written here;
-- they stay in localStorage only (see src/screens/Reflection.tsx).

create table if not exists public.completions (
  user_id uuid not null references auth.users (id) on delete cascade,
  completed_on date not null,
  created_at timestamptz not null default now(),
  primary key (user_id, completed_on)
);

alter table public.completions enable row level security;

-- Owner-only read
create policy "completions_select_own"
  on public.completions for select
  using (auth.uid() = user_id);

-- Owner-only insert (upsert on the client uses this + the PK for idempotency)
create policy "completions_insert_own"
  on public.completions for insert
  with check (auth.uid() = user_id);

-- No update/delete policy: completions are append-only from the client.
