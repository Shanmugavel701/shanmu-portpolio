import { testimonials } from "@/data/site";
import { Reveal, SectionLabel } from "./Reveal";

export function Testimonials() {
  return (
    <section className="bg-secondary/60 py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <SectionLabel>Client Voices</SectionLabel>
          <h2 className="mt-7 max-w-3xl font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05]">
            Built With People
            <br />
            Who <em className="text-gold">Wanted More.</em>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 90}>
              <figure className="flex h-full flex-col border-t border-gold/60 bg-background p-8">
                <blockquote className="font-display text-xl leading-snug text-foreground">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-auto pt-8">
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-primary label-xs text-primary-foreground"
                    >
                      {t.initials}
                    </span>
                    <span>
                      <span className="block text-sm text-foreground">{t.name}</span>
                      <span className="block label-xs text-muted-foreground">{t.role}</span>
                    </span>
                  </div>
                  <p className="mt-5 label-xs text-gold">{t.result}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
