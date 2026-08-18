import shanmuPortrait from "@/assets/Shanmu.jpeg";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100vh-4.5rem)] items-center overflow-hidden pt-20 pb-10 md:pt-24 md:pb-12 lg:min-h-screen"
    >
      <div className="mx-auto grid max-w-[1400px] w-full items-center gap-8 px-5 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="reveal is-visible">
          <span className="label-xs text-muted-foreground">
            Based in India — Working Globally
          </span>
          <h1 className="mt-4 font-display text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
            I Build Digital Brands
            <br />
            That Look <span className="text-primary font-bold">Better</span>,
            <br />
            Work <span className="text-primary font-bold">Smarter</span>,
            <br />
            and <em className="text-gold font-medium italic">Grow.</em>
          </h1>
          <span className="gold-rule is-visible mt-5 max-w-32" aria-hidden="true" />
          <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
            I'm Shanmu, a digital creator and entrepreneur helping businesses turn ideas into
            powerful digital experiences through websites, design, content, and marketing.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#work"
              className="group label-xs inline-flex items-center justify-center gap-3 bg-primary px-7 py-3.5 text-primary-foreground transition-all duration-300 hover:bg-deep hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
            >
              View My Work <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
            </a>
            <a
              href="#contact"
              className="label-xs inline-flex items-center justify-center border border-primary/30 px-7 py-3.5 text-foreground transition-all duration-300 hover:border-gold hover:text-gold hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0"
            >
              Let's Work Together
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3 border-t border-border/80 pt-5">
            <div className="transition-transform duration-300 hover:translate-x-1">
              <p className="label-xs text-muted-foreground">Digital Creator</p>
              <p className="mt-0.5 label-xs text-foreground font-semibold">Developer · Designer · Marketer</p>
            </div>
            <div className="transition-transform duration-300 hover:translate-x-1">
              <p className="label-xs text-muted-foreground">Awards</p>
              <p className="mt-0.5 label-xs text-foreground font-semibold">Best Digital Marketing</p>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center group">
          <div className="overflow-hidden rounded-2xl shadow-xl w-full max-w-[500px] max-h-[72vh] aspect-[4/4.8] transition-all duration-700 hover:shadow-2xl">
            <img
              src={shanmuPortrait}
              alt="Shanmu - Digital Creator & Entrepreneur"
              width={912}
              height={1200}
              fetchPriority="high"
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          <div className="animate-float absolute -bottom-4 left-4 flex items-center gap-3 rounded-md bg-background/95 backdrop-blur-sm px-4 py-3 shadow-[var(--shadow-editorial)] md:-left-4 border border-border/60 transition-transform duration-300 hover:scale-105">
            <span className="h-2.5 w-2.5 rounded-full bg-gold animate-pulse" aria-hidden="true" />
            <span className="label-xs text-foreground font-semibold">5+ Years Creating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
