import { create } from "zustand";

const useBadgeModalStore = create((set) => ({
  badgeModalShow: false,
  setBadgeModalShow: (mode) => {
    set((state) => ({
      badgeModalShow: mode,
    }));
  },
}));

export default useBadgeModalStore;
