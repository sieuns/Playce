import { create } from "zustand";

interface SearchState {
  searchText: string;
  setSearchText: (value: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchText: "",
  setSearchText: (value) => set({ searchText: value }),
}));
