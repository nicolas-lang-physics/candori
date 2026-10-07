import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { GlowSurface } from "../components/GlowSurface";
import { StoryText, type StoryWord } from "../components/StoryText";
import { TextInput } from "../components/TextInput";
import { ai } from "../lib/ai";
import { joinStory } from "../lib/story";
import { MIN_DELAY_MS, aiReplyDelayMs, withMinDelay } from "../lib/timing";
import { useSessionStore } from "../state/sessionStore";
import { useStreakStore } from "../state/streakStore";

const MAX_WORDS = 500;
const OPENERS = ["The", "Once", "Nobody", "Yesterday", "Somewhere", "She", "He", "Every"];
// Ends the story. Alone: accept it as already finished, ending on the last
// (AI) word. Appended to a word: submit that word and end immediately, no
// AI turn follows. Reserved — see api/_lib/validate.ts's STORY_STOP_CHAR.
const STOP_CHAR = "~";

export function OneWordStory({ onContinue }: { onContinue: () => void }) {
  const [words, setWords] = useState<StoryWord[]>(
    () =>
      useSessionStore.getState().story ?? [
        { text: OPENERS[Math.floor(Math.random() * OPENERS.length)], by: "ai" },
      ],
  );
  const [input, setInput] = useState("");
  const [heat, setHeat] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const addStory = useStreakStore((s) => s.addStory);
  const markToday = useStreakStore((s) => s.markToday);
  const doneRef = useRef(false);
  const storyBoxRef = useRef<HTMLDivElement>(null);

  const type = (v: string) => {
    setInput(v.replace(/\s.*$/, ""));
    setHeat((h) => Math.min(1, h + 0.08));
  };

  const finish = (finalWords: StoryWord[]) => {
    doneRef.current = true;
    setDone(true);
    useSessionStore.getState().clearStory();
    if (finalWords.length <= 1) {   // revise once user can write the first word
        onContinue();
        return;
    }
    addStory(finalWords);
    markToday();
  };

  const submit = () => {
    const raw = input.trim();
    if (!raw || done || waiting) return;

    // "~" alone: the story is already complete, ending on the last (AI) word.
    if (raw === STOP_CHAR) {
      setInput("");
      finish(words);
      return;
    }

    // "word~": submit that word and end right there — no AI turn follows.
    const endsHere = raw.endsWith(STOP_CHAR);
    const w = endsHere ? raw.slice(0, -STOP_CHAR.length).trim() : raw;
    if (!w) return;
    // After an AI failure the player's word is still waiting for an answer:
    // only "word~" (end here) goes through; otherwise use "Try again".
    if (error && !endsHere) return;

    const withUser = [...words, { text: w, by: "user" as const }];
    setInput("");

    if (endsHere || withUser.length >= MAX_WORDS) {
      setWords(withUser);
      finish(withUser);
      return;
    }

    // Captured now, before it decays while we wait — reflects how fast the
    // player was typing at the moment they submitted this word.
    askAi(withUser, aiReplyDelayMs(heat));
  };

  const askAi = (withUser: StoryWord[], delay: number) => {
    setError(false);
    setWords([...withUser, { text: "…", by: "ai", pending: true }]);
    setWaiting(true);
    void withMinDelay(ai.nextStoryWord(withUser), delay)
      .then((aiWord) => {
        if (doneRef.current) return;
        const next = [...withUser, { text: aiWord, by: "ai" as const }];
        setWords(next);
        setWaiting(false);
        if (next.length >= MAX_WORDS) finish(next);
      })
      .catch(() => {
        if (doneRef.current) return;
        setWords(withUser);
        setWaiting(false);
        setError(true);
      });
  };

  // Persist the unfinished story on every change (never the pending
  // placeholder), so the player can come back and continue it.
  useEffect(() => {
    if (doneRef.current) return;
    useSessionStore.getState().setStory(words.filter((w) => !w.pending));
  }, [words]);

  // A restored story that ends on the player's word is still waiting for the
  // AI's answer (we were closed mid-turn, or the AI had failed).
  const resumedRef = useRef(false);
  useEffect(() => {
    if (resumedRef.current) return;
    resumedRef.current = true;
    if (words[words.length - 1].by === "user") askAi(words, MIN_DELAY_MS);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setHeat((h) => Math.max(0, h - 0.04)), 1000);
    return () => clearInterval(t);
  }, []);

  // Keep the newest word in view as the story grows past the visible area.
  // No-op while everything still fits (scrollHeight <= clientHeight), so
  // short stories keep their original centered look.
  useEffect(() => {
    const el = storyBoxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [words]);

  const storyText = joinStory(words.filter((w) => !w.pending));

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
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", padding: "0 6px" }}>
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
        <div style={{ flex: 1, display: "grid", placeItems: "center", padding: "24px 0", minHeight: 0 }}>
          <div
            style={{
              background: "var(--surface-raised)",
              border: "var(--border-card)",
              borderRadius: "var(--radius-l)",
              boxShadow: "var(--shadow-raised)",
              padding: "36px 30px",
              width: "100%",
              maxHeight: "100%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div style={{ font: "var(--type-story)", lineHeight: 1.65, color: "var(--ink)", overflowY: "auto" }}>
              {storyText}
            </div>
            <div
              style={{
                marginTop: 24,
                paddingTop: 16,
                borderTop: "1px solid var(--hairline)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                flexShrink: 0,
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
        <div style={{ padding: "0 0 20px", display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <Button size="lg" variant="ghost" onClick={() => void share()}>
            Share
          </Button>
          <Button size="lg" variant="primary" onClick={onContinue}>
            Done
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "0 6px" }}>
      <div style={{ padding: "28px 0 0", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span
          style={{
            font: "var(--type-meta)",
            letterSpacing: "var(--tracking-meta)",
            textTransform: "uppercase",
            color: "var(--text-meta)",
          }}
        >
          One-word story
        </span>
        <span style={{ font: "var(--type-meta)", color: "var(--text-meta)" }}>
          {words.filter((w) => !w.pending).length} / {MAX_WORDS}
        </span>
      </div>
      <div
        ref={storyBoxRef}
        style={{
          flex: 1,
          minHeight: 0,
          padding: "32px 0",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <StoryText words={words} cursor />
      </div>
      <GlowSurface heat={heat} style={{ padding: "18px 20px", marginBottom: "12px" }}>
        <TextInput placeholder="one word" value={input} onChange={type} onSubmit={submit} autoFocus />
      </GlowSurface>
      {error ? (
        <div
          style={{
            font: "var(--type-meta)",
            color: "var(--text-meta)",
            padding: "10px 2px 0",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          The AI didn’t answer.
          <Button variant="quiet" onClick={() => askAi(words, MIN_DELAY_MS)}>
            Try again
          </Button>
        </div>
      ) : null}
        {/*<div style={{ font: "var(--type-meta)", color: "var(--text-meta)", padding: "10px 2px 0", marginBottom: 40 }}>
        ~ alone ends here · word~ ends on that word
      </div>*/}
    </div>
  );
}
