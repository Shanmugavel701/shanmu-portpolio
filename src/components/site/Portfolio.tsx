import website from "@/assets/work-website.jpg";
import brand from "@/assets/work-brand.jpg";
import social from "@/assets/work-social.jpg";
import video from "@/assets/work-video.jpg";
import { Reveal, SectionLabel } from "./Reveal";

const projects = [
  {
    title: "Brand Website",
    category: "Website Development",
    industry: "Placeholder Industry",
    result: "Placeholder result — replace with real project data",
    image: website,
    span: "lg:col-span-7",
    ratio: "aspect-[7/5]",
  },
  {
    title: "Brand Identity",
    category: "Graphic Design",
    industry: "Placeholder Industry",
    result: "Placeholder result — replace with real project data",
    image: brand,
    span: "lg:col-span-5",
    ratio: "aspect-[5/6]",
  },
  {
    title: "Social Media Growth",
    category: "Digital Marketing",
    industry: "Placeholder Industry",
    result: "Placeholder result — replace with real project data",
    image: social,
    span: "lg:col-span-5",
    ratio: "aspect-[5/6]",
  },
  {
    title: "Campaign Video",
    category: "Video Editing",
    industry: "Placeholder Industry",
    result: "Placeholder result — replace with real project data",
    image: video,
    span: "lg:col-span-7",
    ratio: "aspect-[7/5]",
  },
];

export function Portfolio() {
  return (
    <section id="work" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
      <Reveal>
        <SectionLabel>Selected Work</SectionLabel>
        <h2 className="mt-7 max-w-3xl font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05]">
          Work That Speaks
          <br />
          <em className="text-gold">Before I Do.</em>
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-6 lg:grid-cols-12 lg:gap-8">
        {projects.map((p, i) => (
          <Reveal key={p.title} className={p.span} delay={i * 80}>
            <article className="group cursor-pointer">
              <div className={`overflow-hidden rounded-sm bg-secondary ${p.ratio}`}>
                <img
                  src={p.image}
                  alt={`${p.title} — placeholder project image`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-5 flex items-start justify-between gap-6 border-t border-border pt-4">
                <div>
                  <h3 className="font-display text-2xl text-foreground transition-transform duration-[400ms] group-hover:-translate-y-0.5 md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-2 label-xs text-muted-foreground">
                    {p.category} · {p.industry}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">{p.result}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="text-xl text-gold opacity-0 transition-all duration-[400ms] group-hover:translate-x-1 group-hover:opacity-100"
                >
                  →
                </span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
