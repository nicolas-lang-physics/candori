const { Button, SoftTimer, TextInput } = window.CandoriDesignSystem_46536d;
const AI_WORDS = ['lantern','moth','static','harvest','ivory','undertow','matchbox','vertigo','cellar','plume','circuit','fable'];
const glowKeyframes = `
@keyframes blobDriftA{0%{transform:translate(-50%,-50%) scale(1,1)}33%{transform:translate(-56%,-46%) scale(1.12,0.92)}66%{transform:translate(-45%,-54%) scale(0.94,1.1)}100%{transform:translate(-50%,-50%) scale(1,1)}}
@keyframes blobDriftB{0%{transform:translate(-50%,-50%) scale(1,1)}40%{transform:translate(-44%,-53%) scale(1.08,0.9)}75%{transform:translate(-55%,-47%) scale(0.92,1.14)}100%{transform:translate(-50%,-50%) scale(1,1)}}
@keyframes blobDriftC{0%{transform:translate(-50%,-50%) scale(1,1)}50%{transform:translate(-47%,-56%) scale(1.15,1.02)}100%{transform:translate(-50%,-50%) scale(1,1)}}
`;
function lerp(a, b, t) { return a + (b - a) * t; }
function mixHex(c1, c2, t) {
  const p = h => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
  const [r1,g1,b1] = p(c1), [r2,g2,b2] = p(c2);
  return [Math.round(lerp(r1,r2,t)), Math.round(lerp(g1,g2,t)), Math.round(lerp(b1,b2,t))];
}
// Continuous sand -> amber -> coral ramp; alpha rises gently with heat
function glowColor(heat, alpha) {
  const [r,g,b] = heat < 0.5 ? mixHex('#E7CD9B','#ECA84F', heat * 2) : mixHex('#ECA84F','#E86A3C', (heat - 0.5) * 2);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha.toFixed(3) + ')';
}
function Blob({ x, y, size, color, opacity, drift = 'blobDriftA', dur = '7s' }) {
  return (
    <div style={{position:'absolute',left:x,top:y,width:size,height:size,borderRadius:'50%',
      background:'radial-gradient(circle, ' + color + ' 0%, rgba(236,168,79,0) 68%)',
      opacity, transform:'translate(-50%,-50%)',
      animation:drift + ' ' + dur + ' var(--ease-calm) infinite',
      transition:'opacity 2.5s var(--ease-calm)'}}></div>
  );
}
function WordAssociationScreenV2({ onContinue }) {
  const [current, setCurrent] = React.useState({ text: 'river', by: 'ai', key: 0 });
  const [waiting, setWaiting] = React.useState(false);
  const [faded, setFaded] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [heat, setHeat] = React.useState(0);   // smoothed 0..1, eases toward target
  const [bloom, setBloom] = React.useState(0); // slow accumulator 0..1 — sustained fast typing
  const [progress, setProgress] = React.useState(0);
  const target = React.useRef(0);
  const fadeTimer = React.useRef(null);
  const armFade = () => {
    clearTimeout(fadeTimer.current);
    setFaded(false);
    fadeTimer.current = setTimeout(() => setFaded(true), 600);
  };
  React.useEffect(() => { armFade(); return () => clearTimeout(fadeTimer.current); }, []);
  React.useEffect(() => {
    // 120ms tick: heat eases toward target (fluid in time); target decays; bloom creeps
    const t = setInterval(() => {
      target.current = Math.max(0, target.current - 0.006);
      setHeat(h => h + (target.current - h) * 0.06);
      setBloom(b => {
        if (target.current > 0.55) return Math.min(1, b + 0.004); // very slow growth
        return Math.max(0, b - 0.0015);                            // even slower ebb
      });
    }, 120);
    const p = setInterval(() => setProgress(v => Math.min(1, v + 1 / 90)), 1000);
    return () => { clearInterval(t); clearInterval(p); };
  }, []);
  const type = v => { setInput(v); target.current = Math.min(1, target.current + 0.055); };
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
  // One shared warmth: every blob derives its color from the same continuous heat ramp,
  // regardless of who spoke — no author-based hue jumps. Bloom lets sustained fast typing
  // slowly swell the fields until glow nearly fills the screen.
  const warm = a => glowColor(heat, a);
  const wordGlowOpacity = faded ? 0.15 : 1;
  const wordSize = 200 + heat * 180 + bloom * 420;
  const inputSize = 160 + heat * 260 + bloom * 480;
  const bridge = Math.max(0, (heat - 0.45) / 0.55, bloom);
  return (
    <div style={{display:'flex',flexDirection:'column',minHeight:'100%',padding:'0 24px',position:'relative',overflow:'hidden'}}>
      <style>{glowKeyframes}</style>
      <div style={{position:'absolute',inset:0,pointerEvents:'none',filter:'blur(18px)'}}>
        <Blob x="50%" y="44%" size={wordSize} color={warm(0.30 + 0.1 * heat)} opacity={wordGlowOpacity} drift="blobDriftA" dur="7s" />
        <Blob x="46%" y="47%" size={wordSize * 0.7} color={warm(0.26)} opacity={wordGlowOpacity * 0.7} drift="blobDriftC" dur="9s" />
        <Blob x="50%" y="82%" size={inputSize} color={warm(0.28 + 0.1 * heat)} opacity={0.35 + heat * 0.65} drift="blobDriftB" dur="8s" />
        <Blob x="56%" y="79%" size={inputSize * 0.65} color={warm(0.24)} opacity={(0.35 + heat * 0.65) * 0.7} drift="blobDriftA" dur="11s" />
        <Blob x="50%" y="63%" size={120 + bridge * 560} color={warm(0.26)} opacity={Math.min(1, bridge * 1.4)} drift="blobDriftC" dur="6s" />
      </div>
      <div style={{padding:'28px 0 0',display:'flex',justifyContent:'space-between',alignItems:'baseline',position:'relative'}}>
        <span style={{font:'var(--type-meta)',letterSpacing:'var(--tracking-meta)',textTransform:'uppercase',color:'var(--text-meta)'}}>Word association &middot; 2 of 3</span>
      </div>
      <SoftTimer progress={progress} style={{marginTop:20,position:'relative'}} />
      <div style={{flex:1,display:'grid',placeItems:'center',padding:'28px 0',position:'relative'}}>
        <span key={current.key} style={{font:'400 2.25rem/1.3 var(--font-sans)',
          color:current.by === 'ai' ? '#C05A32' : 'var(--sage-deep)',
          opacity:faded ? 0.18 : 1,transition:'opacity 6s var(--ease-calm)'}}>{current.text}</span>
      </div>
      <div style={{position:'relative',padding:'18px 20px',marginBottom:16,borderRadius:'var(--radius-l)',border:'1px solid rgba(88,72,50,0.10)',background:'rgba(252,249,242,0.45)'}}>
        <TextInput placeholder="whatever comes" value={input} onChange={type} onSubmit={submit} autoFocus />
      </div>
      <div style={{padding:'0 0 40px',display:'flex',justifyContent:'flex-end',position:'relative'}}>
        <Button variant="quiet" onClick={onContinue}>Done here</Button>
      </div>
    </div>
  );
}
window.WordAssociationScreenV2 = WordAssociationScreenV2;
