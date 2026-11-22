import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  BlogPost,
  BLOG_CATEGORIES,
  getStoredBlogs,
  fetchBlogsFromSupabase,
} from "@/lib/blogStorage";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  Tag,
  ShieldCheck,
  Zap,
} from "lucide-react";

export function BlogList() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    // Immediate render from cache
    const all = getStoredBlogs();
    setBlogs(all.filter((b) => b.status === "published"));

    // Fetch dynamic live updates from Supabase
    fetchBlogsFromSupabase().then((remote) => {
      if (remote && remote.length > 0) {
        setBlogs(remote.filter((b) => b.status === "published"));
      }
    });
  }, []);

  const featuredPost = blogs.find((b) => b.featured) || blogs[0];

  const filteredBlogs = blogs.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="pb-20">
        {/* Editorial Blog Hero */}
        <section className="relative overflow-hidden border-b border-white/5 bg-deep px-5 pt-32 pb-16 md:px-10 md:pt-40 md:pb-24 text-cream">
          <div className="mx-auto max-w-[1400px]">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-cream/50 mb-6">
              <Link to="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-gold">Insights & Blog</span>
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 text-xs font-semibold text-gold mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Web Engineering & Digital Growth Articles</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-cream leading-[1.1]">
                Perspectives on <span className="italic text-gold">High-Performance</span> Web, SEO & Conversions.
              </h1>
              <p className="mt-5 text-base md:text-lg text-cream/70 leading-relaxed max-w-2xl font-normal">
                Actionable case studies, speed optimization blueprints, and revenue-driven web architecture strategies from Shanmugavel.
              </p>
            </div>

            {/* Search & Quick Filter Bar */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 max-w-2xl">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-cream/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by topic, keyword, or tech stack..."
                  className="w-full rounded-full border border-white/15 bg-black/40 py-3.5 pl-11 pr-5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post Spotlight Banner */}
        {featuredPost && !searchQuery && selectedCategory === "all" && (
          <section className="mx-auto max-w-[1400px] px-5 -mt-8 md:px-10 z-10 relative">
            <div className="group overflow-hidden rounded-2xl border border-gold/30 bg-deep shadow-2xl transition-all duration-300 hover:border-gold/60">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-gold px-3 py-1 text-[11px] font-bold text-ink uppercase tracking-wider">
                        Featured Article
                      </span>
                      <span className="text-xs text-cream/60">
                        {featuredPost.category}
                      </span>
                    </div>

                    <Link
                      to="/blog/$slug"
                      params={{ slug: featuredPost.slug }}
                      className="block group"
                    >
                      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-cream group-hover:text-gold transition-colors leading-tight">
                        {featuredPost.title}
                      </h2>
                    </Link>

                    <p className="text-sm md:text-base text-cream/70 line-clamp-3 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-8 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="h-9 w-9 rounded-full object-cover border border-gold/40"
                      />
                      <div>
                        <div className="text-xs font-semibold text-cream">
                          {featuredPost.author.name}
                        </div>
                        <div className="text-[11px] text-cream/50 flex items-center gap-2">
                          <span>{featuredPost.publishedAt}</span>
                          <span>•</span>
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      to="/blog/$slug"
                      params={{ slug: featuredPost.slug }}
                      className="inline-flex items-center gap-2 rounded-full bg-gold/15 border border-gold/40 px-5 py-2 text-xs font-semibold text-gold transition-all group-hover:bg-gold group-hover:text-ink"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full overflow-hidden">
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-transparent to-transparent lg:hidden" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Categories Bar */}
        <section className="mx-auto max-w-[1400px] px-5 pt-12 md:px-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-border">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`rounded-full px-4 py-2 text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-deep text-gold shadow-md font-semibold"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              All Articles ({blogs.length})
            </button>
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-deep text-gold shadow-md font-semibold"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Blog Post Grid */}
        <section className="mx-auto max-w-[1400px] px-5 pt-10 md:px-10">
          {filteredBlogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground/40 mb-3" />
              <h3 className="font-display text-2xl font-medium text-foreground">
                No matching articles found
              </h3>
              <p className="mt-1 text-sm text-muted-foreground max-w-sm">
                No articles match your current search query. Try choosing another category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4 rounded-md bg-deep text-gold px-4 py-2 text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((post) => (
                <article
                  key={post.id}
                  className="interactive-card flex flex-col rounded-xl border border-border bg-card shadow-sm overflow-hidden group hover:shadow-xl hover:border-gold/40 transition-all duration-300"
                >
                  {/* Card Cover */}
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="relative aspect-[16/10] overflow-hidden bg-muted block"
                  >
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-md bg-deep/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold tracking-wider text-gold uppercase border border-gold/20">
                        {post.category}
                      </span>
                    </div>
                  </Link>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-6 justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 text-gold/80" />
                        <span>{post.publishedAt}</span>
                        <span>•</span>
                        <Clock className="h-3.5 w-3.5 text-gold/80" />
                        <span>{post.readTime}</span>
                      </div>

                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug }}
                        className="block group-hover:text-primary transition-colors"
                      >
                        <h3 className="font-display text-xl font-semibold text-foreground line-clamp-2 leading-snug group-hover:text-gold transition-colors">
                          {post.title}
                        </h3>
                      </Link>

                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-5 mt-4 border-t border-border flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="h-7 w-7 rounded-full object-cover border border-border"
                        />
                        <span className="text-xs font-medium text-foreground">
                          {post.author.name}
                        </span>
                      </div>

                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-gold transition-colors"
                      >
                        <span>Read</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Work With Me Call To Action */}
        <section className="mx-auto max-w-[1400px] px-5 pt-20 md:px-10">
          <div className="rounded-2xl border border-gold/30 bg-deep p-8 md:p-14 text-cream text-center relative overflow-hidden shadow-2xl">
            <div className="mx-auto max-w-2xl space-y-4 relative z-10">
              <span className="label-xs text-gold">Ready To Transform Your Digital Presence?</span>
              <h2 className="font-display text-3xl md:text-5xl font-medium text-cream">
                Let's Build a Fast, High-Converting Website for Your Brand.
              </h2>
              <p className="text-sm md:text-base text-cream/70">
                Direct founder collaboration with Shanmugavel. Custom WordPress, modern web applications & local SEO growth systems.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <a
                  href="/#contact"
                  className="rounded-md bg-gold px-7 py-3 text-xs font-semibold tracking-wider uppercase text-ink shadow-lg transition-transform hover:scale-105"
                >
                  Book Discovery Call
                </a>
                <Link
                  to="/admin/blog"
                  className="rounded-md border border-white/20 bg-white/5 px-6 py-3 text-xs font-semibold tracking-wider text-cream hover:bg-white/10"
                >
                  Admin Blog Panel
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
