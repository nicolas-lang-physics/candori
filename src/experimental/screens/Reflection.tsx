import { useState } from "react";
import { Button } from "../../components/Button.tsx";
import { ReflectionBox } from "../components/ReflectionBox.tsx";
import { StreakDots } from "../components/StreakDots.tsx";
import { todayISO } from "../../lib/streak.ts";
import { useStreak, useStreakStore } from "../../state/streakStore.ts";

const PROMPTS = ["What surprised you?", "What did you avoid?", "Which word wasn’t yours?"];

/** Reflections stay on this device. They are never transmitted anywhere. */
function saveReflectionLocally(text: string) {
  if (!text.trim()) return;
  try {
    const key = "candori-reflections";
    const existing = JSON.parse(localStorage.getItem(key) ?? "{}") as Record<string, string>;
    existing[todayISO()] = text;
    localStorage.setItem(key, JSON.stringify(existing));
  } catch {
    /* private mode etc. — the reflection simply isn't kept */
  }
}

export function Reflection({ onDone }: { onDone: () => void }) {
  const [value, setValue] = useState("");
  const { completionCount } = useStreak();
  const markToday = useStreakStore((s) => s.markToday);
  const prompt = PROMPTS[completionCount % PROMPTS.length];

  // Preview the post-completion streak so "Done for today" feels earned.
  // currentDay() already reads the same before and after today's mark.
  const { day, week } = useStreak();
  const displayDay = day;
  const displayWeek = [...week.slice(0, 6), true];

  const done = () => {
    saveReflectionLocally(value);
    markToday();
    onDone();
  };

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
        Before you go
      </div>
      <div style={{ flex: 1, display: "grid", alignContent: "center", gap: 32 }}>
        <ReflectionBox prompt={prompt} value={value} onChange={setValue} />
      </div>
      <div style={{ padding: "0 0 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <StreakDots day={displayDay} week={displayWeek} />
        <Button variant="primary" onClick={done}>
          Done for today
        </Button>
      </div>
    </div>
  );
}
