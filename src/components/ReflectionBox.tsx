import { useState, type CSSProperties } from "react";

export interface ReflectionBoxProps {
  prompt?: string;
  value?: string;
  onChange?: (value: string) => void;
  style?: CSSProperties;
}

export function ReflectionBox({ prompt = "What surprised you?", value, onChange, style }: ReflectionBoxProps) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", ...style }}>
      <div style={{ font: "var(--type-provocation)", color: "var(--text-body)" }}>{prompt}</div>
      <textarea
        value={value}
        rows={4}
        placeholder="Yours alone. Never read, never graded."
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          font: "var(--type-body)",
          fontFamily: "var(--font-sans)",
          color: "var(--text-body)",
          background: "var(--surface-card)",
          border: `1px solid ${focus ? "var(--sage)" : "var(--hairline)"}`,
          borderRadius: "var(--radius-m)",
          outline: "none",
          padding: "14px 16px",
          resize: "vertical",
          transition: "border-color var(--dur-quick) var(--ease-calm)",
        }}
      />
    </div>
  );
}
