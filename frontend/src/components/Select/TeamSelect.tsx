interface TeamSelectProps {
  teams: string[];
  selected: string[];
  toggle: (team: string) => void;
}

const TeamSelect = ({ teams, selected, toggle }: TeamSelectProps) => {
  return (
    <div>
      <label className="font-semibold mt-5 mb-2 block">팀</label>
      <div className="border p-2 max-h-40 overflow-y-auto">
        <div className="grid grid-cols-2 divide-x divide-gray-300">
          {[0, 1].map((col) => (
            <div key={col} className="flex flex-col gap-2 px-2">
              {teams
                .filter((_, idx) => idx % 2 === col)
                .map((team) => (
                  <label
                    key={team}
                    className="flex justify-between items-center"
                  >
                    <span>{team}</span>
                    <input
                      type="checkbox"
                      className="accent-primary1"
                      checked={selected.includes(team)}
                      onChange={() => toggle(team)}
                    />
                  </label>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSelect;
