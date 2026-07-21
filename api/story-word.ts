import { getClient, storyModel } from "./_lib/anthropic";
import { STORY_SYSTEM, storyUserMessage } from "./_lib/prompts";
import { extractStoryWord } from "./_lib/validate";

// Plain Vite app on Vercel (not Next.js) — Edge Function convention: default
// export handler, Web API Request/Response, opted in via `config.runtime`.
export const config = { runtime: "edge" };

interface StoryWordInput {
  text: string;
  by: string;
}

function validWords(input: unknown): StoryWordInput[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > 60) return null;
  const words: StoryWordInput[] = [];
  for (const w of input) {
    if (typeof w !== "object" || w === null) return null;
    const { text, by } = w as Record<string, unknown>;
    if (typeof text !== "string" || !text.trim() || text.length > 40) return null;
    if (by !== "user" && by !== "ai") return null;
    words.push({ text: text.trim(), by });
  }
  return words;
}

async function oneWord(words: StoryWordInput[]): Promise<string | null> {
  const response = await getClient().messages.create({
    model: storyModel(),
    max_tokens: 16,
    system: [{ type: "text", text: STORY_SYSTEM, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: storyUserMessage(words) }],
  });
  const text = response.content.find((b) => b.type === "text");
  // extractStoryWord already rejects a bare "." (empty core) and strips any
  // stray "~" the model might emit — the AI can never end the story itself.
  return text && text.type === "text" ? extractStoryWord(text.text) : null;
}

export default async function handler(request: Request): Promise<Response> {
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
