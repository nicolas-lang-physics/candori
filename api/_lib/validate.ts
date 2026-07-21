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

/**
 * Like extractWord, but for the story AI's turn: a single trailing period is
 * preserved (the story may now span multiple sentences), and any stray stop
 * character is stripped rather than accepted.
 */
export function extractStoryWord(raw: string): string | null {
  const firstToken = (raw.trim().split(/\s+/)[0] ?? "").split(STORY_STOP_CHAR).join("");
  const endsWithPeriod = firstToken.endsWith(".");
  const bare = endsWithPeriod ? firstToken.slice(0, -1) : firstToken;
  const core = bare.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
  if (!core) return null;
  if (core.length > 30) return null;
  return endsWithPeriod ? `${core}.` : core;
}

export interface WordPayload {
  word: string;
}
