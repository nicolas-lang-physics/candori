const { Button, StreakDots, LessonCard } = window.CandoriDesignSystem_46536d;
function HomeScreen({ onBegin }) {
  return (
    <div style={{display:'flex',flexDirection:'column',minHeight:'100%',padding:'0 24px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'28px 0 0'}}>
        <span style={{font:'500 20px/1 var(--font-sans)',letterSpacing:'-0.01em',color:'var(--ink)'}}>candori</span>
        <StreakDots day={12} week={[true,true,false,true,true,true,true]} />
      </div>
      <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',gap:32,padding:'48px 0'}}>
        <div style={{font:'var(--type-display)',letterSpacing:'var(--tracking-display)',color:'var(--ink)'}}>Five minutes.<br/>No script.</div>
        <div style={{font:'var(--type-body)',color:'var(--text-secondary)',maxWidth:'26rem'}}>Yesterday you wrote a story about a lighthouse keeper who hated the sea. Today is blank.</div>
      </div>
      <div style={{padding:'0 0 40px'}}>
        <Button variant="primary" size="lg" onClick={onBegin} style={{width:'100%',justifyContent:'center'}}>Begin today&rsquo;s session</Button>
      </div>
    </div>
  );
}
window.HomeScreen = HomeScreen;