import { describe, expect, it } from "vitest";
import { extractStoryWord, extractWord } from "./validate";

describe("extractWord", () => {
  it("returns a clean lowercase word unchanged", () => {
    expect(extractWord("lantern")).toBe("lantern");
  });
  it("takes only the first token", () => {
    expect(extractWord("lantern light")).toBe("lantern");
  });
  it("strips surrounding punctuation and quotes", () => {
    expect(extractWord('"lantern."')).toBe("lantern");
    expect(extractWord("lantern,")).toBe("lantern");
  });
  it("keeps internal apostrophes and hyphens", () => {
    expect(extractWord("don't")).toBe("don't");
    expect(extractWord("well-worn")).toBe("well-worn");
  });
  it("rejects punctuation-only output", () => {
    expect(extractWord(".")).toBeNull();
    expect(extractWord("...")).toBeNull();
  });
  it("rejects empty or whitespace-only input", () => {
    expect(extractWord("")).toBeNull();
    expect(extractWord("   ")).toBeNull();
  });
  it("rejects absurdly long tokens", () => {
    expect(extractWord("a".repeat(40))).toBeNull();
  });
});

describe("extractStoryWord", () => {
  it("returns a clean word unchanged", () => {
    expect(extractStoryWord("harbor")).toBe("harbor");
  });
  it("preserves a single trailing period", () => {
    expect(extractStoryWord("harbor.")).toBe("harbor.");
  });
  it("takes only the first token", () => {
    expect(extractStoryWord("harbor light")).toBe("harbor");
  });
  it("strips surrounding punctuation and quotes other than a trailing period", () => {
    expect(extractStoryWord("harbor,")).toBe("harbor");
    expect(extractStoryWord('"harbor"')).toBe("harbor");
  });
  it("keeps internal apostrophes and hyphens", () => {
    expect(extractStoryWord("don't")).toBe("don't");
    expect(extractStoryWord("well-worn.")).toBe("well-worn.");
  });
  it("strips the reserved stop character rather than accepting it", () => {
    expect(extractStoryWord("harbor~")).toBe("harbor");
    expect(extractStoryWord("~harbor")).toBe("harbor");
  });
  it("rejects a bare stop character (nothing left after stripping it)", () => {
    expect(extractStoryWord("~")).toBeNull();
  });
  it("rejects punctuation-only output", () => {
    expect(extractStoryWord(".")).toBeNull();
    expect(extractStoryWord("...")).toBeNull();
  });
  it("rejects empty or whitespace-only input", () => {
    expect(extractStoryWord("")).toBeNull();
    expect(extractStoryWord("   ")).toBeNull();
  });
  it("rejects absurdly long tokens", () => {
    expect(extractStoryWord("a".repeat(40))).toBeNull();
    expect(extractStoryWord("a".repeat(40) + ".")).toBeNull();
  });
});
