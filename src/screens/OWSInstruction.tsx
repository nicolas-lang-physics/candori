import { IntroPage } from "../components/IntroPage";

const TITLE = "One-word Story";
const TEXT = `A one-word story is – you guessed it – a story that is created collaboratively, one word at a time.
    Normally played in a group, each participant contributes a word in turn. Here your partner will be AI.
    There isn't much that you need to know about how to
    play one-word story, other than that you shouldn't think ahead too much. Instead, accept your partner's (AI's) 
     contribution and write the next word that makes grammatical sense. The emergent beauty of a one-word story
     comes from the collaboration of multiple minds (organic or not) and dealing with the unexpected. Type "~" to end the
story on the last word typed by AI, or "last-word.~" to end it on your last word.`;

export function OWSInstruction({ onContinue }: { onContinue: () => void }) {
  return <IntroPage title={TITLE} header={TITLE} text={TEXT} buttonText="Go" onNext={onContinue} />;
}
