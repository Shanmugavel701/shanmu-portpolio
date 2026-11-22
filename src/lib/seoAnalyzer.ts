import { BlogPost } from "./blogStorage";

export interface SeoCheckItem {
  id: string;
  category: "title" | "description" | "content" | "keywords" | "media" | "slug" | "links";
  title: string;
  description: string;
  status: "pass" | "warning" | "fail";
  score: number; // 0 to 10
  suggestion: string;
  autoFixable: boolean;
}

export interface SeoAnalysisResult {
  totalScore: number; // 0 to 100
  rating: "Poor" | "Needs Improvement" | "Good" | "Excellent";
  focusKeyword: string;
  keywordDensity: number;
  wordCount: number;
  readingTimeMinutes: number;
  headingsCount: { h1: number; h2: number; h3: number };
  imagesCount: number;
  imagesMissingAlt: number;
  internalLinksCount: number;
  externalLinksCount: number;
  keywordInIntro: boolean;
  keywordInHeading: boolean;
  checks: SeoCheckItem[];
  passedCount: number;
  warningCount: number;
  failedCount: number;
  categoryScores: {
    title: number;
    description: number;
    content: number;
    keywords: number;
    media: number;
    slug: number;
  };
}

// Helper to strip HTML tags
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, "").replace(/&nbsp;/g, " ").trim();
}

// Extract word count
export function getWordCount(text: string): number {
  const clean = text.trim();
  if (!clean) return 0;
  return clean.split(/\s+/).filter(Boolean).length;
}

const POWER_WORDS = [
  "how to", "guide", "ultimate", "best", "speed", "optimization", "boost",
  "proven", "case study", "step-by-step", "blueprint", "checklist", "results",
  "strategies", "complete", "expert", "master", "fast", "top"
];

