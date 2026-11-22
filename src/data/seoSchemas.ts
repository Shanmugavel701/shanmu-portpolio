/**
 * SEO, GEO, AEO, and Schema Markup Definitions for Shanmu Portfolio
 * Designed for Google Search, Perplexity AI, ChatGPT Search, Gemini, and Schema.org standards.
 */

export const SITE_URL = "https://shanmugavel.vercel.app";

/**
 * SiteNavigationElement Schema:
 * Defines the primary 7-page menu architecture for search engine sitelinks & AI crawler entity mapping.
 */
export const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Primary Website Navigation",
  description: "Main navigation structure for Shanmugavel's web development and digital growth portfolio.",
  itemListElement: [
    {
      "@type": "SiteNavigationElement",
      position: 1,
      name: "About",
      description: "About Shanmugavel, 5+ years experienced website developer and digital growth consultant in Coimbatore, India.",
      url: `${SITE_URL}/about`,
    },
    {
      "@type": "SiteNavigationElement",
      position: 2,
      name: "Services",
      description: "Custom WordPress, business web development, WooCommerce stores, speed optimization, and SEO lead generation.",
      url: `${SITE_URL}/services`,
    },
    {
      "@type": "SiteNavigationElement",
      position: 3,
      name: "Work",
      description: "Case studies and portfolio featuring e-commerce redesigns, SaaS landing pages, and verified client ROI.",
      url: `${SITE_URL}/work`,
    },
    {
      "@type": "SiteNavigationElement",
      position: 4,
      name: "Products",
      description: "Proprietary digital software and AI platforms: Shadivi SaaS, VelzX studio, and AI Growth Engine.",
      url: `${SITE_URL}/products`,
    },
    {
      "@type": "SiteNavigationElement",
      position: 5,
      name: "Blog",
      description: "Actionable articles on custom web development, WordPress speed optimization, and technical SEO architecture.",
      url: `${SITE_URL}/blog`,
    },
    {
      "@type": "SiteNavigationElement",
      position: 6,
      name: "FAQ",
      description: "Transparent answers to web development pricing, timelines, technology stacks, and working with Shanmu.",
      url: `${SITE_URL}/faq`,
    },
    {
      "@type": "SiteNavigationElement",
      position: 7,
      name: "Contact",
      description: "Direct contact, project inquiry form, WhatsApp chat, and discovery call booking.",
      url: `${SITE_URL}/contact`,
    },
  ],
};

/**
 * Generates structured BreadcrumbList schema
 */
export function createBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
      })),
    ],
  };
}

/**
 * Person Entity Schema for Knowledge Graph & GEO
 */
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Shanmugavel",
  alternateName: ["Shanmu", "Shanmugavel NKT"],
  url: SITE_URL,
  email: "shanmugavelnkt@gmail.com",
  telephone: "+917010146105",
  jobTitle: "Website Developer & Digital Growth Specialist",
  description:
    "Shanmu is a high-performance website developer and digital growth consultant based in Coimbatore, Tamil Nadu, India, building custom WordPress, business, and e-commerce websites for brands globally.",
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
    "Generative Engine Optimization (GEO)",
    "Answer Engine Optimization (AEO)",
    "UI/UX Design in Figma",
    "Full-Funnel Lead Generation",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    postalCode: "641001",
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

/**
 * ProfessionalService / LocalBusiness Schema
 */
export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: "Shanmu — Website Development & Digital Growth",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  image: `${SITE_URL}/assets/Shanmu.jpeg`,
  description:
    "Custom WordPress development, responsive business websites, e-commerce stores, speed optimization, and digital marketing services in Coimbatore, Tamil Nadu, India, serving clients across UAE, USA, and UK.",
  founder: { "@id": `${SITE_URL}/#person` },
  priceRange: "₹₹ - ₹₹₹",
  telephone: "+917010146105",
  email: "shanmugavelnkt@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    postalCode: "641001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 11.0168,
    longitude: 76.9558,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "20:00",
    },
  ],
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
};

