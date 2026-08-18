import { stats } from "@/data/site";
import { useCountUp, useInView } from "@/hooks/use-reveal";

function Counter({ value, prefix = "", suffix = "", active }: { value: number; prefix?: string; suffix?: string; active: boolean }) {
  const n = useCountUp(value, active);
  return (
    <span>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

export function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  return (
    <section className="bg-deep text-deep-foreground" aria-label="Key numbers">
      <div ref={ref} className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-10 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border-l border-cream/15 px-5 first:border-l-0 lg:px-8">
            <p className="font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-none text-cream">
              {"text" in s && s.text ? (
                s.text
              ) : (
                <Counter value={s.value as number} prefix={s.prefix} suffix={s.suffix} active={inView} />
              )}
            </p>
            <p className="mt-3 label-xs text-cream/60">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-[1400px] px-5 pb-14 md:px-10">
        <p className="label-xs text-gold">Best Digital Marketing · Young Entrepreneur</p>
      </div>
    </section>
  );
}
