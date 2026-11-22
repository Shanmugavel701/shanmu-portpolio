import { Link } from "@tanstack/react-router";
import { getStoredSupabaseUser } from "@/lib/supabaseAuth";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  FolderTree,
  Sliders,
  ExternalLink,
  LogOut,
  Sparkles,
  Globe,
  Home,
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  currentTab: "dashboard" | "posts" | "categories" | "seo";
  onTabChange: (tab: "dashboard" | "posts" | "categories" | "seo") => void;
  onNewPost: () => void;
  onLogout: () => void;
  postCount: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export function AdminSidebar({
  currentTab,
  onTabChange,
  onNewPost,
  onLogout,
  postCount,
  isOpenMobile = false,
  onCloseMobile,
}: AdminSidebarProps) {
  const navItems = [
    {
      id: "dashboard" as const,
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "posts" as const,
      label: "Blog Posts",
      icon: FileText,
      badge: postCount,
    },
    {
      id: "categories" as const,
      label: "Categories",
      icon: FolderTree,
      badge: null,
    },
    {
      id: "seo" as const,
      label: "Global SEO",
      icon: Sliders,
      badge: null,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container (White Version) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col justify-between border-r border-slate-200/90 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top: Brand Header */}
        <div>
          <div className="flex h-18 items-center justify-between border-b border-slate-100 px-6">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="font-display text-2xl font-bold tracking-wider text-slate-900">
                SHANMU
              </span>
              <span className="rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                Admin
              </span>
            </Link>

            {onCloseMobile && (
              <button
                type="button"
                onClick={onCloseMobile}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:hidden"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Quick Action Button */}
          <div className="p-4">
            <button
              type="button"
              onClick={() => {
                onNewPost();
                if (onCloseMobile) onCloseMobile();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-slate-900/10 transition-all hover:bg-slate-800 hover:shadow-lg active:scale-[0.98] cursor-pointer"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Create New Post</span>
            </button>
          </div>

          {/* Navigation Section */}
          <div className="px-3 py-2">
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Management
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onTabChange(item.id);
                      if (onCloseMobile) onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-4 w-4 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== null && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Live Shortcuts Section */}
          <div className="px-3 py-4 border-t border-slate-100 mt-2">
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Live Website
            </div>
            <div className="space-y-1">
              <Link
                to="/blog"
                className="flex items-center justify-between rounded-xl px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-slate-400" />
                  <span>Public Blog Page</span>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
              </Link>

              <Link
                to="/"
                className="flex items-center justify-between rounded-xl px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Home className="h-4 w-4 text-slate-400" />
                  <span>Homepage</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom: User Profile & Logout */}
        <div className="border-t border-slate-100 p-4">
          {(() => {
            const activeUser = getStoredSupabaseUser();
            const userEmail = activeUser?.email || "admin@shanmu.dev";
            const initials = userEmail.slice(0, 2).toUpperCase();

            return (
              <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3 border border-slate-200/60">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center font-bold text-emerald-800 text-xs shrink-0">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-slate-900 truncate" title={userEmail}>
                      {userEmail}
                    </div>
                    <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Administrator
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onLogout}
                  title="Sign Out"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            );
          })()}
        </div>
      </aside>
    </>
  );
}
