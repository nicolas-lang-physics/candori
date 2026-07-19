import React from 'react';
import { WordChip } from '../core/WordChip.jsx';
export function StoryText({ words = [], cursor, style }) {
  return React.createElement('div', {
    style: { font: 'var(--type-story)', maxWidth: 'var(--measure)', lineHeight: 1.7, ...style },
  },
    words.map((w, i) => React.createElement(React.Fragment, { key: i },
      React.createElement(WordChip, { word: w.text, by: w.by, pending: w.pending }),
      i < words.length - 1 ? ' ' : null
    )),
    cursor ? React.createElement('span', { style: { color: 'var(--glow-amber)', animation: 'none', opacity: 0.7 } }, ' \u258F') : null
  );
}
