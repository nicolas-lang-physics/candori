import { Fragment, type CSSProperties } from "react";
import { needsSpaceBefore } from "../lib/story";
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
          {i > 0 && needsSpaceBefore(w.text) ? " " : null}
          <WordChip word={w.text} by={w.by} pending={w.pending} />
        </Fragment>
      ))}
      {cursor ? <span style={{ color: "var(--glow-amber)", opacity: 0.7 }}> ▏</span> : null}
    </div>
  );
}
