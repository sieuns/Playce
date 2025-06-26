import { create } from "zustand";
import type { latlng, spot } from "../types/map";
import { CITY_STATION } from "../constant/map-constant";

interface MapState {
  position: latlng;
  openedModal: number;
  spots: spot[];
  isRefreshBtnOn: boolean;
  setPosition: (pos: latlng) => void;
  resetSpots: () => void;
  refreshSpots: (newSpots: spot[]) => void;
  setOpenedModal: (modal: number) => void;
  closeModal: () => void;
  setRefreshBtn: (button: boolean) => void;
}

const useMapStore = create<MapState>((set) => ({
  position: CITY_STATION,
  openedModal: -1,
  spots: [
    {
      id: 1,
      name: "마커 1",
      position: { lat: 37.56368, lng: 126.97558 },
    },
    {
      id: 2,
      name: "마커 2",
      position: { lat: 37.56468, lng: 126.97558 },
    },
    {
      id: 3,
      name: "마커 3",
      position: { lat: 37.56568, lng: 126.97558 },
    },
    {
      id: 4,
      name: "춘천시청",
      position: { lat: 37.881315, lng: 127.72997 },
    },
  ],
  isRefreshBtnOn: false,
  setPosition: (pos) => {
    set({ position: pos });
  },
  resetSpots: () => {
    set({ spots: [] });
  },
  refreshSpots: (newSpots) => {
    set({ spots: newSpots });
  },
  setOpenedModal: (modal) => {
    set({ openedModal: modal });
  },
  closeModal: () => {
    set({ openedModal: -1 });
  },
  setRefreshBtn: (button) => {
    set({ isRefreshBtnOn: button });
  },
}));

export default useMapStore;
