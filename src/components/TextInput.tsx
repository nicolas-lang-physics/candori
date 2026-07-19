import { useState, type CSSProperties } from "react";

export interface TextInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  style?: CSSProperties;
}

export function TextInput({ value, onChange, onSubmit, placeholder, autoFocus, style }: TextInputProps) {
  const [focus, setFocus] = useState(false);
  return (
    <input
      value={value}
      autoFocus={autoFocus}
      placeholder={placeholder}
      autoComplete="off"
      autoCapitalize="none"
      onChange={(e) => onChange?.(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && onSubmit) onSubmit((e.target as HTMLInputElement).value);
      }}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        font: "var(--type-story)",
        fontFamily: "var(--font-sans)",
        color: "var(--text-body)",
        background: "transparent",
        border: "none",
        borderBottom: `1px solid ${focus ? "var(--sage)" : "var(--hairline)"}`,
        outline: "none",
        padding: "8px 2px",
        width: "100%",
        boxSizing: "border-box",
        caretColor: "var(--glow-amber)",
        transition: "border-color var(--dur-quick) var(--ease-calm)",
        ...style,
      }}
    />
  );
}
