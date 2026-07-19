import React from 'react';
export function ReflectionBox({ prompt = 'What surprised you?', value, onChange, style }) {
  const [focus, setFocus] = React.useState(false);
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px', ...style } },
    React.createElement('div', { style: { font: 'var(--type-provocation)', color: 'var(--text-body)' } }, prompt),
    React.createElement('textarea', {
      value, rows: 4, placeholder: 'Yours alone. Never read, never graded.',
      onChange: e => onChange && onChange(e.target.value),
      onFocus: () => setFocus(true), onBlur: () => setFocus(false),
      style: {
        font: 'var(--type-body)', fontFamily: 'var(--font-sans)', color: 'var(--text-body)',
        background: 'var(--surface-card)', border: '1px solid ' + (focus ? 'var(--sage)' : 'var(--hairline)'),
        borderRadius: 'var(--radius-m)', outline: 'none', padding: '14px 16px', resize: 'vertical',
        transition: 'border-color var(--dur-quick) var(--ease-calm)',
      },
    })
  );
}
