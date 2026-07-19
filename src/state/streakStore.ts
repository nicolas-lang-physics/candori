import { create } from "zustand";
import { persist } from "zustand/middleware";
import { currentDay, isCompletedOn, todayISO, weekDots } from "../lib/streak";

interface StreakState {
  /** ISO local dates of completed sessions */
  completions: string[];
  /** Last completed one-word story (local only, for the Home subtitle) */
  lastStory: string | null;
  markToday: () => void;
  setLastStory: (story: string) => void;
  /** Replace local history with a merged set (used after Supabase sign-in) */
  setCompletions: (dates: string[]) => void;
}

export const useStreakStore = create<StreakState>()(
  persist(
    (set, get) => ({
      completions: [],
      lastStory: null,
      markToday: () => {
        const today = todayISO();
        if (!isCompletedOn(get().completions, today)) {
          set({ completions: [...get().completions, today] });
        }
      },
      setLastStory: (story) => set({ lastStory: story }),
      setCompletions: (dates) => set({ completions: [...new Set(dates)].sort() }),
    }),
    { name: "candori-streak" },
  ),
);

export function useStreak() {
  const completions = useStreakStore((s) => s.completions);
  const today = todayISO();
  return {
    day: currentDay(completions, today),
    week: weekDots(completions, today),
    completedToday: isCompletedOn(completions, today),
    completionCount: completions.length,
  };
}
