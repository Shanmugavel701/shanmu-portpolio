import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  BlogPost,
  getBlogBySlug,
  getStoredBlogs,
  incrementBlogViews,
  fetchBlogsFromSupabase,
} from "@/lib/blogStorage";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Share2,
  Check,
  ChevronRight,
  Sparkles,
  ArrowRight,
  BookOpen,
  MessageSquare,
} from "lucide-react";

interface BlogPostDetailProps {
  slug: string;
}

export function BlogPostDetail({ slug }: BlogPostDetailProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const handleLoad = (article: BlogPost) => {
      if (!isMounted) return;
      setPost(article);
      setIsLoading(false);
      incrementBlogViews(article.id);
      const all = getStoredBlogs().filter(
        (b) => b.id !== article.id && b.status === "published"
      );
      setRelatedPosts(all.slice(0, 3));
    };

    const found = getBlogBySlug(slug);
    if (found) {
      handleLoad(found);
    }

    // Always fetch latest dynamic version from Supabase
    fetchBlogsFromSupabase()
      .then((remote) => {
        if (!isMounted) return;
        const remoteFound = remote.find((b) => b.slug === slug || b.id === slug);
        if (remoteFound) {
          handleLoad(remoteFound);
        } else if (!found) {
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted && !found) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareOnTwitter = () => {
    if (!post || typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out "${post.title}" by @shanmu_og`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    if (!post || typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  const shareOnWhatsApp = () => {
    if (!post || typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`"${post.title}" - ${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  if (isLoading && !post) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans">
        <Navbar />
        <div className="flex flex-col items-center justify-center pt-40 pb-20 px-4 text-center">
          <Sparkles className="h-10 w-10 text-gold animate-spin mb-4" />
          <h2 className="font-display text-2xl font-semibold">Loading Article...</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-md">
            Retrieving publication from live database...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans">
        <Navbar />
        <div className="flex flex-col items-center justify-center pt-40 pb-20 px-4 text-center">
          <BookOpen className="h-16 w-16 text-gold/40 mb-4" />
          <h1 className="font-display text-3xl font-semibold">Article Not Found</h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-md">
            The article you are looking for might have been unpublished, moved, or deleted.
          </p>
          <Link
            to="/blog"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-deep text-gold px-5 py-2.5 text-xs font-semibold tracking-wider uppercase shadow"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Blog</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gold z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <Navbar />

      <article className="pb-20">
        {/* Post Header */}
        <header className="relative border-b border-border bg-deep text-cream px-5 pt-32 pb-14 md:px-10 md:pt-40 md:pb-20">
          <div className="mx-auto max-w-4xl">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs text-cream/50 mb-6 flex-wrap">
              <Link to="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3" />
              <Link to="/blog" className="hover:text-gold transition-colors">
                Blog
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-gold truncate max-w-xs">{post.category}</span>
            </div>

            {/* Category Tag */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 border border-gold/40 px-3.5 py-1 text-xs font-semibold text-gold mb-5 uppercase tracking-wider">
              {post.category}
            </span>

            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-cream leading-[1.15]">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="mt-5 text-base sm:text-lg md:text-xl text-cream/80 leading-relaxed font-normal">
                {post.excerpt}
              </p>
            )}

            {/* Author & Stats Bar */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-11 w-11 rounded-full object-cover border-2 border-gold/40"
                />
                <div>
                  <div className="text-sm font-semibold text-cream">{post.author.name}</div>
                  <div className="text-xs text-cream/50">{post.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-cream/60">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-gold" />
                  <span>{post.publishedAt}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-gold" />
                  <span>{post.readTime}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5 text-gold" />
                  <span>{(post.views || 0) + 1} views</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Cover Image */}
        <div className="mx-auto max-w-4xl px-5 -mt-6 sm:-mt-10 relative z-10">
          <div className="overflow-hidden rounded-2xl border border-border shadow-2xl bg-deep">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full max-h-[500px] object-cover"
            />
          </div>
        </div>

        {/* Article Body & Sidebar */}
        <div className="mx-auto max-w-4xl px-5 pt-12 md:px-6">
          <div className="grid grid-cols-1 gap-12">
            {/* Main Content Area */}
            <div className="space-y-8">
              {/* Floating Share Toolbar */}
              <div className="flex items-center justify-between border-y border-border py-3 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Share this article:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={shareOnTwitter}
                    title="Share on X / Twitter"
                    className="flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 text-xs text-foreground hover:border-gold hover:text-gold transition-colors"
                  >
                    <span>Twitter / X</span>
                  </button>
                  <button
                    onClick={shareOnLinkedIn}
                    title="Share on LinkedIn"
                    className="flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 text-xs text-foreground hover:border-gold hover:text-gold transition-colors"
                  >
                    <span>LinkedIn</span>
                  </button>
                  <button
                    onClick={shareOnWhatsApp}
                    title="Share on WhatsApp"
                    className="flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 text-xs text-foreground hover:border-gold hover:text-gold transition-colors"
                  >
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    title="Copy Article Link"
                    className="flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 text-xs text-foreground hover:border-gold hover:text-gold transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-emerald-500 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="h-3.5 w-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Prose HTML Output from TipTap */}
              <div
                className="prose max-w-none prose-neutral dark:prose-invert prose-headings:font-display prose-headings:text-foreground prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-p:text-foreground/85 prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-lg prose-blockquote:border-l-4 prose-blockquote:border-gold prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-foreground/90 prose-ul:list-disc prose-ol:list-decimal prose-li:my-1.5 prose-li:text-foreground/85 prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-primary prose-pre:bg-deep prose-pre:text-cream prose-img:rounded-xl prose-img:shadow-lg prose-a:text-primary prose-a:underline hover:prose-a:text-gold"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Article Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="pt-8 border-t border-border">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold uppercase text-muted-foreground">
                      Tags:
                    </span>
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-foreground/80"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio Box */}
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-20 w-20 rounded-full object-cover border-2 border-gold/40 shrink-0"
                />
                <div className="space-y-2 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {post.author.name}
                    </h3>
                    <span className="rounded bg-gold/15 px-2 py-0.5 text-[10px] font-semibold text-gold uppercase">
                      Author
                    </span>
                  </div>
                  <p className="text-xs text-gold font-medium">{post.author.role}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Website developer and digital growth specialist based in Coimbatore, Tamil Nadu. Building high-performance WordPress stores, custom business platforms, and automated lead funnels for brands globally.
                  </p>
                  <div className="pt-2">
                    <a
                      href="/#contact"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-gold transition-colors"
                    >
                      <span>Work directly with Shanmu</span>
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Articles */}
        {relatedPosts.length > 0 && (
          <section className="mx-auto max-w-[1400px] px-5 pt-20 md:px-10">
            <div className="border-t border-border pt-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="label-xs text-primary">Further Reading</span>
                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                    Related Case Studies & Articles
                  </h2>
                </div>
                <Link
                  to="/blog"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-gold"
                >
                  <span>View All Articles</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rPost) => (
                  <Link
                    key={rPost.id}
                    to="/blog/$slug"
                    params={{ slug: rPost.slug }}
                    className="interactive-card flex flex-col rounded-xl border border-border bg-card p-5 group hover:border-gold/40 hover:shadow-lg transition-all"
                  >
                    <img
                      src={rPost.coverImage}
                      alt={rPost.title}
                      className="aspect-[16/10] w-full rounded-lg object-cover mb-4"
                    />
                    <span className="label-xs text-gold">{rPost.category}</span>
                    <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-gold transition-colors line-clamp-2 mt-1">
                      {rPost.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                      {rPost.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <Footer />
    </div>
  );
}
