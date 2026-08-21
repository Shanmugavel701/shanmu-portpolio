import { Reveal } from "./Reveal";

export function Positioning() {
  return (
    <section className="bg-primary py-28 text-primary-foreground md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <p className="font-display text-[clamp(2.2rem,7vw,5.5rem)] leading-[1.03] tracking-tight">
            I don't just build <span className="text-gold">websites</span>.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-6 max-w-5xl font-display text-[clamp(2.2rem,7vw,5.5rem)] leading-[1.03] tracking-tight">
            I engineer <span className="text-gold">digital growth engines</span> that generate{" "}
            <em className="text-gold">revenue.</em>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
