import { Reveal, SectionLabel } from "./Reveal";

const metrics = [
  { v: "20+", l: "Clients Served" },
  { v: "\u20B92Cr+", l: "Revenue Generated" },
  { v: "5+", l: "Years Experience" },
  { v: "Multiple", l: "Industries" },
];

const focus = ["Attention", "Trust", "Conversion", "Growth"];

export function Results() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <SectionLabel>Results</SectionLabel>
          <h2 className="mt-7 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05]">
            Creative Is Good.
            <br />
            <em className="text-gold">Results Are Better.</em>
          </h2>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
            Every project is built around four outcomes that actually move a business forward.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {focus.map((f) => (
              <li key={f} className="label-xs text-foreground">
                {f}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="grid grid-cols-2 gap-y-12">
          {metrics.map((m, i) => (
            <Reveal key={m.l} delay={i * 80}>
              <p className="font-display text-[clamp(2.4rem,5vw,4rem)] leading-none text-primary">{m.v}</p>
              <p className="mt-3 label-xs text-muted-foreground">{m.l}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
