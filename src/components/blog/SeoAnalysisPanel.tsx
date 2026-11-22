import { useState } from "react";
import { BlogPost } from "@/lib/blogStorage";
import {
  analyzeBlogPostSeo,
  autoFixBlogPostSeo,
  SeoAnalysisResult,
} from "@/lib/seoAnalyzer";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Wand2,
  Sliders,
  Search,
  Zap,
  HelpCircle,
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  Tag,
  TrendingUp,
  RefreshCw,
  Globe,
  Smartphone,
  Monitor,
  Share2,
  Layers,
  ArrowRight,
} from "lucide-react";

interface SeoAnalysisPanelProps {
  post: BlogPost;
  onUpdatePost: (updated: BlogPost) => void;
  onToast: (msg: string) => void;
}

export function SeoAnalysisPanel({
  post,
  onUpdatePost,
  onToast,
}: SeoAnalysisPanelProps) {
  const [customKeyword, setCustomKeyword] = useState(post.tags?.[0] || "");
  const [filterStatus, setFilterStatus] = useState<"all" | "fail" | "warning" | "pass">("all");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile" | "social">("desktop");
  const [isApplyingFix, setIsApplyingFix] = useState(false);

  // Compute live SEO analysis
  const analysis: SeoAnalysisResult = analyzeBlogPostSeo(post, customKeyword);

  const handleAutoFixAll = () => {
    setIsApplyingFix(true);
    setTimeout(() => {
      const { updatedPost, fixedItems } = autoFixBlogPostSeo(post, customKeyword);
      onUpdatePost(updatedPost);
      setIsApplyingFix(false);
      if (fixedItems.length > 0) {
        onToast(`⚡ Auto-Fixed ${fixedItems.length} SEO items: ${fixedItems.slice(0, 2).join(", ")}`);
      } else {
        onToast("SEO is already at peak 100% score!");
      }
    }, 350);
  };

  const handleQuickFixSingle = (checkId: string) => {
    const { updatedPost, fixedItems } = autoFixBlogPostSeo(post, customKeyword);
    onUpdatePost(updatedPost);
    onToast(`Quick fixed: ${fixedItems[0] || checkId}!`);
  };

  // Score color styling
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 border-emerald-500 bg-emerald-50/70";
    if (score >= 60) return "text-amber-600 border-amber-500 bg-amber-50/70";
    return "text-red-600 border-red-500 bg-red-50/70";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "bg-emerald-100 text-emerald-800 border-emerald-300";
    if (score >= 60) return "bg-amber-100 text-amber-800 border-amber-300";
    return "bg-red-100 text-red-800 border-red-300";
  };

  const filteredChecks = analysis.checks.filter((check) => {
    if (filterStatus === "all") return true;
    return check.status === filterStatus;
  });

  const previewTitle = post.seoTitle || post.title || "Untitled Article | Shanmu";
  const previewDesc = post.seoDescription || post.excerpt || "Read in-depth web development case studies and technical articles by Shanmugavel.";
  const previewSlug = post.slug || "article-url";

  return (
    <div className="space-y-6">
      {/* Top Banner: Real-Time Score Gauge & 1-Click Auto-Fix Action */}
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 md:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Circular Score & Rating */}
          <div className="flex items-center gap-6">
            <div
              className={`relative flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-full border-4 ${getScoreColor(
                analysis.totalScore
              )} shadow-md`}
            >
              <span className="text-3xl font-display font-bold">
                {analysis.totalScore}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">
                / 100
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display text-2xl font-bold text-slate-900">
                  SEO &amp; Content Quality Score
                </h3>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${getScoreBadge(
                    analysis.totalScore
                  )}`}
                >
                  {analysis.rating}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500 max-w-lg">
                Automated auditing engine checking search ranking factors, keyword placement, meta tags, image alt tags, and structural hierarchy.
              </p>

              {/* Counts */}
              <div className="mt-3 flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="h-3.5 w-3.5" /> {analysis.passedCount} Passed
                </span>
                <span className="flex items-center gap-1.5 text-amber-700">
                  <AlertTriangle className="h-3.5 w-3.5" /> {analysis.warningCount} Warnings
                </span>
                {analysis.failedCount > 0 && (
                  <span className="flex items-center gap-1.5 text-red-600">
                    <XCircle className="h-3.5 w-3.5" /> {analysis.failedCount} Critical
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 1-Click Auto-Fix Engine Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              type="button"
              onClick={handleAutoFixAll}
              disabled={isApplyingFix}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-emerald-600/25 hover:from-emerald-700 hover:to-teal-800 transition-all cursor-pointer active:scale-95 disabled:opacity-70"
            >
              <Wand2 className={`h-4 w-4 ${isApplyingFix ? "animate-spin" : ""}`} />
              <span>{isApplyingFix ? "Optimizing Blog Post..." : "⚡ Auto-Fix SEO Issues"}</span>
            </button>
          </div>
        </div>

        {/* Quality Category Breakdown Bars */}
        <div className="mt-6 pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Title Tag", score: analysis.categoryScores.title },
            { label: "Meta Snippet", score: analysis.categoryScores.description },
            { label: "Content Depth", score: analysis.categoryScores.content },
            { label: "Keywords", score: analysis.categoryScores.keywords },
            { label: "Media & Alt", score: analysis.categoryScores.media },
            { label: "URL Slug", score: analysis.categoryScores.slug },
          ].map((cat) => (
            <div key={cat.label} className="rounded-xl border border-slate-200/60 bg-white p-2.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-600 truncate">{cat.label}</span>
                <span className={`font-bold ${cat.score >= 80 ? "text-emerald-700" : cat.score >= 50 ? "text-amber-700" : "text-red-600"}`}>
                  {cat.score}%
                </span>
              </div>
              <div className="mt-1.5 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    cat.score >= 80 ? "bg-emerald-500" : cat.score >= 50 ? "bg-amber-500" : "bg-red-500"
                  }`}
                  style={{ width: `${cat.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Target Focus Keyword & Diagnostics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Focus Keyword Input */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5 text-emerald-600" /> Focus Target Keyword
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customKeyword}
              onChange={(e) => setCustomKeyword(e.target.value)}
              placeholder="e.g. WordPress, Speed Optimization..."
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 font-medium focus:border-emerald-600 focus:bg-white focus:outline-none"
            />
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400">
            Keyword density:{" "}
            <strong className="text-slate-700">
              {analysis.keywordDensity.toFixed(1)}%
            </strong>{" "}
            (Ideal: 1.0% - 2.5%)
          </p>
        </div>

        {/* Content Length & Readability */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-blue-600" /> Article Length
            </span>
            <span className="text-xs font-bold text-slate-900">
              {analysis.wordCount} words
            </span>
          </div>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                analysis.wordCount >= 500
                  ? "bg-emerald-500"
                  : analysis.wordCount >= 250
                  ? "bg-amber-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${Math.min(100, (analysis.wordCount / 600) * 100)}%` }}
            />
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400">
            Est. reading time: {analysis.readingTimeMinutes} min • Target: 500+ words
          </p>
        </div>

        {/* Structure & Media Summary */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
              <ImageIcon className="h-3.5 w-3.5 text-purple-600" /> Media &amp; Headings
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="rounded-lg bg-slate-50 p-2 text-center border border-slate-100">
              <div className="text-sm font-bold text-slate-900">
                {analysis.headingsCount.h2 + analysis.headingsCount.h3}
              </div>
              <div className="text-[10px] text-slate-400">Subheadings</div>
            </div>
            <div className="rounded-lg bg-slate-50 p-2 text-center border border-slate-100">
              <div className="text-sm font-bold text-slate-900">
                {analysis.imagesCount}
              </div>
              <div className="text-[10px] text-slate-400">Images</div>
            </div>
          </div>
        </div>
      </div>

      {/* Live SERP & Social Sharing Card Preview */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-emerald-700" />
            <h4 className="font-display text-base font-bold text-slate-900">
              Search &amp; Social Snippet Previews
            </h4>
          </div>

          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setPreviewDevice("desktop")}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition-all cursor-pointer ${
                previewDevice === "desktop"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Monitor className="h-3.5 w-3.5" /> Desktop SERP
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice("mobile")}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition-all cursor-pointer ${
                previewDevice === "mobile"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" /> Mobile SERP
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice("social")}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition-all cursor-pointer ${
                previewDevice === "social"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Share2 className="h-3.5 w-3.5" /> Social Card
            </button>
          </div>
        </div>

        {/* Google Desktop Preview */}
        {previewDevice === "desktop" && (
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 font-sans space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                S
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-800 font-medium leading-none">Shanmugavel Portfolio</span>
                <span className="text-[10px] text-slate-400">https://shanmu.dev/blog/{previewSlug}</span>
              </div>
            </div>
            <h5 className="text-base text-[#1a0dab] hover:underline font-medium cursor-pointer pt-1">
              {previewTitle}
            </h5>
            <p className="text-xs text-[#4d5156] leading-relaxed max-w-2xl">
              {previewDesc}
            </p>
          </div>
        )}

        {/* Google Mobile Preview */}
        {previewDevice === "mobile" && (
          <div className="max-w-sm mx-auto rounded-2xl border-2 border-slate-300 bg-white p-4 shadow-sm font-sans space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <div className="h-6 w-6 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                S
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-slate-800">shanmu.dev</div>
                <div className="text-[10px] text-slate-400 truncate">https://shanmu.dev/blog/{previewSlug}</div>
              </div>
            </div>
            <h5 className="text-sm text-[#1a0dab] font-medium leading-snug">
              {previewTitle}
            </h5>
            <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-3">
              {previewDesc}
            </p>
          </div>
        )}

        {/* Social Card Preview (LinkedIn / Twitter) */}
        {previewDevice === "social" && (
          <div className="max-w-md mx-auto rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            {post.coverImage ? (
              <img src={post.coverImage} alt="" className="w-full h-44 object-cover" />
            ) : (
              <div className="w-full h-44 bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-medium">
                Cover Image Preview
              </div>
            )}
            <div className="p-4 space-y-1 bg-slate-50 border-t border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                SHANMU.DEV
              </span>
              <h5 className="text-xs font-bold text-slate-900 line-clamp-1">
                {previewTitle}
              </h5>
              <p className="text-[11px] text-slate-500 line-clamp-2">
                {previewDesc}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Actionable SEO Checklist & Suggestion Feed */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        {/* Header & Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-100 bg-slate-50/50 p-4 px-6 gap-3">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-emerald-700" />
            <h4 className="font-display text-base font-bold text-slate-900">
              SEO Recommendations &amp; Audit Checklist
            </h4>
          </div>

          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setFilterStatus("all")}
              className={`rounded-lg px-2.5 py-1 transition-all cursor-pointer ${
                filterStatus === "all"
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({analysis.checks.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus("fail")}
              className={`rounded-lg px-2.5 py-1 transition-all cursor-pointer ${
                filterStatus === "fail"
                  ? "bg-red-600 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Errors ({analysis.failedCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus("warning")}
              className={`rounded-lg px-2.5 py-1 transition-all cursor-pointer ${
                filterStatus === "warning"
                  ? "bg-amber-600 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Warnings ({analysis.warningCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus("pass")}
              className={`rounded-lg px-2.5 py-1 transition-all cursor-pointer ${
                filterStatus === "pass"
                  ? "bg-emerald-600 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Passed ({analysis.passedCount})
            </button>
          </div>
        </div>

        {/* List of Checks */}
        <div className="divide-y divide-slate-100">
          {filteredChecks.map((item) => (
            <div
              key={item.id}
              className="p-5 px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="mt-0.5 shrink-0">
                  {item.status === "pass" && (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  )}
                  {item.status === "warning" && (
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  )}
                  {item.status === "fail" && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h5 className="text-xs font-bold text-slate-900">
                      {item.title}
                    </h5>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        item.status === "pass"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : item.status === "warning"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {item.status === "pass"
                        ? "Passed (+10 pts)"
                        : item.status === "warning"
                        ? "Recommendation"
                        : "Critical Issue"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                  <p className="text-[11px] text-emerald-800 font-medium">
                    💡 Suggestion: {item.suggestion}
                  </p>
                </div>
              </div>

              {/* Quick Auto-Fix Button for this check */}
              {item.autoFixable && item.status !== "pass" && (
                <button
                  type="button"
                  onClick={() => handleQuickFixSingle(item.id)}
                  className="shrink-0 rounded-xl border border-emerald-300 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100 hover:border-emerald-500 transition-all cursor-pointer"
                >
                  Quick Fix
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
