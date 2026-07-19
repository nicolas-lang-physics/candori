import React from 'react';
export function Button({ variant = 'primary', size = 'md', disabled, children, onClick, style }) {
  const pad = size === 'lg' ? '14px 28px' : '10px 22px';
  const base = {
    font: 'var(--type-label)', fontFamily: 'var(--font-sans)', border: 'none', cursor: disabled ? 'default' : 'pointer',
    borderRadius: 'var(--radius-pill)', padding: pad, opacity: disabled ? 0.45 : 1,
    transition: 'background var(--dur-quick) var(--ease-calm), color var(--dur-quick) var(--ease-calm)',
    background: 'transparent', display: 'inline-flex', alignItems: 'center', gap: '8px',
  };
  const variants = {
    primary: { background: 'var(--sage-deep)', color: '#FCF9F2' },
    quiet: { background: 'var(--sage-tint)', color: 'var(--sage-deep)' },
    ghost: { background: 'transparent', color: 'var(--sage-deep)', padding: size === 'lg' ? '14px 8px' : '10px 8px' },
  };
  const [hover, setHover] = React.useState(false);
  const hoverStyles = { primary: { background: '#55644C' }, quiet: { background: 'var(--sage-faint)' }, ghost: { color: '#55644C' } };
  return React.createElement('button', {
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false),
    style: { ...base, ...variants[variant], ...(hover && !disabled ? hoverStyles[variant] : {}), ...style },
  }, children);
}
