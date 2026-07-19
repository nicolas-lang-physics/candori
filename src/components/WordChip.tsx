import type { CSSProperties } from "react";

export interface WordChipProps {
  word: string;
  by?: "user" | "ai";
  pending?: boolean;
  style?: CSSProperties;
}

export function WordChip({ word, by = "user", pending, style }: WordChipProps) {
  return (
    <span
      style={{
        font: "var(--type-story)",
        color: pending ? "var(--text-meta)" : by === "ai" ? "var(--word-ai)" : "var(--sage-deep)",
        opacity: pending ? 0.6 : 1,
        transition: "opacity var(--dur-soft) var(--ease-calm)",
        ...style,
      }}
    >
      {word}
    </span>
  );
}
