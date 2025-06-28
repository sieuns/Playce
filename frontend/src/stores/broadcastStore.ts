import { create } from "zustand";

interface BoradcastState {
  isBroadcastOpen: boolean;
  setIsBroadcastOpen: (broadcast: boolean) => void;
}

const useAuthStore = create<BoradcastState>((set) => ({
  isBroadcastOpen: false,
  setIsBroadcastOpen: (broadcast) => {
    set({ isBroadcastOpen: broadcast });
  },
}));

export default useAuthStore;
