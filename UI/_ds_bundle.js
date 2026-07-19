/* @ds-bundle: {"format":4,"namespace":"CandoriDesignSystem_46536d","components":[{"name":"LessonCard","sourcePath":"components/content/LessonCard.jsx"},{"name":"StoryText","sourcePath":"components/content/StoryText.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"GlowSurface","sourcePath":"components/core/GlowSurface.jsx"},{"name":"SoftTimer","sourcePath":"components/core/SoftTimer.jsx"},{"name":"StreakDots","sourcePath":"components/core/StreakDots.jsx"},{"name":"WordChip","sourcePath":"components/core/WordChip.jsx"},{"name":"ReflectionBox","sourcePath":"components/forms/ReflectionBox.jsx"},{"name":"TextInput","sourcePath":"components/forms/TextInput.jsx"}],"sourceHashes":{"components/content/LessonCard.jsx":"161d17764c41","components/content/StoryText.jsx":"46c79b481b1d","components/core/Button.jsx":"d4924524c076","components/core/GlowSurface.jsx":"aa595a684dba","components/core/SoftTimer.jsx":"bf8fd9dc383d","components/core/StreakDots.jsx":"c1cda3860572","components/core/WordChip.jsx":"7269f47d5b63","components/forms/ReflectionBox.jsx":"ba4e51127983","components/forms/TextInput.jsx":"e720a1446733","ui_kits/app-v1/HomeScreenV1.jsx":"c1da007be7e3","ui_kits/app-v1/LessonScreenV1.jsx":"30a0d9dd5f47","ui_kits/app-v1/OneWordStoryScreenV1.jsx":"4f846bc9be5d","ui_kits/app-v1/ReflectionScreenV1.jsx":"9c4c91884a51","ui_kits/app-v1/WordAssociationScreenV1.jsx":"ae71767dfe52","ui_kits/app-v2/HomeScreenV2.jsx":"9857f76fc953","ui_kits/app-v2/LessonScreenV2.jsx":"96b07342261f","ui_kits/app-v2/OneWordStoryScreenV2.jsx":"693e9a8523b2","ui_kits/app-v2/ReflectionScreenV2.jsx":"45b612a1176c","ui_kits/app-v2/WordAssociationScreenV2.jsx":"f9e7a291dc21","ui_kits/app/HomeScreen.jsx":"aeb10725e689","ui_kits/app/LessonScreen.jsx":"483f4ba95c88","ui_kits/app/OneWordStoryScreen.jsx":"0b8cc946ee9b","ui_kits/app/ReflectionScreen.jsx":"a92ea96f8fa4","ui_kits/app/WordAssociationScreen.jsx":"8a1a2eb713a0"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CandoriDesignSystem_46536d = window.CandoriDesignSystem_46536d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/LessonCard.jsx
try { (() => {
function LessonCard({
  kicker = 'Today',
  text,
  children,
  style
}) {
  return React.createElement('div', {
    style: {
      background: 'var(--surface-card)',
      border: 'var(--border-card)',
      borderRadius: 'var(--radius-l)',
      boxShadow: 'var(--shadow-card)',
      padding: '32px 28px',
      maxWidth: 'var(--measure)',
      ...style
    }
  }, React.createElement('div', {
    style: {
      font: 'var(--type-meta)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)',
      marginBottom: '16px'
    }
  }, kicker), React.createElement('div', {
    style: {
      font: 'var(--type-provocation)',
      color: 'var(--text-body)'
    }
  }, text || children));
}
Object.assign(__ds_scope, { LessonCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/LessonCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  variant = 'primary',
  size = 'md',
  disabled,
  children,
  onClick,
  style
}) {
  const pad = size === 'lg' ? '14px 28px' : '10px 22px';
  const base = {
    font: 'var(--type-label)',
    fontFamily: 'var(--font-sans)',
    border: 'none',
    cursor: disabled ? 'default' : 'pointer',
    borderRadius: 'var(--radius-pill)',
    padding: pad,
    opacity: disabled ? 0.45 : 1,
    transition: 'background var(--dur-quick) var(--ease-calm), color var(--dur-quick) var(--ease-calm)',
    background: 'transparent',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  };
  const variants = {
    primary: {
      background: 'var(--sage-deep)',
      color: '#FCF9F2'
    },
    quiet: {
      background: 'var(--sage-tint)',
      color: 'var(--sage-deep)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--sage-deep)',
      padding: size === 'lg' ? '14px 8px' : '10px 8px'
    }
  };
  const [hover, setHover] = React.useState(false);
  const hoverStyles = {
    primary: {
      background: '#55644C'
    },
    quiet: {
      background: 'var(--sage-faint)'
    },
    ghost: {
      color: '#55644C'
    }
  };
  return React.createElement('button', {
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...variants[variant],
      ...(hover && !disabled ? hoverStyles[variant] : {}),
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/GlowSurface.jsx
try { (() => {
function lerp(a, b, t) {
  return Math.round(a + (b - a) * t);
}
function mix(c1, c2, t) {
  const p = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const [r1, g1, b1] = p(c1),
    [r2, g2, b2] = p(c2);
  return 'rgb(' + lerp(r1, r2, t) + ',' + lerp(g1, g2, t) + ',' + lerp(b1, b2, t) + ')';
}
function GlowSurface({
  heat = 0,
  children,
  radius = 'var(--radius-l)',
  style
}) {
  const h = Math.max(0, Math.min(1, heat));
  const color = h < 0.5 ? mix('#E7CD9B', '#ECA84F', h * 2) : mix('#ECA84F', '#E86A3C', (h - 0.5) * 2);
  const bg = h < 0.5 ? mix('#FCF9F2', '#FDF6E9', h * 2) : mix('#FDF6E9', '#FDF1E4', (h - 0.5) * 2);
  return React.createElement('div', {
    style: {
      background: bg,
      borderRadius: radius,
      border: 'var(--border-card)',
      boxShadow: h < 0.02 ? 'var(--shadow-card)' : '0 0 ' + (20 + 50 * h) + 'px ' + 12 * h + 'px ' + color.replace('rgb', 'rgba').replace(')', ',' + (0.25 + 0.35 * h) + ')'),
      transition: 'background var(--dur-glow) var(--ease-calm), box-shadow var(--dur-glow) var(--ease-calm)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { GlowSurface });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/GlowSurface.jsx", error: String((e && e.message) || e) }); }

// components/core/SoftTimer.jsx
try { (() => {
function SoftTimer({
  progress = 0,
  label = 'Don\u2019t think. Type.',
  style
}) {
  const p = Math.max(0, Math.min(1, progress));
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      ...style
    }
  }, React.createElement('span', {
    style: {
      font: 'var(--type-meta)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)'
    }
  }, label), React.createElement('div', {
    style: {
      height: '3px',
      borderRadius: '2px',
      background: 'var(--parchment-deep)',
      overflow: 'hidden'
    }
  }, React.createElement('div', {
    style: {
      height: '100%',
      width: p * 100 + '%',
      borderRadius: '2px',
      background: p > 0.66 ? 'var(--glow-coral)' : p > 0.33 ? 'var(--glow-amber)' : 'var(--glow-sand)',
      transition: 'width var(--dur-soft) var(--ease-calm), background var(--dur-glow) var(--ease-calm)'
    }
  })));
}
Object.assign(__ds_scope, { SoftTimer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SoftTimer.jsx", error: String((e && e.message) || e) }); }

// components/core/StreakDots.jsx
try { (() => {
function StreakDots({
  day = 1,
  week = [true, true, true, true, true, true, true],
  style
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      ...style
    }
  }, React.createElement('span', {
    style: {
      font: 'var(--type-meta)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)'
    }
  }, 'Day ' + day), React.createElement('div', {
    style: {
      display: 'flex',
      gap: '6px'
    }
  }, week.slice(0, 7).map((done, i) => React.createElement('span', {
    key: i,
    style: {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: done ? 'var(--sage)' : 'transparent',
      border: '1px solid ' + (done ? 'var(--sage)' : 'var(--hairline)')
    }
  }))));
}
Object.assign(__ds_scope, { StreakDots });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StreakDots.jsx", error: String((e && e.message) || e) }); }

// components/core/WordChip.jsx
try { (() => {
function WordChip({
  word,
  by = 'user',
  pending,
  style
}) {
  return React.createElement('span', {
    style: {
      font: 'var(--type-story)',
      color: pending ? 'var(--text-meta)' : by === 'ai' ? '#C05A32' : 'var(--sage-deep)',
      opacity: pending ? 0.6 : 1,
      transition: 'opacity var(--dur-soft) var(--ease-calm)',
      ...style
    }
  }, word);
}
Object.assign(__ds_scope, { WordChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/WordChip.jsx", error: String((e && e.message) || e) }); }

// components/content/StoryText.jsx
try { (() => {
function StoryText({
  words = [],
  cursor,
  style
}) {
  return React.createElement('div', {
    style: {
      font: 'var(--type-story)',
      maxWidth: 'var(--measure)',
      lineHeight: 1.7,
      ...style
    }
  }, words.map((w, i) => React.createElement(React.Fragment, {
    key: i
  }, React.createElement(__ds_scope.WordChip, {
    word: w.text,
    by: w.by,
    pending: w.pending
  }), i < words.length - 1 ? ' ' : null)), cursor ? React.createElement('span', {
    style: {
      color: 'var(--glow-amber)',
      animation: 'none',
      opacity: 0.7
    }
  }, ' \u258F') : null);
}
Object.assign(__ds_scope, { StoryText });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/StoryText.jsx", error: String((e && e.message) || e) }); }

// components/forms/ReflectionBox.jsx
try { (() => {
function ReflectionBox({
  prompt = 'What surprised you?',
  value,
  onChange,
  style
}) {
  const [focus, setFocus] = React.useState(false);
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      ...style
    }
  }, React.createElement('div', {
    style: {
      font: 'var(--type-provocation)',
      color: 'var(--text-body)'
    }
  }, prompt), React.createElement('textarea', {
    value,
    rows: 4,
    placeholder: 'Yours alone. Never read, never graded.',
    onChange: e => onChange && onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      font: 'var(--type-body)',
      fontFamily: 'var(--font-sans)',
      color: 'var(--text-body)',
      background: 'var(--surface-card)',
      border: '1px solid ' + (focus ? 'var(--sage)' : 'var(--hairline)'),
      borderRadius: 'var(--radius-m)',
      outline: 'none',
      padding: '14px 16px',
      resize: 'vertical',
      transition: 'border-color var(--dur-quick) var(--ease-calm)'
    }
  }));
}
Object.assign(__ds_scope, { ReflectionBox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/ReflectionBox.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextInput.jsx
try { (() => {
function TextInput({
  value,
  onChange,
  onSubmit,
  placeholder,
  autoFocus,
  style
}) {
  const [focus, setFocus] = React.useState(false);
  return React.createElement('input', {
    value,
    autoFocus,
    placeholder,
    onChange: e => onChange && onChange(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Enter' && onSubmit) onSubmit(e.target.value);
    },
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      font: 'var(--type-story)',
      fontFamily: 'var(--font-sans)',
      color: 'var(--text-body)',
      background: 'transparent',
      border: 'none',
      borderBottom: '1px solid ' + (focus ? 'var(--sage)' : 'var(--hairline)'),
      outline: 'none',
      padding: '8px 2px',
      width: '100%',
      boxSizing: 'border-box',
      caretColor: 'var(--glow-amber)',
      transition: 'border-color var(--dur-quick) var(--ease-calm)',
      ...style
    }
  });
}
Object.assign(__ds_scope, { TextInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextInput.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app-v1/HomeScreenV1.jsx
try { (() => {
const {
  Button,
  StreakDots,
  LessonCard
} = window.CandoriDesignSystem_46536d;
function HomeScreenV1({
  onBegin
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '28px 0 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 20px/1 var(--font-sans)',
      letterSpacing: '-0.01em',
      color: 'var(--ink)'
    }
  }, "candori"), /*#__PURE__*/React.createElement(StreakDots, {
    day: 12,
    week: [true, true, false, true, true, true, true]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 32,
      padding: '48px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-display)',
      letterSpacing: 'var(--tracking-display)',
      color: 'var(--ink)'
    }
  }, "Five minutes.", /*#__PURE__*/React.createElement("br", null), "No script."), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-secondary)',
      maxWidth: '26rem'
    }
  }, "Yesterday you wrote a story about a lighthouse keeper who hated the sea. Today is blank.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 0 40px'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onBegin,
    style: {
      width: '100%',
      justifyContent: 'center'
    }
  }, "Begin today\u2019s session")));
}
window.HomeScreenV1 = HomeScreenV1;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app-v1/HomeScreenV1.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app-v1/LessonScreenV1.jsx
try { (() => {
const {
  Button,
  LessonCard
} = window.CandoriDesignSystem_46536d;
const LESSONS = [{
  kicker: 'Presence',
  text: 'Politeness is a script. You already know your next three lines. So does everyone else. Say the fourth one instead.'
}, {
  kicker: 'Yes, and',
  text: 'Accepting what came before is not agreeing with it. It is refusing to pretend it did not happen. Conversations die of pretending.'
}, {
  kicker: 'The editor',
  text: 'The inner editor is not protecting you from saying something stupid. It is protecting you from saying something true. Those feel identical from the inside.'
}, {
  kicker: 'Outcome',
  text: 'You cannot control how a sentence lands. You can only control whether it was yours. Aim for the second thing.'
}, {
  kicker: 'Attention',
  text: 'Interesting people are not the ones with better material. They are the ones who noticed what everyone else skipped. Notice the skipped thing.'
}];
function LessonScreenV1({
  index = 0,
  onContinue
}) {
  const lesson = LESSONS[index % LESSONS.length];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 0 0',
      font: 'var(--type-meta)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)'
    }
  }, "Today \xB7 1 of 3"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      placeItems: 'center',
      padding: '32px 0'
    }
  }, /*#__PURE__*/React.createElement(LessonCard, {
    kicker: lesson.kicker,
    text: lesson.text
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 0 40px',
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "quiet",
    onClick: onContinue
  }, "Continue")));
}
window.LessonScreenV1 = LessonScreenV1;
window.CANDORI_LESSONS = LESSONS;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app-v1/LessonScreenV1.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app-v1/OneWordStoryScreenV1.jsx
try { (() => {
const {
  Button,
  GlowSurface,
  StoryText,
  TextInput
} = window.CandoriDesignSystem_46536d;
const AI_STORY = ['keeper', 'collected', 'forgotten', 'umbrellas', 'because', 'rain', 'remembered', 'names', 'nobody', 'else', 'kept', 'saying', 'aloud', 'until', 'the', 'sea', 'finally', 'answered', 'back', 'softly'];
function OneWordStoryScreenV1({
  onContinue
}) {
  const [words, setWords] = React.useState([{
    text: 'The',
    by: 'ai'
  }]);
  const [input, setInput] = React.useState('');
  const [heat, setHeat] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const aiIdx = React.useRef(0);
  const type = v => {
    setInput(v.replace(/\s.*$/, ''));
    setHeat(h => Math.min(1, h + 0.08));
  };
  const submit = () => {
    const w = input.trim();
    if (!w || done) return;
    const next = [...words, {
      text: w,
      by: 'user'
    }];
    if (aiIdx.current < AI_STORY.length) {
      next.push({
        text: AI_STORY[aiIdx.current],
        by: 'ai'
      });
      aiIdx.current += 1;
    }
    setWords(next);
    setInput('');
    if (next.length >= 24 || w === '.') setDone(true);
  };
  React.useEffect(() => {
    const t = setInterval(() => setHeat(h => Math.max(0, h - 0.04)), 1000);
    return () => clearInterval(t);
  }, []);
  if (done) return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 0 0',
      font: 'var(--type-meta)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)'
    }
  }, "Your story \xB7 today"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      placeItems: 'center',
      padding: '24px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-raised)',
      border: 'var(--border-card)',
      borderRadius: 'var(--radius-l)',
      boxShadow: 'var(--shadow-raised)',
      padding: '36px 30px',
      width: '100%',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-story)',
      lineHeight: 1.65,
      color: 'var(--ink)'
    }
  }, words.map(w => w.text).join(' ')), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      paddingTop: 16,
      borderTop: '1px solid var(--hairline)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 15px/1 var(--font-sans)',
      color: 'var(--ink)'
    }
  }, "candori"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-meta)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)'
    }
  }, "a one-word story")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 0 40px',
      display: 'flex',
      gap: 12,
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost"
  }, "Share"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onContinue
  }, "One more thing")));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 0 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-meta)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)'
    }
  }, "One-word story \xB7 3 of 3"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-meta)',
      color: 'var(--text-meta)'
    }
  }, words.length, " / 24")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '32px 0',
      display: 'grid',
      alignContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(StoryText, {
    words: words,
    cursor: true
  })), /*#__PURE__*/React.createElement(GlowSurface, {
    heat: heat,
    style: {
      padding: '18px 20px',
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    placeholder: "one word",
    value: input,
    onChange: type,
    onSubmit: submit,
    autoFocus: true
  })));
}
window.OneWordStoryScreenV1 = OneWordStoryScreenV1;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app-v1/OneWordStoryScreenV1.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app-v1/ReflectionScreenV1.jsx
try { (() => {
const {
  Button,
  ReflectionBox,
  StreakDots
} = window.CandoriDesignSystem_46536d;
function ReflectionScreenV1({
  onDone
}) {
  const [v, setV] = React.useState('');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 0 0',
      font: 'var(--type-meta)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)'
    }
  }, "Before you go"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      alignContent: 'center',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement(ReflectionBox, {
    prompt: "What did you avoid?",
    value: v,
    onChange: setV
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 0 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(StreakDots, {
    day: 13,
    week: [true, false, true, true, true, true, true]
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onDone
  }, "Done for today")));
}
window.ReflectionScreenV1 = ReflectionScreenV1;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app-v1/ReflectionScreenV1.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app-v1/WordAssociationScreenV1.jsx
try { (() => {
const {
  Button,
  GlowSurface,
  SoftTimer,
  TextInput
} = window.CandoriDesignSystem_46536d;
const AI_WORDS = ['lantern', 'moth', 'static', 'harvest', 'ivory', 'undertow', 'matchbox', 'vertigo', 'cellar', 'plume', 'circuit', 'fable'];
function WordAssociationScreenV1({
  onContinue
}) {
  const [current, setCurrent] = React.useState({
    text: 'river',
    by: 'ai',
    key: 0
  });
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
  React.useEffect(() => {
    armFade();
    return () => clearTimeout(fadeTimer.current);
  }, []);
  React.useEffect(() => {
    const t = setInterval(() => {
      setProgress(p => Math.min(1, p + 1 / 90));
      setHeat(h => Date.now() - lastType.current > 2500 ? Math.max(0, h - 0.06) : h);
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const type = v => {
    setInput(v);
    lastType.current = Date.now();
    setHeat(h => Math.min(1, h + 0.07));
  };
  const submit = () => {
    const w = input.trim();
    if (!w || waiting) return;
    setCurrent(c => ({
      text: w,
      by: 'user',
      key: c.key + 1
    }));
    armFade();
    setInput('');
    setWaiting(true);
    setTimeout(() => {
      setCurrent(c => ({
        text: AI_WORDS[Math.floor(Math.random() * AI_WORDS.length)],
        by: 'ai',
        key: c.key + 1
      }));
      armFade();
      setWaiting(false);
    }, 500);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 0 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-meta)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)'
    }
  }, "Word association \xB7 2 of 3")), /*#__PURE__*/React.createElement(SoftTimer, {
    progress: progress,
    style: {
      marginTop: 20
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      placeItems: 'center',
      padding: '28px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    key: current.key,
    style: {
      position: 'relative',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      width: 180,
      height: 180,
      borderRadius: '50%',
      background: 'radial-gradient(circle, ' + (current.by === 'ai' ? 'rgba(232,106,60,0.28)' : 'rgba(236,168,79,0.30)') + ' 0%, rgba(236,168,79,0) 70%)',
      opacity: faded ? 0 : 1,
      transition: 'opacity 6s var(--ease-calm)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      font: '400 2.25rem/1.3 var(--font-sans)',
      color: current.by === 'ai' ? '#C05A32' : 'var(--sage-deep)',
      opacity: faded ? 0.18 : 1,
      transition: 'opacity 6s var(--ease-calm)'
    }
  }, current.text))), /*#__PURE__*/React.createElement(GlowSurface, {
    heat: heat,
    style: {
      padding: '18px 20px',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    placeholder: "whatever comes",
    value: input,
    onChange: type,
    onSubmit: submit,
    autoFocus: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 0 40px',
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "quiet",
    onClick: onContinue
  }, "Done here")));
}
window.WordAssociationScreenV1 = WordAssociationScreenV1;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app-v1/WordAssociationScreenV1.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app-v2/HomeScreenV2.jsx
try { (() => {
const {
  Button,
  StreakDots,
  LessonCard
} = window.CandoriDesignSystem_46536d;
function HomeScreenV2({
  onBegin
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '28px 0 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 20px/1 var(--font-sans)',
      letterSpacing: '-0.01em',
      color: 'var(--ink)'
    }
  }, "candori"), /*#__PURE__*/React.createElement(StreakDots, {
    day: 12,
    week: [true, true, false, true, true, true, true]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 32,
      padding: '48px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-display)',
      letterSpacing: 'var(--tracking-display)',
      color: 'var(--ink)'
    }
  }, "Five minutes.", /*#__PURE__*/React.createElement("br", null), "No script."), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-secondary)',
      maxWidth: '26rem'
    }
  }, "Yesterday you wrote a story about a lighthouse keeper who hated the sea. Today is blank.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 0 40px'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onBegin,
    style: {
      width: '100%',
      justifyContent: 'center'
    }
  }, "Begin today\u2019s session")));
}
window.HomeScreenV2 = HomeScreenV2;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app-v2/HomeScreenV2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app-v2/LessonScreenV2.jsx
try { (() => {
const {
  Button,
  LessonCard
} = window.CandoriDesignSystem_46536d;
const LESSONS = [{
  kicker: 'Presence',
  text: 'Politeness is a script. You already know your next three lines. So does everyone else. Say the fourth one instead.'
}, {
  kicker: 'Yes, and',
  text: 'Accepting what came before is not agreeing with it. It is refusing to pretend it did not happen. Conversations die of pretending.'
}, {
  kicker: 'The editor',
  text: 'The inner editor is not protecting you from saying something stupid. It is protecting you from saying something true. Those feel identical from the inside.'
}, {
  kicker: 'Outcome',
  text: 'You cannot control how a sentence lands. You can only control whether it was yours. Aim for the second thing.'
}, {
  kicker: 'Attention',
  text: 'Interesting people are not the ones with better material. They are the ones who noticed what everyone else skipped. Notice the skipped thing.'
}];
function LessonScreenV2({
  index = 0,
  onContinue
}) {
  const lesson = LESSONS[index % LESSONS.length];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 0 0',
      font: 'var(--type-meta)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)'
    }
  }, "Today \xB7 1 of 3"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      placeItems: 'center',
      padding: '32px 0'
    }
  }, /*#__PURE__*/React.createElement(LessonCard, {
    kicker: lesson.kicker,
    text: lesson.text
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 0 40px',
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "quiet",
    onClick: onContinue
  }, "Continue")));
}
window.LessonScreenV2 = LessonScreenV2;
window.CANDORI_LESSONS = LESSONS;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app-v2/LessonScreenV2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app-v2/OneWordStoryScreenV2.jsx
try { (() => {
const {
  Button,
  GlowSurface,
  StoryText,
  TextInput
} = window.CandoriDesignSystem_46536d;
const AI_STORY = ['keeper', 'collected', 'forgotten', 'umbrellas', 'because', 'rain', 'remembered', 'names', 'nobody', 'else', 'kept', 'saying', 'aloud', 'until', 'the', 'sea', 'finally', 'answered', 'back', 'softly'];
function OneWordStoryScreenV2({
  onContinue
}) {
  const [words, setWords] = React.useState([{
    text: 'The',
    by: 'ai'
  }]);
  const [input, setInput] = React.useState('');
  const [heat, setHeat] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const aiIdx = React.useRef(0);
  const type = v => {
    setInput(v.replace(/\s.*$/, ''));
    setHeat(h => Math.min(1, h + 0.08));
  };
  const submit = () => {
    const w = input.trim();
    if (!w || done) return;
    const next = [...words, {
      text: w,
      by: 'user'
    }];
    if (aiIdx.current < AI_STORY.length) {
      next.push({
        text: AI_STORY[aiIdx.current],
        by: 'ai'
      });
      aiIdx.current += 1;
    }
    setWords(next);
    setInput('');
    if (next.length >= 24 || w === '.') setDone(true);
  };
  React.useEffect(() => {
    const t = setInterval(() => setHeat(h => Math.max(0, h - 0.04)), 1000);
    return () => clearInterval(t);
  }, []);
  if (done) return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 0 0',
      font: 'var(--type-meta)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)'
    }
  }, "Your story \xB7 today"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      placeItems: 'center',
      padding: '24px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-raised)',
      border: 'var(--border-card)',
      borderRadius: 'var(--radius-l)',
      boxShadow: 'var(--shadow-raised)',
      padding: '36px 30px',
      width: '100%',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-story)',
      lineHeight: 1.65,
      color: 'var(--ink)'
    }
  }, words.map(w => w.text).join(' ')), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      paddingTop: 16,
      borderTop: '1px solid var(--hairline)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 15px/1 var(--font-sans)',
      color: 'var(--ink)'
    }
  }, "candori"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-meta)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)'
    }
  }, "a one-word story")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 0 40px',
      display: 'flex',
      gap: 12,
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost"
  }, "Share"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onContinue
  }, "One more thing")));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 0 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-meta)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)'
    }
  }, "One-word story \xB7 3 of 3"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-meta)',
      color: 'var(--text-meta)'
    }
  }, words.length, " / 24")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '32px 0',
      display: 'grid',
      alignContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(StoryText, {
    words: words,
    cursor: true
  })), /*#__PURE__*/React.createElement(GlowSurface, {
    heat: heat,
    style: {
      padding: '18px 20px',
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    placeholder: "one word",
    value: input,
    onChange: type,
    onSubmit: submit,
    autoFocus: true
  })));
}
window.OneWordStoryScreenV2 = OneWordStoryScreenV2;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app-v2/OneWordStoryScreenV2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app-v2/ReflectionScreenV2.jsx
try { (() => {
const {
  Button,
  ReflectionBox,
  StreakDots
} = window.CandoriDesignSystem_46536d;
function ReflectionScreenV2({
  onDone
}) {
  const [v, setV] = React.useState('');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 0 0',
      font: 'var(--type-meta)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)'
    }
  }, "Before you go"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      alignContent: 'center',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement(ReflectionBox, {
    prompt: "What did you avoid?",
    value: v,
    onChange: setV
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 0 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(StreakDots, {
    day: 13,
    week: [true, false, true, true, true, true, true]
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onDone
  }, "Done for today")));
}
window.ReflectionScreenV2 = ReflectionScreenV2;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app-v2/ReflectionScreenV2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app-v2/WordAssociationScreenV2.jsx
try { (() => {
const {
  Button,
  SoftTimer,
  TextInput
} = window.CandoriDesignSystem_46536d;
const AI_WORDS = ['lantern', 'moth', 'static', 'harvest', 'ivory', 'undertow', 'matchbox', 'vertigo', 'cellar', 'plume', 'circuit', 'fable'];
const glowKeyframes = `
@keyframes blobDriftA{0%{transform:translate(-50%,-50%) scale(1,1)}33%{transform:translate(-56%,-46%) scale(1.12,0.92)}66%{transform:translate(-45%,-54%) scale(0.94,1.1)}100%{transform:translate(-50%,-50%) scale(1,1)}}
@keyframes blobDriftB{0%{transform:translate(-50%,-50%) scale(1,1)}40%{transform:translate(-44%,-53%) scale(1.08,0.9)}75%{transform:translate(-55%,-47%) scale(0.92,1.14)}100%{transform:translate(-50%,-50%) scale(1,1)}}
@keyframes blobDriftC{0%{transform:translate(-50%,-50%) scale(1,1)}50%{transform:translate(-47%,-56%) scale(1.15,1.02)}100%{transform:translate(-50%,-50%) scale(1,1)}}
`;
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function mixHex(c1, c2, t) {
  const p = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const [r1, g1, b1] = p(c1),
    [r2, g2, b2] = p(c2);
  return [Math.round(lerp(r1, r2, t)), Math.round(lerp(g1, g2, t)), Math.round(lerp(b1, b2, t))];
}
// Continuous sand -> amber -> coral ramp; alpha rises gently with heat
function glowColor(heat, alpha) {
  const [r, g, b] = heat < 0.5 ? mixHex('#E7CD9B', '#ECA84F', heat * 2) : mixHex('#ECA84F', '#E86A3C', (heat - 0.5) * 2);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha.toFixed(3) + ')';
}
function Blob({
  x,
  y,
  size,
  color,
  opacity,
  drift = 'blobDriftA',
  dur = '7s'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'radial-gradient(circle, ' + color + ' 0%, rgba(236,168,79,0) 68%)',
      opacity,
      transform: 'translate(-50%,-50%)',
      animation: drift + ' ' + dur + ' var(--ease-calm) infinite',
      transition: 'opacity 2.5s var(--ease-calm)'
    }
  });
}
function WordAssociationScreenV2({
  onContinue
}) {
  const [current, setCurrent] = React.useState({
    text: 'river',
    by: 'ai',
    key: 0
  });
  const [waiting, setWaiting] = React.useState(false);
  const [faded, setFaded] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [heat, setHeat] = React.useState(0); // smoothed 0..1, eases toward target
  const [bloom, setBloom] = React.useState(0); // slow accumulator 0..1 — sustained fast typing
  const [progress, setProgress] = React.useState(0);
  const target = React.useRef(0);
  const fadeTimer = React.useRef(null);
  const armFade = () => {
    clearTimeout(fadeTimer.current);
    setFaded(false);
    fadeTimer.current = setTimeout(() => setFaded(true), 600);
  };
  React.useEffect(() => {
    armFade();
    return () => clearTimeout(fadeTimer.current);
  }, []);
  React.useEffect(() => {
    // 120ms tick: heat eases toward target (fluid in time); target decays; bloom creeps
    const t = setInterval(() => {
      target.current = Math.max(0, target.current - 0.006);
      setHeat(h => h + (target.current - h) * 0.06);
      setBloom(b => {
        if (target.current > 0.55) return Math.min(1, b + 0.004); // very slow growth
        return Math.max(0, b - 0.0015); // even slower ebb
      });
    }, 120);
    const p = setInterval(() => setProgress(v => Math.min(1, v + 1 / 90)), 1000);
    return () => {
      clearInterval(t);
      clearInterval(p);
    };
  }, []);
  const type = v => {
    setInput(v);
    target.current = Math.min(1, target.current + 0.055);
  };
  const submit = () => {
    const w = input.trim();
    if (!w || waiting) return;
    setCurrent(c => ({
      text: w,
      by: 'user',
      key: c.key + 1
    }));
    armFade();
    setInput('');
    setWaiting(true);
    setTimeout(() => {
      setCurrent(c => ({
        text: AI_WORDS[Math.floor(Math.random() * AI_WORDS.length)],
        by: 'ai',
        key: c.key + 1
      }));
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
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      padding: '0 24px',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("style", null, glowKeyframes), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      filter: 'blur(18px)'
    }
  }, /*#__PURE__*/React.createElement(Blob, {
    x: "50%",
    y: "44%",
    size: wordSize,
    color: warm(0.30 + 0.1 * heat),
    opacity: wordGlowOpacity,
    drift: "blobDriftA",
    dur: "7s"
  }), /*#__PURE__*/React.createElement(Blob, {
    x: "46%",
    y: "47%",
    size: wordSize * 0.7,
    color: warm(0.26),
    opacity: wordGlowOpacity * 0.7,
    drift: "blobDriftC",
    dur: "9s"
  }), /*#__PURE__*/React.createElement(Blob, {
    x: "50%",
    y: "82%",
    size: inputSize,
    color: warm(0.28 + 0.1 * heat),
    opacity: 0.35 + heat * 0.65,
    drift: "blobDriftB",
    dur: "8s"
  }), /*#__PURE__*/React.createElement(Blob, {
    x: "56%",
    y: "79%",
    size: inputSize * 0.65,
    color: warm(0.24),
    opacity: (0.35 + heat * 0.65) * 0.7,
    drift: "blobDriftA",
    dur: "11s"
  }), /*#__PURE__*/React.createElement(Blob, {
    x: "50%",
    y: "63%",
    size: 120 + bridge * 560,
    color: warm(0.26),
    opacity: Math.min(1, bridge * 1.4),
    drift: "blobDriftC",
    dur: "6s"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 0 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-meta)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)'
    }
  }, "Word association \xB7 2 of 3")), /*#__PURE__*/React.createElement(SoftTimer, {
    progress: progress,
    style: {
      marginTop: 20,
      position: 'relative'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      placeItems: 'center',
      padding: '28px 0',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    key: current.key,
    style: {
      font: '400 2.25rem/1.3 var(--font-sans)',
      color: current.by === 'ai' ? '#C05A32' : 'var(--sage-deep)',
      opacity: faded ? 0.18 : 1,
      transition: 'opacity 6s var(--ease-calm)'
    }
  }, current.text)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: '18px 20px',
      marginBottom: 16,
      borderRadius: 'var(--radius-l)',
      border: '1px solid rgba(88,72,50,0.10)',
      background: 'rgba(252,249,242,0.45)'
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    placeholder: "whatever comes",
    value: input,
    onChange: type,
    onSubmit: submit,
    autoFocus: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 0 40px',
      display: 'flex',
      justifyContent: 'flex-end',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "quiet",
    onClick: onContinue
  }, "Done here")));
}
window.WordAssociationScreenV2 = WordAssociationScreenV2;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app-v2/WordAssociationScreenV2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/HomeScreen.jsx
try { (() => {
const {
  Button,
  StreakDots,
  LessonCard
} = window.CandoriDesignSystem_46536d;
function HomeScreen({
  onBegin
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '28px 0 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 20px/1 var(--font-sans)',
      letterSpacing: '-0.01em',
      color: 'var(--ink)'
    }
  }, "candori"), /*#__PURE__*/React.createElement(StreakDots, {
    day: 12,
    week: [true, true, false, true, true, true, true]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 32,
      padding: '48px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-display)',
      letterSpacing: 'var(--tracking-display)',
      color: 'var(--ink)'
    }
  }, "Five minutes.", /*#__PURE__*/React.createElement("br", null), "No script."), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-secondary)',
      maxWidth: '26rem'
    }
  }, "Yesterday you wrote a story about a lighthouse keeper who hated the sea. Today is blank.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 0 40px'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onBegin,
    style: {
      width: '100%',
      justifyContent: 'center'
    }
  }, "Begin today\u2019s session")));
}
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/LessonScreen.jsx
try { (() => {
const {
  Button,
  LessonCard
} = window.CandoriDesignSystem_46536d;
const LESSONS = [{
  kicker: 'Presence',
  text: 'Politeness is a script. You already know your next three lines. So does everyone else. Say the fourth one instead.'
}, {
  kicker: 'Yes, and',
  text: 'Accepting what came before is not agreeing with it. It is refusing to pretend it did not happen. Conversations die of pretending.'
}, {
  kicker: 'The editor',
  text: 'The inner editor is not protecting you from saying something stupid. It is protecting you from saying something true. Those feel identical from the inside.'
}, {
  kicker: 'Outcome',
  text: 'You cannot control how a sentence lands. You can only control whether it was yours. Aim for the second thing.'
}, {
  kicker: 'Attention',
  text: 'Interesting people are not the ones with better material. They are the ones who noticed what everyone else skipped. Notice the skipped thing.'
}];
function LessonScreen({
  index = 0,
  onContinue
}) {
  const lesson = LESSONS[index % LESSONS.length];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 0 0',
      font: 'var(--type-meta)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)'
    }
  }, "Today \xB7 1 of 3"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      placeItems: 'center',
      padding: '32px 0'
    }
  }, /*#__PURE__*/React.createElement(LessonCard, {
    kicker: lesson.kicker,
    text: lesson.text
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 0 40px',
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "quiet",
    onClick: onContinue
  }, "Continue")));
}
window.LessonScreen = LessonScreen;
window.CANDORI_LESSONS = LESSONS;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/LessonScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/OneWordStoryScreen.jsx
try { (() => {
const {
  Button,
  GlowSurface,
  StoryText,
  TextInput
} = window.CandoriDesignSystem_46536d;
const AI_STORY = ['keeper', 'collected', 'forgotten', 'umbrellas', 'because', 'rain', 'remembered', 'names', 'nobody', 'else', 'kept', 'saying', 'aloud', 'until', 'the', 'sea', 'finally', 'answered', 'back', 'softly'];
function OneWordStoryScreen({
  onContinue
}) {
  const [words, setWords] = React.useState([{
    text: 'The',
    by: 'ai'
  }]);
  const [input, setInput] = React.useState('');
  const [heat, setHeat] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const aiIdx = React.useRef(0);
  const type = v => {
    setInput(v.replace(/\s.*$/, ''));
    setHeat(h => Math.min(1, h + 0.08));
  };
  const submit = () => {
    const w = input.trim();
    if (!w || done) return;
    const next = [...words, {
      text: w,
      by: 'user'
    }];
    if (aiIdx.current < AI_STORY.length) {
      next.push({
        text: AI_STORY[aiIdx.current],
        by: 'ai'
      });
      aiIdx.current += 1;
    }
    setWords(next);
    setInput('');
    if (next.length >= 24 || w === '.') setDone(true);
  };
  React.useEffect(() => {
    const t = setInterval(() => setHeat(h => Math.max(0, h - 0.04)), 1000);
    return () => clearInterval(t);
  }, []);
  if (done) return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 0 0',
      font: 'var(--type-meta)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)'
    }
  }, "Your story \xB7 today"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      placeItems: 'center',
      padding: '24px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-raised)',
      border: 'var(--border-card)',
      borderRadius: 'var(--radius-l)',
      boxShadow: 'var(--shadow-raised)',
      padding: '36px 30px',
      width: '100%',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-story)',
      lineHeight: 1.65,
      color: 'var(--ink)'
    }
  }, words.map(w => w.text).join(' ')), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      paddingTop: 16,
      borderTop: '1px solid var(--hairline)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 15px/1 var(--font-sans)',
      color: 'var(--ink)'
    }
  }, "candori"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-meta)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)'
    }
  }, "a one-word story")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 0 40px',
      display: 'flex',
      gap: 12,
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost"
  }, "Share"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onContinue
  }, "One more thing")));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 0 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-meta)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)'
    }
  }, "One-word story \xB7 3 of 3"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-meta)',
      color: 'var(--text-meta)'
    }
  }, words.length, " / 24")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '32px 0',
      display: 'grid',
      alignContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(StoryText, {
    words: words,
    cursor: true
  })), /*#__PURE__*/React.createElement(GlowSurface, {
    heat: heat,
    style: {
      padding: '18px 20px',
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    placeholder: "one word",
    value: input,
    onChange: type,
    onSubmit: submit,
    autoFocus: true
  })));
}
window.OneWordStoryScreen = OneWordStoryScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/OneWordStoryScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/ReflectionScreen.jsx
try { (() => {
const {
  Button,
  ReflectionBox,
  StreakDots
} = window.CandoriDesignSystem_46536d;
function ReflectionScreen({
  onDone
}) {
  const [v, setV] = React.useState('');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 0 0',
      font: 'var(--type-meta)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)'
    }
  }, "Before you go"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      alignContent: 'center',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement(ReflectionBox, {
    prompt: "What did you avoid?",
    value: v,
    onChange: setV
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 0 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(StreakDots, {
    day: 13,
    week: [true, false, true, true, true, true, true]
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onDone
  }, "Done for today")));
}
window.ReflectionScreen = ReflectionScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/ReflectionScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/WordAssociationScreen.jsx
try { (() => {
const {
  Button,
  SoftTimer,
  TextInput
} = window.CandoriDesignSystem_46536d;
const AI_WORDS = ['lantern', 'moth', 'static', 'harvest', 'ivory', 'undertow', 'matchbox', 'vertigo', 'cellar', 'plume', 'circuit', 'fable'];
const glowKeyframes = `
@keyframes blobDriftA{0%{transform:translate(-50%,-50%) scale(1,1)}33%{transform:translate(-56%,-46%) scale(1.12,0.92)}66%{transform:translate(-45%,-54%) scale(0.94,1.1)}100%{transform:translate(-50%,-50%) scale(1,1)}}
@keyframes blobDriftB{0%{transform:translate(-50%,-50%) scale(1,1)}40%{transform:translate(-44%,-53%) scale(1.08,0.9)}75%{transform:translate(-55%,-47%) scale(0.92,1.14)}100%{transform:translate(-50%,-50%) scale(1,1)}}
@keyframes blobDriftC{0%{transform:translate(-50%,-50%) scale(1,1)}50%{transform:translate(-47%,-56%) scale(1.15,1.02)}100%{transform:translate(-50%,-50%) scale(1,1)}}
`;
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function mixHex(c1, c2, t) {
  const p = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const [r1, g1, b1] = p(c1),
    [r2, g2, b2] = p(c2);
  return [Math.round(lerp(r1, r2, t)), Math.round(lerp(g1, g2, t)), Math.round(lerp(b1, b2, t))];
}
// Continuous sand -> amber -> coral ramp; alpha rises gently with heat
function glowColor(heat, alpha) {
  const [r, g, b] = heat < 0.5 ? mixHex('#E7CD9B', '#ECA84F', heat * 2) : mixHex('#ECA84F', '#E86A3C', (heat - 0.5) * 2);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha.toFixed(3) + ')';
}
function Blob({
  x,
  y,
  size,
  color,
  opacity,
  drift = 'blobDriftA',
  dur = '7s'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'radial-gradient(circle, ' + color + ' 0%, rgba(236,168,79,0) 68%)',
      opacity,
      transform: 'translate(-50%,-50%)',
      animation: drift + ' ' + dur + ' var(--ease-calm) infinite',
      transition: 'opacity 2.5s var(--ease-calm)'
    }
  });
}
function WordAssociationScreen({
  onContinue
}) {
  const [current, setCurrent] = React.useState({
    text: 'river',
    by: 'ai',
    key: 0
  });
  const [waiting, setWaiting] = React.useState(false);
  const [faded, setFaded] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [heat, setHeat] = React.useState(0); // smoothed 0..1, eases toward target
  const [bloom, setBloom] = React.useState(0); // slow accumulator 0..1 — sustained fast typing
  const [progress, setProgress] = React.useState(0);
  const target = React.useRef(0);
  const fadeTimer = React.useRef(null);
  const armFade = () => {
    clearTimeout(fadeTimer.current);
    setFaded(false);
    fadeTimer.current = setTimeout(() => setFaded(true), 600);
  };
  React.useEffect(() => {
    armFade();
    return () => clearTimeout(fadeTimer.current);
  }, []);
  React.useEffect(() => {
    // 120ms tick: heat eases toward target (fluid in time); target decays; bloom creeps
    const t = setInterval(() => {
      target.current = Math.max(0, target.current - 0.006);
      setHeat(h => h + (target.current - h) * 0.06);
      setBloom(b => {
        if (target.current > 0.55) return Math.min(1, b + 0.004); // very slow growth
        return Math.max(0, b - 0.0015); // even slower ebb
      });
    }, 120);
    const p = setInterval(() => setProgress(v => Math.min(1, v + 1 / 90)), 1000);
    return () => {
      clearInterval(t);
      clearInterval(p);
    };
  }, []);
  const type = v => {
    setInput(v);
    target.current = Math.min(1, target.current + 0.055);
  };
  const submit = () => {
    const w = input.trim();
    if (!w || waiting) return;
    setCurrent(c => ({
      text: w,
      by: 'user',
      key: c.key + 1
    }));
    armFade();
    setInput('');
    setWaiting(true);
    setTimeout(() => {
      setCurrent(c => ({
        text: AI_WORDS[Math.floor(Math.random() * AI_WORDS.length)],
        by: 'ai',
        key: c.key + 1
      }));
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
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100%',
      padding: '0 24px',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("style", null, glowKeyframes), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      filter: 'blur(18px)'
    }
  }, /*#__PURE__*/React.createElement(Blob, {
    x: "50%",
    y: "44%",
    size: wordSize,
    color: warm(0.30 + 0.1 * heat),
    opacity: wordGlowOpacity,
    drift: "blobDriftA",
    dur: "7s"
  }), /*#__PURE__*/React.createElement(Blob, {
    x: "46%",
    y: "47%",
    size: wordSize * 0.7,
    color: warm(0.26),
    opacity: wordGlowOpacity * 0.7,
    drift: "blobDriftC",
    dur: "9s"
  }), /*#__PURE__*/React.createElement(Blob, {
    x: "50%",
    y: "82%",
    size: inputSize,
    color: warm(0.28 + 0.1 * heat),
    opacity: 0.35 + heat * 0.65,
    drift: "blobDriftB",
    dur: "8s"
  }), /*#__PURE__*/React.createElement(Blob, {
    x: "56%",
    y: "79%",
    size: inputSize * 0.65,
    color: warm(0.24),
    opacity: (0.35 + heat * 0.65) * 0.7,
    drift: "blobDriftA",
    dur: "11s"
  }), /*#__PURE__*/React.createElement(Blob, {
    x: "50%",
    y: "63%",
    size: 120 + bridge * 560,
    color: warm(0.26),
    opacity: Math.min(1, bridge * 1.4),
    drift: "blobDriftC",
    dur: "6s"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '28px 0 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-meta)',
      letterSpacing: 'var(--tracking-meta)',
      textTransform: 'uppercase',
      color: 'var(--text-meta)'
    }
  }, "Word association \xB7 2 of 3")), /*#__PURE__*/React.createElement(SoftTimer, {
    progress: progress,
    style: {
      marginTop: 20,
      position: 'relative'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      placeItems: 'center',
      padding: '28px 0',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    key: current.key,
    style: {
      font: '400 2.25rem/1.3 var(--font-sans)',
      color: current.by === 'ai' ? '#C05A32' : 'var(--sage-deep)',
      opacity: faded ? 0.18 : 1,
      transition: 'opacity 6s var(--ease-calm)'
    }
  }, current.text)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: '18px 20px',
      marginBottom: 16,
      borderRadius: 'var(--radius-l)',
      border: '1px solid rgba(88,72,50,0.10)',
      background: 'rgba(252,249,242,0.45)'
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    placeholder: "whatever comes",
    value: input,
    onChange: type,
    onSubmit: submit,
    autoFocus: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 0 40px',
      display: 'flex',
      justifyContent: 'flex-end',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "quiet",
    onClick: onContinue
  }, "Done here")));
}
window.WordAssociationScreen = WordAssociationScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/WordAssociationScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.LessonCard = __ds_scope.LessonCard;

__ds_ns.StoryText = __ds_scope.StoryText;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.GlowSurface = __ds_scope.GlowSurface;

__ds_ns.SoftTimer = __ds_scope.SoftTimer;

__ds_ns.StreakDots = __ds_scope.StreakDots;

__ds_ns.WordChip = __ds_scope.WordChip;

__ds_ns.ReflectionBox = __ds_scope.ReflectionBox;

__ds_ns.TextInput = __ds_scope.TextInput;

})();
