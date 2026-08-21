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
import { Statement } from "@/components/site/Statement";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { AIAssistant } from "@/components/site/AIAssistant";

const SITE_URL = "https://shanmugavel.vercel.app";
const title = "Shanmu | Digital Creator, Developer & Entrepreneur — Tamil Nadu, India";
const description =
  "Shanmugavel (Shanmu) is a Tamil Nadu-based digital creator, full-stack developer, graphic designer and entrepreneur. 5+ years · 20+ clients · ₹2Cr+ revenue generated. Services: Website Development, Graphic Design, Video Editing, Social Media & Digital Marketing.";

// ── JSON-LD Schemas ────────────────────────────────────────────────────────

/** SEO + GEO: Person entity — lets AI/search engines identify Shanmugavel as a person */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Shanmugavel",
  alternateName: ["Shanmu", "Shanmugavel NKT"],
  url: SITE_URL,
  email: "shanmugavelnkt@gmail.com",
  telephone: "+917010146105",
  jobTitle: "Digital Creator, Developer & Entrepreneur",
  description,
  knowsAbout: [
    "Website Development",
    "Graphic Design",
    "Video Editing",
    "Social Media Management",
    "Digital Marketing",
    "Brand Identity",
    "WordPress",
    "React",
    "UI/UX Design",
  ],
  address: {
    "@type": "PostalAddress",
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

/** AEO + GEO: ProfessionalService — helps answer "what does Shanmu do?" */
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: "Shanmu Digital Services",
  url: SITE_URL,
  description:
    "Digital services by Shanmugavel: Website Development, Graphic Design, Video Editing, Social Media Management and Digital Marketing for businesses across India.",
  founder: { "@id": `${SITE_URL}/#person` },
  areaServed: { "@type": "Country", name: "India" },
  address: {
    "@type": "PostalAddress",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "shanmugavelnkt@gmail.com",
    telephone: "+917010146105",
    contactType: "customer service",
    availableLanguage: ["English", "Tamil"],
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website Development",
          description:
            "High-performing websites designed to make your business look credible, convert visitors and grow online. Includes WordPress, Landing Pages, Business Websites, E-commerce and Web Design.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Graphic Design",
          description:
            "Visual identities and creative assets: Brand Identity, Social Media Creatives, Posters, Presentations and Marketing Materials.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Video Editing",
          description:
            "Short-form and branded video content: Reels, Promotional Videos, Brand Videos, Social Media Videos and Motion Graphics.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Social Media Management",
          description:
            "Content Planning, Creative Design, Reels, Publishing and Analytics to turn social media into a real business asset.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Digital Marketing",
          description:
            "Social Media Marketing, Lead Generation, SEO, Campaign Strategy and Conversion Optimisation for businesses across India.",
        },
      },
    ],
  },
};

/** AEO: FAQPage schema — targets Google featured snippets & voice search answers */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is Shanmugavel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Shanmugavel (known as Shanmu) is a Tamil Nadu-based digital creator, full-stack developer, graphic designer and entrepreneur with 5+ years of experience. He helps businesses build better websites, brands, content and digital growth systems.",
      },
    },
    {
      "@type": "Question",
      name: "What services does Shanmu offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Shanmu offers Website Development (WordPress, landing pages, e-commerce), Graphic Design (brand identity, social media creatives), Video Editing (reels, promotional videos), Social Media Management, and Digital Marketing (SEO, lead generation, campaign strategy).",
      },
    },
    {
      "@type": "Question",
      name: "How can I contact Shanmugavel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can contact Shanmugavel via email at shanmugavelnkt@gmail.com, on WhatsApp at +91 7010146105, on Instagram at @shanmu_og, or on LinkedIn at linkedin.com/in/shanmugavel-nkt.",
      },
    },
    {
      "@type": "Question",
      name: "What is Shadivi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Shadivi is a live SaaS digital platform founded by Shanmugavel that simplifies how brands plan and publish content online.",
      },
    },
    {
      "@type": "Question",
      name: "What is VelzX?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "VelzX is a creative technology studio founded by Shanmugavel that builds automation tools and digital solutions for modern businesses.",
      },
    },
    {
      "@type": "Question",
      name: "How much experience does Shanmu have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Shanmu has 5+ years of experience in digital creation, web development and design, having worked with 20+ clients and helped generate over ₹2 Crore in revenue for his clients.",
      },
    },
  ],
};

/** SEO: WebSite schema with SearchAction for sitelinks search box */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Shanmu",
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
        <Statement />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
}
