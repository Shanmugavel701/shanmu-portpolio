import { createFileRoute } from "@tanstack/react-router";
import { BlogPostDetail } from "@/components/blog/BlogPostDetail";
import { getBlogBySlug } from "@/lib/blogStorage";
import {
  SITE_URL,
  siteNavigationSchema,
  createBreadcrumbSchema,
} from "@/data/seoSchemas";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getBlogBySlug(params.slug);
    const title = post?.seoTitle || post?.title
      ? `${post.seoTitle || post.title} | Shanmu`
      : "Article | Shanmu — Website Developer";
    const description =
      post?.seoDescription ||
      post?.excerpt ||
      "Actionable web engineering insights, speed optimization case studies, and conversion strategies by Shanmugavel.";
    const coverImage = post?.coverImage || `${SITE_URL}/assets/Shanmu.jpeg`;
    const canonical = `${SITE_URL}/blog/${params.slug}`;

    const articleSchema = post
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "@id": `${canonical}#article`,
          headline: post.title,
          description: post.excerpt || description,
          image: [coverImage],
          datePublished: post.publishedAt,
          dateModified: post.publishedAt,
          mainEntityOfPage: canonical,
          inLanguage: "en-IN",
          author: {
            "@type": "Person",
            name: post.author?.name || "Shanmugavel",
            jobTitle: post.author?.role || "Website Developer & Growth Specialist",
            url: SITE_URL,
          },
          publisher: {
            "@type": "Person",
            name: "Shanmugavel",
            url: SITE_URL,
          },
          articleSection: post.category,
          keywords: post.tags?.join(", ") || "Web Development",
        }
      : null;

    const breadcrumbs = createBreadcrumbSchema([
      { name: "Blog", url: "/blog" },
      { name: post?.title || "Article", url: `/blog/${params.slug}` },
    ]);

    return {
      meta: [
        { title },
        { name: "description", content: description },
        {
          name: "keywords",
          content: post?.tags?.join(", ") || "web development, WordPress, speed optimization, SEO, conversions",
        },
        { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: canonical },
        { property: "og:image", content: coverImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: coverImage },
        { name: "geo.region", content: "IN-TN" },
        { name: "geo.placename", content: "Coimbatore, Tamil Nadu, India" },
        { name: "geo.position", content: "11.0168;76.9558" },
        { name: "ICBM", content: "11.0168, 76.9558" },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        ...(articleSchema
          ? [{ type: "application/ld+json", children: JSON.stringify(articleSchema) }]
          : []),
        { type: "application/ld+json", children: JSON.stringify(breadcrumbs) },
        { type: "application/ld+json", children: JSON.stringify(siteNavigationSchema) },
      ],
    };
  },
  component: BlogPostDetailWrapper,
});

function BlogPostDetailWrapper() {
  const { slug } = Route.useParams();
  return <BlogPostDetail slug={slug} />;
}
