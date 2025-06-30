import { create } from "zustand";
import { Dayjs } from "dayjs";

interface BroadcastFormState {
  date: Dayjs | null;
  time: Dayjs | null;
  sport: string;
  league: string;
  team1: string | null;
  team2: string | null;
  note: string;

  setDate: (date: Dayjs | null) => void;
  setTime: (time: Dayjs | null) => void;
  setSport: (sport: string) => void;
  setLeague: (league: string) => void;
  setteam1: (team: string) => void;
  setteam2: (team: string) => void;
  setNote: (note: string) => void;

  resetForm: () => void;
  setInitialForm: (data: Partial<BroadcastFormState>) => void;
}

const useBroadcastFormStore = create<BroadcastFormState>((set) => ({
  date: null,
  time: null,
  sport: "",
  league: "",
  team1: null,
  team2: null,
  note: "",

  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  setSport: (sport) => set({ sport, league: "", team1: "", team2: "" }),
  setLeague: (league) => set({ league, team1: "", team2: "" }),
  setteam1: (team) => set({ team1: team }),
  setteam2: (team) => set({ team2: team }),
  setNote: (note) => set({ note }),
  resetForm: () =>
    set({
      date: null,
      time: null,
      sport: "",
      league: "",
      team1: "",
      team2: "",
      note: "",
    }),
  setInitialForm: (data) => set({ ...data }),
}));

export default useBroadcastFormStore;
