import { contact } from "@/data/site";

export function WhatsAppButton() {
  return (
    <a
      href={contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="pulse-ring fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-[var(--shadow-editorial)] transition-transform duration-300 hover:scale-105"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.38-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 2C6.5 2 2 6.5 2 12.05c0 1.77.46 3.5 1.34 5.02L2 22l5.05-1.32a10.02 10.02 0 0 0 5 1.28h.01c5.54 0 10.04-4.5 10.04-10.05C22.1 6.5 17.6 2 12.05 2zm0 18.28h-.01a8.3 8.3 0 0 1-4.24-1.16l-.3-.18-3 .78.8-2.92-.2-.3a8.25 8.25 0 1 1 6.95 3.78z" />
      </svg>
    </a>
  );
}
