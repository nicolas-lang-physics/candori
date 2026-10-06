import type { StoryWord } from "../components/StoryText";

/**
 * AI client seam. The remote implementation calls /api/*, retrying once on
 * failure; if it still fails the error propagates and the screen tells the
 * player. Canned word pools are only used in dev without an API
 * (`npm run dev:offline`). This interface is also where future local-LLM
 * connectors plug in.
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

const RETRIES = 1;
const RETRY_DELAY_MS = 400;

async function postWithRetry<T>(path: string, body: unknown): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await post<T>(path, body);
    } catch (err) {
      if (attempt >= RETRIES) throw err;
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
}

export const remoteAI: AIClient = {
  async nextAssociation(lastWord) {
    const { word } = await postWithRetry<{ word: string }>("/api/associate", { word: lastWord });
    return word;
  },
  async nextStoryWord(words) {
    const { word } = await postWithRetry<{ word: string }>("/api/story-word", { words });
    return word;
  },
};

export const ai: AIClient =
  import.meta.env.DEV && import.meta.env.VITE_CANNED_AI === "true" ? cannedAI : remoteAI;
