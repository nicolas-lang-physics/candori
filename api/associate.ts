import { assocModel, getClient } from "./_lib/anthropic";
import { ASSOCIATION_SYSTEM, associationUserMessage } from "./_lib/prompts";
import { extractWord } from "./_lib/validate";

// Plain Vite app on Vercel (not Next.js) — Edge Function convention: default
// export handler, Web API Request/Response, opted in via `config.runtime`.
export const config = { runtime: "edge" };

async function oneWord(lastWord: string): Promise<string | null> {
  const response = await getClient().messages.create({
    model: assocModel(),
    max_tokens: 16,
    system: [{ type: "text", text: ASSOCIATION_SYSTEM, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: associationUserMessage(lastWord) }],
  });
  const text = response.content.find((b) => b.type === "text");
  return text && text.type === "text" ? extractWord(text.text) : null;
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "method not allowed" }, { status: 405 });
  }

  let lastWord: string;
  try {
    const body = (await request.json()) as { word?: unknown };
    if (typeof body.word !== "string" || !body.word.trim() || body.word.length > 60) {
      return Response.json({ error: "invalid word" }, { status: 400 });
    }
    lastWord = body.word.trim();
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }

  try {
    const word = (await oneWord(lastWord)) ?? (await oneWord(lastWord));
    if (!word) return Response.json({ error: "no word" }, { status: 502 });
    return Response.json({ word });
  } catch (err) {
    console.error("associate failed", err);
    return Response.json({ error: "upstream" }, { status: 502 });
  }
}
