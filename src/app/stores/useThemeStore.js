"use client";
import { create } from "zustand";

const useThemeStore = create((set) => ({
  // Initial theme state, using local storage if available
  theme: "light",

  // Action to toggle the theme
  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    });
  },

  // Action to set a specific theme
  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },
}));

export default useThemeStore;
