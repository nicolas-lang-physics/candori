import { describe, expect, it } from "vitest";
import { extractWord } from "./validate";

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
