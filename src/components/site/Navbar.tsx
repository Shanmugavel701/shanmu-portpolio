import { useEffect, useState } from "react";
import { nav } from "@/data/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 bg-deep border-b ${
        scrolled
          ? "border-deep-foreground/10 shadow-lg"
          : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-[1400px] items-center justify-between px-5 py-4 md:px-10">
        <a href="#top" className="group leading-tight">
          <span className="font-display text-xl tracking-wider text-gold md:text-2xl font-medium">
            SHANMU
          </span>
          <span className="mt-0.5 hidden label-xs text-gold/70 md:block tracking-[0.25em]">
            Website Developer · Growth Specialist
          </span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="label-xs text-cream/85 transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="label-xs border border-gold px-6 py-2.5 text-gold tracking-widest transition-colors hover:bg-gold hover:text-ink"
          >
            Let's Work Together
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-px w-6 bg-cream transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-cream transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        className={`fixed inset-0 top-0 z-40 flex flex-col bg-deep px-6 pt-28 pb-12 transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-6" aria-label="Mobile">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-display text-4xl text-cream"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="label-xs mt-auto block bg-gold px-6 py-4 text-center text-ink"
        >
          Let's Work Together
        </a>
      </div>
    </header>
  );
}
