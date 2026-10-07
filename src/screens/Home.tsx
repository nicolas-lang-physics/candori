import { IntroPage } from "../components/IntroPage";
//import { StreakDots } from "../components/StreakDots";
import { useLastStory, useStreak } from "../state/streakStore";
//import { SignInPrompt } from "./SignInPrompt";

export function Home({ onBegin }: { onBegin: () => void }) {
  //const { day, week, completedToday, completionCount } = useStreak();
  const { completedToday } = useStreak();
  const lastStory = useLastStory();

  const subtitle = completedToday
    ? "That's it. Come back tomorrow — or go again, nobody is counting."
    : lastStory
      ? `Ready for your next story? Yesterday you wrote: “${lastStory.split(" ").slice(0, 8).join(" ")}…” What's today?`
      : "Candori brings you some beloved improv exercises in app-form. Ever created a one-word story? Give it a try!";

  return (
    <IntroPage
      title={
        <>
          Don't overthink.
          <br />
          Type.
        </>
      }
      text={subtitle}
      buttonText={completedToday ? "Go again" : "Begin"}
      narrowBody
      showWordMark
      onNext={onBegin}
    />
  );
}
