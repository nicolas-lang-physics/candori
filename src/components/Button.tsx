import { useState, type CSSProperties, type ReactNode } from "react";

export interface ButtonProps {
  variant?: "primary" | "quiet" | "ghost";
  size?: "md" | "lg";
  disabled?: boolean;
  autoFocus?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  style?: CSSProperties;
}

export function Button({ variant = "primary", size = "md", disabled, autoFocus, fullWidth, children, onClick, style }: ButtonProps) {
  const [hover, setHover] = useState(false);
  const pad = size === "lg" ? "14px 28px" : "10px 22px";
  const base: CSSProperties = {
    font: "var(--type-label)",
    fontFamily: "var(--font-sans)",
    border: "none",
    cursor: disabled ? "default" : "pointer",
    borderRadius: "var(--radius-pill)",
    padding: pad,
    opacity: disabled ? 0.45 : 1,
    transition: "background var(--dur-quick) var(--ease-calm), color var(--dur-quick) var(--ease-calm)",
    background: "transparent",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
  };
  const variants: Record<string, CSSProperties> = {
    primary: { background: "var(--sage-deep)", color: "var(--text-on-accent)" },
    quiet: { background: "var(--sage-tint)", color: "var(--sage-deep)" },
    ghost: { background: "transparent", color: "var(--sage-deep)", padding: size === "lg" ? "14px 8px" : "10px 8px" },
  };
  const hoverStyles: Record<string, CSSProperties> = {
    primary: { background: "var(--link-hover)" },
    quiet: { background: "var(--sage-faint)" },
    ghost: { color: "var(--link-hover)" },
  };
  return (
    <button
      autoFocus={autoFocus}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...variants[variant], ...(hover && !disabled ? hoverStyles[variant] : {}), ...(fullWidth ? { width: "100%", justifyContent: "center" } : null), ...style }}
    >
      {children}
    </button>
  );
}
