import { useInView } from "@/hooks/use-reveal";

export function Statement() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  return (
    <section ref={ref} className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-44">
      <h2
        className={`reveal ${inView ? "is-visible" : ""} font-display text-[clamp(2.2rem,7.5vw,6.2rem)] leading-[1.02] tracking-tight text-foreground`}
      >
        Good design gets noticed.
        <br />
        Good digital experiences get{" "}
        <em className="relative text-primary">
          remembered.
          <span
            className={`gold-rule absolute -bottom-2 left-0 ${inView ? "is-visible" : ""}`}
            aria-hidden="true"
          />
        </em>
      </h2>
    </section>
  );
}
