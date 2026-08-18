import { products } from "@/data/site";
import { Reveal, SectionLabel } from "./Reveal";

export function Products() {
  return (
    <section id="products" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
      <Reveal>
        <SectionLabel>My Products</SectionLabel>
        <h2 className="mt-7 max-w-3xl font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05]">
          I Don't Just Build For Clients.
          <br />
          I Build <em className="text-gold">Products</em> Too.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {products.map((p, i) => (
          <Reveal key={p.name} delay={i * 80}>
            <article className="group flex h-full flex-col border border-border p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/60">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center border border-primary/25 font-display text-lg text-primary transition-colors duration-500 group-hover:border-gold group-hover:text-gold"
              >
                {p.mark}
              </span>
              <h3 className="mt-8 font-display text-3xl text-foreground">{p.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
                <span className="label-xs text-muted-foreground">
                  {p.category} · {p.status}
                </span>
              </div>
              <span className="label-xs mt-5 inline-flex items-center gap-2 text-foreground transition-colors group-hover:text-gold">
                View Product <span aria-hidden="true">→</span>
              </span>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
