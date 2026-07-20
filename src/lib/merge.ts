import { fetchCompletions, pushCompletions } from "./completions";
import { supabase } from "./supabase";
import { useStreakStore } from "../state/streakStore";

/**
 * On sign-in: push whatever completion dates exist locally, then treat the
 * (now-merged) Supabase set as source of truth, cached locally for offline use.
 */
export async function mergeLocalStreakToCloud(userId: string): Promise<void> {
  const local = useStreakStore.getState().completions;
  await pushCompletions(userId, local);
  const merged = await fetchCompletions(userId);
  useStreakStore.getState().setCompletions(merged.length > 0 ? merged : local);
}

/** Call once at startup; runs the merge whenever a session is already present (e.g. magic-link return). */
export function watchAuthAndMerge(): () => void {
  if (!supabase) return () => {};
  const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
    const userId = session?.user?.id;
    if (userId) void mergeLocalStreakToCloud(userId);
  });
  return () => sub.subscription.unsubscribe();
}
