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
  broadcastLists: broadcast[];
  viewOption: TViewOption;
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
  setDate: (date: number) => void;
  setViewOption: (view: TViewOption) => void;
}

const useBroadcastStore = create<BoradcastState>((set) => ({
  year: dateInfo.yearNum,
  month: dateInfo.monthNum + 1,
  date: dateInfo.dateNum,
  broadcastLists: dummyBroadcasts,
  viewOption: "tab",
  setYear: (year) => {
    set({ year: year });
  },
  setMonth: (month) => {
    set({ month: month });
  },
  setDate: (date) => {
    set({ date: date });
  },
  setViewOption: (view) => {
    set({ viewOption: view });
  },
}));

export default useBroadcastStore;
