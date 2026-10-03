
import {Page} from "../components/Page.tsx";

export function OWSInstruction({ onContinue }: {
    onContinue: () => void,
    instructions: {kicker: string, instruction: string, lesson: string}[]
}) {

  return (
    <Page title={"One-word Story"} text={"This is how to play a one-word story..."} onNext={onContinue} />
  );
}
