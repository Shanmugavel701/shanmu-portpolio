import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { PageHeader } from "@/components/site/PageHeader";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { AIAssistant } from "@/components/site/AIAssistant";
import { Reveal, SectionLabel } from "@/components/site/Reveal";
import { contact } from "@/data/site";
import {
  SITE_URL,
  professionalServiceSchema,
  siteNavigationSchema,
  createBreadcrumbSchema,
} from "@/data/seoSchemas";
import { Mail, MessageCircle, MapPin, Phone, CheckCircle } from "lucide-react";

const pageTitle = "Contact Shanmu | Hire Website Developer in Coimbatore, India";
const pageDescription =
  "Ready to build or revamp your website? Contact Shanmu for custom WordPress, e-commerce, and digital growth systems. Fast response within 2 hours. Phone, WhatsApp, and form.";
const canonicalUrl = `${SITE_URL}/contact`;

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${canonicalUrl}#contactpage`,
  url: canonicalUrl,
  name: pageTitle,
  description: pageDescription,
  mainEntity: { "@id": `${SITE_URL}/#business` },
};

const breadcrumbs = createBreadcrumbSchema([{ name: "Contact", url: "/contact" }]);

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      {
        name: "keywords",
        content:
          "contact website developer Coimbatore, hire WordPress developer India, web developer contact number Coimbatore, freelance web developer email, website design inquiry, book discovery call Shanmu",
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
          "Contact Shanmugavel (Shanmu) directly for website development and digital growth projects. Base of operations: Coimbatore, Tamil Nadu, India. Direct Phone / WhatsApp: +91 7010146105. Official Email: shanmugavelnkt@gmail.com. Inquiries answered within 2 hours.",
      },
      { name: "geo.region", content: "IN-TN" },
      { name: "geo.placename", content: "Coimbatore, Tamil Nadu, India" },
      { name: "geo.position", content: "11.0168;76.9558" },
      { name: "ICBM", content: "11.0168, 76.9558" },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(contactPageSchema) },
      { type: "application/ld+json", children: JSON.stringify(professionalServiceSchema) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbs) },
      { type: "application/ld+json", children: JSON.stringify(siteNavigationSchema) },
    ],
  }),
});

const contactChannels = [
  {
    icon: Phone,
    title: "Direct Phone & Call",
    value: "+91 70101 46105",
    subtext: "Mon - Sat · 9:00 AM - 8:00 PM IST",
    href: "tel:+917010146105",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Chat",
    value: "+91 70101 46105",
    subtext: "Instant responses for quick briefs & quotes",
    href: contact.whatsapp,
  },
  {
    icon: Mail,
    title: "Official Email",
    value: contact.email,
    subtext: "Send detailed RFPs, requirements & docs",
    href: `mailto:${contact.email}`,
  },
  {
    icon: MapPin,
    title: "Base of Operations",
    value: "Coimbatore, Tamil Nadu",
    subtext: "India · Collaborating Internationally",
    href: "https://maps.google.com/?q=Coimbatore,Tamil+Nadu",
  },
];

const guarantees = [
  "2-Hour Response SLA during business hours",
  "Free 15-Minute Technical Discovery & Strategy Review",
  "100% Direct Founder Execution (No junior hand-offs)",
  "Transparent, fixed-price quotes with zero surprises",
];

function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Page Header */}
        <PageHeader
          breadcrumb="Contact"
          badge="Get in Touch"
          title="Let's Create"
          highlightTitle="Something Exceptional."
          description="Have an upcoming project, need an urgent website revamp, or want to discuss a full digital growth system? Reach out directly to Shanmu."
          keywords={[
            "Hire Website Developer",
            "WordPress Inquiries",
            "Direct Founder Contact",
            "Coimbatore Web Development",
          ]}
        />

        {/* Direct Contact Channels Cards */}
        <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 border-b border-border/50">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactChannels.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.title} delay={i * 70}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group block rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-gold/60 hover:-translate-y-1.5"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-deep text-gold group-hover:bg-gold group-hover:text-ink transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-poppins text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      {c.title}
                    </h3>
                    <p className="mt-1 font-display text-xl font-medium text-foreground group-hover:text-gold transition-colors">
                      {c.value}
                    </p>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {c.subtext}
                    </p>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Interactive Contact Form Component */}
        <Contact />

        {/* Service Guarantees & SLA Banner */}
        <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 border-t border-border/60">
          <Reveal>
            <div className="rounded-2xl border border-border bg-secondary/30 p-8 sm:p-12">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div>
                  <SectionLabel>Client Commitment</SectionLabel>
                  <h3 className="mt-4 font-display text-2xl sm:text-3xl font-semibold text-foreground">
                    What Happens After You Reach Out?
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-xl">
                    Every enquiry is personally reviewed by Shanmu. You will receive an initial technical assessment and timeline estimate within 2 hours.
                  </p>
                </div>

                <div className="space-y-3 shrink-0">
                  {guarantees.map((g) => (
                    <div key={g} className="flex items-center gap-3 text-xs sm:text-sm text-foreground font-poppins">
                      <CheckCircle className="h-4 w-4 text-gold shrink-0" />
                      <span>{g}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
      <AIAssistant />
    </div>
  );
}
