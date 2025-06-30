import { create } from "zustand";
import type { MenuKey } from "../types/restaurant-manage.types";

interface MypageState {
  isMypageOpen: boolean;
  restaurantSubpage: MenuKey;
  setIsMypageOpen: (mypage: boolean) => void;
  setRestaurantSubpage: (subpage: MenuKey) => void;
}

const useMypageStore = create<MypageState>((set) => ({
  isMypageOpen: false,
  restaurantSubpage: "restaurant-home",
  setIsMypageOpen: (mypage) => {
    set({ isMypageOpen: mypage });
  },
  setRestaurantSubpage: (subpage) => {
    set({ restaurantSubpage: subpage });
  },
}));

export default useMypageStore;
