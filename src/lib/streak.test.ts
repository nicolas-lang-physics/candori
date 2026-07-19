import { describe, expect, it } from "vitest";
import { currentDay, streakEndingAt, todayISO, weekDots } from "./streak";

const T = "2026-07-20";

describe("streakEndingAt", () => {
  it("is 0 when the end day is not completed", () => {
    expect(streakEndingAt(["2026-07-19"], T)).toBe(0);
  });
  it("counts consecutive days ending at end", () => {
    expect(streakEndingAt(["2026-07-18", "2026-07-19", "2026-07-20"], T)).toBe(3);
  });
  it("stops at gaps", () => {
    expect(streakEndingAt(["2026-07-16", "2026-07-19", "2026-07-20"], T)).toBe(2);
  });
  it("handles month boundaries", () => {
    expect(streakEndingAt(["2026-06-30", "2026-07-01"], "2026-07-01")).toBe(2);
  });
  it("ignores duplicates and order", () => {
    expect(streakEndingAt(["2026-07-20", "2026-07-19", "2026-07-19"], T)).toBe(2);
  });
});

describe("currentDay", () => {
  it("is 1 for a brand new user", () => {
    expect(currentDay([], T)).toBe(1);
  });
  it("equals the streak when today is completed", () => {
    expect(currentDay(["2026-07-19", "2026-07-20"], T)).toBe(2);
  });
  it("is yesterday's streak + 1 before completing today", () => {
    expect(currentDay(["2026-07-18", "2026-07-19"], T)).toBe(3);
  });
  it("resets to 1 after a missed day", () => {
    expect(currentDay(["2026-07-17"], T)).toBe(1);
  });
});

describe("weekDots", () => {
  it("returns 7 dots oldest-first ending today", () => {
    const dots = weekDots(["2026-07-20", "2026-07-18"], T);
    expect(dots).toHaveLength(7);
    expect(dots[6]).toBe(true); // today
    expect(dots[4]).toBe(true); // two days ago
    expect(dots[5]).toBe(false); // yesterday
  });
});

describe("todayISO", () => {
  it("uses local calendar date", () => {
    expect(todayISO(new Date(2026, 6, 20, 23, 59))).toBe("2026-07-20");
    expect(todayISO(new Date(2026, 6, 20, 0, 0))).toBe("2026-07-20");
  });
});
