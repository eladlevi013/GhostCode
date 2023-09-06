"use client"
import { create } from 'zustand';

const useTokenStore = create((set) => ({
  // Initial token state, using local storage if available
  token: null,

  // Action to set the token
  setToken: (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
    set({ token });
  },

  // Action to clear the token
  clearToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    set({ token: null });
  },
}));

export default useTokenStore;
