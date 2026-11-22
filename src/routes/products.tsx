import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { PageHeader } from "@/components/site/PageHeader";
import { Products } from "@/components/site/Products";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";
import { AIAssistant } from "@/components/site/AIAssistant";
import { Reveal, SectionLabel } from "@/components/site/Reveal";
import {
  SITE_URL,
  siteNavigationSchema,
  createBreadcrumbSchema,
} from "@/data/seoSchemas";
import { CheckCircle2 } from "lucide-react";

const pageTitle = "Proprietary Products & SaaS Tools | Shadivi, VelzX & AI Growth Engine | Shanmu";
const pageDescription =
  "Discover software products, SaaS workflows, and AI automation engines built by Shanmu: Shadivi for content scheduling, VelzX for automation, and the AI Growth Engine.";
const canonicalUrl = `${SITE_URL}/products`;

const productsPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${canonicalUrl}#software`,
  url: canonicalUrl,
  name: pageTitle,
  description: pageDescription,
  mainEntity: {
    "@type": "ItemList",
    name: "Software Products by Shanmu",
    itemListElement: [
      {
        "@type": "SoftwareApplication",
        position: 1,
        name: "Shadivi",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "A modern SaaS platform engineered to simplify how businesses and creative agencies plan, schedule, and publish high-impact brand content across social channels.",
        author: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "SoftwareApplication",
        position: 2,
        name: "VelzX",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        description:
          "A creative technology and automation studio building custom AI-powered digital tools, workflow automations, and growth systems for forward-thinking brands.",
        author: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "SoftwareApplication",
        position: 3,
        name: "AI Growth Engine",
        applicationCategory: "MarketingApplication",
        operatingSystem: "Web",
        description:
          "A proprietary framework combining Generative AI workflows with performance web development to personalize user journeys and accelerate inbound lead capture.",
        author: { "@id": `${SITE_URL}/#person` },
      },
    ],
  },
};

const breadcrumbs = createBreadcrumbSchema([{ name: "Products", url: "/products" }]);

export const Route = createFileRoute("/products")({
  component: ProductsPage,
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      {
        name: "keywords",
        content:
          "Shadivi, VelzX, AI Growth Engine, SaaS products, creative automation studio, AI marketing tools, content scheduling SaaS India, Shanmugavel products",
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
          "Shanmugavel (Shanmu) has engineered and launched three proprietary software products: Shadivi (content scheduling and brand workflow SaaS), VelzX (creative automation studio), and the AI Growth Engine (AI-personalized inbound lead conversion system).",
      },
      { name: "geo.region", content: "IN-TN" },
      { name: "geo.placename", content: "Coimbatore, Tamil Nadu, India" },
      { name: "geo.position", content: "11.0168;76.9558" },
      { name: "ICBM", content: "11.0168, 76.9558" },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(productsPageSchema) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbs) },
      { type: "application/ld+json", children: JSON.stringify(siteNavigationSchema) },
    ],
  }),
});

const productDeepDives = [
  {
    name: "Shadivi",
    badge: "SaaS & Workflow",
    status: "Live & Scaling",
    desc: "Built to eliminate chaotic spreadsheets and disjointed tools for creative agencies and brands. Shadivi streamlines visual content planning, multi-platform publishing, and post performance analytics in a single unified dashboard.",
    highlights: [
      "Visual content calendar & multi-channel scheduling",
      "Automated draft reviews and client approval pipelines",
      "Direct API integration with Meta, LinkedIn & YouTube",
      "Team collaboration with granular role permissions",
    ],
    tech: "React, Vite, Node.js, PostgreSQL, Tailwind CSS",
  },
  {
    name: "VelzX",
    badge: "Automation & Lab",
    status: "Live & Active",
    desc: "The creative innovation lab where custom AI-powered digital tools, webhook automations, and growth systems are incubated. VelzX helps modern companies automate repetitive workflows and deploy interactive web applications.",
    highlights: [
      "Custom generative AI assistants and intelligent bots",
      "Automated lead capture & CRM synchronization",
      "Bespoke internal dashboards & reporting tools",
      "Webhook and cloud infrastructure engineering",
    ],
    tech: "TypeScript, Python, TanStack, REST APIs, Cloudflare Workers",
  },
  {
    name: "AI Growth Engine",
    badge: "Proprietary Framework",
    status: "Active Deployment",
    desc: "A revenue-generating architecture that connects website analytics, generative AI, and dynamic page personalization. It analyzes visitor intent in real-time to adapt headlines, CTAs, and content for maximum conversion.",
    highlights: [
      "Dynamic on-page personalization based on traffic source",
      "AI-driven lead qualification and automated scoring",
      "Conversational voice and chat agent integration",
      "Measurable 2.5x increase in visitor-to-lead conversion",
    ],
    tech: "Next-Gen Web APIs, Semantic AI, Web Speech, Edge Functions",
  },
];

