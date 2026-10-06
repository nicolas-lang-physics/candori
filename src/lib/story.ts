/** A word that opens with punctuation (", a" / ". The") attaches to the previous word. */
export function needsSpaceBefore(text: string): boolean {
  return !/^[,.;:!?…)\]”’—–-]/u.test(text);
}

export function joinStory(words: { text: string }[]): string {
  return words.reduce((out, w, i) => (i === 0 ? w.text : out + (needsSpaceBefore(w.text) ? " " : "") + w.text), "");
}
