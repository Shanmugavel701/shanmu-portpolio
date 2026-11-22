import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { PageHeader } from "@/components/site/PageHeader";
import { About } from "@/components/site/About";
import { Stats } from "@/components/site/Stats";
import { WhyMe } from "@/components/site/WhyMe";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";
import { AIAssistant } from "@/components/site/AIAssistant";
import { Reveal, SectionLabel } from "@/components/site/Reveal";
import {
  SITE_URL,
  personSchema,
  siteNavigationSchema,
  createBreadcrumbSchema,
} from "@/data/seoSchemas";
import { CheckCircle2 } from "lucide-react";

const pageTitle = "About Shanmu | Website Developer & Digital Growth Specialist in Coimbatore";
const pageDescription =
  "Meet Shanmugavel (Shanmu), a high-performance website developer and digital growth specialist based in Coimbatore, Tamil Nadu, India. Over 5+ years of building custom WordPress, business, and e-commerce websites generating ₹2 Cr+ client revenue.";
const canonicalUrl = `${SITE_URL}/about`;

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${canonicalUrl}#webpage`,
  url: canonicalUrl,
  name: pageTitle,
  description: pageDescription,
  mainEntity: { "@id": `${SITE_URL}/#person` },
  inLanguage: "en-IN",
};

const breadcrumbs = createBreadcrumbSchema([{ name: "About", url: "/about" }]);

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      {
        name: "keywords",
        content:
          "Shanmugavel, Shanmu, website developer in Coimbatore, web developer Coimbatore, WordPress developer Coimbatore, freelance web developer India, digital growth specialist, custom web developer Tamil Nadu, hire WordPress developer",
      },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDescription },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: canonicalUrl },
      { property: "og:image", content: `${SITE_URL}/assets/Shanmu.jpeg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: pageDescription },
      { name: "twitter:image", content: `${SITE_URL}/assets/Shanmu.jpeg` },
      {
        name: "ai:description",
        content:
          "Shanmugavel (Shanmu) is an Indian website developer and digital growth consultant located in Coimbatore, Tamil Nadu. With 5+ years of experience, he engineers custom WordPress platforms, e-commerce stores, speed optimization, and lead generation systems for clients in India, UAE, USA, and UK.",
      },
      { name: "geo.region", content: "IN-TN" },
      { name: "geo.placename", content: "Coimbatore, Tamil Nadu, India" },
      { name: "geo.position", content: "11.0168;76.9558" },
      { name: "ICBM", content: "11.0168, 76.9558" },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(aboutPageSchema) },
      { type: "application/ld+json", children: JSON.stringify(personSchema) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbs) },
      { type: "application/ld+json", children: JSON.stringify(siteNavigationSchema) },
    ],
  }),
});

const milestones = [
  {
    year: "2021",
    title: "Foundation & Full-Stack Mastery",
    desc: "Started building custom web applications and specialized WordPress sites for Indian SMEs, mastering Core Web Vitals and low-latency frontend architecture.",
  },
  {
    year: "2023",
    title: "International Expansion (UAE & US)",
    desc: "Expanded client footprint across Dubai, United States, and UK, executing conversion-rate optimization (CRO) and high-ticket D2C e-commerce stores.",
  },
  {
    year: "2024",
    title: "Software Studio & Innovation",
    desc: "Launched proprietary platforms Shadivi (content scheduling SaaS) and VelzX (creative automation studio), providing software tools alongside client engineering.",
  },
  {
    year: "2025 - Present",
    title: "Revenue-Driven Growth Systems",
    desc: "Surpassed ₹2 Crore in client-generated revenue across 20+ partner brands, maintaining a 100% on-time delivery record and zero junior delegation.",
  },
];

const techStack = [
  { category: "Frontend Engineering", tools: ["React 19", "TypeScript", "Tailwind CSS", "Vite", "Next.js / TanStack", "Figma"] },
  { category: "CMS & E-Commerce", tools: ["Custom WordPress", "WooCommerce", "Headless CMS", "PHP", "Stripe & Razorpay", "REST APIs"] },
  { category: "Performance & SEO", tools: ["Core Web Vitals", "Technical SEO", "Schema Markup (JSON-LD)", "AEO & GEO Optimization", "Cloudflare CDN"] },
  { category: "Growth & Automation", tools: ["Conversion Tracking", "Google Analytics 4", "Sales Funnels", "AI Growth Engines", "Lead Magnets"] },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Page Header with Semantic H1 and Breadcrumb */}
        <PageHeader
          breadcrumb="About"
          badge="About Shanmugavel"
          title="Engineering High-Performance Assets."
          highlightTitle="Direct Founder Execution."
          description="I help ambitious startups, business owners, and global brands build custom digital infrastructure that turns traffic into measurable revenue. Based in Coimbatore, Tamil Nadu — collaborating worldwide."
          keywords={[
            "WordPress Developer Coimbatore",
            "Full-Stack Web Engineering",
            "SEO & CRO Specialist",
            "Global Client Delivery",
          ]}
        />

        {/* Existing High-Quality About Component */}
        <About />

        {/* Key Performance Stats */}
        <Stats />

        {/* Founder Milestones & Journey */}
        <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28 border-t border-border/60">
          <Reveal>
            <SectionLabel>Milestones</SectionLabel>
            <h2 className="mt-7 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-semibold leading-[1.1] text-foreground">
              A Track Record of
              <br />
              <em className="text-gold font-medium italic">Continuous Execution.</em>
            </h2>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
              Every milestone represents a commitment to technical craftsmanship, higher client ROI, and long-term business partnerships.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 80}>
                <div className="group h-full rounded-2xl border border-border/80 bg-card/60 p-6 transition-all duration-300 hover:border-gold/50 hover:-translate-y-1">
                  <span className="font-display text-3xl font-bold text-gold">{m.year}</span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-foreground group-hover:text-gold transition-colors">
                    {m.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {m.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Technology Capabilities Breakdown */}
        <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28 border-t border-border/60 bg-secondary/20">
          <Reveal>
            <SectionLabel>Tech Stack &amp; Capabilities</SectionLabel>
            <h2 className="mt-7 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-semibold leading-[1.1] text-foreground">
              Built on Modern Standards.
              <br />
              <em className="text-gold font-medium italic">Engineered for Speed.</em>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {techStack.map((stack, i) => (
              <Reveal key={stack.category} delay={i * 70}>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="font-poppins text-xs font-semibold tracking-widest text-gold uppercase">
                    {stack.category}
                  </h3>
                  <ul className="mt-5 space-y-2.5">
                    {stack.tools.map((t) => (
                      <li key={t} className="flex items-center gap-2 text-xs text-foreground font-poppins">
                        <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Why Choose Shanmu */}
        <WhyMe />

        {/* Final CTA Banner */}
        <FinalCTA />
      </main>

      <Footer />
      <AIAssistant />
    </div>
  );
}
