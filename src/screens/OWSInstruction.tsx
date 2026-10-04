
import {Page} from "../components/Page.tsx";

export function OWSInstruction({ onContinue }: {
    onContinue: () => void
}) {

    const TITLE: string = "One-word Story";
    const HEADER: string = "Exercise: One-word Story";
    const TEXT: string = `A one-word story is – you guessed it – a story that is created one word at a time.
    Normally played in person in a group, here your partner will be AI. There isn't much that you need to know about how to
    play one-word story, other than that you shouldn't think ahead too much. Instead, accept your partner's (AI's) 
     contribution and write the next word that makes grammatical sense. The emergent beauty of a one-word story
     comes from the collaboration of multiple minds (organic or not) and dealing with the unexpected.`;

  return (
    <Page title={TITLE} text={TEXT} header={HEADER} onNext={onContinue} buttonText={"Go"} />
  );
}
