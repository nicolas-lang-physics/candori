import { useEffect, useState } from "react";
import { glowColor } from "../../components/GlowSurface";

/** Plasma-glow field from the v2 mock: blurred radial blobs colored by one shared heat ramp. */

export const glowKeyframes = `
@keyframes blobDriftA{0%{transform:translate(-50%,-50%) scale(1,1)}33%{transform:translate(-56%,-46%) scale(1.12,0.92)}66%{transform:translate(-45%,-54%) scale(0.94,1.1)}100%{transform:translate(-50%,-50%) scale(1,1)}}
@keyframes blobDriftB{0%{transform:translate(-50%,-50%) scale(1,1)}40%{transform:translate(-44%,-53%) scale(1.08,0.9)}75%{transform:translate(-55%,-47%) scale(0.92,1.14)}100%{transform:translate(-50%,-50%) scale(1,1)}}
@keyframes blobDriftC{0%{transform:translate(-50%,-50%) scale(1,1)}50%{transform:translate(-47%,-56%) scale(1.15,1.02)}100%{transform:translate(-50%,-50%) scale(1,1)}}
`;

export function warmColor(heat: number, alpha: number): string {
  return glowColor(heat).replace("rgb", "rgba").replace(")", `,${alpha.toFixed(3)})`);
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export interface BlobProps {
  x: string;
  y: string;
  size: number;
  color: string;
  opacity: number;
  drift?: "blobDriftA" | "blobDriftB" | "blobDriftC";
  dur?: string;
  animate?: boolean;
}

export function Blob({ x, y, size, color, opacity, drift = "blobDriftA", dur = "7s", animate = true }: BlobProps) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, rgba(236,168,79,0) 68%)`,
        opacity,
        transform: "translate(-50%,-50%)",
        animation: animate ? `${drift} ${dur} var(--ease-calm) infinite` : "none",
        transition: "opacity 2.5s var(--ease-calm)",
      }}
    />
  );
}
