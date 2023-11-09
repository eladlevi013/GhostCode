"use client";
import { create } from "zustand";

const useTokenStore = create((set) => ({
  token: null,

  setToken: (token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
    set({ token });
  },

  clearToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    set({ token: null });
  },
}));

export default useTokenStore;
