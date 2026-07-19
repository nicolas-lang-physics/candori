import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { GlowSurface } from "../components/GlowSurface";
import { StoryText, type StoryWord } from "../components/StoryText";
import { TextInput } from "../components/TextInput";
import { ai } from "../lib/ai";
import { useStreakStore } from "../state/streakStore";

const MAX_WORDS = 24;
const OPENERS = ["The", "Once", "Nobody", "Yesterday", "Somewhere", "She", "He", "Every"];

export function OneWordStory({ onContinue }: { onContinue: () => void }) {
  const [words, setWords] = useState<StoryWord[]>(() => [
    { text: OPENERS[Math.floor(Math.random() * OPENERS.length)], by: "ai" },
  ]);
  const [input, setInput] = useState("");
  const [heat, setHeat] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const [done, setDone] = useState(false);
  const setLastStory = useStreakStore((s) => s.setLastStory);
  const doneRef = useRef(false);

  const type = (v: string) => {
    setInput(v.replace(/\s.*$/, ""));
    setHeat((h) => Math.min(1, h + 0.08));
  };

  const finish = (finalWords: StoryWord[]) => {
    doneRef.current = true;
    setDone(true);
    setLastStory(finalWords.map((w) => w.text).join(" "));
  };

  const submit = () => {
    const w = input.trim();
    if (!w || done || waiting) return;
    const withUser = [...words, { text: w, by: "user" as const }];
    setInput("");
    if (withUser.length >= MAX_WORDS || w === ".") {
      setWords(withUser);
      finish(withUser);
      return;
    }
    setWords([...withUser, { text: "…", by: "ai", pending: true }]);
    setWaiting(true);
    void ai.nextStoryWord(withUser).then((aiWord) => {
      if (doneRef.current) return;
      const next = [...withUser, { text: aiWord, by: "ai" as const }];
      setWords(next);
      setWaiting(false);
      if (next.length >= MAX_WORDS) finish(next);
    });
  };

  useEffect(() => {
    const t = setInterval(() => setHeat((h) => Math.max(0, h - 0.04)), 1000);
    return () => clearInterval(t);
  }, []);

  const storyText = words.filter((w) => !w.pending).map((w) => w.text).join(" ");

  const share = async () => {
    const text = `${storyText}\n\n— a one-word story, written with candori`;
    if (navigator.share) {
      try {
        await navigator.share({ text });
        return;
      } catch {
        /* user cancelled — fall through to clipboard */
      }
    }
    await navigator.clipboard.writeText(text);
  };

  if (done) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", padding: "0 24px" }}>
        <div
          style={{
            padding: "28px 0 0",
            font: "var(--type-meta)",
            letterSpacing: "var(--tracking-meta)",
            textTransform: "uppercase",
            color: "var(--text-meta)",
          }}
        >
          Your story · today
        </div>
        <div style={{ flex: 1, display: "grid", placeItems: "center", padding: "24px 0" }}>
          <div
            style={{
              background: "var(--surface-raised)",
              border: "var(--border-card)",
              borderRadius: "var(--radius-l)",
              boxShadow: "var(--shadow-raised)",
              padding: "36px 30px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <div style={{ font: "var(--type-story)", lineHeight: 1.65, color: "var(--ink)" }}>{storyText}</div>
            <div
              style={{
                marginTop: 24,
                paddingTop: 16,
                borderTop: "1px solid var(--hairline)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <span style={{ font: "500 15px/1 var(--font-sans)", color: "var(--ink)" }}>candori</span>
              <span
                style={{
                  font: "var(--type-meta)",
                  letterSpacing: "var(--tracking-meta)",
                  textTransform: "uppercase",
                  color: "var(--text-meta)",
                }}
              >
                a one-word story
              </span>
            </div>
          </div>
        </div>
        <div style={{ padding: "0 0 40px", display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <Button variant="ghost" onClick={() => void share()}>
            Share
          </Button>
          <Button variant="primary" onClick={onContinue}>
            One more thing
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", padding: "0 24px" }}>
      <div style={{ padding: "28px 0 0", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span
          style={{
            font: "var(--type-meta)",
            letterSpacing: "var(--tracking-meta)",
            textTransform: "uppercase",
            color: "var(--text-meta)",
          }}
        >
          One-word story · 3 of 3
        </span>
        <span style={{ font: "var(--type-meta)", color: "var(--text-meta)" }}>
          {words.filter((w) => !w.pending).length} / {MAX_WORDS}
        </span>
      </div>
      <div style={{ flex: 1, padding: "32px 0", display: "grid", alignContent: "center" }}>
        <StoryText words={words} cursor />
      </div>
      <GlowSurface heat={heat} style={{ padding: "18px 20px", marginBottom: 40 }}>
        <TextInput placeholder="one word" value={input} onChange={type} onSubmit={submit} autoFocus />
      </GlowSurface>
    </div>
  );
}
