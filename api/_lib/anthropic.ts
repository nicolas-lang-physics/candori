import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;

export function getClient(): Anthropic {
  if (!client) client = new Anthropic();
  return client;
}

const DEFAULT_MODEL = "claude-opus-4-8";

export function storyModel(): string {
  return process.env.CANDORI_MODEL_STORY || DEFAULT_MODEL;
}

export function assocModel(): string {
  return process.env.CANDORI_MODEL_ASSOC || DEFAULT_MODEL;
}
