import { create } from "zustand";
import { ExampleStore } from "./types";

export const useExampleStore = create<ExampleStore>()((set) => ({
  username: "",
  dispatchUsername: (username) => set(() => ({ username })),
}));
