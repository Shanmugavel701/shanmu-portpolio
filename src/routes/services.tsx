import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { PageHeader } from "@/components/site/PageHeader";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";
import { AIAssistant } from "@/components/site/AIAssistant";
import { Reveal, SectionLabel } from "@/components/site/Reveal";
import {
  SITE_URL,
  professionalServiceSchema,
  siteNavigationSchema,
  createBreadcrumbSchema,
} from "@/data/seoSchemas";
import { Check, ArrowRight } from "lucide-react";

const pageTitle = "Web Development Services in Coimbatore | Custom WordPress & E-Commerce | Shanmu";
const pageDescription =
  "High-converting web development services by Shanmu in Coimbatore, India. Custom WordPress sites, WooCommerce stores, speed optimization, Figma UI/UX, and local SEO lead generation systems.";
const canonicalUrl = `${SITE_URL}/services`;

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${canonicalUrl}#service`,
  name: "Website Development & Digital Growth Services",
  provider: { "@id": `${SITE_URL}/#person` },
  areaServed: ["Coimbatore", "Chennai", "Bangalore", "Tamil Nadu", "India", "UAE", "USA", "UK"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Development Offer Catalog",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "WordPress & Business Website Development",
          description: "Custom WordPress websites, business websites, website redesigns, Core Web Vitals optimization, and SEO-friendly web architecture.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "E-Commerce & High-Converting Landing Pages",
          description: "WooCommerce development, D2C online stores, checkout optimization, sales funnels, and CRM integrations.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Brand Identity & UI/UX Design",
          description: "Visual identity design, Figma design systems, pitch decks, typography, and premium user experiences.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Video Editing & Short-Form Content",
          description: "High-engagement short-form video reels, promotional campaigns, and brand storytelling.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Digital Marketing & Growth Systems",
          description: "Full-funnel digital marketing, local SEO, paid ad campaigns, conversion tracking, and lead generation.",
        },
      },
    ],
  },
};

const serviceFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a custom business or WordPress website cost in Coimbatore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Website costs depend on scope, custom design requirements, e-commerce integrations, and SEO needs. Simple business landing pages start with transparent fixed packages, while comprehensive corporate platforms and D2C online stores are customized after a discovery review.",
      },
    },
    {
      "@type": "Question",
      name: "Why choose custom WordPress over free or pre-made agency templates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generic templates are packed with bloated plugins and slow code that hurt Core Web Vitals and Google rankings. Shanmu builds clean, lightweight WordPress architectures loading in under 1.2 seconds, tailored specifically to your conversion funnel.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide website maintenance and SEO support after launch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every project includes 30 days of complimentary post-launch support and testing. Ongoing maintenance, security updates, speed audits, and local SEO ranking campaigns are available on monthly growth retainers.",
      },
    },
  ],
};

const breadcrumbs = createBreadcrumbSchema([{ name: "Services", url: "/services" }]);

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      {
        name: "keywords",
        content:
          "website development services Coimbatore, WordPress development services, WooCommerce developer Coimbatore, business website development, website speed optimization, ecommerce website design India, UI UX designer Coimbatore, SEO lead generation services",
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
          "Shanmu provides high-performance web development and digital growth services in Coimbatore, India. Core services include custom WordPress engineering, WooCommerce stores, speed optimization, brand identity design in Figma, short-form video content, and local SEO lead generation.",
      },
      { name: "geo.region", content: "IN-TN" },
      { name: "geo.placename", content: "Coimbatore, Tamil Nadu, India" },
      { name: "geo.position", content: "11.0168;76.9558" },
      { name: "ICBM", content: "11.0168, 76.9558" },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceSchema) },
      { type: "application/ld+json", children: JSON.stringify(professionalServiceSchema) },
      { type: "application/ld+json", children: JSON.stringify(serviceFaqSchema) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbs) },
      { type: "application/ld+json", children: JSON.stringify(siteNavigationSchema) },
    ],
  }),
});

