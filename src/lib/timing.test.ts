import { describe, expect, it, vi } from "vitest";
import { aiReplyDelayMs, withMinDelay } from "./timing";

describe("aiReplyDelayMs", () => {
  it("is ~1000ms at max heat", () => {
    expect(aiReplyDelayMs(1)).toBe(1000);
  });
  it("is ~3000ms at min heat", () => {
    expect(aiReplyDelayMs(0)).toBe(3000);
  });
  it("interpolates linearly in between", () => {
    expect(aiReplyDelayMs(0.5)).toBe(2000);
  });
  it("clamps out-of-range heat", () => {
    expect(aiReplyDelayMs(-1)).toBe(3000);
    expect(aiReplyDelayMs(2)).toBe(1000);
  });
});

describe("withMinDelay", () => {
  it("waits at least the given delay even if the promise resolves instantly", async () => {
    vi.useFakeTimers();
    const resolved = vi.fn();
    withMinDelay(Promise.resolve("fast"), 1000).then(resolved);
    await vi.advanceTimersByTimeAsync(500);
    expect(resolved).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(500);
    expect(resolved).toHaveBeenCalledWith("fast");
    vi.useRealTimers();
  });

  it("does not shorten a promise that takes longer than the delay", async () => {
    vi.useFakeTimers();
    const resolved = vi.fn();
    const slow = new Promise<string>((resolve) => setTimeout(() => resolve("slow"), 2000));
    withMinDelay(slow, 500).then(resolved);
    await vi.advanceTimersByTimeAsync(1500);
    expect(resolved).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(500);
    expect(resolved).toHaveBeenCalledWith("slow");
    vi.useRealTimers();
  });
});
