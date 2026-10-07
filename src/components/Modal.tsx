import type { ReactNode } from "react";
import { Card } from "./Card";

/** Centered card over a dimmed full-viewport scrim that blocks the app behind it. */
export function Modal({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-label={label}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10,
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "rgba(74,58,38,0.28)",
        backdropFilter: "blur(2px)",
      }}
    >
      <Card
        style={{
          maxWidth: 320,
          padding: "28px 28px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {children}
      </Card>
    </div>
  );
}
