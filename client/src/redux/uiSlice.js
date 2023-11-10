import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    theme: "light",
    badgeModalOpen: false,
    authModalOpen: false,
    authModalMode: "login",
    levelSelectorModalOpen: false,
    gameIsLoading: true,
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    toggleBadgeModal: (state) => {
      state.badgeModalOpen = !state.badgeModalOpen;
    },
    toggleAuthModal: (state) => {
      state.authModalOpen = !state.authModalOpen;
    },
    setAuthModalMode: (state, action) => {
      state.authModalMode = action.payload;
    },
    toggleLevelSelectorModal: (state) => {
      state.levelSelectorModalOpen = !state.levelSelectorModalOpen;
    },
    toggleGameIsLoading: (state) => {
      state.gameIsLoading = !state.gameIsLoading;
    },
    disableGameIsLoading: (state, action) => {
      state.gameIsLoading = action.payload;
    },
  },
});

export const {
  toggleTheme,
  toggleBadgeModal,
  toggleAuthModal,
  setAuthModalMode,
  toggleLevelSelectorModal,
  toggleGameIsLoading,
  disableGameIsLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
