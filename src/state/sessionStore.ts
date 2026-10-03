import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Screen = "home" | "lesson" | "instruction" | "assoc" | "story" | "reflect";

//const ORDER: Screen[] = ["home", "lesson", "assoc", "story", "reflect"];
const ORDER: Screen[] = ["home", "instruction", "story"];


interface SessionState {
  screen: Screen;
  advance: () => void;
  reset: () => void;
}

export const useSessionStore = create<SessionState>()(
    //persist(
        (set, get) => ({
          screen: "home",
          advance: () => {
            const i = ORDER.indexOf(get().screen);
            set({ screen: i >= ORDER.length - 1 ? "home" : ORDER[i + 1] });
          },
          reset: () => set({ screen: "home" }),
        }),
     //   { name: "candori-session" }
    //)
);
