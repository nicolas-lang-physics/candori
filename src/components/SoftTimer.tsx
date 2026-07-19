import type { CSSProperties } from "react";

export interface SoftTimerProps {
  /** 0–1; framed as gentle progress, never a countdown */
  progress?: number;
  label?: string;
  style?: CSSProperties;
}

export function SoftTimer({ progress = 0, label = "Don’t think. Type.", style }: SoftTimerProps) {
  const p = Math.max(0, Math.min(1, progress));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", ...style }}>
      <span
        style={{
          font: "var(--type-meta)",
          letterSpacing: "var(--tracking-meta)",
          textTransform: "uppercase",
          color: "var(--text-meta)",
        }}
      >
        {label}
      </span>
      <div style={{ height: "3px", borderRadius: "2px", background: "var(--parchment-deep)", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${p * 100}%`,
            borderRadius: "2px",
            background: p > 0.66 ? "var(--glow-coral)" : p > 0.33 ? "var(--glow-amber)" : "var(--glow-sand)",
            transition: "width var(--dur-soft) var(--ease-calm), background var(--dur-glow) var(--ease-calm)",
          }}
        />
      </div>
    </div>
  );
}
