import type { ReactNode } from "react";
import { useInView } from "@/hooks/use-reveal";

export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "span";
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function SectionLabel({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <span
      className={`label-xs inline-flex items-center gap-3 ${
        tone === "dark" ? "text-muted-foreground" : "text-cream/60"
      }`}
    >
      <span className="h-px w-8 bg-gold" aria-hidden="true" />
      {children}
    </span>
  );
}
