import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { MetaLabel } from "../components/MetaLabel";
import { Modal } from "../components/Modal";
import { Screen, ScreenFooter, ScreenHeader } from "../components/Screen";
import { Wordmark } from "../components/Wordmark";
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
      <Screen
        header={<ScreenHeader left={<MetaLabel>Your story · today</MetaLabel>} />}
        bodyStyle={{ display: "grid", placeItems: "center", gap: 32, padding: "48px 0" }}
        footer={
          <ScreenFooter row  style={{ paddingBottom: 20 }}>
            <Button size="lg" variant="ghost" onClick={() => void share()}>
              Share
            </Button>
            <Button size="lg" variant="primary" onClick={onContinue}>
              Done
            </Button>
          </ScreenFooter>
        }
      >
        <Card
          style={{
            padding: "36px 30px",
            maxHeight: "100%",
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
            <Wordmark size="sm" />
            <MetaLabel>a one-word story</MetaLabel>
          </div>
        </Card>
      </Screen>
    );
  }

  return (
    <Screen
      header={
        <ScreenHeader
          left={<MetaLabel>One-word story</MetaLabel>}
          right={
            <MetaLabel caps={false}>
              {words.filter((w) => !w.pending).length} / {MAX_WORDS}
            </MetaLabel>
          }
        />
      }
      bodyRef={storyBoxRef}
      footer={
        <ScreenFooter style={{ paddingBottom: 12 }}>
          <GlowSurface heat={heat} style={{ padding: "18px 20px" }}>
            <TextInput placeholder="one word" value={input} onChange={type} onSubmit={submit} autoFocus />
          </GlowSurface>
        </ScreenFooter>
      }
    >
      <StoryText words={words} cursor />
      {error ? (
        <Modal label="The AI didn’t answer">
          <div style={{ font: "var(--type-body)", color: "var(--ink)", textAlign: "justify" }}>
            The AI didn’t answer. If the problem persists try again later or write us an email to report the issue.
          </div>
          <Button variant="primary" size="lg" autoFocus onClick={() => askAi(words, MIN_DELAY_MS)}>
            Try again
          </Button>
        </Modal>
      ) : null}
    </Screen>
  );
}
