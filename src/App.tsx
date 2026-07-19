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
    <div style={{ maxWidth: 430, margin: "0 auto", minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {screen === "home" && <Home onBegin={advance} />}
        {screen === "lesson" && <Lesson onContinue={advance} />}
        {screen === "assoc" && <WordAssociation onContinue={advance} />}
        {screen === "story" && <OneWordStory onContinue={advance} />}
        {screen === "reflect" && <Reflection onDone={advance} />}
      </div>
    </div>
  );
}
