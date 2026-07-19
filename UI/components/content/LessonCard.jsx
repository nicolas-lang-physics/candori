import React from 'react';
export function LessonCard({ kicker = 'Today', text, children, style }) {
  return React.createElement('div', {
    style: {
      background: 'var(--surface-card)', border: 'var(--border-card)', borderRadius: 'var(--radius-l)',
      boxShadow: 'var(--shadow-card)', padding: '32px 28px', maxWidth: 'var(--measure)', ...style,
    },
  },
    React.createElement('div', { style: { font: 'var(--type-meta)', letterSpacing: 'var(--tracking-meta)', textTransform: 'uppercase', color: 'var(--text-meta)', marginBottom: '16px' } }, kicker),
    React.createElement('div', { style: { font: 'var(--type-provocation)', color: 'var(--text-body)' } }, text || children)
  );
}
