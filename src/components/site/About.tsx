import aboutPortrait from "@/assets/about-portrait.jpg";
import { Reveal, SectionLabel } from "./Reveal";

const disciplines = [
  "Website Development",
  "Branding",
  "Graphic Design",
  "Video",
  "Social Media",
  "Digital Marketing",
  "Product Building",
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <Reveal className="relative">
          <img
            src={aboutPortrait}
            alt="Working portrait placeholder — replace with your own photograph"
            width={912}
            height={1104}
            loading="lazy"
            className="w-full rounded-sm object-cover"
          />
          <p className="mt-6 font-display text-2xl italic text-primary">
            Creative + Technology + Business
          </p>
        </Reveal>

        <div>
          <Reveal>
            <SectionLabel>About Me</SectionLabel>
            <h2 className="mt-7 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05] text-foreground">
              More Than Just
              <br />
              A <em className="text-gold">Digital Creator.</em>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-8 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
              I'm a digital creator, developer, designer and entrepreneur focused on building things
              that create real value. Over the last five years I've moved between building websites,
              shaping brand identities, editing video, running social media and driving digital
              marketing — and eventually building my own products.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
              {disciplines.map((d) => (
                <li key={d} className="flex items-center gap-3 border-b border-border pb-3 label-xs text-foreground">
                  <span className="h-1 w-1 rounded-full bg-gold" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={200}>
            <blockquote className="mt-12 border-l border-gold pl-6 font-display text-2xl leading-snug text-foreground md:text-3xl">
              Design gets attention.
              <br />
              Technology creates experience.
              <br />
              <em className="text-gold">Marketing creates growth.</em>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
