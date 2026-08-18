import { process } from "@/data/site";
import { useInView } from "@/hooks/use-reveal";
import { Reveal, SectionLabel } from "./Reveal";

export function Process() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
      <Reveal>
        <SectionLabel>How I Work</SectionLabel>
        <h2 className="mt-7 max-w-3xl font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05]">
          Simple Process.
          <br />
          <em className="text-gold">Serious Execution.</em>
        </h2>
      </Reveal>

      <div ref={ref} className="mt-16">
        <span className={`gold-rule hidden md:block ${inView ? "is-visible" : ""}`} aria-hidden="true" />
        <ol className="grid gap-10 border-l border-border pl-6 md:grid-cols-4 md:gap-8 md:border-l-0 md:pl-0">
          {process.map((s, i) => (
            <Reveal as="li" key={s.no} delay={i * 100} className="relative md:pt-8">
              <span className="absolute -left-[1.72rem] top-2 h-2 w-2 rounded-full bg-gold md:hidden" aria-hidden="true" />
              <span className="font-display text-3xl text-gold">{s.no}</span>
              <h3 className="mt-3 font-display text-2xl text-foreground">{s.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
