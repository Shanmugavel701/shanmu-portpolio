import heroPortrait from "@/assets/hero-portrait.jpg";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div className="reveal is-visible">
          <span className="label-xs text-muted-foreground">
            Based in India — Working Globally
          </span>
          <h1 className="mt-6 font-display text-[clamp(2.6rem,7.5vw,5.4rem)] leading-[1.02] tracking-tight text-foreground">
            I Build Digital Brands
            <br />
            That Look <span className="text-primary">Better</span>,
            <br />
            Work <span className="text-primary">Smarter</span>,
            <br />
            and <em className="text-gold">Grow.</em>
          </h1>
          <span className="gold-rule is-visible mt-8 max-w-40" aria-hidden="true" />
          <p className="mt-8 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
            I'm Shanmu, a digital creator and entrepreneur helping businesses turn ideas into
            powerful digital experiences through websites, design, content, and marketing.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#work"
              className="label-xs inline-flex items-center justify-center gap-3 bg-primary px-8 py-4 text-primary-foreground transition-colors hover:bg-deep"
            >
              View My Work <span aria-hidden="true">→</span>
            </a>
            <a
              href="#contact"
              className="label-xs inline-flex items-center justify-center border border-primary/30 px-8 py-4 text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Let's Work Together
            </a>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-12 gap-y-4 border-t border-border pt-6">
            <div>
              <p className="label-xs text-muted-foreground">Digital Creator</p>
              <p className="mt-1 label-xs text-foreground">Developer · Designer · Marketer</p>
            </div>
            <div>
              <p className="label-xs text-muted-foreground">Awards</p>
              <p className="mt-1 label-xs text-foreground">Best Digital Marketing</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-sm">
            <img
              src={heroPortrait}
              alt="Portrait placeholder — replace with Shanmu's professional photograph"
              width={912}
              height={1200}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-4 flex items-center gap-3 bg-background px-5 py-4 shadow-[var(--shadow-editorial)] md:-left-8">
            <span className="h-2.5 w-2.5 rounded-full bg-gold" aria-hidden="true" />
            <span className="label-xs text-foreground">5+ Years Creating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
