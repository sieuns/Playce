import { Dayjs } from "dayjs";

export interface BroadcastFormData {
  match_date: string;
  match_time: string;
  sport: string;
  league: string;
  team_one: string;
  team_two: string;
  etc?: string;
}

export interface BroadcastFormModalProps {
  mode: "create" | "edit";
  onSubmit: (data: BroadcastFormData) => void;
  onClose: () => void;
}

export interface BroadcastFormState {
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
  setteam1: (team: string | null) => void;
  setteam2: (team: string | null) => void;
  setNote: (note: string) => void;

  resetForm: () => void;
  setInitialForm: (data: Partial<BroadcastFormState>) => void;
}
