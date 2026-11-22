-- ========================================================
-- Supabase Database Schema for Shanmugavel Portfolio Blog
-- Project URL: https://vbvcqjcpdngfhvbvecfh.supabase.co
-- ========================================================
--
-- Instructions:
-- 1. Open your Supabase Dashboard:
--    https://supabase.com/dashboard/project/vbvcqjcpdngfhvbvecfh/sql/new
-- 2. Paste this entire SQL script into the SQL Editor.
-- 3. Click "RUN" to create the blogs table and security policies.

-- 1. Create the blogs table
create table if not exists public.blogs (
  id text primary key,
  title text not null,
  slug text unique not null,
  excerpt text default '',
  content text default '',
  cover_image text default '',
  category text default 'Web Development',
  tags text[] default '{}',
  author jsonb default '{"name":"Shanmugavel","role":"Website Developer & Growth Specialist","avatar":"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}'::jsonb,
  published_at text default '',
  read_time text default '5 min read',
  status text default 'published',
  views integer default 0,
  featured boolean default false,
  seo_title text default '',
  seo_description text default '',
  created_at timestamptz default timezone('utc'::text, now()),
  updated_at timestamptz default timezone('utc'::text, now())
);

-- 2. Create index on slug for fast lookups
create index if not exists idx_blogs_slug on public.blogs (slug);
create index if not exists idx_blogs_status on public.blogs (status);
create index if not exists idx_blogs_category on public.blogs (category);

-- 3. Enable Row Level Security (RLS) - CRITICAL FOR PRODUCTION DEFENSE
alter table public.blogs enable row level security;

-- 4. Clean up any existing policies
drop policy if exists "Allow public read access" on public.blogs;
drop policy if exists "Allow admin management" on public.blogs;
drop policy if exists "Allow authenticated admin insert" on public.blogs;
drop policy if exists "Allow authenticated admin update" on public.blogs;
drop policy if exists "Allow authenticated admin delete" on public.blogs;

-- 5. Read Policy: Everyone (public visitors) can read articles
create policy "Allow public read access" 
  on public.blogs 
  for select 
  using (true);

-- 6. Write Policies: ONLY Authenticated Admins (logged in via Auth) can Insert, Update, or Delete
create policy "Allow authenticated admin insert" 
  on public.blogs 
  for insert 
  to authenticated 
  with check (auth.role() = 'authenticated');

create policy "Allow authenticated admin update" 
  on public.blogs 
  for update 
  to authenticated 
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Allow authenticated admin delete" 
  on public.blogs 
  for delete 
  to authenticated 
  using (auth.role() = 'authenticated');
