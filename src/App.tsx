import { Gallery } from "./screens/Gallery";
import { Home } from "./screens/Home";
import { Lesson } from "./screens/Lesson";
import { OneWordStory } from "./screens/OneWordStory";
import { Reflection } from "./screens/Reflection";
import { WordAssociation } from "./screens/WordAssociation";
import { useSessionStore } from "./state/sessionStore";

export default function App() {
  const screen = useSessionStore((s) => s.screen);
  const advance = useSessionStore((s) => s.advance);

  if (import.meta.env.DEV && window.location.hash === "#gallery") {
    return <Gallery />;
  }

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px 16px",
        background: "var(--surface-page)",
        boxSizing: "border-box",
      }}
    >
      {/* Bounded app card — a responsive version of the mock's fixed 390×772
          frame (UI/ui_kits/app-v2/index.html). Portrait aspect maintained
          across the whole clamp range: max height (900) > max width (640).

          overflow is intentionally left visible (test): the word-association
          glow and the story input's GlowSurface halo are allowed to bleed
          past the rounded edge instead of being clipped by it. If that ships,
          swap back to overflow:'hidden' + overflowY:'auto' on the inner div. */}
      <div
        style={{
          width: "clamp(320px, 92vw, 640px)",
          height: "clamp(680px, 92vh, 900px)",
          background: "var(--surface-page)",
          border: "1px solid var(--hairline)",
          borderRadius: "var(--radius-frame)",
          boxShadow: "var(--shadow-raised)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {screen === "home" && <Home onBegin={advance} />}
          {screen === "lesson" && <Lesson onContinue={advance} />}
          {screen === "assoc" && <WordAssociation onContinue={advance} />}
          {screen === "story" && <OneWordStory onContinue={advance} />}
          {screen === "reflect" && <Reflection onDone={advance} />}
        </div>
      </div>
    </div>
  );
}
