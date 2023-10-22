import { create } from "zustand";

const useProgressStore = create((set) => ({
  currentWorld: 0,
  currentLevel: 0,

  setCurrentWorld: (world) => {
    set((state) => ({
      currentWorld: world,
    }));
  },

  setCurrentLevel: (level) => {
    set((state) => ({
      currentLevel: level,
    }));
  },
}));

export default useProgressStore;
