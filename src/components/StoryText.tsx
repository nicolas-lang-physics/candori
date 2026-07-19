import { Fragment, type CSSProperties } from "react";
import { WordChip } from "./WordChip";

export interface StoryWord {
  text: string;
  by: "user" | "ai";
  pending?: boolean;
}

export interface StoryTextProps {
  words?: StoryWord[];
  cursor?: boolean;
  style?: CSSProperties;
}

export function StoryText({ words = [], cursor, style }: StoryTextProps) {
  return (
    <div style={{ font: "var(--type-story)", maxWidth: "var(--measure)", lineHeight: 1.7, ...style }}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <WordChip word={w.text} by={w.by} pending={w.pending} />
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
      {cursor ? <span style={{ color: "var(--glow-amber)", opacity: 0.7 }}> ▏</span> : null}
    </div>
  );
}
