import type { CSSProperties, ReactNode } from "react";

export interface GlowSurfaceProps {
  /** 0 = calm parchment, 1 = full coral flow */
  heat?: number;
  radius?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

export function mix(c1: string, c2: string, t: number) {
  const p = (h: string) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const [r1, g1, b1] = p(c1);
  const [r2, g2, b2] = p(c2);
  return `rgb(${lerp(r1, r2, t)},${lerp(g1, g2, t)},${lerp(b1, b2, t)})`;
}

/** Two-segment glow ramp: sand → amber → coral. Shared with the plasma blobs. */
export function glowColor(heat: number) {
  const h = Math.max(0, Math.min(1, heat));
  return h < 0.5 ? mix("#E7CD9B", "#ECA84F", h * 2) : mix("#ECA84F", "#E86A3C", (h - 0.5) * 2);
}

export function GlowSurface({ heat = 0, children, radius = "var(--radius-l)", style }: GlowSurfaceProps) {
  const h = Math.max(0, Math.min(1, heat));
  const color = glowColor(h);
  const bg = h < 0.5 ? mix("#FCF9F2", "#FDF6E9", h * 2) : mix("#FDF6E9", "#FDF1E4", (h - 0.5) * 2);
  return (
    <div
      style={{
        background: bg,
        borderRadius: radius,
        border: "var(--border-card)",
        boxShadow:
          h < 0.02
            ? "var(--shadow-card)"
            : `0 0 ${20 + 50 * h}px ${12 * h}px ${color.replace("rgb", "rgba").replace(")", `,${0.25 + 0.35 * h})`)}`,
        transition: "background var(--dur-glow) var(--ease-calm), box-shadow var(--dur-glow) var(--ease-calm)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
