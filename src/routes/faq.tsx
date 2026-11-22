import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { PageHeader } from "@/components/site/PageHeader";
import { FAQ } from "@/components/site/FAQ";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";
import { AIAssistant } from "@/components/site/AIAssistant";
import { Reveal, SectionLabel } from "@/components/site/Reveal";
import { faqs } from "@/data/site";
import {
  SITE_URL,
  siteNavigationSchema,
  createBreadcrumbSchema,
} from "@/data/seoSchemas";
import { MessageSquare, HelpCircle, DollarSign, Clock, ShieldCheck, PhoneCall } from "lucide-react";

const pageTitle = "Web Development FAQ & Knowledge Base | Pricing & Timelines | Shanmu";
const pageDescription =
  "Clear, transparent answers to frequently asked questions regarding web development pricing in Coimbatore, custom WordPress builds, turnaround timelines, and working with Shanmu.";
const canonicalUrl = `${SITE_URL}/faq`;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const breadcrumbs = createBreadcrumbSchema([{ name: "FAQ", url: "/faq" }]);

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      {
        name: "keywords",
        content:
          "web development FAQ, website cost Coimbatore, WordPress developer rates India, website development timeline, hire freelance web developer FAQ, ecommerce website cost India, Shanmu FAQ",
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
          "Frequently asked questions guide by Shanmugavel (Shanmu), explaining website development pricing in India, WordPress custom theme development, delivery timelines from 1 to 4 weeks, and international collaboration with clients in the UAE, USA, and UK.",
      },
      { name: "geo.region", content: "IN-TN" },
      { name: "geo.placename", content: "Coimbatore, Tamil Nadu, India" },
      { name: "geo.position", content: "11.0168;76.9558" },
      { name: "ICBM", content: "11.0168, 76.9558" },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbs) },
      { type: "application/ld+json", children: JSON.stringify(siteNavigationSchema) },
    ],
  }),
});

const faqCategories = [
  {
    icon: DollarSign,
    title: "Pricing & Investment",
    desc: "Transparent, value-based pricing. Fixed project quotes with zero surprise invoices or hidden agency charges.",
  },
  {
    icon: Clock,
    title: "Timelines & Delivery",
    desc: "Rapid execution with strict deadlines. Standard business sites take 1-2 weeks; full e-commerce stores take 3-4 weeks.",
  },
  {
    icon: ShieldCheck,
    title: "Code Quality & Speed",
    desc: "Bespoke clean code with <1.2s page loads, 95+ Google PageSpeed scores, and structured JSON-LD schema.",
  },
  {
    icon: PhoneCall,
    title: "Global Collaboration",
    desc: "Seamless communication via WhatsApp, Slack, Google Meet & Loom across Indian and international time zones.",
  },
];

function FaqPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Page Header */}
        <PageHeader
          breadcrumb="FAQ"
          badge="Frequently Asked Questions"
          title="Clear Answers."
          highlightTitle="No Technical Fluff."
          description="Everything you need to know about working together, pricing expectations, website development timelines, and how we engineer high-converting digital assets for your business."
          keywords={[
            "Transparent Pricing",
            "1-3 Week Delivery",
            "WordPress Performance",
            "Direct Founder Communication",
          ]}
        />

        {/* Quick Category Summary Grid */}
        <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 border-b border-border/50">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {faqCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <Reveal key={cat.title} delay={i * 70}>
                  <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-gold/40 hover:-translate-y-1">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-deep text-gold">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                      {cat.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {cat.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Existing Interactive Accordion Component */}
        <FAQ />

        {/* Direct Help / Custom Question Card */}
        <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 border-t border-border/60">
          <div className="relative overflow-hidden rounded-2xl border border-gold/40 bg-deep p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-2xl">
            {/* Ambient luxury glow accents */}
            <div className="pointer-events-none absolute -top-20 -left-20 h-48 w-48 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />

            <div className="relative z-10">
              <h3 className="font-display text-2xl sm:text-4xl text-cream font-medium tracking-tight">
                Don't see your question listed?
              </h3>
              <p className="mt-4 text-sm sm:text-base text-cream/75 max-w-lg mx-auto leading-relaxed">
                Get an immediate direct answer about your specific website goals, tech requirements, or investment estimate.
              </p>
              <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-poppins text-xs font-semibold text-ink tracking-wider transition-all duration-300 hover:bg-gold/90 hover:scale-105 shadow-lg"
                >
                  <MessageSquare className="h-4 w-4" /> Send Direct Inquiry
                </a>
                <a
                  href="https://wa.me/917010146105"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-7 py-3.5 font-poppins text-xs font-semibold text-gold tracking-wider transition-all duration-300 hover:bg-gold hover:text-ink hover:border-gold shadow-sm"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
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

