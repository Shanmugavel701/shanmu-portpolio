import { supabase } from "@/utils/supabase/client";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML content from TipTap
  coverImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  status: "published" | "draft";
  views: number;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
}

export const BLOG_CATEGORIES = [
  "Web Development",
  "WordPress & WooCommerce",
  "Speed Optimization",
  "SEO & Growth",
  "UI/UX & Branding",
  "Case Studies",
] as const;

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "How We Reduced Page Load Time from 6.8s to 1.1s for a High-Volume D2C Brand",
    slug: "reduce-page-load-time-d2c-wordpress",
    excerpt:
      "A deep dive into diagnosing render-blocking scripts, database query bloat, asset hydration overhead, and transforming a sluggish WooCommerce store into a lightning-fast conversion engine.",
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    category: "Speed Optimization",
    tags: ["WordPress", "Core Web Vitals", "WooCommerce", "Performance"],
    author: {
      name: "Shanmugavel",
      role: "Website Developer & Growth Specialist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    publishedAt: "2026-03-15",
    readTime: "6 min read",
    status: "published",
    views: 1420,
    featured: true,
    seoTitle: "Case Study: Speed Optimization from 6.8s to 1.1s | Shanmu",
    seoDescription:
      "Learn how Shanmu optimized a high-volume D2C WooCommerce store, slashing load times to 1.1s and boosting conversion rates by 140%.",
    content: `
      <h2>The Problem: High Traffic, Sub-1% Conversion, and Terrible Latency</h2>
      <p>When the client approached me, their apparel brand was spending heavily on Meta and Google Ads, driving over 50,000 monthly visitors. However, the store's conversion rate was hovering at an abysmal <strong>0.85%</strong>.</p>
      <p>Running a thorough audit across Google PageSpeed Insights and WebPageTest revealed severe bottlenecks:</p>
      <ul>
        <li><strong>First Contentful Paint (FCP):</strong> 3.4 seconds</li>
        <li><strong>Largest Contentful Paint (LCP):</strong> 6.8 seconds</li>
        <li><strong>Cumulative Layout Shift (CLS):</strong> 0.32 (causing accidental button clicks)</li>
        <li><strong>Total Blocking Time (TBT):</strong> 1,450ms due to 48 unoptimized plugins</li>
      </ul>

      <blockquote>
        "Speed is not just a vanity metric. A 1-second delay in page load time can reduce conversions by up to 20% in competitive e-commerce markets."
      </blockquote>

      <h2>Step 1: Eliminating Plugin Bloat & Asset Trimming</h2>
      <p>The site had accumulated redundant plugins for carousels, social feeds, popups, and analytics trackers. We replaced 18 legacy plugins with clean, native JavaScript modules and consolidated Google Tag Manager scripts into a single asynchronous container.</p>

      <h2>Step 2: Database Query & Object Caching Architecture</h2>
      <p>WooCommerce stores frequently suffer from unindexed postmeta tables and autolad query bloat. We implemented:</p>
      <ol>
        <li>Redis Object Caching on the server to cache recurring transient and cart session queries.</li>
        <li>Conversion of all product imagery to next-gen WebP formats with strict responsive <code>srcset</code> attributes.</li>
        <li>Dynamic critical CSS inlining with asynchronous loading of non-critical stylesheets.</li>
      </ol>

      <h2>The Results: 1.1s Page Load and 140% Increase in Checkouts</h2>
      <p>Within 48 hours of rolling out the new architecture, the results spoke for themselves:</p>
      <ul>
        <li>LCP dropped to <strong>1.1 seconds</strong> on mobile 4G connections.</li>
        <li>Checkout conversion rate jumped from <strong>0.85% to 2.05% (+140%)</strong>.</li>
        <li>Monthly gross merchandise value (GMV) increased by over ₹35 Lakhs without increasing ad spend.</li>
      </ul>

      <h2>Key Takeaway</h2>
      <p>Investing in technical foundation and high-performance web engineering always generates higher ROI than throwing more budget into paid traffic on a leaking funnel.</p>
    `,
  },
  {
    id: "post-2",
    title: "Why Custom WordPress Architecture Outperforms Bloated Theme Builders in 2026",
    slug: "custom-wordpress-vs-bloated-theme-builders",
    excerpt:
      "Why relying on drag-and-drop page builders with 150 HTTP requests hurts your SEO, slows down mobile users, and costs your business thousands in lost leads.",
    coverImage:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=80",
    category: "WordPress & WooCommerce",
    tags: ["WordPress", "Web Engineering", "Clean Code", "SEO"],
    author: {
      name: "Shanmugavel",
      role: "Website Developer & Growth Specialist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    publishedAt: "2026-03-02",
    readTime: "5 min read",
    status: "published",
    views: 980,
    featured: false,
    seoTitle: "Custom WordPress vs Theme Builders | Shanmu Web Engineering",
    seoDescription:
      "Discover why modern custom WordPress development beats bloated pre-made themes for Google rankings, speed, and long-term maintainability.",
    content: `
      <h2>The Illusion of Drag-and-Drop Builders</h2>
      <p>Pre-made WordPress themes and visual page builders promise instant results without touching code. While they allow quick prototypes, they introduce catastrophic technical debt for serious businesses.</p>
      
      <h2>The Hidden Cost of Visual Builders</h2>
      <p>When you inspect the DOM of a page built with standard commercial themes, you often encounter:</p>
      <ul>
        <li>Up to 25 nested <code>&lt;div&gt;</code> wrappers per section.</li>
        <li>Dozens of unused CSS and JavaScript files loaded on every single page.</li>
        <li>Brittle shortcode architectures that lock you into proprietary ecosystems.</li>
      </ul>

      <blockquote>
        "Clean, semantic HTML and modular CSS will always outrank bloated visual code generated by automated builders."
      </blockquote>

      <h2>The Custom WordPress Solution</h2>
      <p>By building with tailored Gutenberg blocks, custom post types, and headless or lightweight PHP rendering, your website achieves:</p>
      <ol>
        <li>Sub-second loading out of the box.</li>
        <li>100/100 Core Web Vitals scores.</li>
        <li>Complete design freedom with zero compromises on brand elegance.</li>
      </ol>
    `,
  },
  {
    id: "post-3",
    title: "Local SEO Playbook: How to Dominate Google Rankings in Coimbatore & Tier-2 Tech Hubs",
    slug: "local-seo-playbook-coimbatore-tier2",
    excerpt:
      "A step-by-step blueprint for service businesses and industrial brands to capture high-intent commercial keywords and generate 50+ monthly inbound RFQs.",
    coverImage:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1400&q=80",
    category: "SEO & Growth",
    tags: ["Local SEO", "Lead Gen", "Google Search", "B2B"],
    author: {
      name: "Shanmugavel",
      role: "Website Developer & Growth Specialist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    publishedAt: "2026-02-18",
    readTime: "7 min read",
    status: "published",
    views: 1890,
    featured: true,
    seoTitle: "Local SEO Playbook for B2B & Service Brands | Shanmu",
    seoDescription:
      "Master local SEO ranking signals, schema markup, and geo-targeted landing page strategies to dominate Google search results.",
    content: `
      <h2>Why Local Search Intent Converts at 40%+</h2>
      <p>When decision-makers search for <em>"industrial website developer in Coimbatore"</em> or <em>"custom automation studio in Tamil Nadu"</em>, they are not browsing casually—they have active budget and urgent project requirements.</p>

      <h2>The 4 Pillars of Local SEO Domination</h2>
      
      <h3>1. Hyper-Localized Schema Markup</h3>
      <p>Standard meta tags are no longer sufficient. You must implement structured <code>LocalBusiness</code>, <code>ProfessionalService</code>, and <code>GeoCoordinates</code> JSON-LD schemas that clearly signal your service areas and physical footprint to Google and AI search engines like Perplexity and ChatGPT.</p>

      <h3>2. Pillar & Cluster Content Silos</h3>
      <p>Create focused landing pages for each specific service line (e.g. WordPress Development, E-Commerce, Local SEO) linked back to comprehensive city-level hubs.</p>

      <h3>3. Google Business Profile Signal Consistency</h3>
      <p>Ensure 100% NAP (Name, Address, Phone) consistency across your website footer, contact pages, and business citations.</p>
    `,
  },
  {
    id: "post-4",
    title: "Designing High-Converting B2B SaaS Landing Pages: The Editorial Dark Mode Approach",
    slug: "designing-high-converting-b2b-saas-landing-pages",
    excerpt:
      "Explore how combining typography-driven editorial design with subtle glassmorphism and interactive ROI calculators increases demo bookings by 3.4x.",
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    category: "UI/UX & Branding",
    tags: ["UI/UX", "Editorial Design", "Conversion Rate", "SaaS"],
    author: {
      name: "Shanmugavel",
      role: "Website Developer & Growth Specialist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    publishedAt: "2026-01-28",
    readTime: "4 min read",
    status: "published",
    views: 760,
    featured: false,
    seoTitle: "Designing High-Converting B2B SaaS Landing Pages | Shanmu",
    seoDescription:
      "Learn the principles of luxury dark-mode aesthetics, editorial typography, and conversion funnels that convert technical B2B visitors into booked calls.",
    content: `
      <h2>The Problem with Generic SaaS Templates</h2>
      <p>Most SaaS landing pages look identical: generic purple gradients, floating 3D spheres, and vague slogans like <em>"Supercharge your workflow"</em>. Buyers are fatigued by generic layouts.</p>

      <h2>The Editorial Aesthetic: Authority Through Typography</h2>
      <p>By contrasting refined serif headers (like <em>Cormorant Garamond</em>) with clean sans-serif body copy and emerald/gold accents, your product instantly communicates heritage, seriousness, and premium value.</p>
    `,
  },
];

const STORAGE_KEY = "shanmu_blog_posts_v1";

/**
 * Maps Supabase DB row to BlogPost object
 */
export function mapRowToBlogPost(row: any): BlogPost {
  return {
    id: String(row.id),
    title: row.title || "",
    slug: row.slug || "",
    excerpt: row.excerpt || "",
    content: row.content || "",
    coverImage: row.cover_image || "",
    category: row.category || "Web Development",
    tags: Array.isArray(row.tags) ? row.tags : [],
    author:
      typeof row.author === "object" && row.author !== null
        ? row.author
        : {
            name: "Shanmugavel",
            role: "Website Developer & Growth Specialist",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
          },
    publishedAt: row.published_at || new Date().toISOString().slice(0, 10),
    readTime: row.read_time || "5 min read",
    status: row.status === "draft" ? "draft" : "published",
    views: Number(row.views) || 0,
    featured: Boolean(row.featured),
    seoTitle: row.seo_title || row.title || "",
    seoDescription: row.seo_description || row.excerpt || "",
  };
}

/**
 * Maps BlogPost object to Supabase DB row format
 */
export function mapBlogPostToRow(post: BlogPost): any {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || "",
    content: post.content || "",
    cover_image: post.coverImage || "",
    category: post.category || "Web Development",
    tags: post.tags || [],
    author: post.author,
    published_at: post.publishedAt,
    read_time: post.readTime,
    status: post.status,
    views: post.views || 0,
    featured: post.featured || false,
    seo_title: post.seoTitle || post.title,
    seo_description: post.seoDescription || post.excerpt || "",
    updated_at: new Date().toISOString(),
  };
}

/**
 * Synchronous local retrieval for instant client-side rendering
 */
export function getStoredBlogs(): BlogPost[] {
  if (typeof window === "undefined") {
    return INITIAL_BLOG_POSTS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BLOG_POSTS));
      return INITIAL_BLOG_POSTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_BLOG_POSTS;
  } catch (e) {
    console.error("Error reading blog posts from storage:", e);
    return INITIAL_BLOG_POSTS;
  }
}

