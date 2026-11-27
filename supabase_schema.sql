-- ========================================================
-- Supabase Database Schema for Shanmugavel Portfolio Blog
-- Project URL: https://vbvcqjcpdngfhvbvecfh.supabase.co
-- ========================================================
--
-- QUICK FIX INSTRUCTIONS (Takes less than 1 minute):
-- 1. Open your Supabase SQL Editor in your browser:
--    https://supabase.com/dashboard/project/vbvcqjcpdngfhvbvecfh/sql/new
-- 2. Select All & Copy this entire SQL file.
-- 3. Paste it into the Supabase SQL Editor and click "RUN" (green button).
-- 4. Done! All blog posts published from your Admin Dashboard
--    will now immediately load on the website for all normal visitors
--    and in Incognito mode!
-- ========================================================

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

-- 2. Create indexes for fast lookup & high-traffic performance
create index if not exists idx_blogs_slug on public.blogs (slug);
create index if not exists idx_blogs_status on public.blogs (status);
create index if not exists idx_blogs_category on public.blogs (category);
create index if not exists idx_blogs_published_at on public.blogs (published_at desc);

-- 3. Enable Row Level Security (RLS)
alter table public.blogs enable row level security;

-- 4. Clean up any existing policies
drop policy if exists "Allow public read access" on public.blogs;
drop policy if exists "Allow admin management" on public.blogs;
drop policy if exists "Allow authenticated admin insert" on public.blogs;
drop policy if exists "Allow authenticated admin update" on public.blogs;
drop policy if exists "Allow authenticated admin delete" on public.blogs;
drop policy if exists "Allow all read and write" on public.blogs;
drop policy if exists "Allow full public and admin access" on public.blogs;

-- 5. Read Policy: Everyone (public visitors, normal users, Incognito mode) can read articles
create policy "Allow public read access" 
  on public.blogs 
  for select 
  using (true);

-- 6. Write Policies: Allow insert, update, delete from the Admin Dashboard
create policy "Allow full public and admin access"
  on public.blogs 
  for all 
  using (true)
  with check (true);

-- 7. Grant permissions to anon, authenticated, and service_role
grant all on public.blogs to anon;
grant all on public.blogs to authenticated;
grant all on public.blogs to service_role;

-- 8. Seed the default articles so your database has initial content right away
insert into public.blogs (id, title, slug, excerpt, content, cover_image, category, tags, published_at, read_time, status, views, featured, seo_title, seo_description)
values 
(
  'post-1',
  'How We Reduced Page Load Time from 6.8s to 1.1s for a High-Volume D2C Brand',
  'reduce-page-load-time-d2c-wordpress',
  'A deep dive into diagnosing render-blocking scripts, database query bloat, asset hydration overhead, and transforming a sluggish WooCommerce store into a lightning-fast conversion engine.',
  '<h2>The Problem: High Traffic, Sub-1% Conversion, and Terrible Latency</h2><p>When the client approached me, their apparel brand was spending heavily on Meta and Google Ads, driving over 50,000 monthly visitors. However, the store''s conversion rate was hovering at an abysmal <strong>0.85%</strong>.</p><p>Running a thorough audit across Google PageSpeed Insights and WebPageTest revealed severe bottlenecks.</p><h2>The Results: 1.1s Page Load and 140% Increase in Checkouts</h2><p>Within 48 hours of rolling out the new architecture, LCP dropped to <strong>1.1 seconds</strong> and checkout conversion jumped to <strong>2.05% (+140%)</strong>.</p>',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80',
  'Speed Optimization',
  array['WordPress', 'Core Web Vitals', 'WooCommerce', 'Performance'],
  '2026-03-15',
  '6 min read',
  'published',
  1420,
  true,
  'Case Study: Speed Optimization from 6.8s to 1.1s | Shanmu',
  'Learn how Shanmu optimized a high-volume D2C WooCommerce store, slashing load times to 1.1s and boosting conversion rates by 140%.'
),
(
  'post-2',
  'Why Custom WordPress Architecture Outperforms Bloated Theme Builders in 2026',
  'custom-wordpress-vs-bloated-theme-builders',
  'Why relying on drag-and-drop page builders with 150 HTTP requests hurts your SEO, slows down mobile users, and costs your business thousands in lost leads.',
  '<h2>The Illusion of Drag-and-Drop Builders</h2><p>Pre-made WordPress themes and visual page builders promise instant results without touching code. While they allow quick prototypes, they introduce catastrophic technical debt for serious businesses.</p><h2>The Custom WordPress Solution</h2><p>By building with tailored Gutenberg blocks, custom post types, and lightweight PHP rendering, your website achieves sub-second loading out of the box with 100/100 Core Web Vitals scores.</p>',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=80',
  'WordPress & WooCommerce',
  array['WordPress', 'Web Engineering', 'Clean Code', 'SEO'],
  '2026-03-02',
  '5 min read',
  'published',
  980,
  false,
  'Custom WordPress vs Theme Builders | Shanmu Web Engineering',
  'Discover why modern custom WordPress development beats bloated pre-made themes for Google rankings, speed, and long-term maintainability.'
),
(
  'post-3',
  'Local SEO Playbook: How to Dominate Google Rankings in Coimbatore & Tier-2 Tech Hubs',
  'local-seo-playbook-coimbatore-tier2',
  'A step-by-step blueprint for service businesses and industrial brands to capture high-intent commercial keywords and generate 50+ monthly inbound RFQs.',
  '<h2>Why Local Search Intent Converts at 40%+</h2><p>When decision-makers search for <em>"industrial website developer in Coimbatore"</em>, they have active budget and urgent requirements.</p><h2>The 4 Pillars of Local SEO Domination</h2><p>Hyper-localized schema markup, pillar & cluster content silos, and Google Business Profile signal consistency.</p>',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1400&q=80',
  'SEO & Growth',
  array['Local SEO', 'Lead Gen', 'Google Search', 'B2B'],
  '2026-02-18',
  '7 min read',
  'published',
  1890,
  true,
  'Local SEO Playbook for B2B & Service Brands | Shanmu',
  'Master local SEO ranking signals, schema markup, and geo-targeted landing page strategies to dominate Google search results.'
),
(
  'post-4',
  'Designing High-Converting B2B SaaS Landing Pages: The Editorial Dark Mode Approach',
  'designing-high-converting-b2b-saas-landing-pages',
  'Explore how combining typography-driven editorial design with subtle glassmorphism and interactive ROI calculators increases demo bookings by 3.4x.',
  '<h2>The Problem with Generic SaaS Templates</h2><p>Most SaaS landing pages look identical: generic purple gradients and floating 3D spheres. Buyers are fatigued by generic layouts.</p><h2>The Editorial Aesthetic: Authority Through Typography</h2><p>By contrasting refined serif headers with clean sans-serif body copy and emerald/gold accents, your product communicates heritage and premium value.</p>',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
  'UI/UX & Branding',
  array['UI/UX', 'Editorial Design', 'Conversion Rate', 'SaaS'],
  '2026-01-28',
  '4 min read',
  'published',
  760,
  false,
  'Designing High-Converting B2B SaaS Landing Pages | Shanmu',
  'Learn the principles of luxury dark-mode aesthetics, editorial typography, and conversion funnels that convert technical B2B visitors into booked calls.'
)
on conflict (id) do update set
  title = excluded.title,
  slug = excluded.slug,
  excerpt = excluded.excerpt,
  content = excluded.content,
  cover_image = excluded.cover_image,
  category = excluded.category,
  tags = excluded.tags,
  published_at = excluded.published_at,
  read_time = excluded.read_time,
  status = excluded.status,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description;
