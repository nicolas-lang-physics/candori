import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { StoryWord } from "../components/StoryText";
import { currentDay, isCompletedOn, todayISO, weekDots } from "../lib/streak";
import { joinStory } from "../lib/story";
import { pushCompletions } from "../lib/completions";
import { getUserId } from "../lib/supabase";

/** A finished one-word story. `words` (with authorship) is absent for stories migrated from the old `lastStory` string. */
export interface SavedStory {
  id: string;
  /** ISO local date it was finished */
  date: string;
  text: string;
  words?: StoryWord[];
}

interface StreakState {
  /** ISO local dates of completed sessions */
  completions: string[];
  /** All finished one-word stories, oldest first (local only) */
  stories: SavedStory[];
  markToday: () => void;
  addStory: (words: StoryWord[]) => void;
  /** Replace local history with a merged set (used after Supabase sign-in) */
  setCompletions: (dates: string[]) => void;
}

export const useStreakStore = create<StreakState>()(
  persist(
    (set, get) => ({
      completions: [],
      stories: [],
      markToday: () => {
        const today = todayISO();
        if (!isCompletedOn(get().completions, today)) {
          set({ completions: [...get().completions, today] });
        }
        // If already signed in, sync immediately; otherwise this date is
        // picked up by mergeLocalStreakToCloud() the next time they sign in.
        void getUserId().then((userId) => {
          if (userId) void pushCompletions(userId, [today]);
        });
      },
      addStory: (words) =>
        set({
          stories: [
            ...get().stories,
            { id: crypto.randomUUID(), date: todayISO(), text: joinStory(words), words },
          ],
        }),
      setCompletions: (dates) => set({ completions: [...new Set(dates)].sort() }),
    }),
    {
      name: "candori-streak",
      version: 1,
      // v0 kept only the latest story as a string in `lastStory`.
      migrate: (persisted, version) => {
        const state = persisted as Partial<StreakState> & { lastStory?: string | null };
        if (version < 1) {
          const { lastStory, ...rest } = state;
          const date = [...(rest.completions ?? [])].sort().at(-1) ?? todayISO();
          return {
            ...rest,
            stories: lastStory ? [{ id: crypto.randomUUID(), date, text: lastStory }] : [],
          } as StreakState;
        }
        return state as StreakState;
      },
    },
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

/** Text of the most recently finished story, for the Home subtitle. */
export function useLastStory(): string | null {
  return useStreakStore((s) => s.stories.at(-1)?.text ?? null);
}