export function saveStoredBlogs(blogs: BlogPost[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
  } catch (e) {
    console.error("Error saving blog posts to storage:", e);
  }
}

/**
 * Dynamically fetches all blogs from Supabase Database
 * Updates localStorage cache in background
 */
export async function fetchBlogsFromSupabase(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      // If table does not exist or network is offline, return cached
      console.warn("Supabase fetch notice:", error.message);
      return getStoredBlogs();
    }

    if (data && data.length > 0) {
      const remoteBlogs = data.map(mapRowToBlogPost);
      saveStoredBlogs(remoteBlogs);
      return remoteBlogs;
    }

    return getStoredBlogs();
  } catch (err) {
    console.warn("Could not query Supabase blogs table, using cached data:", err);
    return getStoredBlogs();
  }
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  const blogs = getStoredBlogs();
  return blogs.find((b) => b.slug === slug || b.id === slug);
}

export function getBlogById(id: string): BlogPost | undefined {
  const blogs = getStoredBlogs();
  return blogs.find((b) => b.id === id);
}

/**
 * Creates or updates a blog post dynamically both in Supabase and local cache
 */
export async function saveOrUpdateBlogPost(post: Partial<BlogPost> & { title: string }): Promise<BlogPost> {
  const blogs = getStoredBlogs();
  const slug =
    post.slug?.trim() ||
    post.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const existingIndex = blogs.findIndex((b) => b.id === post.id);
  const nowStr = new Date().toISOString().slice(0, 10);

  let targetPost: BlogPost;

  if (existingIndex >= 0 && blogs[existingIndex]) {
    const existing = blogs[existingIndex];
    targetPost = {
      id: existing.id,
      title: post.title ?? existing.title,
      slug,
      excerpt: post.excerpt ?? existing.excerpt,
      content: post.content ?? existing.content,
      coverImage: post.coverImage ?? existing.coverImage,
      category: post.category ?? existing.category,
      tags: post.tags ?? existing.tags,
      author: post.author ?? existing.author,
      publishedAt: post.publishedAt ?? existing.publishedAt,
      readTime: post.readTime ?? existing.readTime,
      status: post.status ?? existing.status,
      views: post.views ?? existing.views,
      featured: post.featured ?? existing.featured,
      seoTitle: post.seoTitle ?? existing.seoTitle ?? post.title,
      seoDescription: post.seoDescription ?? existing.seoDescription ?? post.excerpt ?? "",
    };
    blogs[existingIndex] = targetPost;
  } else {
    targetPost = {
      id: post.id || `post-${Date.now()}`,
      title: post.title,
      slug,
      excerpt: post.excerpt || "",
      content: post.content || "<p>Write your article here...</p>",
      coverImage:
        post.coverImage ||
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
      category: post.category || "Web Development",
      tags: post.tags && post.tags.length > 0 ? post.tags : ["Engineering"],
      author: post.author || {
        name: "Shanmugavel",
        role: "Website Developer & Growth Specialist",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      publishedAt: post.publishedAt || nowStr,
      readTime: post.readTime || `${Math.max(1, Math.ceil((post.content?.split(/\s+/).length || 50) / 200))} min read`,
      status: post.status || "published",
      views: post.views ?? 0,
      featured: post.featured ?? false,
      seoTitle: post.seoTitle || post.title,
      seoDescription: post.seoDescription || post.excerpt || "",
    };
    blogs.unshift(targetPost);
  }

  // Update local cache immediately
  saveStoredBlogs(blogs);

  // Sync dynamically to Supabase in background
  try {
    const row = mapBlogPostToRow(targetPost);
    const { error } = await supabase.from("blogs").upsert(row);
    if (error) {
      console.warn("Supabase upsert warning:", error.message);
    }
  } catch (err) {
    console.warn("Could not upsert to Supabase:", err);
  }

  return targetPost;
}

/**
 * Deletes blog post from both Supabase and local cache
 */
export async function deleteBlogPost(id: string): Promise<boolean> {
  const blogs = getStoredBlogs();
  const filtered = blogs.filter((b) => b.id !== id);
  saveStoredBlogs(filtered);

  try {
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) {
      console.warn("Supabase delete warning:", error.message);
    }
  } catch (err) {
    console.warn("Could not delete from Supabase:", err);
  }

  return true;
}

