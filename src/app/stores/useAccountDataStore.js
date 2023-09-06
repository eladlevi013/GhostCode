import { create } from 'zustand';

const useAccountDataStore = create((set) => ({
  // Initial accountData state, using local storage if available
  accountData: null,

  // Action to set the accountData
  setAccountData: (data) => {
    set({ accountData: data }); // Use accountData instead of data
  },
}));

export default useAccountDataStore;
