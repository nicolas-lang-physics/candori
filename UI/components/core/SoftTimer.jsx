import React from 'react';
export function SoftTimer({ progress = 0, label = 'Don\u2019t think. Type.', style }) {
  const p = Math.max(0, Math.min(1, progress));
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '8px', ...style } },
    React.createElement('span', { style: { font: 'var(--type-meta)', letterSpacing: 'var(--tracking-meta)', textTransform: 'uppercase', color: 'var(--text-meta)' } }, label),
    React.createElement('div', { style: { height: '3px', borderRadius: '2px', background: 'var(--parchment-deep)', overflow: 'hidden' } },
      React.createElement('div', { style: { height: '100%', width: (p * 100) + '%', borderRadius: '2px', background: p > 0.66 ? 'var(--glow-coral)' : p > 0.33 ? 'var(--glow-amber)' : 'var(--glow-sand)', transition: 'width var(--dur-soft) var(--ease-calm), background var(--dur-glow) var(--ease-calm)' } })
    )
  );
}
