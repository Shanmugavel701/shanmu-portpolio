import { Reveal } from "./Reveal";

export function Positioning() {
  return (
    <section className="bg-primary py-28 text-primary-foreground md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <p className="font-display text-[clamp(2.2rem,7vw,6rem)] leading-[1.03] tracking-tight">
            I don't just <span className="text-gold">create</span> content.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-6 max-w-5xl font-display text-[clamp(2.2rem,7vw,6rem)] leading-[1.03] tracking-tight">
            I <span className="text-gold">build</span> digital assets that create{" "}
            <em className="text-gold">value.</em>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
