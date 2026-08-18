import { contact, nav } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-deep text-deep-foreground">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-3 md:px-10 md:py-20">
        <div>
          <p className="font-display text-3xl text-cream">SHANMU</p>
          <p className="mt-3 label-xs text-cream/55">
            Digital Creator · Developer · Designer · Entrepreneur
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-3">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="label-xs text-cream/70 hover:text-gold">
              {item.label}
            </a>
          ))}
        </nav>
        <div>
          <a
            href="#contact"
            className="label-xs inline-flex items-center gap-3 border border-cream/25 px-6 py-3.5 text-cream hover:border-gold hover:text-gold"
          >
            Let's Work Together
          </a>
          <div className="mt-8 flex flex-wrap gap-6">
            <a href={contact.instagram} className="label-xs text-cream/70 hover:text-gold">Instagram</a>
            <a href={contact.linkedin} className="label-xs text-cream/70 hover:text-gold">LinkedIn</a>
            <a href={contact.youtube} className="label-xs text-cream/70 hover:text-gold">YouTube</a>
            <a href={contact.whatsapp} className="label-xs text-cream/70 hover:text-gold">WhatsApp</a>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="label-xs text-cream/45">© 2026 Shanmu. All Rights Reserved.</p>
          <p className="label-xs text-cream/45">Built with creativity, technology &amp; purpose.</p>
        </div>
      </div>
    </footer>
  );
}
