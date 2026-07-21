/**
 * How long to hold the AI's reply before revealing it — a beat that reads as
 * "thinking," scaled by how fast the player was typing (their heat, 0..1).
 * Faster typing → shorter pause; slower/calmer typing → longer pause.
 * Tune MIN_DELAY_MS / MAX_DELAY_MS to taste.
 */
export const MIN_DELAY_MS = 500; // heat = 1 (max)
export const MAX_DELAY_MS = 2000; // heat = 0 (min)

export function aiReplyDelayMs(heat: number): number {
  const h = Math.max(0, Math.min(1, heat));
  return Math.round(MAX_DELAY_MS - (MAX_DELAY_MS - MIN_DELAY_MS) * h);
}

/** Resolves with `promise`'s value, but never before `ms` has elapsed. */
export function withMinDelay<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.all([promise, new Promise<void>((resolve) => setTimeout(resolve, ms))]).then(
    ([value]) => value,
  );
}
