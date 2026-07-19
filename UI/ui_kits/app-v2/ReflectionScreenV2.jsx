const { Button, ReflectionBox, StreakDots } = window.CandoriDesignSystem_46536d;
function ReflectionScreenV2({ onDone }) {
  const [v, setV] = React.useState('');
  return (
    <div style={{display:'flex',flexDirection:'column',minHeight:'100%',padding:'0 24px'}}>
      <div style={{padding:'28px 0 0',font:'var(--type-meta)',letterSpacing:'var(--tracking-meta)',textTransform:'uppercase',color:'var(--text-meta)'}}>Before you go</div>
      <div style={{flex:1,display:'grid',alignContent:'center',gap:32}}>
        <ReflectionBox prompt="What did you avoid?" value={v} onChange={setV} />
      </div>
      <div style={{padding:'0 0 40px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <StreakDots day={13} week={[true,false,true,true,true,true,true]} />
        <Button variant="primary" onClick={onDone}>Done for today</Button>
      </div>
    </div>
  );
}
window.ReflectionScreenV2 = ReflectionScreenV2;