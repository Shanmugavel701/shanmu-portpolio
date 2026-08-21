import { testimonials } from "@/data/site";
import { Reveal, SectionLabel } from "./Reveal";

export function Testimonials() {
  return (
    <section className="bg-secondary/60 py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <SectionLabel>Client Endorsements</SectionLabel>
          <h2 className="mt-7 max-w-3xl font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05]">
            Trusted by Founders
            <br />
            Who Value <em className="text-gold">Measurable ROI.</em>
          </h2>
          <p className="mt-5 max-w-xl text-base text-muted-foreground">
            Direct feedback from business owners and founders on working with Shanmu across web development, e-commerce, and growth marketing.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure className="flex h-full flex-col justify-between rounded-2xl border-t-2 border-gold bg-background p-8 shadow-sm transition-all duration-300 hover:shadow-lg">
                <blockquote className="font-display text-lg sm:text-xl leading-relaxed text-foreground">
                  "{t.quote}"
                </blockquote>

                <figcaption className="mt-8 border-t border-border/80 pt-6">
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary font-poppins text-xs font-semibold text-primary-foreground"
                    >
                      {t.initials}
                    </span>
                    <div>
                      <span className="block font-poppins text-sm font-semibold text-foreground">{t.name}</span>
                      <span className="block text-xs text-muted-foreground">{t.role}</span>
                      <span className="block text-[0.7rem] text-primary font-medium">{t.location}</span>
                    </div>
                  </div>
                  <div className="mt-5 rounded-lg bg-gold/10 px-3.5 py-2">
                    <p className="font-poppins text-xs font-semibold text-gold">🎯 {t.result}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
