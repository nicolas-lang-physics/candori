import type { CSSProperties } from "react";

export interface StreakDotsProps {
  day?: number;
  /** 7 entries, oldest first */
  week?: boolean[];
  style?: CSSProperties;
}

export function StreakDots({ day = 1, week = [true, true, true, true, true, true, true], style }: StreakDotsProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "14px", ...style }}>
      <span
        style={{
          font: "var(--type-meta)",
          letterSpacing: "var(--tracking-meta)",
          textTransform: "uppercase",
          color: "var(--text-meta)",
        }}
      >
        Day {day}
      </span>
      <div style={{ display: "flex", gap: "6px" }}>
        {week.slice(0, 7).map((done, i) => (
          <span
            key={i}
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: done ? "var(--sage)" : "transparent",
              border: `1px solid ${done ? "var(--sage)" : "var(--hairline)"}`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
