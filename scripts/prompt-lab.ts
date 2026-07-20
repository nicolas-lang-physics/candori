#!/usr/bin/env node
/**
 * Terminal harness for iterating the Word Association and One-Word Story
 * system prompts without going through the browser or Vercel dev.
 *
 * Usage:
 *   npm run prompt-lab -- --game story --model claude-opus-4-8
 *   npm run prompt-lab -- --game assoc --model claude-haiku-4-5 --turns 12
 *
 * Requires ANTHROPIC_API_KEY in the environment (or an `ant auth login` profile).
 */
import Anthropic from "@anthropic-ai/sdk";
import {
  ASSOCIATION_SYSTEM,
  STORY_SYSTEM,
  associationUserMessage,
  storyUserMessage,
} from "../api/_lib/prompts";
import { extractWord } from "../api/_lib/validate";

interface Args {
  game: "story" | "assoc";
  model: string;
  turns: number;
}

function parseArgs(): Args {
  const args = process.argv.slice(2);
  const get = (flag: string, fallback: string) => {
    const i = args.indexOf(flag);
    return i >= 0 ? args[i + 1] : fallback;
  };
  const game = get("--game", "story");
  if (game !== "story" && game !== "assoc") {
    throw new Error(`--game must be "story" or "assoc", got "${game}"`);
  }
  return {
    game,
    model: get("--model", "claude-opus-4-8"),
    turns: Number(get("--turns", game === "story" ? "24" : "10")),
  };
}

const STORY_OPENERS = ["The", "Once", "Nobody", "Yesterday", "Somewhere"];
const ASSOC_STARTERS = ["river", "clock", "salt", "window", "thread"];

async function nextWord(client: Anthropic, model: string, system: string, userMessage: string) {
  const response = await client.messages.create({
    model,
    max_tokens: 16,
    system,
    messages: [{ role: "user", content: userMessage }],
  });
  const text = response.content.find((b) => b.type === "text");
  return text && text.type === "text" ? extractWord(text.text) : null;
}

async function runStory(client: Anthropic, model: string, turns: number) {
  const words: { text: string; by: "user" | "ai" }[] = [
    { text: STORY_OPENERS[Math.floor(Math.random() * STORY_OPENERS.length)], by: "ai" },
  ];
  console.log(`[story · ${model}]`);
  process.stdout.write(words[0].text);
  for (let i = 0; i < turns; i += 1) {
    // Simulate a plausible player word: for the harness we let the model play
    // both sides so prompts can be eyeballed without a human typing along.
    const userWord =
      (await nextWord(client, model, "You are a whimsical, terse writer playing a word game. Reply with exactly one word, no punctuation.",
        `Continue this story with one word: ${words.map((w) => w.text).join(" ")}`)) ?? "the";
    words.push({ text: userWord, by: "user" });
    process.stdout.write(` ${userWord}`);
    const aiWord = await nextWord(client, model, STORY_SYSTEM, storyUserMessage(words));
    if (!aiWord) {
      console.log("\n  [no valid word returned]");
      break;
    }
    words.push({ text: aiWord, by: "ai" });
    process.stdout.write(` \x1b[33m${aiWord}\x1b[0m`);
    if (words.length >= 24) break;
  }
  console.log("\n");
}

async function runAssoc(client: Anthropic, model: string, turns: number) {
  let current = ASSOC_STARTERS[Math.floor(Math.random() * ASSOC_STARTERS.length)];
  console.log(`[association · ${model}]`);
  process.stdout.write(current);
  for (let i = 0; i < turns; i += 1) {
    const aiWord = await nextWord(client, model, ASSOCIATION_SYSTEM, associationUserMessage(current));
    if (!aiWord) {
      console.log("\n  [no valid word returned]");
      break;
    }
    process.stdout.write(` -> \x1b[33m${aiWord}\x1b[0m`);
    current = aiWord;
  }
  console.log("\n");
}

async function main() {
  const { game, model, turns } = parseArgs();
  const client = new Anthropic();
  if (game === "story") await runStory(client, model, turns);
  else await runAssoc(client, model, turns);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
