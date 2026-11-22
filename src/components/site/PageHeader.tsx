import { Reveal } from "./Reveal";
import { ChevronRight, Sparkles } from "lucide-react";

interface PageHeaderProps {
  breadcrumb: string;
  badge: string;
  title: string;
  highlightTitle?: string;
  description: string;
  keywords?: string[];
}

export function PageHeader({
  breadcrumb,
  badge,
  title,
  highlightTitle,
  description,
  keywords,
}: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-white/10 bg-deep px-5 pt-32 pb-16 md:px-10 md:pt-40 md:pb-24 text-cream">
      {/* Subtle ambient lighting line */}
      <span className="pointer-events-none absolute -left-20 top-24 h-px w-80 bg-gold/30" aria-hidden="true" />

      <div className="mx-auto max-w-[1400px]">
        {/* Visual Breadcrumb Trail (Matching Blog Page) */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-cream/50 font-poppins">
          <a href="/" className="hover:text-gold transition-colors text-cream/60">
            Home
          </a>
          <ChevronRight className="h-3 w-3 text-cream/30" />
          <span className="text-gold font-medium" aria-current="page">
            {breadcrumb}
          </span>
        </nav>

        {/* Header content with high contrast text */}
        <div className="max-w-4xl">
          <Reveal>
            {/* Golden Badge Pill (Matching Blog Page) */}
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 text-xs font-semibold text-gold mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{badge}</span>
            </div>

            {/* Semantic H1 with Cormorant Garamond font */}
            <h1 className="mt-2 font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-medium leading-[1.1] tracking-tight text-cream">
              {title}
              {highlightTitle && (
                <>
                  {" "}
                  <span className="italic text-gold font-normal">{highlightTitle}</span>
                </>
              )}
            </h1>
          </Reveal>

          <Reveal delay={100}>
            <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-cream/75 font-sans font-normal">
              {description}
            </p>
          </Reveal>

          {/* Keyword tags / topical signals for GEO & crawlers */}
          {keywords && keywords.length > 0 && (
            <Reveal delay={150}>
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <span className="text-[0.7rem] uppercase tracking-widest text-cream/45 font-poppins font-medium mr-1">
                  Focus:
                </span>
                {keywords.map((kw) => (
                  <span
                    key={kw}
                    className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 font-poppins text-[0.7rem] text-cream/80 transition-colors hover:border-gold/40 hover:text-gold"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </header>
  );
}
