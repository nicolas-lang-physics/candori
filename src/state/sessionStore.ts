import { create } from "zustand";

export type Screen = "home" | "lesson" | "assoc" | "story" | "reflect";

const ORDER: Screen[] = ["home", "lesson", "assoc", "story", "reflect"];

interface SessionState {
  screen: Screen;
  advance: () => void;
  reset: () => void;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  screen: "home",
  advance: () => {
    const i = ORDER.indexOf(get().screen);
    set({ screen: i >= ORDER.length - 1 ? "home" : ORDER[i + 1] });
  },
  reset: () => set({ screen: "home" }),
}));
