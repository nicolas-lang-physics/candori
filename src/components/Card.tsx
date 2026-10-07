import type { CSSProperties, ReactNode } from "react";

/** The raised, rounded surface shared by the finished-story card and modals. */
export function Card({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        background: "var(--surface-raised)",
        border: "var(--border-card)",
        borderRadius: "var(--radius-l)",
        boxShadow: "var(--shadow-raised)",
        boxSizing: "border-box",
        width: "100%",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
