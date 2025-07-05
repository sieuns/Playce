import { create } from "zustand";
import type { SearchResultItem } from "../types/search";

interface SearchState {
  //텍스트 검색
  searchText: string;
  setSearchText: (value: string) => void;

  // 지역
  bigRegion: string;
  smallRegion: string;
  setBigRegion: (value: string) => void;
  setSmallRegion: (value: string) => void;

  // 종목/리그
  sport: string;
  league: string;
  setSport: (value: string) => void;
  setLeague: (value: string) => void;

  // 정렬 기준
  sort: "distance" | "datetime";
  setSort: (value: "distance" | "datetime") => void;

  // 검색 트리거
  triggerSearch: boolean;
  setTriggerSearch: (value: boolean) => void;

  // 검색 리스트 유무
  isSearching: boolean;
  setIsSearching: (v: boolean) => void;

  // 검색 결과
  results: SearchResultItem[];
  setResults: (results: SearchResultItem[]) => void;

  //검색 했는지 안했는지
  hasSearched: boolean;
  setHasSearched: (v: boolean) => void;

  // 전체 초기화
  reset: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchText: "",
  bigRegion: "",
  smallRegion: "",
  sport: "",
  league: "",
  sort: "distance",
  triggerSearch: false,
  isSearching: false,
  hasSearched: false,
  results: [],

  setSearchText: (value) => set({ searchText: value }),
  setBigRegion: (value) => set({ bigRegion: value }),
  setSmallRegion: (value) => set({ smallRegion: value }),
  setSport: (value) => set({ sport: value }),
  setLeague: (value) => set({ league: value }),
  setSort: (value) => set({ sort: value }),
  setTriggerSearch: (value) => set({ triggerSearch: value }),
  setIsSearching: (value) => set({ isSearching: value }),
  setResults: (results) => set({ results }),
  setHasSearched: (v) => set({ hasSearched: v }),

  reset: () =>
    set({
      searchText: "",
      bigRegion: "",
      smallRegion: "",
      sport: "",
      league: "",
      sort: "distance",
      triggerSearch: false,
      isSearching: false,
      hasSearched: false,
    }),
}));
