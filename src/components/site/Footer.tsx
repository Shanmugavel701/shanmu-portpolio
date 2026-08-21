import { Instagram, Linkedin, MessageCircle, ArrowRight } from "lucide-react";
import { contact, nav } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-deep text-deep-foreground">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-12 md:px-10 md:py-20">
        {/* Left Column: Brand & Social Media Icons */}
        <div className="md:col-span-4">
          <a href="#top" className="inline-block group">
            <span className="font-display text-3xl text-gold font-medium tracking-wider">
              SHANMU
            </span>
          </a>
          <p className="mt-2.5 max-w-sm label-xs text-cream/60 leading-relaxed">
            Website Developer &amp; Digital Growth Specialist · Coimbatore, India
          </p>

          {/* Social Media Icons directly under name & title */}
          <div className="mt-6 flex items-center gap-3" aria-label="Social Media Links">
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-all duration-300 hover:border-gold hover:text-gold hover:bg-gold/10 hover:scale-105"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-all duration-300 hover:border-gold hover:text-gold hover:bg-gold/10 hover:scale-105"
            >
              <Linkedin className="h-4 w-4" />
            </a>

            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-all duration-300 hover:border-gold hover:text-gold hover:bg-gold/10 hover:scale-105"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Center Column: Navigation */}
        <div className="md:col-span-3 lg:col-span-3">
          <p className="label-xs text-gold/90 mb-4 font-semibold tracking-widest">Navigation</p>
          <nav aria-label="Footer" className="flex flex-col gap-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="label-xs text-cream/70 transition-colors duration-200 hover:text-gold"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right Column: Ready to Scale? with Hook Content & Button */}
        <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-between">
          <div>
            <h3 className="font-display text-2xl md:text-3xl text-cream font-semibold tracking-tight">
              Ready to Scale?
            </h3>
            <p className="mt-3 text-sm text-cream/70 leading-relaxed font-sans max-w-md">
              Have an ambitious project or want to build a standout digital brand? Let's turn your vision into high-impact reality with proven strategy and design.
            </p>
          </div>
          <div className="mt-6">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 border border-gold bg-gold/10 px-7 py-3.5 label-xs text-gold font-medium tracking-widest transition-all duration-300 hover:bg-gold hover:text-ink hover:shadow-lg"
            >
              Connect with Me
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="label-xs text-cream/45">© 2026 Shanmu. All Rights Reserved.</p>
          <p className="label-xs text-cream/45">Built with creativity, technology &amp; purpose.</p>
        </div>
      </div>
    </footer>
  );
}

