import { create } from "zustand";

interface MypageState {
  isMypageOpen: boolean;
  setIsMypageOpen: (mypage: boolean) => void;
}

const useMypageStore = create<MypageState>((set) => ({
  isMypageOpen: false,
  setIsMypageOpen: (mypage) => {
    set({ isMypageOpen: mypage });
  },
}));

export default useMypageStore;
