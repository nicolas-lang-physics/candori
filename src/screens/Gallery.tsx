import { useState } from "react";
import { Button } from "../components/Button";
import { GlowSurface } from "../components/GlowSurface";
import { SoftTimer } from "../components/SoftTimer";
import { WordChip } from "../components/WordChip";
import { StreakDots } from "../components/StreakDots";
import { TextInput } from "../components/TextInput";
import { ReflectionBox } from "../components/ReflectionBox";
import { LessonCard } from "../components/LessonCard";
import { StoryText } from "../components/StoryText";

/** Dev-only component gallery — visual diff against UI/components/*.card.html. Open with #gallery. */
export function Gallery() {
  const [heat, setHeat] = useState(0.6);
  const [text, setText] = useState("");
  const [reflection, setReflection] = useState("");
  return (
    <div style={{ maxWidth: "var(--measure)", margin: "0 auto", padding: "var(--space-6) var(--page-pad)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <h1 style={{ font: "var(--type-display)", letterSpacing: "var(--tracking-display)", margin: 0 }}>gallery</h1>

      <section>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <Button>Begin today’s session</Button>
          <Button variant="quiet">Continue</Button>
          <Button variant="ghost">Share</Button>
          <Button disabled>Disabled</Button>
          <Button size="lg">Large primary</Button>
        </div>
      </section>

      <section>
        <label style={{ font: "var(--type-meta)", color: "var(--text-meta)" }}>
          heat {heat.toFixed(2)}{" "}
          <input type="range" min={0} max={1} step={0.01} value={heat} onChange={(e) => setHeat(Number(e.target.value))} />
        </label>
        <GlowSurface heat={heat} style={{ padding: 24, marginTop: 12 }}>
          <TextInput value={text} onChange={setText} placeholder="whatever comes" />
        </GlowSurface>
      </section>

      <SoftTimer progress={heat} />

      <section style={{ display: "flex", gap: 16 }}>
        <WordChip word="lantern" by="ai" />
        <WordChip word="river" by="user" />
        <WordChip word="waiting…" by="ai" pending />
      </section>

      <StreakDots day={12} week={[true, true, false, true, true, true, true]} />

      <LessonCard
        kicker="Presence"
        text="You cannot listen and rehearse at the same time. Every conversation you've ever rushed, you rushed because you were somewhere else."
      />

      <StoryText
        cursor
        words={[
          { text: "The", by: "ai" },
          { text: "keeper", by: "user" },
          { text: "collected", by: "ai" },
          { text: "forgotten", by: "user" },
          { text: "umbrellas", by: "ai" },
        ]}
      />

      <ReflectionBox prompt="What did you avoid?" value={reflection} onChange={setReflection} />
    </div>
  );
}