/**
 * Toggles status (published / draft) dynamically in Supabase and cache
 */
export async function toggleBlogPublishStatus(id: string): Promise<BlogPost | undefined> {
  const blogs = getStoredBlogs();
  const target = blogs.find((b) => b.id === id);
  if (target) {
    target.status = target.status === "published" ? "draft" : "published";
    saveStoredBlogs(blogs);

    try {
      await supabase.from("blogs").update({ status: target.status }).eq("id", id);
    } catch (err) {
      console.warn("Could not update status on Supabase:", err);
    }
    return target;
  }
  return undefined;
}

/**
 * Toggles featured flag dynamically in Supabase and cache
 */
export async function toggleBlogFeatured(id: string): Promise<BlogPost | undefined> {
  const blogs = getStoredBlogs();
  const target = blogs.find((b) => b.id === id);
  if (target) {
    target.featured = !target.featured;
    saveStoredBlogs(blogs);

    try {
      await supabase.from("blogs").update({ featured: target.featured }).eq("id", id);
    } catch (err) {
      console.warn("Could not update featured flag on Supabase:", err);
    }
    return target;
  }
  return undefined;
}

/**
 * Increments view counter dynamically
 */
export async function incrementBlogViews(id: string): Promise<void> {
  const blogs = getStoredBlogs();
  const target = blogs.find((b) => b.id === id);
  if (target) {
    target.views = (target.views || 0) + 1;
    saveStoredBlogs(blogs);

    try {
      await supabase.from("blogs").update({ views: target.views }).eq("id", id);
    } catch {
      // Ignore background view increment error
    }
  }
}

/**
 * Synchronizes all local blog articles to Supabase database
 */
export async function syncLocalBlogsToSupabase(): Promise<{ success: boolean; count: number; error?: string }> {
  try {
    const blogs = getStoredBlogs();
    const rows = blogs.map(mapBlogPostToRow);

    const { data, error } = await supabase.from("blogs").upsert(rows);
    if (error) {
      return { success: false, count: 0, error: error.message };
    }

    return { success: true, count: rows.length };
  } catch (err: any) {
    return { success: false, count: 0, error: err.message || "Failed to sync to Supabase." };
  }
}
