import { create } from 'zustand';

const useAuthModalStore = create((set) => ({
  authPanelMode: 'login',
  authPanelShow: false,

  setAuthPanelMode: (mode) => {
    set((state) => ({
      authPanelMode: mode,
    }));
  },

  setAuthPanelShow: (show) => {
    set((state) => ({
      authPanelShow: show,
    }));
  },
}));

export default useAuthModalStore;
