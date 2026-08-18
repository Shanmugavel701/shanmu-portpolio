import { whyMe } from "@/data/site";
import { Reveal } from "./Reveal";

export function WhyMe() {
  return (
    <section className="bg-deep py-24 text-deep-foreground md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <span className="label-xs inline-flex items-center gap-3 text-cream/60">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            Why Me
          </span>
          <h2 className="mt-7 max-w-3xl font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05] text-cream">
            Why Clients
            <br />
            <em className="text-gold">Choose Me.</em>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {whyMe.map((w, i) => (
            <Reveal key={w.no} delay={i * 80}>
              <span className="font-display text-5xl text-cream/25">{w.no}</span>
              <h3 className="mt-4 font-display text-2xl text-cream">{w.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/60">{w.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
