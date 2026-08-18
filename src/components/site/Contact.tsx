import { useState, type FormEvent } from "react";
import { contact } from "@/data/site";
import { Reveal, SectionLabel } from "./Reveal";

const field =
  "w-full border-0 border-b border-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-gold";

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal>
          <SectionLabel>Contact</SectionLabel>
          <h2 className="mt-7 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05]">
            Let's Create
            <br />
            <em className="text-gold">Something Great.</em>
          </h2>
          <ul className="mt-12 space-y-4">
            <li>
              <a href={`mailto:${contact.email}`} className="label-xs text-foreground hover:text-gold">
                Email — {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.instagram} className="label-xs text-foreground hover:text-gold">
                Instagram
              </a>
            </li>
            <li>
              <a href={contact.linkedin} className="label-xs text-foreground hover:text-gold">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={contact.whatsapp} className="label-xs text-foreground hover:text-gold">
                WhatsApp
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={100}>
          <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="label-xs text-muted-foreground">
                Name
              </label>
              <input id="name" name="name" required className={field} placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="label-xs text-muted-foreground">
                Email
              </label>
              <input id="email" name="email" type="email" required className={field} placeholder="you@company.com" />
            </div>
            <div>
              <label htmlFor="company" className="label-xs text-muted-foreground">
                Company
              </label>
              <input id="company" name="company" className={field} placeholder="Optional" />
            </div>
            <div>
              <label htmlFor="need" className="label-xs text-muted-foreground">
                What do you need?
              </label>
              <select id="need" name="need" className={field} defaultValue="Website">
                <option>Website</option>
                <option>Graphic Design</option>
                <option>Video Editing</option>
                <option>Social Media</option>
                <option>Digital Marketing</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="label-xs text-muted-foreground">
                Message
              </label>
              <textarea id="message" name="message" rows={4} className={`${field} resize-none`} placeholder="Tell me about your project" />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="label-xs inline-flex w-full items-center justify-center gap-3 bg-primary px-8 py-4 text-primary-foreground transition-colors hover:bg-deep sm:w-auto"
              >
                Send Enquiry <span aria-hidden="true">→</span>
              </button>
              {sent && (
                <p role="status" className="mt-4 label-xs text-gold">
                  Thanks — your enquiry has been noted.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
