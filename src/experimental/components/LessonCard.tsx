import type { CSSProperties, ReactNode } from "react";

export interface LessonCardProps {
  kicker?: string;
  text?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

export function LessonCard({ kicker = "Today", text, children, style }: LessonCardProps) {
  return (
    <div
      style={{
        background: "var(--surface-card)",
        border: "var(--border-card)",
        borderRadius: "var(--radius-l)",
        boxShadow: "var(--shadow-card)",
        padding: "32px 28px",
        maxWidth: "var(--measure)",
        ...style,
      }}
    >
      <div
        style={{
          font: "var(--type-meta)",
          letterSpacing: "var(--tracking-meta)",
          textTransform: "uppercase",
          color: "var(--text-meta)",
          marginBottom: "16px",
        }}
      >
        {kicker}
      </div>
      <div style={{ font: "var(--type-provocation)", color: "var(--text-body)" }}>{text ?? children}</div>
    </div>
  );
}
