const { Button, LessonCard } = window.CandoriDesignSystem_46536d;
const LESSONS = [
  { kicker: 'Presence', text: 'Politeness is a script. You already know your next three lines. So does everyone else. Say the fourth one instead.' },
  { kicker: 'Yes, and', text: 'Accepting what came before is not agreeing with it. It is refusing to pretend it did not happen. Conversations die of pretending.' },
  { kicker: 'The editor', text: 'The inner editor is not protecting you from saying something stupid. It is protecting you from saying something true. Those feel identical from the inside.' },
  { kicker: 'Outcome', text: 'You cannot control how a sentence lands. You can only control whether it was yours. Aim for the second thing.' },
  { kicker: 'Attention', text: 'Interesting people are not the ones with better material. They are the ones who noticed what everyone else skipped. Notice the skipped thing.' },
];
function LessonScreen({ index = 0, onContinue }) {
  const lesson = LESSONS[index % LESSONS.length];
  return (
    <div style={{display:'flex',flexDirection:'column',minHeight:'100%',padding:'0 24px'}}>
      <div style={{padding:'28px 0 0',font:'var(--type-meta)',letterSpacing:'var(--tracking-meta)',textTransform:'uppercase',color:'var(--text-meta)'}}>Today &middot; 1 of 3</div>
      <div style={{flex:1,display:'grid',placeItems:'center',padding:'32px 0'}}>
        <LessonCard kicker={lesson.kicker} text={lesson.text} />
      </div>
      <div style={{padding:'0 0 40px',display:'flex',justifyContent:'flex-end'}}>
        <Button variant="quiet" onClick={onContinue}>Continue</Button>
      </div>
    </div>
  );
}
window.LessonScreen = LessonScreen; window.CANDORI_LESSONS = LESSONS;