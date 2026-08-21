import { useState, useRef, type FormEvent } from "react";
import { contact } from "@/data/site";
import { Reveal, SectionLabel } from "./Reveal";

const WEBHOOK_URL = import.meta.env["VITE_SHEETS_WEBHOOK"] as string | undefined;

const field =
  "w-full border-0 border-b border-border bg-transparent py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-gold";

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const fd = new FormData(formRef.current);
    const payload = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      company: fd.get("company") as string,
      need: fd.get("need") as string,
      message: fd.get("message") as string,
    };

    setStatus("sending");

    try {
      if (!WEBHOOK_URL || WEBHOOK_URL.includes("YOUR_DEPLOYMENT_ID")) {
        // Dev fallback — log to console when the webhook is not configured yet
        console.log("📋 Lead (webhook not configured):", payload);
        await new Promise((r) => setTimeout(r, 800)); // simulate delay
        setStatus("success");
        formRef.current?.reset();
        return;
      }

      // Google Apps Script Web App does not set CORS headers on fetch with
      // mode:"cors" correctly, so we use no-cors and treat any network success
      // as a submission success (Apps Script returns 200 on both success/fail).
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setStatus("success");
      formRef.current?.reset();
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
    }
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
          <form ref={formRef} onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2">
            {/* Name */}
            <div>
              <label htmlFor="name" className="label-xs text-muted-foreground">
                Name
              </label>
              <input id="name" name="name" required className={field} placeholder="Your name" />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="label-xs text-muted-foreground">
                Email
              </label>
              <input id="email" name="email" type="email" required className={field} placeholder="you@company.com" />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="label-xs text-muted-foreground">
                Phone
              </label>
              <input id="phone" name="phone" type="tel" className={field} placeholder="+91 98765 43210" />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="label-xs text-muted-foreground">
                Company
              </label>
              <input id="company" name="company" className={field} placeholder="Optional" />
            </div>

            {/* Service */}
            <div className="sm:col-span-2">
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

            {/* Message */}
            <div className="sm:col-span-2">
              <label htmlFor="message" className="label-xs text-muted-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className={`${field} resize-none`}
                placeholder="Tell me about your project"
              />
            </div>

            {/* Submit */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="label-xs inline-flex w-full items-center justify-center gap-3 bg-primary px-8 py-4 text-primary-foreground transition-colors hover:bg-deep disabled:opacity-60 sm:w-auto"
              >
                {status === "sending" ? (
                  <>
                    <span
                      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                      aria-hidden="true"
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Enquiry <span aria-hidden="true">→</span>
                  </>
                )}
              </button>

              {status === "success" && (
                <p role="status" className="mt-4 label-xs text-gold">
                  ✓ Thanks — your enquiry has been noted. I'll be in touch shortly!
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="mt-4 label-xs text-red-400">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
