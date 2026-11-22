import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { PageHeader } from "@/components/site/PageHeader";
import { Portfolio } from "@/components/site/Portfolio";
import { Results } from "@/components/site/Results";
import { Testimonials } from "@/components/site/Testimonials";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";
import { AIAssistant } from "@/components/site/AIAssistant";
import {
  SITE_URL,
  siteNavigationSchema,
  createBreadcrumbSchema,
} from "@/data/seoSchemas";

const pageTitle = "Case Studies & Portfolio | Web Development & SEO Results | Shanmu";
const pageDescription =
  "Explore verified case studies and client results by Shanmu. Real ROI: +140% checkout conversion, 1.1s load speed, 3.4x demo bookings, and #1 Google rankings across Coimbatore, India, and UAE.";
const canonicalUrl = `${SITE_URL}/work`;

const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${canonicalUrl}#collection`,
  url: canonicalUrl,
  name: pageTitle,
  description: pageDescription,
  about: { "@id": `${SITE_URL}/#person` },
  mainEntity: {
    "@type": "ItemList",
    name: "Web Development Case Studies",
    itemListElement: [
      {
        "@type": "CreativeWork",
        position: 1,
        name: "E-Commerce Website Redesign & Speed Revamp",
        headline: "D2C Fashion & Apparel Brand WooCommerce Overhaul",
        description:
          "Rebuilt outdated slow store into a lightweight WordPress + WooCommerce architecture with 1-page checkout. Result: +140% checkout conversion, 1.1s load speed, and ₹35L+ monthly GMV.",
        author: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "CreativeWork",
        position: 2,
        name: "SaaS Landing Page & Interactive Web App",
        headline: "B2B Automation Studio High-Converting Portal",
        description:
          "High-contrast editorial UI with interactive ROI calculator and streamlined booking. Result: 3.4x demo bookings, 68% lower bounce rate.",
        author: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "CreativeWork",
        position: 3,
        name: "Local Business Website & Local SEO Domination",
        headline: "Industrial Engineering Firm Organic Search Portal",
        description:
          "Authoritative corporate portal targeting high-intent commercial keywords. Result: #1 rank for 12+ target keywords, 50+ inbound RFQs monthly.",
        author: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "CreativeWork",
        position: 4,
        name: "Founder Brand Identity & Multi-Channel Lead Engine",
        headline: "Executive Advisory Brand & Content System",
        description:
          "Luxury dark-mode brand identity system paired with bi-weekly short-form video production. Result: 500K+ organic impressions, 2.5x deal size.",
        author: { "@id": `${SITE_URL}/#person` },
      },
    ],
  },
};

const breadcrumbs = createBreadcrumbSchema([{ name: "Work", url: "/work" }]);

export const Route = createFileRoute("/work")({
  component: WorkPage,
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      {
        name: "keywords",
        content:
          "web development portfolio, case studies web design, WordPress case study, ecommerce redesign results, local SEO case study India, freelance developer portfolio Coimbatore, conversion rate optimization examples",
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
      {
        name: "ai:description",
        content:
          "Verified client case studies and web engineering portfolio by Shanmugavel (Shanmu). Features quantifiable business results in D2C e-commerce (+140% conversion), B2B SaaS demo generation (3.4x), industrial local SEO (#1 rankings), and executive personal branding.",
      },
      { name: "geo.region", content: "IN-TN" },
      { name: "geo.placename", content: "Coimbatore, Tamil Nadu, India" },
      { name: "geo.position", content: "11.0168;76.9558" },
      { name: "ICBM", content: "11.0168, 76.9558" },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(portfolioSchema) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbs) },
      { type: "application/ld+json", children: JSON.stringify(siteNavigationSchema) },
    ],
  }),
});

function WorkPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Page Header */}
        <PageHeader
          breadcrumb="Work"
          badge="Case Studies &amp; Outcomes"
          title="Proven Outcomes."
          highlightTitle="Measurable Business ROI."
          description="I don't just build visually stunning websites; I engineer conversion systems. Browse recent client case studies featuring measurable gains in speed, search visibility, and revenue."
          keywords={[
            "WordPress E-Commerce Revamp",
            "SaaS Landing Pages",
            "Local SEO Domination",
            "High-Ticket Lead Funnels",
          ]}
        />

        {/* Quantified Business Results & Metric Cards */}
        <Results />

        {/* In-Depth Case Studies Grid */}
        <Portfolio />

        {/* Verified Client Testimonials */}
        <Testimonials />

        {/* Final CTA */}
        <FinalCTA />
      </main>

      <Footer />
      <AIAssistant />
    </div>
  );
}

