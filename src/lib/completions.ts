import { supabase } from "./supabase";

/** Read every completion date for the signed-in user. */
export async function fetchCompletions(userId: string): Promise<string[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from("completions").select("completed_on").eq("user_id", userId);
  if (error) {
    console.error("fetchCompletions failed", error);
    return [];
  }
  return data.map((row) => row.completed_on as string);
}

/** Upsert local dates to Supabase. Idempotent — safe to call with overlapping dates. */
export async function pushCompletions(userId: string, dates: string[]): Promise<void> {
  if (!supabase || dates.length === 0) return;
  const rows = dates.map((completed_on) => ({ user_id: userId, completed_on }));
  const { error } = await supabase.from("completions").upsert(rows, { onConflict: "user_id,completed_on" });
  if (error) console.error("pushCompletions failed", error);
}
