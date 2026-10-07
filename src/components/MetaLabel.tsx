import type { ReactNode } from "react";

/** Small secondary text: uppercase label by default, plain meta text with `caps={false}`. */
export function MetaLabel({ children, caps = true }: { children: ReactNode; caps?: boolean }) {
  return (
    <span
      style={{
        font: "var(--type-meta)",
        color: "var(--text-meta)",
        ...(caps ? { letterSpacing: "var(--tracking-meta)", textTransform: "uppercase" } : null),
      }}
    >
      {children}
    </span>
  );
}
