/** Pure streak math over ISO local dates (YYYY-MM-DD). Completions may be unsorted/duplicated. */

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function todayISO(now: Date = new Date()): string {
  return toISODate(now);
}

function shiftDays(iso: string, delta: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d + delta);
  return toISODate(date);
}

/** Consecutive completed days ending exactly at `end` (0 if `end` itself isn't completed). */
export function streakEndingAt(completions: string[], end: string): number {
  const set = new Set(completions);
  let n = 0;
  let cursor = end;
  while (set.has(cursor)) {
    n += 1;
    cursor = shiftDays(cursor, -1);
  }
  return n;
}

/**
 * The "Day N" label. If today is completed, the streak ending today.
 * Otherwise the day the user is currently on: yesterday's streak + 1
 * (a fresh or broken streak reads "Day 1", never "Day 0").
 */
export function currentDay(completions: string[], today: string): number {
  const todayStreak = streakEndingAt(completions, today);
  if (todayStreak > 0) return todayStreak;
  return streakEndingAt(completions, shiftDays(today, -1)) + 1;
}

/** Dots for the last 7 calendar days ending today, oldest first. */
export function weekDots(completions: string[], today: string): boolean[] {
  const set = new Set(completions);
  const dots: boolean[] = [];
  for (let i = 6; i >= 0; i -= 1) {
    dots.push(set.has(shiftDays(today, -i)));
  }
  return dots;
}

export function isCompletedOn(completions: string[], date: string): boolean {
  return completions.includes(date);
}
