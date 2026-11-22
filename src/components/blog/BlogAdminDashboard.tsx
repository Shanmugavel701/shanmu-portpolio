import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  BlogPost,
  BLOG_CATEGORIES,
  getStoredBlogs,
  fetchBlogsFromSupabase,
  saveOrUpdateBlogPost,
  deleteBlogPost,
  toggleBlogPublishStatus,
  toggleBlogFeatured,
  syncLocalBlogsToSupabase,
} from "@/lib/blogStorage";
import { isAdminAuthenticated, adminLogout } from "@/lib/adminAuth";
import { AdminLogin } from "@/components/blog/AdminLogin";
import { AdminSidebar } from "@/components/blog/AdminSidebar";
import { TiptapEditor } from "@/components/blog/TiptapEditor";
import { SeoAnalysisPanel } from "@/components/blog/SeoAnalysisPanel";
import { analyzeBlogPostSeo, autoFixBlogPostSeo } from "@/lib/seoAnalyzer";
import { uploadImageToCloudinary, isCloudinaryConfigured } from "@/lib/cloudinary";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Star,
  FileText,
  Copy,
  ExternalLink,
  Globe,
  X,
  Image as ImageIcon,
  BookOpen,
  Menu,
  TrendingUp,
  Sparkles,
  RefreshCw,
  FolderTree,
  Sliders,
  Check,
  Calendar,
} from "lucide-react";

const COVER_PRESETS = [
  {
    name: "Speed & Performance",
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Web Architecture",
    url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "SEO & Lead Gen",
    url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "UI/UX & Editorial",
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Modern Technology Studio",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
  },
];

