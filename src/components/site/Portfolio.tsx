import website from "@/assets/work-website.jpg";
import brand from "@/assets/work-brand.jpg";
import social from "@/assets/work-social.jpg";
import video from "@/assets/work-video.jpg";
import { caseStudies } from "@/data/site";
import { Reveal, SectionLabel } from "./Reveal";

const imageMap: Record<string, string> = {
  website,
  brand,
  social,
  video,
};

export function Portfolio() {
  return (
    <section id="work" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
      <Reveal>
        <SectionLabel>Case Studies &amp; Client Work</SectionLabel>
        <h2 className="mt-7 max-w-3xl font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05]">
          Proven Outcomes.
          <br />
          <em className="text-gold">Measurable Business ROI.</em>
        </h2>
        <p className="mt-5 max-w-2xl text-base text-muted-foreground">
          Explore real case studies where strategic web development, speed optimization, and full-funnel digital marketing transformed client performance.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-10">
        {caseStudies.map((p, i) => {
          const projectImage = imageMap[p.imageType] || website;

          return (
            <Reveal key={p.title} className={p.span} delay={i * 80}>
              <article className="group flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-gradient-to-b from-card to-background p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-xl sm:p-7">
                <div>
                  <div className={`overflow-hidden rounded-xl bg-secondary ${p.ratio} shadow-sm transition-all duration-500 group-hover:shadow-md`}>
                    <img
                      src={projectImage}
                      alt={`${p.title} — ${p.category} case study by Shanmu`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 font-poppins text-[0.68rem] font-semibold text-primary">
                      {p.category}
                    </span>
                    <span className="rounded-full border border-border px-3 py-1 font-poppins text-[0.68rem] text-muted-foreground">
                      {p.location}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-semibold text-foreground transition-colors duration-300 group-hover:text-gold md:text-3xl">
                    {p.title}
                  </h3>

                  <div className="mt-4 space-y-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                    <p>
                      <strong className="text-foreground font-semibold">Client:</strong> {p.client}
                    </p>
                    <p>
                      <strong className="text-foreground font-semibold">Challenge:</strong> {p.problem}
                    </p>
                    <p>
                      <strong className="text-foreground font-semibold">Execution:</strong> {p.solution}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-gold/30 bg-gold/5 -mx-5 -mb-5 sm:-mx-7 sm:-mb-7 px-5 sm:px-7 py-4 rounded-b-2xl">
                  <span className="font-poppins text-xs font-semibold text-gold tracking-wide">
                    🏆 {p.result}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-gold group-hover:text-ink text-sm"
                  >
                    →
                  </span>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
