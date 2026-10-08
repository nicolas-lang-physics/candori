import { getClient, noThinking, storyModel } from "./_lib/anthropic";
import {messagesFromStoryWords, oneMessageFromStoryWords, STORY_SYSTEM} from "./_lib/prompts";
import { extractStoryWord } from "./_lib/validate";

// Plain Vite app on Vercel (not Next.js) — Node runtime, Web-standard
// `fetch` handler. Not Edge: the Anthropic SDK imports node:fs for credentials.

interface StoryWordInput {
  text: string;
  by: string;
}

const MAX_STORY_LENGTH = 500;
const MAX_WORD_LENGTH = 40;


function validWords(input: unknown): StoryWordInput[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_STORY_LENGTH) return null;
  const words: StoryWordInput[] = [];
  for (const w of input) {
    if (typeof w !== "object" || w === null) return null;
    const { text, by } = w as Record<string, unknown>;
    if (typeof text !== "string" || !text.trim() || text.length > MAX_WORD_LENGTH) return null;
    if (by !== "user" && by !== "ai") return null;
    words.push({ text: text.trim(), by });
  }
  return words;
}

async function oneWord(words: StoryWordInput[]): Promise<string | null> {
  const model = storyModel();
  const response = await getClient().messages.create({
    model,
    max_tokens: 16,
    ...noThinking(model),
    // Automatic breakpoint moves with the growing transcript; the explicit one
    // on the system block lets every new game reuse the shared system prompt.
    cache_control: { type: "ephemeral" },
    system: [{ type: "text", text: STORY_SYSTEM, cache_control: { type: "ephemeral" } }],
    messages: messagesFromStoryWords(words), //[oneMessageFromStoryWords(words)]
  });
  const text = response.content.find((b) => b.type === "text");

  console.debug("Response: ", response);
  // extractStoryWord already rejects a bare "." (empty core) and strips any
  // stray "~" the model might emit — the AI can never end the story itself.
  return text && text.type === "text" ? extractStoryWord(text.text) : null;
}

async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "method not allowed" }, { status: 405 });
  }

  let words: StoryWordInput[] | null;
  try {
    const body = (await request.json()) as { words?: unknown };
    words = validWords(body.words);
  } catch {
    words = null;
  }
  if (!words) return Response.json({ error: "invalid words" }, { status: 400 });

  try {
    const word = (await oneWord(words)) ?? (await oneWord(words));
    if (!word) return Response.json({ error: "no word" }, { status: 502 });
    return Response.json({ word });
  } catch (err) {
    console.error("story-word failed", err);
    return Response.json({ error: "upstream" }, { status: 502 });
  }
}

export default { fetch: handler };
