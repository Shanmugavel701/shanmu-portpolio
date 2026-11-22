import { createFileRoute } from "@tanstack/react-router";
import { BlogList } from "@/components/blog/BlogList";
import {
  SITE_URL,
  siteNavigationSchema,
  createBreadcrumbSchema,
} from "@/data/seoSchemas";

const pageTitle = "Insights & Case Studies | High-Performance Web & SEO | Shanmu";
const pageDescription =
  "Actionable articles, speed optimization case studies, custom WordPress blueprints, and revenue-driven web architecture strategies from Shanmugavel (Shanmu) in Coimbatore, India.";
const canonicalUrl = `${SITE_URL}/blog`;

const blogPageSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${canonicalUrl}#blog`,
  url: canonicalUrl,
  name: pageTitle,
  description: pageDescription,
  publisher: { "@id": `${SITE_URL}/#person` },
  inLanguage: "en-IN",
};

const breadcrumbs = createBreadcrumbSchema([{ name: "Blog", url: "/blog" }]);

export const Route = createFileRoute("/blog/")({
  component: BlogList,
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      {
        name: "keywords",
        content:
          "web development blog, WordPress speed optimization, WooCommerce case studies, technical SEO guides, Core Web Vitals blueprints, local SEO Coimbatore, Shanmugavel articles",
      },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl },
      { property: "og:image", content: `${SITE_URL}/assets/Shanmu.jpeg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: pageDescription },
      { name: "twitter:image", content: `${SITE_URL}/assets/Shanmu.jpeg` },
      {
        name: "ai:description",
        content:
          "Actionable web engineering publications by Shanmugavel (Shanmu), specializing in WordPress speed optimization (sub-1.2s LCP), WooCommerce checkout conversion boosts, local SEO ranking strategies for Tamil Nadu businesses, and modern B2B SaaS landing page design.",
      },
      { name: "geo.region", content: "IN-TN" },
      { name: "geo.placename", content: "Coimbatore, Tamil Nadu, India" },
      { name: "geo.position", content: "11.0168;76.9558" },
      { name: "ICBM", content: "11.0168, 76.9558" },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(blogPageSchema) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbs) },
      { type: "application/ld+json", children: JSON.stringify(siteNavigationSchema) },
    ],
  }),
});