const serviceDetails = [
  {
    no: "01",
    title: "WordPress & Business Website Development",
    tagline: "Ultra-fast, conversion-focused websites engineered for Google rankings and credibility.",
    deliverables: [
      "Custom, lightweight WordPress theme architecture (Zero theme bloat)",
      "Mobile-first responsive design across phone, tablet, and desktop",
      "Core Web Vitals optimization (<1.2s page load speed)",
      "Full On-Page & Technical SEO markup integration",
      "Self-manageable content dashboard with zero coding needed",
      "Bank-grade security hardening & SSL configuration",
    ],
    bestFor: "Startups, B2B companies, industrial manufacturers, and professional consultants.",
    timeline: "1 - 3 Weeks",
  },
  {
    no: "02",
    title: "E-Commerce & High-Converting Landing Pages",
    tagline: "Seamless online stores designed to boost Average Order Value (AOV) and reduce cart abandonment.",
    deliverables: [
      "Custom WooCommerce & D2C online store architecture",
      "Frictionless 1-page checkout flow with instant mobile payments",
      "Payment gateway setup (Razorpay, Stripe, Cashfree, UPI, PayPal)",
      "Automated order confirmation, WhatsApp tracking & email workflows",
      "Inventory management, coupon systems & customer account portals",
      "High-converting product landing pages with psychological social proof",
    ],
    bestFor: "D2C brands, physical product retailers, fashion labels, and digital creators.",
    timeline: "2 - 4 Weeks",
  },
  {
    no: "03",
    title: "Brand Identity & UI/UX Design",
    tagline: "Distinctive, high-authority visual design systems that build immediate market trust.",
    deliverables: [
      "Bespoke brand logo, color palette & typography systems",
      "Complete UI/UX design mockups & prototypes in Figma",
      "Comprehensive design systems & developer hand-off guides",
      "Investor pitch decks, brochures & digital marketing collateral",
      "Social media templates & high-impact advertising assets",
    ],
    bestFor: "New startups building a brand from scratch or existing businesses modernizing.",
    timeline: "1 - 2 Weeks",
  },
  {
    no: "04",
    title: "Video Editing & Short-Form Content Systems",
    tagline: "High-retention reels, shorts, and brand storytelling designed to capture organic attention.",
    deliverables: [
      "Viral hook scripting, dynamic subtitle pacing & motion graphics",
      "Instagram Reels, YouTube Shorts & TikTok content production",
      "Founder-led personal branding content systems",
      "Product showcase videos & high-converting paid ad creatives",
      "Consistent weekly video editing & publishing calendars",
    ],
    bestFor: "Founders, influencers, agencies, and businesses scaling on Instagram and LinkedIn.",
    timeline: "Ongoing Retainer or Sprint",
  },
  {
    no: "05",
    title: "Digital Marketing & Local SEO Lead Generation",
    tagline: "Full-funnel client acquisition systems designed to dominate search results and capture buyer intent.",
    deliverables: [
      "Local SEO domination (Google Business Profile, local citations, map pack)",
      "High-intent keyword targeting (Commercial & transactional search intent)",
      "Lead capture funnels with CRM integration and automated alerts",
      "Google Ads & Meta Ads setup with laser-targeted buyer personas",
      "Conversion tracking, GA4 events & monthly ROI reporting",
    ],
    bestFor: "Local service providers, manufacturing firms, and businesses seeking inbound inquiries.",
    timeline: "30 - 90 Days Deployment",
  },
];

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Page Header */}
        <PageHeader
          breadcrumb="Services"
          badge="What I Do"
          title="From High-Level Strategy"
          highlightTitle="to Measurable Revenue."
          description="Every service is engineered around one standard: measurable business growth. No bloated agency overhead, no technical fluff — just clean code, high speed, and high-converting systems."
          keywords={[
            "WordPress Development",
            "WooCommerce Stores",
            "Speed Optimization",
            "Figma UI/UX Design",
            "Local SEO Lead Gen",
          ]}
        />

        {/* Existing Services Interactive List */}
        <Services />

        {/* In-Depth Service Breakdown & Deliverables */}
        <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28 border-t border-border/60">
          <Reveal>
            <SectionLabel>Detailed Deliverables</SectionLabel>
            <h2 className="mt-7 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-semibold leading-[1.1] text-foreground">
              What Is Included in
              <br />
              <em className="text-gold font-medium italic">Every Engagement.</em>
            </h2>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
              Complete transparency into what you receive, expected timelines, and the ideal business fit for each service.
            </p>
          </Reveal>

          <div className="mt-16 space-y-12">
            {serviceDetails.map((s, i) => (
              <Reveal key={s.no} delay={i * 80}>
                <div className="rounded-2xl border border-border/90 bg-card p-7 md:p-10 transition-all duration-300 hover:border-gold/50 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-display text-2xl font-bold text-gold">{s.no}</span>
                        <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                          {s.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{s.tagline}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <span className="rounded-full bg-secondary px-3.5 py-1.5 font-poppins text-xs font-medium text-foreground">
                        ⏱ {s.timeline}
                      </span>
                      <a
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-poppins text-xs font-semibold text-gold transition-colors hover:bg-gold hover:text-ink"
                      >
                        Enquire <ArrowRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>

                  {/* Deliverables list */}
                  <div className="mt-8 grid gap-8 md:grid-cols-[1fr_300px]">
                    <div>
                      <p className="font-poppins text-xs font-semibold tracking-wider text-foreground uppercase mb-4">
                        Key Deliverables:
                      </p>
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {s.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2.5 text-xs sm:text-[0.82rem] leading-relaxed text-muted-foreground">
                            <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-border/70 bg-secondary/30 p-5 self-start">
                      <p className="font-poppins text-xs font-semibold uppercase tracking-wider text-gold">
                        Best Suited For:
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-foreground/90">
                        {s.bestFor}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Proven Process */}
        <Process />

        {/* Final Call to Action */}
        <FinalCTA />
      </main>

      <Footer />
      <AIAssistant />
    </div>
  );
}
