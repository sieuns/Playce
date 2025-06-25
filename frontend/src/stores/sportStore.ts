import { create } from "zustand";

interface SportState {
  sport: string;
  league: string;
  teams: string[];

  setSport: (sport: string) => void;
  setLeague: (league: string) => void;
  toggleTeam: (team: string) => void;
  resetSport: () => void;
}

export const useSportStore = create<SportState>((set, get) => ({
  sport: "",
  league: "",
  teams: [],

  setSport: (sport) => set({ sport, league: "", teams: [] }),
  setLeague: (league) => set({ league, teams: [] }),
  toggleTeam: (team) => {
    const current = get().teams;
    if (current.includes(team)) {
      set({ teams: current.filter((t) => t !== team) });
    } else {
      set({ teams: [...current, team] });
    }
  },
  resetSport: () => set({ sport: "", league: "", teams: [] }),
}));
