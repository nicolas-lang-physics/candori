import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Sign-in is entirely optional (see decisions in the plan). If Supabase env
 * vars aren't configured, `supabase` is null and the app runs local-only —
 * this must never throw or block a session.
 */
export const supabase: SupabaseClient | null = url && anonKey ? createClient(url, anonKey) : null;

export async function sendMagicLink(email: string): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Sign-in isn't configured yet." };
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: window.location.origin },
  });
  return { error: error?.message ?? null };
}

export async function getUserId(): Promise<string | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

export async function signOut(): Promise<void> {
  await supabase?.auth.signOut();
}
