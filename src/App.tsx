import { Home } from "./screens/Home";
import { OneWordStory } from "./screens/OneWordStory";
import {OWSInstruction} from "./screens/OWSInstruction.tsx";
import { useSessionStore } from "./state/sessionStore";

export default function App() {
  const screen = useSessionStore((s) => s.screen);
  const advance = useSessionStore((s) => s.advance);


  return (
    <div
      style={{
        height: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "max(12px, env(safe-area-inset-top)) 16px max(12px, env(safe-area-inset-bottom))",
        background: "var(--surface-page)",
        boxSizing: "border-box",
      }}
    >
        <div
        style={{
          width: "clamp(320px, 92vw, 640px)",
          height: "min(900px, 100%)",
          background: "var(--surface-page)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
          {screen === "home" && <Home onBegin={advance} />}
          {screen === "instruction" && <OWSInstruction onContinue={advance} />}
          {screen === "story" && <OneWordStory onContinue={advance} />}
        </div>
      </div>
    </div>
  );
}
