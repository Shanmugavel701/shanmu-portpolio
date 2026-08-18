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
import { WhatsAppButton } from "@/components/site/WhatsAppButton";

const title = "Shanmu | Digital Creator, Developer & Entrepreneur";
const description =
  "Shanmu is a digital creator, developer and entrepreneur helping businesses build better websites, brands, content and digital growth systems.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Shanmu",
          jobTitle: "Digital Creator, Developer & Entrepreneur",
          description,
        }),
      },
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
      <WhatsAppButton />
    </div>
  );
}
