import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { StoryWord } from "../components/StoryText";

export type Screen = "home" | "lesson" | "instruction" | "assoc" | "story" | "reflect";

//const ORDER: Screen[] = ["home", "lesson", "assoc", "story", "reflect"];
const ORDER: Screen[] = ["home", "instruction", "story"];


interface SessionState {
  screen: Screen;
  /** The unfinished one-word story, so the player can resume it later */
  story: StoryWord[] | null;
  setStory: (story: StoryWord[]) => void;
  clearStory: () => void;
  advance: () => void;
  reset: () => void;
}

export const useSessionStore = create<SessionState>()(
    persist(
        (set, get) => ({
          screen: "home",
          story: null,
          setStory: (story) => set({ story }),
          clearStory: () => set({ story: null }),
          advance: () => {
            const i = ORDER.indexOf(get().screen);
            set({ screen: i >= ORDER.length - 1 ? "home" : ORDER[i + 1] });
          },
          reset: () => set({ screen: "home" }),
        }),
        { name: "candori-session" }
    )
);
