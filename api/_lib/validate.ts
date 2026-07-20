/** Reduce a model reply to a single clean word, or null if unusable. */
export function extractWord(raw: string): string | null {
  const firstToken = raw.trim().split(/\s+/)[0] ?? "";
  // strip surrounding punctuation/quotes; keep internal apostrophes and hyphens
  const word = firstToken.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
  if (!word) return null;
  if (word.length > 30) return null;
  return word;
}

export interface WordPayload {
  word: string;
}
