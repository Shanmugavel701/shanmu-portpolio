import { createFileRoute } from "@tanstack/react-router";

import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { About } from "@/components/site/About";
import { Positioning } from "@/components/site/Positioning";
import { Services } from "@/components/site/Services";
import { Portfolio } from "@/components/site/Portfolio";
import { Results } from "@/components/site/Results";
import { Testimonials } from "@/components/site/Testimonials";
import { Products } from "@/components/site/Products";
import { Process } from "@/components/site/Process";
import { WhyMe } from "@/components/site/WhyMe";
import { FAQ } from "@/components/site/FAQ";
import { Statement } from "@/components/site/Statement";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { AIAssistant } from "@/components/site/AIAssistant";
import { faqs } from "@/data/site";

const SITE_URL = "https://shanmugavel.vercel.app";
const title = "Shanmu | Website Developer & Digital Growth Specialist in India";
const description =
  "Shanmu is a website developer and digital growth specialist based in Coimbatore, Tamil Nadu, India who builds custom WordPress, business, and e-commerce websites for startups, small businesses, and growing brands across India, UAE, USA, and UK.";

// ── Rich JSON-LD Schemas (SEO, AEO & GEO) ──────────────────────────────────

/** Person Entity Schema for AI & Knowledge Graph */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Shanmugavel",
  alternateName: ["Shanmu", "Shanmugavel NKT"],
  url: SITE_URL,
  email: "shanmugavelnkt@gmail.com",
  telephone: "+917010146105",
  jobTitle: "Website Developer & Digital Growth Specialist",
  description,
  image: `${SITE_URL}/assets/Shanmu.jpeg`,
  knowsAbout: [
    "Website Development",
    "WordPress Development",
    "WooCommerce Development",
    "E-Commerce Website Development",
    "Website Redesign Services",
    "Landing Page Development",
    "Technical SEO & Core Web Vitals",
    "Conversion Rate Optimization (CRO)",
    "Graphic Design & Brand Identity",
    "Short-Form Video Editing",
    "Digital Marketing & Lead Generation",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.instagram.com/shanmu_og",
    "https://www.linkedin.com/in/shanmugavel-nkt",
    "https://wa.me/917010146105",
  ],
  worksFor: [
    { "@type": "Organization", name: "Shadivi", url: SITE_URL },
    { "@type": "Organization", name: "VelzX", url: SITE_URL },
  ],
};

/** ProfessionalService Schema for Commercial Search Intent */
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: "Shanmu — Website Development & Digital Growth",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  image: `${SITE_URL}/assets/Shanmu.jpeg`,
  description:
    "Professional website development, custom WordPress solutions, e-commerce stores, brand design, and digital marketing services for businesses in Coimbatore, Chennai, Bangalore, Tamil Nadu, India, UAE, USA, and UK.",
  founder: { "@id": `${SITE_URL}/#person` },
  priceRange: "₹₹ - ₹₹₹",
  telephone: "+917010146105",
  email: "shanmugavelnkt@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 11.0168,
    longitude: 76.9558,
  },
  areaServed: [
    { "@type": "City", name: "Coimbatore" },
    { "@type": "City", name: "Chennai" },
    { "@type": "City", name: "Bangalore" },
    { "@type": "AdministrativeArea", name: "Tamil Nadu" },
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Development & Growth Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "WordPress & Business Website Development",
          description:
            "Custom WordPress development, corporate business websites, website redesign, speed optimization, and SEO-friendly web architecture.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "E-Commerce & High-Converting Landing Pages",
          description:
            "WooCommerce online stores, D2C e-commerce websites, checkout optimization, sales funnels, and CRM integration.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Brand Identity & UI/UX Design",
          description:
            "Visual identity systems, Figma UI/UX prototyping, marketing collateral, and brand style guides.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Video Editing & Content Systems",
          description:
            "High-engagement short-form reels, brand videos, motion graphics, and founder-led content strategies.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Digital Marketing & SEO Lead Generation",
          description:
            "Full-funnel digital marketing, local SEO, lead generation campaigns, and conversion optimization.",
        },
      },
    ],
  },
};

/** AEO: FAQPage Schema for Voice & AI Search */
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

/** BreadcrumbList Schema */
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: `${SITE_URL}#services`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Case Studies",
      item: `${SITE_URL}#work`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "FAQ",
      item: `${SITE_URL}#faq`,
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Contact",
      item: `${SITE_URL}#contact`,
    },
  ],
};

/** WebSite Schema with SearchAction */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Shanmu | Website Developer & Digital Growth Specialist",
  description,
  publisher: { "@id": `${SITE_URL}/#person` },
  inLanguage: "en-IN",
};

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(personSchema) },
      { type: "application/ld+json", children: JSON.stringify(serviceSchema) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
      { type: "application/ld+json", children: JSON.stringify(websiteSchema) },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Positioning />
        <Services />
        <Portfolio />
        <Results />
        <Testimonials />
        <Products />
        <Process />
        <WhyMe />
        <FAQ />
        <Statement />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
}
