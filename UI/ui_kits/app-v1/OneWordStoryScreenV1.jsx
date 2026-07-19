const { Button, GlowSurface, StoryText, TextInput } = window.CandoriDesignSystem_46536d;
const AI_STORY = ['keeper','collected','forgotten','umbrellas','because','rain','remembered','names','nobody','else','kept','saying','aloud','until','the','sea','finally','answered','back','softly'];
function OneWordStoryScreenV1({ onContinue }) {
  const [words, setWords] = React.useState([{ text: 'The', by: 'ai' }]);
  const [input, setInput] = React.useState('');
  const [heat, setHeat] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const aiIdx = React.useRef(0);
  const type = v => { setInput(v.replace(/\s.*$/, '')); setHeat(h => Math.min(1, h + 0.08)); };
  const submit = () => {
    const w = input.trim(); if (!w || done) return;
    const next = [...words, { text: w, by: 'user' }];
    if (aiIdx.current < AI_STORY.length) { next.push({ text: AI_STORY[aiIdx.current], by: 'ai' }); aiIdx.current += 1; }
    setWords(next); setInput('');
    if (next.length >= 24 || w === '.' ) setDone(true);
  };
  React.useEffect(() => { const t = setInterval(() => setHeat(h => Math.max(0, h - 0.04)), 1000); return () => clearInterval(t); }, []);
  if (done) return (
    <div style={{display:'flex',flexDirection:'column',minHeight:'100%',padding:'0 24px'}}>
      <div style={{padding:'28px 0 0',font:'var(--type-meta)',letterSpacing:'var(--tracking-meta)',textTransform:'uppercase',color:'var(--text-meta)'}}>Your story &middot; today</div>
      <div style={{flex:1,display:'grid',placeItems:'center',padding:'24px 0'}}>
        <div style={{background:'var(--surface-raised)',border:'var(--border-card)',borderRadius:'var(--radius-l)',boxShadow:'var(--shadow-raised)',padding:'36px 30px',width:'100%',boxSizing:'border-box'}}>
          <div style={{font:'var(--type-story)',lineHeight:1.65,color:'var(--ink)'}}>{words.map(w => w.text).join(' ')}</div>
          <div style={{marginTop:24,paddingTop:16,borderTop:'1px solid var(--hairline)',display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
            <span style={{font:'500 15px/1 var(--font-sans)',color:'var(--ink)'}}>candori</span>
            <span style={{font:'var(--type-meta)',letterSpacing:'var(--tracking-meta)',textTransform:'uppercase',color:'var(--text-meta)'}}>a one-word story</span>
          </div>
        </div>
      </div>
      <div style={{padding:'0 0 40px',display:'flex',gap:12,justifyContent:'flex-end'}}>
        <Button variant="ghost">Share</Button>
        <Button variant="primary" onClick={onContinue}>One more thing</Button>
      </div>
    </div>
  );
  return (
    <div style={{display:'flex',flexDirection:'column',minHeight:'100%',padding:'0 24px'}}>
      <div style={{padding:'28px 0 0',display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
        <span style={{font:'var(--type-meta)',letterSpacing:'var(--tracking-meta)',textTransform:'uppercase',color:'var(--text-meta)'}}>One-word story &middot; 3 of 3</span>
        <span style={{font:'var(--type-meta)',color:'var(--text-meta)'}}>{words.length} / 24</span>
      </div>
      <div style={{flex:1,padding:'32px 0',display:'grid',alignContent:'center'}}>
        <StoryText words={words} cursor />
      </div>
      <GlowSurface heat={heat} style={{padding:'18px 20px',marginBottom:40}}>
        <TextInput placeholder="one word" value={input} onChange={type} onSubmit={submit} autoFocus />
      </GlowSurface>
    </div>
  );
}
window.OneWordStoryScreenV1 = OneWordStoryScreenV1;