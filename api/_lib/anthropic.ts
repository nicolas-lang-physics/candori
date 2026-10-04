import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;

export function getClient(): Anthropic {
  if (!client) client = new Anthropic();
  return client;
}

const DEFAULT_MODEL = "claude-sonnet-5-5";

export function storyModel(): string {
  return process.env.CANDORI_MODEL_STORY || DEFAULT_MODEL;
}

export function assocModel(): string {
  return process.env.CANDORI_MODEL_ASSOC || DEFAULT_MODEL;
}

/**
 * Sonnet 5.5 thinks by default and rejects `thinking: {type: "disabled"}`; its
 * lowest setting is "between_tools" (no up-front thinking). Without this, the
 * tiny max_tokens budget gets eaten by an empty thinking block and no text
 * comes back. Not in the SDK's types yet, hence the cast. Keep this constant
 * across requests — thinking config is part of the cache prefix.
 */
export function noThinking(model: string): { thinking?: Anthropic.ThinkingConfigParam } {
  return model.startsWith("claude-sonnet-5-5")
    ? { thinking: { type: "between_tools" } as unknown as Anthropic.ThinkingConfigParam }
    : {};
}
