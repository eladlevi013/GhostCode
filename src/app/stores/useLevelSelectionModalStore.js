import {create} from 'zustand';

const useLevelSelectionModalStore = create((set) => ({
  selectorModalMode: false,

  setSelectorModalMode: (mode) => {
    set((state) => ({
      selectorModalMode: mode,
    }));
  },
}));

export default useLevelSelectionModalStore;
