import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/site";
import { Reveal, SectionLabel } from "./Reveal";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((curr) => (curr === idx ? null : idx));
  };

  return (
    <section id="faq" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 items-start">
        {/* Left Column: Heading & Context */}
        <Reveal>
          <SectionLabel>FAQ & Strategy</SectionLabel>
          <h2 className="mt-7 font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] text-foreground">
            Clear Answers.
            <br />
            <em className="text-gold font-medium italic">No Technical Fluff.</em>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            Everything you need to know about working together, pricing models, website development timelines, and how we engineer high-converting digital assets for your business.
          </p>

          <div className="mt-10 rounded-2xl border border-border/80 bg-secondary/40 p-6">
            <h3 className="font-display text-xl font-medium text-foreground">
              Have a specific question about your project?
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Get direct technical guidance and a clear scope estimate directly from Shanmu.
            </p>
            <a
              href="#contact"
              className="mt-5 inline-flex items-center gap-2 font-poppins text-xs font-semibold tracking-wider text-gold hover:underline"
            >
              Ask on Contact Form <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>

        {/* Right Column: Interactive Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <Reveal key={faq.question} delay={idx * 60}>
                <div
                  className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                    isOpen
                      ? "border-gold/60 bg-secondary/60 shadow-sm"
                      : "border-border/80 bg-background hover:border-border"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left"
                  >
                    <span className="font-display text-lg sm:text-xl font-medium text-foreground">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-gold/15 border-gold text-gold" : "text-muted-foreground"
                      }`}
                      aria-hidden="true"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-border/40 px-5 sm:px-6 pb-6 pt-4 text-sm sm:text-[0.93rem] leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
