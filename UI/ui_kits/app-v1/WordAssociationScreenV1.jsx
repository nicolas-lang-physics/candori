const { Button, GlowSurface, SoftTimer, TextInput } = window.CandoriDesignSystem_46536d;
const AI_WORDS = ['lantern','moth','static','harvest','ivory','undertow','matchbox','vertigo','cellar','plume','circuit','fable'];
function WordAssociationScreenV1({ onContinue }) {
  const [current, setCurrent] = React.useState({ text: 'river', by: 'ai', key: 0 });
  const [waiting, setWaiting] = React.useState(false);
  const [faded, setFaded] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [heat, setHeat] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const lastType = React.useRef(Date.now());
  const fadeTimer = React.useRef(null);
  const armFade = () => {
    clearTimeout(fadeTimer.current);
    setFaded(false);
    fadeTimer.current = setTimeout(() => setFaded(true), 600);
  };
  React.useEffect(() => { armFade(); return () => clearTimeout(fadeTimer.current); }, []);
  React.useEffect(() => {
    const t = setInterval(() => {
      setProgress(p => Math.min(1, p + 1 / 90));
      setHeat(h => Date.now() - lastType.current > 2500 ? Math.max(0, h - 0.06) : h);
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const type = v => { setInput(v); lastType.current = Date.now(); setHeat(h => Math.min(1, h + 0.07)); };
  const submit = () => {
    const w = input.trim(); if (!w || waiting) return;
    setCurrent(c => ({ text: w, by: 'user', key: c.key + 1 }));
    armFade();
    setInput('');
    setWaiting(true);
    setTimeout(() => {
      setCurrent(c => ({ text: AI_WORDS[Math.floor(Math.random() * AI_WORDS.length)], by: 'ai', key: c.key + 1 }));
      armFade();
      setWaiting(false);
    }, 500);
  };
  return (
    <div style={{display:'flex',flexDirection:'column',minHeight:'100%',padding:'0 24px'}}>
      <div style={{padding:'28px 0 0',display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
        <span style={{font:'var(--type-meta)',letterSpacing:'var(--tracking-meta)',textTransform:'uppercase',color:'var(--text-meta)'}}>Word association &middot; 2 of 3</span>
      </div>
      <SoftTimer progress={progress} style={{marginTop:20}} />
      <div style={{flex:1,display:'grid',placeItems:'center',padding:'28px 0'}}>
        <div key={current.key} style={{position:'relative',display:'grid',placeItems:'center'}}>
          <div style={{position:'absolute',width:180,height:180,borderRadius:'50%',
            background:'radial-gradient(circle, ' + (current.by === 'ai' ? 'rgba(232,106,60,0.28)' : 'rgba(236,168,79,0.30)') + ' 0%, rgba(236,168,79,0) 70%)',
            opacity:faded ? 0 : 1,transition:'opacity 6s var(--ease-calm)'}}></div>
          <span style={{position:'relative',font:'400 2.25rem/1.3 var(--font-sans)',
            color:current.by === 'ai' ? '#C05A32' : 'var(--sage-deep)',
            opacity:faded ? 0.18 : 1,transition:'opacity 6s var(--ease-calm)'}}>{current.text}</span>
        </div>
      </div>
      <GlowSurface heat={heat} style={{padding:'18px 20px',marginBottom:16}}>
        <TextInput placeholder="whatever comes" value={input} onChange={type} onSubmit={submit} autoFocus />
      </GlowSurface>
      <div style={{padding:'0 0 40px',display:'flex',justifyContent:'flex-end'}}>
        <Button variant="quiet" onClick={onContinue}>Done here</Button>
      </div>
    </div>
  );
}
window.WordAssociationScreenV1 = WordAssociationScreenV1;
