import { Award, Briefcase, TrendingUp, Users } from "lucide-react";
import { stats } from "@/data/site";
import { useCountUp, useInView } from "@/hooks/use-reveal";

function Counter({
  value,
  prefix = "",
  suffix = "",
  active,
}: {
  value: number;
  prefix?: string | undefined;
  suffix?: string | undefined;
  active: boolean;
}) {
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
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  const cardIcons = [Award, Briefcase, TrendingUp, Users];

  const cards = [
    {
      icon: Award,
      title: "Award-Winning",
      subtitle: "Best Digital Marketing",
    },
    {
      icon: Briefcase,
      value: stats[0]?.value ?? 5,
      suffix: stats[0]?.suffix ?? "+",
      prefix: stats[0]?.prefix ?? "",
      subtitle: stats[0]?.label ?? "Years Experience",
    },
    {
      icon: TrendingUp,
      value: stats[2]?.value ?? 2,
      prefix: stats[2]?.prefix ?? "₹",
      suffix: stats[2]?.suffix ?? "Cr+",
      subtitle: stats[2]?.label ?? "Revenue Generated",
    },
    {
      icon: Users,
      value: stats[1]?.value ?? 20,
      prefix: stats[1]?.prefix ?? "",
      suffix: stats[1]?.suffix ?? "+",
      subtitle: `${stats[1]?.label ?? "Clients"} Worldwide`,
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-r from-[#0b2619] via-[#113524] to-[#0b2619] py-10 md:py-14 text-cream font-poppins border-y border-cream/10 shadow-inner"
      aria-label="Key Highlights and Statistics"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div ref={ref} className="relative mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="grid grid-cols-2 gap-y-8 lg:grid-cols-4 lg:gap-y-0">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const isLast = index === cards.length - 1;

            return (
              <div
                key={card.subtitle}
                className={`group flex flex-col items-center justify-center px-4 py-3 text-center transition-all duration-300 rounded-xl hover:bg-white/[0.04] ${
                  !isLast ? "lg:border-r lg:border-cream/15" : ""
                } ${index % 2 === 0 ? "border-r border-cream/15 lg:border-r-cream/15" : ""}`}
              >
                {/* Top Icon */}
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-950/50 text-emerald-300/80 border border-emerald-500/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-900/60 group-hover:text-emerald-200 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.25)]">
                  <Icon className="h-5 w-5 stroke-[1.75]" aria-hidden="true" />
                </div>

                {/* Main Heading */}
                <h3 className="font-poppins text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl transition-transform duration-300 group-hover:scale-105">
                  {card.title ? (
                    card.title
                  ) : (
                    <Counter
                      value={card.value as number}
                      prefix={card.prefix}
                      suffix={card.suffix}
                      active={inView}
                    />
                  )}
                </h3>

                {/* Subtitle */}
                <p className="mt-1.5 max-w-[220px] font-poppins text-xs font-normal leading-snug text-cream/70 sm:text-sm transition-colors duration-300 group-hover:text-cream/90">
                  {card.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


