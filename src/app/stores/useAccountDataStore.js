import { create } from "zustand";

const useAccountDataStore = create((set) => ({
  accountData: null,

  setAccountData: (data) => {
    set({ accountData: data });
  },
}));

export default useAccountDataStore;
