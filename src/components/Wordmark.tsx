export function Wordmark({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <span
      style={{
        font: `500 ${size === "sm" ? 15 : 20}px/1 var(--font-sans)`,
        letterSpacing: size === "sm" ? undefined : "-0.01em",
        color: "var(--ink)",
      }}
    >
      candori
    </span>
  );
}
