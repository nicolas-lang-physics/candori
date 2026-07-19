import React from 'react';
export function TextInput({ value, onChange, onSubmit, placeholder, autoFocus, style }) {
  const [focus, setFocus] = React.useState(false);
  return React.createElement('input', {
    value, autoFocus, placeholder,
    onChange: e => onChange && onChange(e.target.value),
    onKeyDown: e => { if (e.key === 'Enter' && onSubmit) onSubmit(e.target.value); },
    onFocus: () => setFocus(true), onBlur: () => setFocus(false),
    style: {
      font: 'var(--type-story)', fontFamily: 'var(--font-sans)', color: 'var(--text-body)',
      background: 'transparent', border: 'none', borderBottom: '1px solid ' + (focus ? 'var(--sage)' : 'var(--hairline)'),
      outline: 'none', padding: '8px 2px', width: '100%', boxSizing: 'border-box', caretColor: 'var(--glow-amber)',
      transition: 'border-color var(--dur-quick) var(--ease-calm)', ...style,
    },
  });
}
