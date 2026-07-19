import { Button } from "../components/Button";
import { LessonCard } from "../components/LessonCard";
import lessons from "../content/lessons.json";
import { useStreak } from "../state/streakStore";

export function Lesson({ onContinue }: { onContinue: () => void }) {
  const { completionCount } = useStreak();
  const lesson = lessons[completionCount % lessons.length];
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
        Today · 1 of 3
      </div>
      <div style={{ flex: 1, display: "grid", placeItems: "center", padding: "32px 0" }}>
        <LessonCard kicker={lesson.kicker} text={lesson.text} />
      </div>
      <div style={{ padding: "0 0 40px", display: "flex", justifyContent: "flex-end" }}>
        <Button variant="quiet" onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}
