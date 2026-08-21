import { MapPin, Globe } from "lucide-react";
import shanmuPortrait from "@/assets/Shanmu.jpeg";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex items-center overflow-hidden pt-24 pb-14 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28"
    >
      <div className="mx-auto max-w-[1400px] w-full px-5 md:px-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Left / Main Column */}
          <div className="reveal is-visible flex flex-col">
            {/* 1. Designed Dual-Badge Label System — Hidden on Mobile (<sm), Visible on sm+ */}
            <div className="hidden sm:flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6">
              {/* Badge 1: Role & Live Status */}
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3.5 py-1.5 shadow-xs backdrop-blur-md transition-all duration-300 hover:border-gold/60 hover:bg-gold/10">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-poppins text-[0.72rem] font-semibold text-primary tracking-wide">
                  Website Developer &amp; Growth Specialist
                </span>
              </div>

              {/* Badge 2: Location & Global Reach */}
              <div className="inline-flex items-center gap-2 rounded-full border border-border/90 bg-secondary/80 px-3.5 py-1.5 text-[0.72rem] font-poppins shadow-xs backdrop-blur-md transition-all duration-300 hover:border-gold/50">
                <span className="flex items-center gap-1 text-gold">
                  <MapPin className="h-3 w-3 stroke-[2.2]" aria-hidden="true" />
                  <span className="font-semibold text-foreground">Coimbatore, India</span>
                </span>
                <span className="text-border" aria-hidden="true">•</span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Globe className="h-3 w-3 stroke-[1.8]" aria-hidden="true" />
                  <span className="font-medium">Working Globally</span>
                </span>
              </div>
            </div>

            {/* 2. Heading */}
            <h1 className="font-display text-[clamp(2.1rem,4.2vw,3.7rem)] font-semibold leading-[1.12] tracking-tight text-foreground">
              I Build High-Converting
              <br />
              <span className="text-primary font-bold">Websites &amp; Brands</span>
              <br />
              That <em className="text-gold font-medium italic">Actually Scale.</em>
            </h1>

            <span className="gold-rule is-visible mt-5 max-w-32" aria-hidden="true" />

            {/* 3. Description */}
            <p className="mt-5 max-w-xl text-[0.95rem] sm:text-base leading-relaxed text-muted-foreground">
              Freelance Website &amp; WordPress Developer based in Coimbatore, India. I design, develop, and scale custom business websites, WooCommerce stores, and digital marketing engines engineered for Google rankings, lightning speed, and inbound leads.
            </p>

            {/* 4. Mobile-Only Image Display (Shown directly after description on <lg screens) */}
            <div className="mt-8 block lg:hidden">
              <div className="relative mx-auto w-full max-w-[420px]">
                <div className="overflow-hidden rounded-2xl shadow-xl aspect-[4/4.9]">
                  <img
                    src={shanmuPortrait}
                    alt="Shanmu - Website Developer and Digital Growth Specialist in Coimbatore, India"
                    width={912}
                    height={1200}
                    fetchPriority="high"
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="animate-float absolute -bottom-4 left-4 flex items-center gap-3 rounded-md bg-background/95 backdrop-blur-sm px-4 py-2.5 shadow-[var(--shadow-editorial)] border border-border/60">
                  <span className="h-2.5 w-2.5 rounded-full bg-gold animate-pulse" aria-hidden="true" />
                  <span className="label-xs text-foreground font-semibold">5+ Years · ₹2Cr+ Generated</span>
                </div>
              </div>
            </div>

            {/* 5. CTA Buttons (Appears after image on mobile, and standard position on desktop) */}
            <div className="mt-10 sm:mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#work"
                className="group label-xs inline-flex items-center justify-center gap-3 bg-primary px-7 py-3.5 text-primary-foreground transition-all duration-300 hover:bg-deep hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 text-center"
              >
                Explore Case Studies <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>
              <a
                href="#contact"
                className="label-xs inline-flex items-center justify-center border border-primary/30 px-7 py-3.5 text-foreground transition-all duration-300 hover:border-gold hover:text-gold hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 text-center"
              >
                Get a Project Quote
              </a>
            </div>

            {/* 6. Specialization & Markets Bar */}
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 border-t border-border/80 pt-6">
              <div className="transition-transform duration-300 hover:translate-x-1">
                <p className="label-xs text-muted-foreground">Core Specialization</p>
                <p className="mt-0.5 label-xs text-foreground font-semibold">WordPress · Web Development · SEO</p>
              </div>
              <div className="transition-transform duration-300 hover:translate-x-1">
                <p className="label-xs text-muted-foreground">Markets Served</p>
                <p className="mt-0.5 label-xs text-foreground font-semibold">India · UAE (Dubai) · USA · UK</p>
              </div>
            </div>
          </div>

          {/* Desktop-Only Hero Image (Right Column on lg+ screens) */}
          <div className="relative hidden lg:flex justify-end group">
            <div className="relative w-full max-w-[460px]">
              <div className="overflow-hidden rounded-2xl shadow-xl aspect-[4/4.9] transition-all duration-700 hover:shadow-2xl">
                <img
                  src={shanmuPortrait}
                  alt="Shanmu - Website Developer and Digital Growth Specialist in Coimbatore, India"
                  width={912}
                  height={1200}
                  fetchPriority="high"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="animate-float absolute -bottom-4 left-4 flex items-center gap-3 rounded-md bg-background/95 backdrop-blur-sm px-4 py-3 shadow-[var(--shadow-editorial)] border border-border/60 transition-transform duration-300 hover:scale-105">
                <span className="h-2.5 w-2.5 rounded-full bg-gold animate-pulse" aria-hidden="true" />
                <span className="label-xs text-foreground font-semibold">5+ Years · ₹2Cr+ Generated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
