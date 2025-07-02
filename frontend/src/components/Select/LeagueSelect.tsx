import { sportsMap } from "../../data/sports";

interface LeagueSelectProps {
  sport: string;
  value: string;
  onChange: (value: string) => void;
}

const LeagueSelect = ({ sport, value, onChange }: LeagueSelectProps) => {
  const leagues = sport ? Object.keys(sportsMap[sport]) : [];

  return (
    <div>
      <label className="font-semibold mb-2 block">리그</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={!sport}
        className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:border-primary1 focus:border-2 outline-none"
      >
        <option value="">리그 선택</option>
        {leagues.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LeagueSelect;