function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Page Header */}
        <PageHeader
          breadcrumb="Products"
          badge="Software &amp; Tools"
          title="I Don't Just Build For Clients."
          highlightTitle="I Build Products Too."
          description="True technical mastery comes from building, maintaining, and scaling real software products. Explore the proprietary tools and SaaS platforms I've founded and deployed."
          keywords={[
            "Shadivi Content SaaS",
            "VelzX Automation Studio",
            "AI Growth Engine",
            "Product Engineering",
          ]}
        />

        {/* Existing Products Component */}
        <Products />

        {/* Product In-Depth Architecture & Highlights */}
        <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28 border-t border-border/60">
          <Reveal>
            <SectionLabel>Architecture &amp; Features</SectionLabel>
            <h2 className="mt-7 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-semibold leading-[1.1] text-foreground">
              Deep Dive into
              <br />
              <em className="text-gold font-medium italic">Each Product Ecosystem.</em>
            </h2>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
              Built with product-grade code, scalable backend architecture, and obsessive attention to user experience.
            </p>
          </Reveal>

          <div className="mt-16 space-y-12">
            {productDeepDives.map((prod, i) => (
              <Reveal key={prod.name} delay={i * 80}>
                <div className="rounded-2xl border border-border bg-card p-7 sm:p-10 shadow-sm transition-all duration-300 hover:border-gold/50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-display text-3xl sm:text-4xl font-semibold text-foreground">
                          {prod.name}
                        </h3>
                        <span className="rounded-full bg-primary/10 px-3 py-1 font-poppins text-[0.7rem] font-semibold text-primary">
                          {prod.badge}
                        </span>
                      </div>
                      <p className="mt-2 text-xs font-poppins text-gold font-medium">
                        Status: {prod.status}
                      </p>
                    </div>

                    <div className="text-xs font-poppins text-muted-foreground bg-secondary/50 rounded-xl px-4 py-2 border border-border/60">
                      <span className="text-foreground font-semibold">Stack:</span> {prod.tech}
                    </div>
                  </div>

                  <p className="mt-6 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-3xl">
                    {prod.desc}
                  </p>

                  <div className="mt-8">
                    <p className="font-poppins text-xs font-semibold tracking-wider text-foreground uppercase mb-4">
                      Key Capabilities:
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {prod.highlights.map((h) => (
                        <div key={h} className="flex items-start gap-2.5 text-xs sm:text-[0.85rem] text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Why Building Products Benefits Clients */}
        <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28 border-t border-border/60 bg-secondary/15">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] items-center">
            <Reveal>
              <SectionLabel>The Product Advantage</SectionLabel>
              <h2 className="mt-7 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-semibold leading-[1.1] text-foreground">
                Why Hiring a Product Founder
                <br />
                <em className="text-gold font-medium italic">Beats a Standard Agency.</em>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Most agencies only build static template websites. Because I build and scale active SaaS products, every client website I engineer inherits product-level performance, clean architecture, frictionless UX, and enterprise-grade security.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    1. Zero Bloat &amp; Technical Debt
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Product developers write lean, maintainable code rather than chaining 40 random plugins together that break on update.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    2. Obsession with Conversion Metrics
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    In SaaS, 1% conversion differences mean thousands in ARR. That same intense conversion discipline is applied to your business site.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    3. Future-Proof Scalability
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Your digital assets are built ready to integrate with CRMs, payment gateways, automated workflows, and modern AI tools.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Final CTA */}
        <FinalCTA />
      </main>

      <Footer />
      <AIAssistant />
    </div>
  );
}