export function BlogAdminDashboard() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [currentTab, setCurrentTab] = useState<"dashboard" | "posts" | "categories" | "seo">("posts");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Blogs Data
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [notification, setNotification] = useState<string | null>(null);

  // Editor Modal State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [activeTab, setActiveTab] = useState<"content" | "seo" | "preview">("content");
  const [tagInput, setTagInput] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    setAuthenticated(isAdminAuthenticated());
    setBlogs(getStoredBlogs());

    // Dynamically fetch from Supabase in background
    fetchBlogsFromSupabase().then((remoteBlogs) => {
      if (remoteBlogs && remoteBlogs.length > 0) {
        setBlogs(remoteBlogs);
      }
    });
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const loadBlogs = async () => {
    setBlogs(getStoredBlogs());
    const remote = await fetchBlogsFromSupabase();
    if (remote && remote.length > 0) {
      setBlogs(remote);
    }
  };

  const handleLogout = () => {
    adminLogout();
    setAuthenticated(false);
  };

  // If checking authentication
  if (authenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
        <Sparkles className="h-6 w-6 animate-spin text-emerald-600" />
      </div>
    );
  }

  // If Not Authenticated -> Show White Login Screen
  if (!authenticated) {
    return <AdminLogin onSuccess={() => setAuthenticated(true)} />;
  }

  // Filtered list
  const filteredBlogs = blogs.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Metrics
  const totalPosts = blogs.length;
  const publishedCount = blogs.filter((b) => b.status === "published").length;
  const draftCount = blogs.filter((b) => b.status === "draft").length;
  const totalViews = blogs.reduce((acc, curr) => acc + (curr.views || 0), 0);

  const handleOpenNewPost = () => {
    const today = new Date().toISOString().slice(0, 10);
    const defaultCover = COVER_PRESETS[0]?.url ?? "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80";

    setEditingPost({
      id: `post-${Date.now()}`,
      title: "",
      slug: "",
      excerpt: "",
      content: "<h2>Overview</h2><p>Write your detailed article, tutorial or case study analysis here...</p>",
      coverImage: defaultCover,
      category: BLOG_CATEGORIES[0],
      tags: ["Web Engineering"],
      author: {
        name: "Shanmugavel",
        role: "Website Developer & Growth Specialist",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      publishedAt: today,
      readTime: "5 min read",
      status: "published",
      views: 0,
      featured: false,
      seoTitle: "",
      seoDescription: "",
    });
    setTagInput("");
    setActiveTab("content");
    setIsEditorOpen(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost({ ...post });
    setTagInput("");
    setActiveTab("content");
    setIsEditorOpen(true);
  };

  const handleSavePost = async () => {
    if (!editingPost || !editingPost.title?.trim()) {
      showToast("Please enter a blog post title");
      return;
    }

    const saved = await saveOrUpdateBlogPost(editingPost);
    await loadBlogs();
    setIsEditorOpen(false);
    showToast(`Post "${saved.title.slice(0, 25)}..." saved dynamically!`);
  };

  const handleDeletePost = async (id: string) => {
    await deleteBlogPost(id);
    await loadBlogs();
    setDeleteConfirmId(null);
    showToast("Post deleted successfully");
  };

  const handleToggleStatus = async (id: string) => {
    const updated = await toggleBlogPublishStatus(id);
    if (updated) {
      await loadBlogs();
      showToast(`Post marked as ${updated.status}`);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    const updated = await toggleBlogFeatured(id);
    if (updated) {
      await loadBlogs();
      showToast(updated.featured ? "Marked as Featured" : "Removed from Featured");
    }
  };

  const handleDuplicatePost = async (post: BlogPost) => {
    const today = new Date().toISOString().slice(0, 10);
    const dup: BlogPost = {
      ...post,
      id: `post-${Date.now()}`,
      title: `${post.title} (Copy)`,
      slug: `${post.slug}-copy-${Math.floor(Math.random() * 1000)}`,
      status: "draft",
      views: 0,
      publishedAt: today,
    };
    await saveOrUpdateBlogPost(dup);
    await loadBlogs();
    showToast("Post duplicated as draft");
  };

  const handleSyncDatabase = async () => {
    showToast("Syncing database articles...");
    const res = await syncLocalBlogsToSupabase();
    await loadBlogs();
    if (res.success) {
      showToast(`Database synchronized: ${res.count} articles updated!`);
    } else {
      showToast(res.error || "Database synchronization complete.");
    }
  };

  const handleAddTag = () => {
    if (!tagInput.trim() || !editingPost) return;
    const currentTags = editingPost.tags || [];
    if (!currentTags.includes(tagInput.trim())) {
      setEditingPost({ ...editingPost, tags: [...currentTags, tagInput.trim()] });
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    if (!editingPost) return;
    setEditingPost({
      ...editingPost,
      tags: (editingPost.tags || []).filter((t) => t !== tagToRemove),
    });
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-xs font-semibold text-slate-800 shadow-2xl shadow-slate-300 animate-in slide-in-from-bottom-3">
          <Sparkles className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Left Sidebar (White Theme) */}
      <AdminSidebar
        currentTab={currentTab}
        onTabChange={(tab) => setCurrentTab(tab)}
        onNewPost={handleOpenNewPost}
        onLogout={handleLogout}
        postCount={blogs.length}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area (White Theme) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-slate-200/80 bg-white/90 px-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div>
              <h1 className="font-display text-xl font-bold text-slate-900">
                {currentTab === "dashboard" && "Dashboard Overview"}
                {currentTab === "posts" && "Blog Articles & Case Studies"}
                {currentTab === "categories" && "Content Categories"}
                {currentTab === "seo" && "Search Engine Optimization (SEO)"}
              </h1>
              <p className="hidden sm:block text-[11px] text-slate-500">
                Manage your digital portfolio editorial content and conversions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <Eye className="h-3.5 w-3.5 text-slate-500" />
              <span className="hidden sm:inline">View Public Blog</span>
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </Link>

            <button
              type="button"
              onClick={handleSyncDatabase}
              title="Synchronize database articles"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5 text-emerald-600" />
              <span className="hidden md:inline">Sync Database</span>
            </button>

            <button
              type="button"
              onClick={handleOpenNewPost}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-slate-900/10 hover:bg-slate-800 transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4 stroke-[2.5]" />
              <span className="hidden xs:inline">New Post</span>
            </button>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-6 md:p-8 max-w-[1400px] w-full mx-auto space-y-8">
          {/* Tab 1: Dashboard Overview */}
          {currentTab === "dashboard" && (
            <div className="space-y-8">
              {/* Metric Overview Cards */}
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Total Articles
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <FileText className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-4 font-display text-3xl font-bold text-slate-900">
                    {totalPosts}
                  </div>
                  <p className="mt-1 text-xs text-slate-400">Total posts written</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Live Published
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-4 font-display text-3xl font-bold text-emerald-600">
                    {publishedCount}
                  </div>
                  <p className="mt-1 text-xs text-slate-400">Publicly visible</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Drafts
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                      <Clock className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-4 font-display text-3xl font-bold text-amber-600">
                    {draftCount}
                  </div>
                  <p className="mt-1 text-xs text-slate-400">Hidden from visitors</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Total Reader Reads
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-4 font-display text-3xl font-bold text-slate-900">
                    {totalViews.toLocaleString()}
                  </div>
                  <p className="mt-1 text-xs text-slate-400">Combined reader views</p>
                </div>
              </div>

              {/* Recent Articles Table */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    Recent Articles
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCurrentTab("posts")}
                    className="text-xs font-semibold text-emerald-700 hover:underline"
                  >
                    View all ({blogs.length}) →
                  </button>
                </div>
                <div className="divide-y divide-slate-100">
                  {blogs.slice(0, 4).map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between p-4 px-6 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <img
                          src={post.coverImage}
                          alt=""
                          className="h-10 w-14 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {post.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {post.category} • {post.publishedAt}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditPost(post)}
                          className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Blog Posts Manager */}
          {currentTab === "posts" && (
            <div className="space-y-6">
              {/* Quick Stat Pill Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Posts</span>
                  <div className="text-2xl font-bold font-display text-slate-900 mt-1">{totalPosts}</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Published</span>
                  <div className="text-2xl font-bold font-display text-emerald-600 mt-1">{publishedCount}</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Drafts</span>
                  <div className="text-2xl font-bold font-display text-amber-600 mt-1">{draftCount}</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Reads</span>
                  <div className="text-2xl font-bold font-display text-slate-900 mt-1">{totalViews.toLocaleString()}</div>
                </div>
              </div>

              {/* Filters Toolbar */}
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between shadow-sm">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search posts by title or keyword..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-8 text-xs text-slate-800 placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/10"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Status Filter */}
                  <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setStatusFilter("all")}
                      className={`rounded-lg px-3 py-1.5 font-semibold transition-all cursor-pointer ${
                        statusFilter === "all"
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      All ({blogs.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatusFilter("published")}
                      className={`rounded-lg px-3 py-1.5 font-semibold transition-all cursor-pointer ${
                        statusFilter === "published"
                          ? "bg-white text-emerald-700 shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Published ({publishedCount})
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatusFilter("draft")}
                      className={`rounded-lg px-3 py-1.5 font-semibold transition-all cursor-pointer ${
                        statusFilter === "draft"
                          ? "bg-white text-amber-700 shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Drafts ({draftCount})
                    </button>
                  </div>

                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 focus:border-emerald-600 focus:outline-none"
                  >
                    <option value="all">All Categories</option>
                    {BLOG_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Table */}
              {filteredBlogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-20 text-center">
                  <BookOpen className="h-12 w-12 text-slate-300 mb-3" />
                  <h3 className="font-display text-xl font-bold text-slate-800">
                    No articles found
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 max-w-sm">
                    {searchQuery
                      ? "No posts match your search keywords. Clear the search query to see all articles."
                      : "Start writing your first case study or article."}
                  </p>
                  <button
                    type="button"
                    onClick={handleOpenNewPost}
                    className="mt-5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white uppercase tracking-wider"
                  >
                    Create Post
                  </button>
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-600">
                      <thead className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            Article &amp; Summary
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Category
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Published Date
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Views
                          </th>
                          <th scope="col" className="px-6 py-4 text-right">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-normal">
                        {filteredBlogs.map((post) => (
                          <tr
                            key={post.id}
                            className="group transition-colors hover:bg-slate-50/60"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3.5 max-w-md">
                                <img
                                  src={post.coverImage}
                                  alt=""
                                  className="h-11 w-16 rounded-lg object-cover border border-slate-200 shrink-0 shadow-xs"
                                />
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                                      {post.title}
                                    </h4>
                                    {post.featured && (
                                      <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[9px] font-bold text-amber-800 shrink-0">
                                        <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" /> Featured
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                                    /blog/{post.slug}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700">
                                {post.category}
                              </span>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => handleToggleStatus(post.id)}
                                title="Click to toggle status"
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold cursor-pointer transition-all hover:scale-105 ${
                                  post.status === "published"
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-amber-50 text-amber-700 border border-amber-200"
                                }`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${
                                    post.status === "published" ? "bg-emerald-500" : "bg-amber-500"
                                  }`}
                                />
                                {post.status === "published" ? "Published" : "Draft"}
                              </button>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                              {post.publishedAt}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-700">
                              <div className="flex items-center gap-1">
                                <Eye className="h-3.5 w-3.5 text-slate-400" />
                                <span>{(post.views || 0).toLocaleString()}</span>
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <Link
                                  to="/blog/$slug"
                                  params={{ slug: post.slug }}
                                  title="View Public Page"
                                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                                >
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </Link>

                                <button
                                  type="button"
                                  onClick={() => handleToggleFeatured(post.id)}
                                  title={post.featured ? "Remove from Featured" : "Mark as Featured"}
                                  className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors cursor-pointer ${
                                    post.featured
                                      ? "border-amber-200 bg-amber-50 text-amber-600"
                                      : "border-slate-200 bg-white text-slate-400 hover:text-amber-600"
                                  }`}
                                >
                                  <Star className={`h-3.5 w-3.5 ${post.featured ? "fill-amber-500" : ""}`} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDuplicatePost(post)}
                                  title="Duplicate as draft"
                                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                                >
                                  <Copy className="h-3.5 w-3.5" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleEditPost(post)}
                                  title="Edit Post in TipTap"
                                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer"
                                >
                                  <Edit3 className="h-3.5 w-3.5" />
                                </button>

                                {deleteConfirmId === post.id ? (
                                  <div className="flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 p-1">
                                    <button
                                      type="button"
                                      onClick={() => handleDeletePost(post.id)}
                                      className="rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white hover:bg-red-700"
                                    >
                                      Delete
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setDeleteConfirmId(null)}
                                      className="px-1 text-[10px] text-slate-500 hover:text-slate-800"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setDeleteConfirmId(post.id)}
                                    title="Delete Post"
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Categories Manager */}
          {currentTab === "categories" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {BLOG_CATEGORIES.map((cat) => {
                  const count = blogs.filter((b) => b.category === cat).length;
                  return (
                    <div
                      key={cat}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 uppercase">
                            Active Category
                          </span>
                          <span className="text-xs font-bold text-slate-400">
                            {count} {count === 1 ? "Article" : "Articles"}
                          </span>
                        </div>
                        <h3 className="font-display text-lg font-bold text-slate-900 mt-3">
                          {cat}
                        </h3>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat);
                            setCurrentTab("posts");
                          }}
                          className="text-xs font-semibold text-emerald-700 hover:underline"
                        >
                          Filter posts by this category →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 4: SEO Settings */}
          {currentTab === "seo" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  Global Blog SEO &amp; Rich Snippets
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Each blog post includes custom Google SERP snippet previews and automated schema markup for search engines and AI generative engines.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Author Default
                    </label>
                    <input
                      type="text"
                      disabled
                      value="Shanmugavel (Website Developer & Growth Specialist)"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Indexing Strategy
                    </label>
                    <input
                      type="text"
                      disabled
                      value="Index, Follow, Max-Snippet:-1, Max-Image-Preview:Large"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-700"
                    />
                  </div>
                </div>

                {/* Google SERP Snippet Preview Box */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
                    Google Search Snippet Example
                  </span>
                  <div className="space-y-1 font-sans">
                    <div className="text-xs text-emerald-800 flex items-center gap-1.5 truncate">
                      <span>https://www.velzx.com/blog/reduce-page-load-time-d2c-wordpress</span>
                    </div>
                    <h4 className="text-base text-blue-700 hover:underline font-medium">
                      How We Reduced Page Load Time from 6.8s to 1.1s | Shanmu
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      A deep dive into diagnosing render-blocking scripts, database query bloat, asset hydration overhead, and transforming a sluggish WooCommerce store.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Dedicated Full-Page View Editor */}
      {isEditorOpen && editingPost && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#f8fafc] overflow-hidden animate-in fade-in-50 duration-200">
          {/* Fullpage Top Navigation Header */}
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-xs z-20">
            <div className="flex items-center gap-4 min-w-0">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <span>← Back to Articles</span>
              </button>

              <div className="hidden sm:flex items-center gap-2 border-l border-slate-200 pl-4 min-w-0">
                <span className="text-xs font-bold text-slate-900 truncate max-w-xs md:max-w-md">
                  {editingPost.title || "Untitled Article"}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    editingPost.status === "published"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {editingPost.status === "published" ? "Published" : "Draft"}
                </span>

                {/* Live SEO Score Pill */}
                {(() => {
                  const seoScore = analyzeBlogPostSeo(editingPost).totalScore;
                  return (
                    <button
                      type="button"
                      onClick={() => setActiveTab("seo")}
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold border transition-transform hover:scale-105 cursor-pointer ${
                        seoScore >= 80
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                          : seoScore >= 60
                          ? "bg-amber-50 text-amber-700 border-amber-300"
                          : "bg-red-50 text-red-700 border-red-300"
                      }`}
                    >
                      <Sparkles className="h-3 w-3" />
                      <span>SEO: {seoScore}/100</span>
                    </button>
                  );
                })()}
              </div>
            </div>

            {/* Navigation Tabs (Center) */}
            <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("content")}
                className={`rounded-lg px-3.5 py-1.5 font-semibold transition-all cursor-pointer ${
                  activeTab === "content"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Editor
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("seo")}
                className={`rounded-lg px-3.5 py-1.5 font-semibold transition-all cursor-pointer ${
                  activeTab === "seo"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                SEO &amp; Meta
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`rounded-lg px-3.5 py-1.5 font-semibold transition-all cursor-pointer ${
                  activeTab === "preview"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Live Preview
              </button>
            </div>

            {/* Action Buttons (Right) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="hidden sm:inline-flex rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditingPost({ ...editingPost, status: "draft" });
                  const draftPost = { ...editingPost, status: "draft" as const };
                  saveOrUpdateBlogPost(draftPost);
                  loadBlogs();
                  setIsEditorOpen(false);
                  showToast("Post saved as draft");
                }}
                className="hidden md:inline-flex rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Save as Draft
              </button>

              <button
                type="button"
                onClick={handleSavePost}
                className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-slate-900/10 hover:bg-slate-800 transition-all cursor-pointer"
              >
                Publish Post
              </button>
            </div>
          </header>

          {/* Fullpage Content Workspace */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8">
            {activeTab === "content" && (
              <div className="mx-auto max-w-[1500px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Main Article Canvas (Col 8) */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Article Title Card */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-xs space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Article Title
                      </label>
                      <input
                        type="text"
                        value={editingPost.title}
                        onChange={(e) => {
                          const newTitle = e.target.value;
                          const autoSlug = newTitle
                            .toLowerCase()
                            .replace(/[^\w\s-]/g, "")
                            .replace(/[\s_-]+/g, "-")
                            .replace(/^-+|-+$/g, "");
                          setEditingPost({
                            ...editingPost,
                            title: newTitle,
                            slug: editingPost.slug && !editingPost.slug.includes("-copy-") ? autoSlug : editingPost.slug || autoSlug,
                          });
                        }}
                        placeholder="Enter article title here..."
                        className="w-full text-2xl sm:text-3xl md:text-4xl font-display font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none border-none p-0"
                        autoFocus
                      />
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Excerpt / Subtitle (Card Preview)
                      </label>
                      <textarea
                        rows={2}
                        value={editingPost.excerpt}
                        onChange={(e) =>
                          setEditingPost({ ...editingPost, excerpt: e.target.value })
                        }
                        placeholder="Write a brief overview for blog cards and summary snippets..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Rich TipTap Editor Full Canvas */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Article Body Content
                      </label>
                      <span className="text-[11px] text-slate-400">
                        TipTap Pro 2.x • Rich Typography
                      </span>
                    </div>
                    <TiptapEditor
                      content={editingPost.content}
                      onChange={(html) =>
                        setEditingPost({ ...editingPost, content: html })
                      }
                      minHeight="520px"
                      theme="light"
                      placeholder="Start writing your article, code snippets, lists, and case study details..."
                    />
                  </div>
                </div>

                {/* Right Settings Sidebar (Col 4) */}
                <div className="lg:col-span-4 space-y-6">
                  {/* SEO Health & Auto-Fix Sidebar Widget */}
                  {(() => {
                    const seoAnalysis = analyzeBlogPostSeo(editingPost);
                    return (
                      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-display text-sm font-bold text-slate-900 flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-emerald-600" /> SEO Optimization Score
                          </h4>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              seoAnalysis.totalScore >= 80
                                ? "bg-emerald-100 text-emerald-800"
                                : seoAnalysis.totalScore >= 60
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {seoAnalysis.totalScore}/100 • {seoAnalysis.rating}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 ${
                              seoAnalysis.totalScore >= 80
                                ? "bg-emerald-500"
                                : seoAnalysis.totalScore >= 60
                                ? "bg-amber-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${seoAnalysis.totalScore}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                          <span>{seoAnalysis.passedCount} checks passed</span>
                          <span>{seoAnalysis.warningCount + seoAnalysis.failedCount} issues</span>
                        </div>

                        <div className="pt-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const { updatedPost, fixedItems } = autoFixBlogPostSeo(editingPost);
                              setEditingPost(updatedPost);
                              showToast(`Auto-Fixed ${fixedItems.length} SEO items!`);
                            }}
                            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-700 py-2 text-xs font-bold text-white hover:bg-emerald-800 transition-all cursor-pointer shadow-xs"
                          >
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>⚡ 1-Click Auto-Fix</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setActiveTab("seo")}
                            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                          >
                            Inspect →
                          </button>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Publication Settings Card */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                    <h4 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                      Publishing Settings
                    </h4>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                        Status
                      </label>
                      <select
                        value={editingPost.status}
                        onChange={(e) =>
                          setEditingPost({
                            ...editingPost,
                            status: e.target.value as "published" | "draft",
                          })
                        }
                        className={`w-full rounded-xl border p-2.5 text-xs font-bold focus:outline-none cursor-pointer ${
                          editingPost.status === "published"
                            ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                            : "border-amber-300 bg-amber-50 text-amber-800"
                        }`}
                      >
                        <option value="published">Live Published</option>
                        <option value="draft">Hidden Draft</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5 border border-slate-200/60">
                      <div>
                        <div className="text-xs font-bold text-slate-900">Featured Article</div>
                        <div className="text-[11px] text-slate-400">Highlight at top of blog</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={editingPost.featured}
                        onChange={(e) =>
                          setEditingPost({ ...editingPost, featured: e.target.checked })
                        }
                        className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                        URL Slug
                      </label>
                      <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
                        <span>/blog/</span>
                        <input
                          type="text"
                          value={editingPost.slug}
                          onChange={(e) =>
                            setEditingPost({ ...editingPost, slug: e.target.value })
                          }
                          placeholder="url-slug"
                          className="flex-1 bg-transparent text-slate-900 font-medium focus:outline-none pl-1 text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Category & Tags Card */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                    <h4 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                      Taxonomy &amp; Tags
                    </h4>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                        Category
                      </label>
                      <select
                        value={editingPost.category}
                        onChange={(e) =>
                          setEditingPost({ ...editingPost, category: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-800 focus:border-emerald-600 focus:outline-none"
                      >
                        {BLOG_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                        Tags
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddTag();
                            }
                          }}
                          placeholder="Type tag & enter..."
                          className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-emerald-600 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleAddTag}
                          className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-slate-800 cursor-pointer"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {(editingPost.tags || []).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-700"
                          >
                            #{tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Cover Image Card */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h4 className="font-display text-base font-bold text-slate-900">
                        Featured Cover Image
                      </h4>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">
                        Upload or URL
                      </span>
                    </div>

                    {editingPost.coverImage && (
                      <div className="relative overflow-hidden rounded-xl border border-slate-200 aspect-[16/10] bg-slate-100 group shadow-xs">
                        <img
                          src={editingPost.coverImage}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setEditingPost({ ...editingPost, coverImage: "" })}
                          className="absolute top-2 right-2 rounded-full bg-slate-900/80 p-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 cursor-pointer"
                          title="Remove Image"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}

                    {/* File Upload Button (Cloudinary CDN Integration) */}
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        id="cover-file-upload"
                        disabled={isUploadingImage}
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          if (!file.type.startsWith("image/")) {
                            alert("Please select a valid image file.");
                            return;
                          }

                          // If Cloudinary ENV is configured, upload directly to CDN
                          if (isCloudinaryConfigured()) {
                            setIsUploadingImage(true);
                            try {
                              const res = await uploadImageToCloudinary(file);
                              if (res.success && res.url) {
                                setEditingPost({ ...editingPost, coverImage: res.url });
                                showToast(`Uploaded to Cloudinary CDN successfully! (${res.format?.toUpperCase()})`);
                              } else {
                                alert(`Cloudinary upload failed: ${res.error}`);
                              }
                            } catch (err: any) {
                              alert(`Upload error: ${err.message}`);
                            } finally {
                              setIsUploadingImage(false);
                            }
                            return;
                          }

                          // Fallback to local DataURL if Cloudinary ENV is not yet added
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const result = event.target?.result as string;
                            if (result) {
                              setEditingPost({ ...editingPost, coverImage: result });
                              showToast("Cover image loaded locally (Add Cloudinary ENV for CDN saving)");
                            }
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                      <label
                        htmlFor="cover-file-upload"
                        className={`flex items-center justify-center gap-2 rounded-xl border-2 border-dashed p-3 text-xs font-bold transition-all shadow-xs ${
                          isUploadingImage
                            ? "border-emerald-400 bg-emerald-50 text-emerald-600 cursor-wait opacity-80"
                            : "border-emerald-300 bg-emerald-50/50 text-emerald-800 hover:bg-emerald-100/60 hover:border-emerald-500 cursor-pointer"
                        }`}
                      >
                        {isUploadingImage ? (
                          <>
                            <RefreshCw className="h-4 w-4 text-emerald-700 animate-spin" />
                            <span>Uploading to Cloudinary CDN...</span>
                          </>
                        ) : (
                          <>
                            <ImageIcon className="h-4 w-4 text-emerald-700" />
                            <span>
                              {isCloudinaryConfigured()
                                ? "Upload Image to Cloudinary CDN"
                                : "Upload Image (Set Cloudinary ENV for CDN)"}
                            </span>
                          </>
                        )}
                      </label>
                      {isCloudinaryConfigured() && (
                        <p className="mt-1 text-[10px] text-emerald-600 font-medium">
                          ✓ Cloudinary connected: Images automatically compressed &amp; cached on global CDN.
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                        Or Paste Web Image URL
                      </label>
                      <input
                        type="url"
                        value={editingPost.coverImage}
                        onChange={(e) =>
                          setEditingPost({ ...editingPost, coverImage: e.target.value })
                        }
                        placeholder="https://images.unsplash.com/..."
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-emerald-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Quick Stock Presets
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {COVER_PRESETS.map((preset) => (
                          <button
                            key={preset.name}
                            type="button"
                            onClick={() =>
                              setEditingPost({ ...editingPost, coverImage: preset.url })
                            }
                            className={`flex items-center gap-1.5 rounded-lg border p-1.5 text-[10px] font-medium transition-all cursor-pointer ${
                              editingPost.coverImage === preset.url
                                ? "border-emerald-600 bg-emerald-50 text-emerald-800 font-bold"
                                : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            <img
                              src={preset.url}
                              alt=""
                              className="h-4 w-5 rounded object-cover"
                            />
                            <span>{preset.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: SEO & Meta (with Full SeoAnalysisPanel) */}
            {activeTab === "seo" && (
              <div className="mx-auto max-w-5xl space-y-8">
                {/* Real-time SEO Analysis Suite & Auto-Fix Engine */}
                <SeoAnalysisPanel
                  post={editingPost}
                  onUpdatePost={(updated) => setEditingPost(updated)}
                  onToast={showToast}
                />

                {/* Custom Metadata Fields */}
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs space-y-6">
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-900">
                      Metadata &amp; Search Appearance Customization
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Customize how search engines and AI agents index and format your article snippet.
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                        Custom SEO Title (Max 65 chars recommended)
                      </label>
                      <input
                        type="text"
                        value={editingPost.seoTitle}
                        onChange={(e) =>
                          setEditingPost({ ...editingPost, seoTitle: e.target.value })
                        }
                        placeholder={editingPost.title || "Meta title for search engines..."}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-emerald-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                        Meta Description (Optimal: 120-160 characters)
                      </label>
                      <textarea
                        rows={3}
                        value={editingPost.seoDescription}
                        onChange={(e) =>
                          setEditingPost({ ...editingPost, seoDescription: e.target.value })
                        }
                        placeholder={editingPost.excerpt || "Description under 160 characters..."}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:border-emerald-600 focus:outline-none"
                      />
                    </div>

                    {/* Google SERP Card Preview */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 mt-6">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
                        Google Search Result Snippet Preview
                      </span>
                      <div className="space-y-1 font-sans">
                        <div className="text-xs text-emerald-800 flex items-center gap-1.5 truncate">
                          <span>https://www.velzx.com/blog/{editingPost.slug || "url-slug"}</span>
                        </div>
                        <h4 className="text-base text-blue-700 hover:underline font-medium cursor-pointer">
                          {editingPost.seoTitle || editingPost.title || "Article Title Preview"} | Shanmu
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                          {editingPost.seoDescription ||
                            editingPost.excerpt ||
                            "This is how your post meta description will appear in search results."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Live Preview */}
            {activeTab === "preview" && (
              <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 md:p-12 shadow-xs space-y-8">
                <div className="space-y-3">
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800">
                    {editingPost.category}
                  </span>
                  <h1 className="font-display text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                    {editingPost.title || "Your Article Title"}
                  </h1>
                  <p className="text-base text-slate-600 italic leading-relaxed">
                    {editingPost.excerpt || "Your article excerpt summary will render here..."}
                  </p>
                  <div className="flex items-center gap-3 pt-3 text-xs text-slate-400 border-t border-slate-100">
                    <span>By Shanmugavel</span>
                    <span>•</span>
                    <span>{editingPost.publishedAt}</span>
                    <span>•</span>
                    <span>5 min read</span>
                  </div>
                </div>

                {editingPost.coverImage && (
                  <img
                    src={editingPost.coverImage}
                    alt=""
                    className="w-full max-h-[450px] rounded-2xl object-cover border border-slate-200 shadow-md"
                  />
                )}

                <div
                  className="prose prose-slate max-w-none prose-headings:font-display prose-headings:text-slate-900 prose-p:text-slate-700 prose-blockquote:border-emerald-600 prose-blockquote:bg-emerald-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg"
                  dangerouslySetInnerHTML={{
                    __html: editingPost.content || "<p>No content written yet.</p>",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
