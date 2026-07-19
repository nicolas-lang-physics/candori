import type { StoryWord } from "../components/StoryText";

/**
 * AI client seam. The remote implementation calls /api/*; on any failure it
 * falls back to canned word pools so a session never breaks. This interface is
 * also where future local-LLM connectors plug in.
 */
export interface AIClient {
  nextAssociation(lastWord: string): Promise<string>;
  nextStoryWord(words: StoryWord[]): Promise<string>;
}

const ASSOC_POOL = [
  "lantern", "moth", "static", "harvest", "ivory", "undertow",
  "matchbox", "vertigo", "cellar", "plume", "circuit", "fable",
];

const STORY_POOL = [
  "keeper", "collected", "forgotten", "umbrellas", "because", "rain",
  "remembered", "names", "nobody", "else", "kept", "saying", "aloud",
  "until", "the", "sea", "finally", "answered", "back", "softly",
];

function pick(pool: string[], avoid?: string): string {
  const options = pool.filter((w) => w !== avoid);
  return options[Math.floor(Math.random() * options.length)];
}

let storyFallbackIdx = 0;

export const cannedAI: AIClient = {
  async nextAssociation(lastWord) {
    return pick(ASSOC_POOL, lastWord.toLowerCase());
  },
  async nextStoryWord() {
    const word = STORY_POOL[storyFallbackIdx % STORY_POOL.length];
    storyFallbackIdx += 1;
    return word;
  },
};

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

export const remoteAI: AIClient = {
  async nextAssociation(lastWord) {
    try {
      const { word } = await post<{ word: string }>("/api/associate", { word: lastWord });
      return word;
    } catch {
      return cannedAI.nextAssociation(lastWord);
    }
  },
  async nextStoryWord(words) {
    try {
      const { word } = await post<{ word: string }>("/api/story-word", { words });
      return word;
    } catch {
      return cannedAI.nextStoryWord(words);
    }
  },
};

export const ai: AIClient = remoteAI;
