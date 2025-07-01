import { create } from "zustand";
import type { broadcast } from "../types/broadcast";
import { dummyBroadcasts } from "../data/dummyBroadcasts";

const today = new Date();

export const dateInfo = {
  yearNum: today.getFullYear(),
  monthNum: today.getMonth(),
  dateNum: today.getDate(),
};

type TViewOption = "tab" | "calendar";

interface BoradcastState {
  year: number;
  month: number;
  date: number;
  restaurant: string;
  restaurantId: number;
  broadcastLists: broadcast[];
  viewOption: TViewOption;
  resetYMD: () => void;
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
  setDate: (date: number) => void;
  setRestaurant: (r: string, rId: number) => void;
  setViewOption: (view: TViewOption) => void;
}

const useBroadcastStore = create<BoradcastState>((set) => ({
  year: dateInfo.yearNum,
  month: dateInfo.monthNum + 1,
  date: dateInfo.dateNum,
  restaurant: "",
  restaurantId: 0,
  broadcastLists: dummyBroadcasts,
  viewOption: "tab",
  resetYMD: () => {
    set({
      year: dateInfo.yearNum,
      month: dateInfo.monthNum + 1,
      date: dateInfo.dateNum,
    });
  },
  setYear: (year) => {
    set({ year: year });
  },
  setMonth: (month) => {
    set({ month: month });
  },
  setDate: (date) => {
    set({ date: date });
  },
  setRestaurant: (r: string, rId: number) => {
    set({ restaurant: r, restaurantId: rId });
  },
  setViewOption: (view) => {
    set({ viewOption: view });
  },
}));

export default useBroadcastStore;
