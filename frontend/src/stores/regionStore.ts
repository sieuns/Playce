import { create } from "zustand";

interface RegionState {
  mainRegion: string;
  subRegions: string[];
  setMainRegion: (region: string) => void;
  toggleSubRegion: (sub: string) => void;
  resetRegion: () => void;
}

export const useRegionStore = create<RegionState>((set, get) => ({
  mainRegion: "전체",
  subRegions: [],
  setMainRegion: (region) => set({ mainRegion: region }),
  toggleSubRegion: (sub) => {
    const current = get().subRegions;
    if (current.includes(sub)) {
      set({ subRegions: current.filter((s) => s !== sub) });
    } else {
      set({ subRegions: [...current, sub] });
    }
  },
  resetRegion: () => set({ mainRegion: "전체", subRegions: [] }),
}));
