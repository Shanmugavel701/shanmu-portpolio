import { services } from "@/data/site";
import { Reveal, SectionLabel } from "./Reveal";

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
      <Reveal>
        <SectionLabel>What I Do</SectionLabel>
        <h2 className="mt-7 max-w-3xl font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05]">
          From First Idea
          <br />
          to <em className="text-gold">Digital Growth.</em>
        </h2>
      </Reveal>

      <div className="mt-16 border-t border-border">
        {services.map((s, i) => (
          <Reveal key={s.no} delay={i * 60}>
            <article className="group grid gap-6 border-b border-border py-10 transition-all duration-500 hover:-translate-y-1.5 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-12 md:py-12">
              <span className="font-display text-3xl text-muted-foreground transition-colors duration-500 group-hover:text-gold md:text-4xl">
                {s.no}
              </span>
              <div>
                <h3 className="font-display text-3xl leading-tight text-foreground md:text-[2.6rem]">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground opacity-80 transition-opacity duration-500 group-hover:opacity-100">
                  {s.desc}
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="label-xs text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <span
                aria-hidden="true"
                className="hidden text-2xl text-gold opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100 md:block"
              >
                →
              </span>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
