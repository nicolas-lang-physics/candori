import { Button } from "../components/Button";
import { StreakDots } from "../components/StreakDots";
import { useStreak, useStreakStore } from "../state/streakStore";
import { SignInPrompt } from "./SignInPrompt";

export function Home({ onBegin }: { onBegin: () => void }) {
  const { day, week, completedToday, completionCount } = useStreak();
  const lastStory = useStreakStore((s) => s.lastStory);

  const subtitle = completedToday
    ? "Done for today. Come back tomorrow — or go again, nobody is counting."
    : lastStory
      ? `Yesterday you wrote: “${lastStory.split(" ").slice(0, 8).join(" ")}…” Today is blank.`
      : "Nothing here yet. That’s fine. Today is blank.";

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", padding: "0 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 0 0" }}>
        <span style={{ font: "500 20px/1 var(--font-sans)", letterSpacing: "-0.01em", color: "var(--ink)" }}>
          candori
        </span>
          {/*<StreakDots day={day} week={week} />*/}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 32, padding: "48px 0" }}>
        <div style={{ font: "var(--type-display)", letterSpacing: "var(--tracking-display)", color: "var(--ink)" }}>
          Don't overthink.
          <br />
          Type.
        </div>
        <div style={{ font: "var(--type-body)", color: "var(--text-secondary)", maxWidth: "26rem" }}>{subtitle}</div>
      </div>
      <div style={{ padding: "0 0 40px", display: "flex", flexDirection: "column", gap: 20 }}>
        {/*completionCount > 0 && <SignInPrompt />*/}
        <Button variant="primary" size="lg" onClick={onBegin} style={{ width: "100%", justifyContent: "center" }}>
          {completedToday ? "Go again" : "Begin"}
        </Button>
      </div>
    </div>
  );
}