export function analyzeBlogPostSeo(
  post: Partial<BlogPost> & { title: string; content?: string },
  customFocusKeyword?: string
): SeoAnalysisResult {
  const title = (post.title || "").trim();
  const content = post.content || "";
  const plainText = stripHtml(content);
  const excerpt = (post.excerpt || "").trim();
  const seoTitle = (post.seoTitle || post.title || "").trim();
  const seoDescription = (post.seoDescription || post.excerpt || "").trim();
  const slug = (post.slug || "").trim();
  const coverImage = (post.coverImage || "").trim();

  // Auto-detect focus keyword if not provided
  const focusKeyword = (
    customFocusKeyword ||
    post.tags?.[0] ||
    post.category ||
    title.split(/[:\-|]/)[0]?.split(/\s+/).slice(0, 3).join(" ") ||
    "WordPress"
  ).trim().toLowerCase();

  const words = plainText.toLowerCase().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  // Keyword occurrences
  const keywordRegex = focusKeyword
    ? new RegExp(`\\b${focusKeyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi")
    : null;
  const keywordMatches = keywordRegex ? plainText.match(keywordRegex) || [] : [];
  const keywordDensity = wordCount > 0 ? (keywordMatches.length / wordCount) * 100 : 0;

  // Keyword in Intro (first 120 words)
  const introWords = words.slice(0, 120).join(" ");
  const keywordInIntro = focusKeyword ? introWords.includes(focusKeyword) : false;

  // Headings analysis
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  const h2Matches = content.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
  const h3Matches = content.match(/<h3[^>]*>([\s\S]*?)<\/h3>/gi) || [];
  const headingsCount = {
    h1: h1Matches.length,
    h2: h2Matches.length,
    h3: h3Matches.length,
  };

  const allSubheadingText = [...h2Matches, ...h3Matches]
    .map((h) => stripHtml(h).toLowerCase())
    .join(" ");
  const keywordInHeading = focusKeyword ? allSubheadingText.includes(focusKeyword) : false;

  // Image count and Alt attribute check
  const imgTags = content.match(/<img[^>]*>/gi) || [];
  let imagesMissingAlt = 0;
  imgTags.forEach((tag) => {
    if (!tag.includes('alt="') || tag.includes('alt=""')) {
      imagesMissingAlt++;
    }
  });
  const imagesCount = imgTags.length + (coverImage ? 1 : 0);

  // Link analysis
  const linkMatches = content.match(/<a\s+(?:[^>]*?\s+)?href="([^"]*)"/gi) || [];
  let internalLinksCount = 0;
  let externalLinksCount = 0;
  linkMatches.forEach((l) => {
    if (l.includes("http") && !l.includes("shanmu") && !l.includes("localhost") && !l.includes("velzx")) {
      externalLinksCount++;
    } else {
      internalLinksCount++;
    }
  });

  const checks: SeoCheckItem[] = [];

  // 1. Title Length Check
  const titleLen = seoTitle.length || title.length;
  if (titleLen >= 35 && titleLen <= 65) {
    checks.push({
      id: "title-length",
      category: "title",
      title: "Title Length Optimization",
      description: `Title is ${titleLen} characters (Optimal: 35-65 characters).`,
      status: "pass",
      score: 10,
      suggestion: "Great! Your title length is optimal for search engine display without truncation.",
      autoFixable: false,
    });
  } else if (titleLen > 0 && titleLen < 35) {
    checks.push({
      id: "title-length",
      category: "title",
      title: "Title Is Too Short",
      description: `Title is only ${titleLen} characters. Search engines prefer 35-65 characters.`,
      status: "warning",
      score: 5,
      suggestion: "Expand your title with descriptive context or benefit-driven phrases (e.g. 'How to', 'Step-by-Step Guide').",
      autoFixable: true,
    });
  } else {
    checks.push({
      id: "title-length",
      category: "title",
      title: "Title Length Issue",
      description: titleLen === 0 ? "Title is empty." : `Title is too long (${titleLen} characters) and may get cut off on Google.`,
      status: "fail",
      score: 0,
      suggestion: "Keep title under 65 characters so it renders completely on search result cards.",
      autoFixable: true,
    });
  }

  // 2. Keyword in Title
  if (focusKeyword && (title.toLowerCase().includes(focusKeyword) || seoTitle.toLowerCase().includes(focusKeyword))) {
    checks.push({
      id: "title-keyword",
      category: "title",
      title: "Focus Keyword in Title",
      description: `Focus keyword "${focusKeyword}" is present in the title.`,
      status: "pass",
      score: 10,
      suggestion: "Awesome! Having the keyword in the title is a strong primary ranking signal.",
      autoFixable: false,
    });
  } else {
    checks.push({
      id: "title-keyword",
      category: "title",
      title: "Focus Keyword Missing in Title",
      description: `The keyword "${focusKeyword}" was not found in your title.`,
      status: "warning",
      score: 4,
      suggestion: `Add "${focusKeyword}" naturally near the beginning of your article title.`,
      autoFixable: true,
    });
  }

  // 3. Power Word in Title
  const hasPowerWord = POWER_WORDS.some((pw) => title.toLowerCase().includes(pw) || seoTitle.toLowerCase().includes(pw));
  if (hasPowerWord) {
    checks.push({
      id: "title-power-word",
      category: "title",
      title: "Click-Worthy Power Words",
      description: "Title includes high-converting power words or numbers that boost CTR.",
      status: "pass",
      score: 10,
      suggestion: "Compelling headlines achieve higher click-through rates on search and social feeds.",
      autoFixable: false,
    });
  } else {
    checks.push({
      id: "title-power-word",
      category: "title",
      title: "Add Power Words to Title",
      description: "No high-impact power words (e.g. 'Guide', 'Ultimate', 'Best', 'Speed') detected.",
      status: "warning",
      score: 6,
      suggestion: "Incorporate words like 'Guide', 'Proven', 'Case Study', or numbers to attract more clicks.",
      autoFixable: true,
    });
  }

  // 4. Meta Description Length
  const descLen = seoDescription.length;
  if (descLen >= 110 && descLen <= 165) {
    checks.push({
      id: "meta-description-length",
      category: "description",
      title: "Meta Description Length",
      description: `Description is ${descLen} characters (Optimal: 120-160).`,
      status: "pass",
      score: 10,
      suggestion: "Perfect! Meta description fits ideally within Google and AI search snippet limits.",
      autoFixable: false,
    });
  } else if (descLen > 0 && descLen < 110) {
    checks.push({
      id: "meta-description-length",
      category: "description",
      title: "Meta Description Too Short",
      description: `Description is ${descLen} characters. Try expanding to 120-160 characters.`,
      status: "warning",
      score: 6,
      suggestion: "Add a compelling call-to-action or summary of what readers will learn.",
      autoFixable: true,
    });
  } else {
    checks.push({
      id: "meta-description-length",
      category: "description",
      title: "Meta Description Missing or Too Long",
      description: descLen === 0 ? "Meta description is missing." : `Description is ${descLen} chars (Google truncates after 160).`,
      status: "fail",
      score: 2,
      suggestion: "Write a concise 120-160 character summary with key takeaway benefits.",
      autoFixable: true,
    });
  }

  // 5. Keyword in Meta Description
  if (focusKeyword && seoDescription.toLowerCase().includes(focusKeyword)) {
    checks.push({
      id: "meta-description-keyword",
      category: "description",
      title: "Focus Keyword in Meta Description",
      description: `Focus keyword "${focusKeyword}" is included in the meta description.`,
      status: "pass",
      score: 10,
      suggestion: "Great job! Search engines will highlight the matching keyword in search snippets.",
      autoFixable: false,
    });
  } else {
    checks.push({
      id: "meta-description-keyword",
      category: "description",
      title: "Focus Keyword Missing in Description",
      description: `Keyword "${focusKeyword}" not found in meta description.`,
      status: "warning",
      score: 5,
      suggestion: `Incorporate the keyword "${focusKeyword}" in the meta description snippet.`,
      autoFixable: true,
    });
  }

  // 6. Content Length & Depth
  if (wordCount >= 500) {
    checks.push({
      id: "content-length",
      category: "content",
      title: "Content Depth & Word Count",
      description: `Article has ${wordCount} words (Recommended: 500+ words).`,
      status: "pass",
      score: 10,
      suggestion: "Comprehensive, high-value depth that signals authority to search engines.",
      autoFixable: false,
    });
  } else if (wordCount >= 250) {
    checks.push({
      id: "content-length",
      category: "content",
      title: "Content Length Moderate",
      description: `Article is ${wordCount} words. Aim for 500+ words for better rankings.`,
      status: "warning",
      score: 6,
      suggestion: "Add actionable examples, steps, or case study metrics to increase depth.",
      autoFixable: false,
    });
  } else {
    checks.push({
      id: "content-length",
      category: "content",
      title: "Content Is Too Thin",
      description: `Only ${wordCount} words. Thin content struggles to rank organically.`,
      status: "fail",
      score: 2,
      suggestion: "Write at least 300-500 words with thorough analysis and structural sections.",
      autoFixable: false,
    });
  }

  // 7. Keyword in Introduction
  if (keywordInIntro) {
    checks.push({
      id: "keyword-intro",
      category: "keywords",
      title: "Keyword in Introduction",
      description: `Focus keyword "${focusKeyword}" appears in the first 120 words.`,
      status: "pass",
      score: 10,
      suggestion: "Strong contextual relevance established immediately for readers and search crawlers.",
      autoFixable: false,
    });
  } else {
    checks.push({
      id: "keyword-intro",
      category: "keywords",
      title: "Keyword Missing in Introduction",
      description: `Focus keyword "${focusKeyword}" not found in the opening paragraphs.`,
      status: "warning",
      score: 5,
      suggestion: `Introduce "${focusKeyword}" within the first two sentences of your opening paragraph.`,
      autoFixable: true,
    });
  }

  // 8. Subheading Structure (H2/H3)
  if (h2Matches.length >= 2) {
    checks.push({
      id: "content-headings",
      category: "content",
      title: "Subheading Structure (H2/H3)",
      description: `Found ${h2Matches.length} H2 subheadings and ${h3Matches.length} H3 subheadings.`,
      status: "pass",
      score: 10,
      suggestion: "Great hierarchical structure! Scannable content ranks higher and improves user dwell time.",
      autoFixable: false,
    });
  } else {
    checks.push({
      id: "content-headings",
      category: "content",
      title: "Missing Subheadings (H2/H3)",
      description: `Only ${h2Matches.length} H2 subheadings found.`,
      status: "warning",
      score: 4,
      suggestion: "Break down the article with at least 2 or 3 H2 section headings.",
      autoFixable: true,
    });
  }

  // 9. Keyword in Subheadings
  if (keywordInHeading) {
    checks.push({
      id: "keyword-headings",
      category: "keywords",
      title: "Keyword in Subheadings",
      description: `Focus keyword appears in one or more H2/H3 subheadings.`,
      status: "pass",
      score: 10,
      suggestion: "Reinforces topical authority across semantic section titles.",
      autoFixable: false,
    });
  } else {
    checks.push({
      id: "keyword-headings",
      category: "keywords",
      title: "Keyword Missing in Subheadings",
      description: "No H2/H3 headings currently contain the focus keyword.",
      status: "warning",
      score: 5,
      suggestion: `Add "${focusKeyword}" into at least one main H2 section heading.`,
      autoFixable: true,
    });
  }

  // 10. Keyword Density
  if (keywordDensity >= 0.8 && keywordDensity <= 2.8) {
    checks.push({
      id: "keyword-density",
      category: "keywords",
      title: "Keyword Density",
      description: `Keyword density is ${keywordDensity.toFixed(1)}% (${keywordMatches.length} occurrences).`,
      status: "pass",
      score: 10,
      suggestion: "Natural keyword distribution within the healthy 1.0% - 2.5% density range.",
      autoFixable: false,
    });
  } else if (keywordDensity > 2.8) {
    checks.push({
      id: "keyword-density",
      category: "keywords",
      title: "Keyword Stuffing Risk",
      description: `Keyword density is elevated (${keywordDensity.toFixed(1)}%).`,
      status: "warning",
      score: 5,
      suggestion: "Reduce repetitive exact-match keywords to avoid over-optimization penalties.",
      autoFixable: false,
    });
  } else {
    checks.push({
      id: "keyword-density",
      category: "keywords",
      title: "Low Keyword Frequency",
      description: `Keyword "${focusKeyword}" appears ${keywordMatches.length} times in content (${keywordDensity.toFixed(1)}%).`,
      status: "warning",
      score: 4,
      suggestion: `Mention "${focusKeyword}" 2-3 more times naturally in your content body.`,
      autoFixable: true,
    });
  }

  // 11. Cover & Body Media Check
  if (coverImage && imagesCount >= 1) {
    checks.push({
      id: "media-richness",
      category: "media",
      title: "Featured Cover & Visual Media",
      description: `Cover image is set and article contains ${imagesCount} visual media items.`,
      status: "pass",
      score: 10,
      suggestion: "Rich media increases user engagement, time on page, and social sharing.",
      autoFixable: false,
    });
  } else {
    checks.push({
      id: "media-richness",
      category: "media",
      title: "Missing Featured Cover Image",
      description: "No cover image selected for this article.",
      status: "fail",
      score: 2,
      suggestion: "Upload or select a high-resolution featured cover image.",
      autoFixable: true,
    });
  }

  // 12. Image Alt Attributes
  if (imgTags.length > 0) {
    if (imagesMissingAlt === 0) {
      checks.push({
        id: "media-alt-tags",
        category: "media",
        title: "Image Alt Attributes",
        description: `All ${imgTags.length} images have descriptive alt text tags.`,
        status: "pass",
        score: 10,
        suggestion: "Excellent for image SEO, Google Images ranking, and web accessibility.",
        autoFixable: false,
      });
    } else {
      checks.push({
        id: "media-alt-tags",
        category: "media",
        title: "Missing Image Alt Tags",
        description: `${imagesMissingAlt} of ${imgTags.length} images are missing alt attributes.`,
        status: "warning",
        score: 5,
        suggestion: "Add descriptive alt tags including relevant keywords to all images.",
        autoFixable: true,
      });
    }
  }

  // 13. URL Slug Check
  if (slug && slug.length <= 60 && !slug.includes(" ") && slug === slug.toLowerCase()) {
    checks.push({
      id: "slug-optimization",
      category: "slug",
      title: "Clean URL Slug",
      description: `Slug /blog/${slug} is clean and keyword-friendly.`,
      status: "pass",
      score: 10,
      suggestion: "Clean short URLs rank better on Google and are easier to share.",
      autoFixable: false,
    });
  } else {
    checks.push({
      id: "slug-optimization",
      category: "slug",
      title: "URL Slug Needs Optimization",
      description: !slug ? "Slug is empty." : "Slug contains uppercase letters or spaces.",
      status: "warning",
      score: 4,
      suggestion: "Use lowercase letters and hyphens for a clean, short URL slug.",
      autoFixable: true,
    });
  }

  // 14. Excerpt Card Summary
  if (excerpt.length >= 60 && excerpt.length <= 250) {
    checks.push({
      id: "excerpt-summary",
      category: "description",
      title: "Card Excerpt Summary",
      description: `Excerpt is ${excerpt.length} characters with great detail.`,
      status: "pass",
      score: 10,
      suggestion: "Provides visitors with an enticing hook on blog directory listings.",
      autoFixable: false,
    });
  } else {
    checks.push({
      id: "excerpt-summary",
      category: "description",
      title: "Excerpt Summary Missing or Short",
      description: !excerpt ? "No card excerpt provided." : `Excerpt is too short (${excerpt.length} chars).`,
      status: "warning",
      score: 4,
      suggestion: "Add a 2-line preview excerpt to encourage clicks from the blog index.",
      autoFixable: true,
    });
  }

  // Category score breakdowns
  const getCatScore = (cat: SeoCheckItem["category"]) => {
    const catChecks = checks.filter((c) => c.category === cat);
    if (catChecks.length === 0) return 100;
    const total = catChecks.reduce((acc, c) => acc + c.score, 0);
    return Math.round((total / (catChecks.length * 10)) * 100);
  };

  const categoryScores = {
    title: getCatScore("title"),
    description: getCatScore("description"),
    content: getCatScore("content"),
    keywords: getCatScore("keywords"),
    media: getCatScore("media"),
    slug: getCatScore("slug"),
  };

  // Calculate Total Score
  const totalPossible = checks.length * 10;
  const currentTotal = checks.reduce((acc, c) => acc + c.score, 0);
  const totalScore = Math.round((currentTotal / totalPossible) * 100);

  let rating: SeoAnalysisResult["rating"] = "Needs Improvement";
  if (totalScore >= 85) rating = "Excellent";
  else if (totalScore >= 70) rating = "Good";
  else if (totalScore >= 50) rating = "Needs Improvement";
  else rating = "Poor";

  const passedCount = checks.filter((c) => c.status === "pass").length;
  const warningCount = checks.filter((c) => c.status === "warning").length;
  const failedCount = checks.filter((c) => c.status === "fail").length;

  return {
    totalScore,
    rating,
    focusKeyword,
    keywordDensity,
    wordCount,
    readingTimeMinutes,
    headingsCount,
    imagesCount,
    imagesMissingAlt,
    internalLinksCount,
    externalLinksCount,
    keywordInIntro,
    keywordInHeading,
    checks,
    passedCount,
    warningCount,
    failedCount,
    categoryScores,
  };
}

/**
 * 1-Click Auto-Fix Engine:
 * Analyzes the post and returns an optimized version with SEO title, description,
 * clean slug, excerpt, image alt tags, focus keywords and tags automatically fixed!
 */
export function autoFixBlogPostSeo(
  post: BlogPost,
  customKeyword?: string
): { updatedPost: BlogPost; fixedItems: string[] } {
  const fixedItems: string[] = [];
  const updated: BlogPost = { ...post };

  const plain = stripHtml(post.content || "");
  const focusKeyword = (
    customKeyword ||
    post.tags?.[0] ||
    post.category ||
    "Web Development"
  ).trim();

  const brand = "Shanmu";

  // 1. Auto-Fix Title & SEO Title
  let currentTitle = updated.title.trim();
  if (currentTitle.length < 35 && !currentTitle.toLowerCase().includes("guide")) {
    currentTitle = `${currentTitle}: Complete Practical Guide`;
    updated.title = currentTitle;
    fixedItems.push("Expanded Title with compelling hook");
  }

  if (!updated.seoTitle || updated.seoTitle.length < 35 || updated.seoTitle.length > 68) {
    let generatedTitle = currentTitle;
    if (!generatedTitle.toLowerCase().includes(brand.toLowerCase())) {
      generatedTitle = `${generatedTitle} | ${brand}`;
    }
    if (generatedTitle.length > 65) {
      generatedTitle = `${currentTitle.slice(0, 52)}... | ${brand}`;
    }
    updated.seoTitle = generatedTitle;
    fixedItems.push("Generated SEO-optimized Google Title tag");
  }

  // 2. Auto-Fix Meta Description & Excerpt from Content
  if (!updated.seoDescription || updated.seoDescription.length < 100 || updated.seoDescription.length > 165) {
    if (plain.length > 50) {
      const sentences = plain.split(/(?<=[.?!])\s+/).filter(Boolean);
      let desc = sentences.slice(0, 2).join(" ");
      if (focusKeyword && !desc.toLowerCase().includes(focusKeyword.toLowerCase())) {
        desc = `Learn how to master ${focusKeyword}. ${desc}`;
      }
      if (desc.length > 155) {
        desc = `${desc.slice(0, 150)}...`;
      }
      if (desc.length < 110) {
        desc = `${desc} Discover actionable insights and strategies by ${brand}.`;
      }
      updated.seoDescription = desc;
      if (!updated.excerpt || updated.excerpt.length < 40) {
        updated.excerpt = desc;
      }
      fixedItems.push("Constructed 150-char keyword-rich Meta Description & Excerpt");
    } else {
      const defaultDesc = `Explore in-depth analysis and practical insights on ${focusKeyword} by Shanmugavel. Read our comprehensive guide.`;
      updated.seoDescription = defaultDesc;
      if (!updated.excerpt) updated.excerpt = defaultDesc;
      fixedItems.push("Set default keyword-rich Meta Description");
    }
  }

  // 3. Auto-Fix URL Slug
  if (!updated.slug || updated.slug.includes(" ") || updated.slug !== updated.slug.toLowerCase()) {
    const cleanSlug = updated.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60);
    updated.slug = cleanSlug || `article-${Date.now()}`;
    fixedItems.push("Cleaned URL slug structure");
  }

  // 4. Auto-Fix Cover Image if missing
  if (!updated.coverImage) {
    updated.coverImage =
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80";
    fixedItems.push("Assigned high-resolution featured cover image");
  }

  // 5. Auto-Fix missing Image Alt Tags inside Content HTML
  if (updated.content && updated.content.includes("<img")) {
    let replacedCount = 0;
    const fixedContent = updated.content.replace(/<img([^>]*)>/gi, (match, attributes) => {
      if (!attributes.includes("alt=") || attributes.includes('alt=""')) {
        replacedCount++;
        const cleaned = attributes.replace(/alt=""/g, "").trim();
        return `<img ${cleaned} alt="${focusKeyword} - Shanmu Guide Visual" />`;
      }
      return match;
    });

    if (replacedCount > 0) {
      updated.content = fixedContent;
      fixedItems.push(`Added Alt attributes to ${replacedCount} content images`);
    }
  }

  // 6. Ensure tags contain focus keyword
  const currentTags = updated.tags || [];
  if (focusKeyword && !currentTags.some((t) => t.toLowerCase() === focusKeyword.toLowerCase())) {
    updated.tags = [focusKeyword, ...currentTags].slice(0, 6);
    fixedItems.push(`Added focus keyword "${focusKeyword}" to article tags`);
  }

  // 7. Recalculate reading time
  const words = plain.split(/\s+/).filter(Boolean).length;
  updated.readTime = `${Math.max(1, Math.ceil(words / 200))} min read`;

  return { updatedPost: updated, fixedItems };
}
