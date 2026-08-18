import { Users, TrendingUp, Sparkles, Layers, ArrowUpRight } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { useCountUp, useInView } from "@/hooks/use-reveal";

const metrics = [
  {
    icon: Users,
    value: 20,
    prefix: "",
    suffix: "+",
    label: "Clients Served",
    highlight: "100% Retained",
    detail: "Direct founder-led execution",
    gradient: "from-emerald-500/10 via-transparent to-transparent",
  },
  {
    icon: TrendingUp,
    value: 2,
    prefix: "₹",
    suffix: "Cr+",
    label: "Revenue Generated",
    highlight: "High ROI",
    detail: "For brands & clients globally",
    gradient: "from-amber-500/10 via-transparent to-transparent",
  },
  {
    icon: Sparkles,
    value: 5,
    prefix: "",
    suffix: "+ Years",
    label: "Industry Mastery",
    highlight: "Proven",
    detail: "Design · Tech · Marketing",
    gradient: "from-primary/10 via-transparent to-transparent",
  },
  {
    icon: Layers,
    value: 12,
    prefix: "",
    suffix: "+",
    label: "Industries Served",
    highlight: "Diverse Reach",
    detail: "SaaS, E-com, Creators & B2B",
    gradient: "from-emerald-600/10 via-transparent to-transparent",
  },
];

const focus = ["ATTENTION", "TRUST", "CONVERSION", "GROWTH"];

function AnimatedStat({
  value,
  prefix = "",
  suffix = "",
  active,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  active: boolean;
}) {
  const n = useCountUp(value, active, 1600);
  return (
    <span>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

export function Results() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 items-center">
        {/* Left Column: Heading & Outcomes */}
        <Reveal>
          <SectionLabel>Results</SectionLabel>
          <h2 className="mt-7 font-display text-[clamp(2.4rem,5.2vw,4.2rem)] font-semibold leading-[1.05] text-foreground">
            Creative Is Good.
            <br />
            <em className="text-gold font-medium italic">Results Are Better.</em>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            Every project is engineered around four core business outcomes that transform digital presence into measurable growth and tangible revenue.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {focus.map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-[0.7rem] font-semibold tracking-widest text-primary transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink hover:scale-105 cursor-default shadow-xs"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                {f}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Right Column: Attention-Grabbing Interactive Cards */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {metrics.map((m, i) => {
            const Icon = m.icon;

            return (
              <Reveal key={m.label} delay={i * 90}>
                <div className="group relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-card to-background p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-gold/50 hover:shadow-xl">
                  {/* Subtle top-right ambient background glow on hover */}
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${m.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                    aria-hidden="true"
                  />

                  {/* Header: Icon & Badge */}
                  <div className="relative flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-deep text-gold shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary">
                      <Icon className="h-5 w-5 stroke-[1.8]" />
                    </div>

                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 font-poppins text-[0.68rem] font-semibold tracking-wide text-primary transition-colors duration-300 group-hover:bg-gold/15 group-hover:text-gold">
                      {m.highlight}
                      <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>

                  {/* Big Impact Metric */}
                  <div className="relative mt-6">
                    <p className="font-poppins text-3xl sm:text-[2.35rem] font-semibold leading-none tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                      <AnimatedStat
                        value={m.value}
                        prefix={m.prefix}
                        suffix={m.suffix}
                        active={inView}
                      />
                    </p>
                    <p className="mt-2 text-sm font-medium tracking-wide text-foreground font-poppins">
                      {m.label}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground font-poppins">
                      {m.detail}
                    </p>
                  </div>

                  {/* Bottom decorative accent line */}
                  <div className="relative mt-5 h-1 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-primary to-gold transition-all duration-700 ease-out group-hover:w-full" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

