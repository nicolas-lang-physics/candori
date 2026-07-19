import React from 'react';
export function WordChip({ word, by = 'user', pending, style }) {
  return React.createElement('span', {
    style: {
      font: 'var(--type-story)', color: pending ? 'var(--text-meta)' : by === 'ai' ? '#C05A32' : 'var(--sage-deep)',
      opacity: pending ? 0.6 : 1, transition: 'opacity var(--dur-soft) var(--ease-calm)', ...style,
    },
  }, word);
}
