import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-deep py-28 text-deep-foreground md:py-40">
      <span className="pointer-events-none absolute -left-20 top-16 h-px w-72 bg-gold/40" aria-hidden="true" />
      <span className="pointer-events-none absolute -right-10 bottom-24 h-px w-96 bg-gold/25" aria-hidden="true" />
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <h2 className="max-w-4xl font-display text-[clamp(2.3rem,6vw,5rem)] leading-[1.04] text-cream">
            Have an Idea?
            <br />
            Let's Build Something
            <br />
            <em className="text-gold">Worth Remembering.</em>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-cream/65">
            Whether you need a website, a stronger brand, better content, or a complete digital
            growth system, let's talk.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="label-xs inline-flex items-center justify-center gap-3 bg-gold px-8 py-4 text-ink transition-opacity hover:opacity-90"
            >
              Start a Conversation <span aria-hidden="true">→</span>
            </a>
            <a
              href="#work"
              className="label-xs inline-flex items-center justify-center border border-cream/25 px-8 py-4 text-cream transition-colors hover:border-gold hover:text-gold"
            >
              View My Work
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
