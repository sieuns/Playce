// stores/favoriteStore.ts
import { create } from "zustand";

interface FavoriteStoreState {
  favoriteIds: number[];
  setFavorites: (ids: number[]) => void;
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
}

const useFavoriteStore = create<FavoriteStoreState>((set) => ({
  favoriteIds: [1, 2, 3, 4, 5],
  setFavorites: (ids) => set({ favoriteIds: ids }),
  addFavorite: (id) =>
    set((state) => ({
      favoriteIds: state.favoriteIds.includes(id)
        ? state.favoriteIds
        : [...state.favoriteIds, id],
    })),
  removeFavorite: (id) =>
    set((state) => ({
      favoriteIds: state.favoriteIds.filter((fid) => fid !== id),
    })),
}));

export default useFavoriteStore;
