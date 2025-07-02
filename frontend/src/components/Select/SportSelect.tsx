import { sportsMap } from "../../data/sports";

interface SportSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const SportSelect = ({ value, onChange }: SportSelectProps) => {
  return (
    <div>
      <label className=" font-semibold mb-2 block">종목</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:border-primary1 focus:border-2 outline-none"
      >
        <option value="">종목 선택</option>
        {Object.keys(sportsMap).map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SportSelect;
