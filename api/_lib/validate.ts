/** Reduce a model reply to a single clean word, or null if unusable. */
export function extractWord(raw: string): string | null {
  const firstToken = raw.trim().split(/\s+/)[0] ?? "";
  // strip surrounding punctuation/quotes; keep internal apostrophes and hyphens
  const word = firstToken.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
  if (!word) return null;
  if (word.length > 30) return null;
  return word;
}

/**
 * The one-word story's stop character. Reserved for the player — see
 * OneWordStory.tsx's copy of this constant. The AI must never emit it, so we
 * strip it out of any reply rather than trust the model not to produce it.
 */
export const STORY_STOP_CHAR = "~";

const hasCore = (token: string) => /[\p{L}\p{N}]/u.test(token);

/**
 * Like extractWord, but for the story AI's turn: punctuation is part of the
 * story (commas, periods, quotes, dashes...) and is kept as the model wrote it.
 * The model sometimes puts punctuation in its own token (", a"); that is kept
 * together with the word that follows it. Any stray stop character is stripped
 * rather than accepted. Punctuation-only output has no word and is rejected.
 */
export function extractStoryWord(raw: string): string | null {
  const tokens = raw.split(STORY_STOP_CHAR).join("").trim().split(/\s+/).filter(Boolean);
  let word = tokens[0];
  if (!word) return null;
  if (!hasCore(word)) {
    const next = tokens[1];
    if (!next || !hasCore(next)) return null;
    word = `${word} ${next}`;
  }
  const core = word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
  if (core.length > 30 || word.length > 40) return null;
  return word;
}

export interface WordPayload {
  word: string;
}
