import { sportsMap } from "../../data/sports";
import { useSportStore } from "../../stores/sportStore";

const SportPanel = () => {
  const { sport, league, teams, setSport, setLeague, toggleTeam } =
    useSportStore();

  const leagues = sport ? Object.keys(sportsMap[sport]) : [];
  const teamList = sport && league ? sportsMap[sport][league] : [];

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex gap-4">
        {/* 종목 */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold mb-2">종목</h3>
          <select
            onChange={(e) => setSport(e.target.value)}
            value={sport}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary1"
          >
            <option value="">종목 선택</option>
            {Object.keys(sportsMap).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* 리그 */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold mb-2">리그</h3>
          <select
            onChange={(e) => setLeague(e.target.value)}
            value={league}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary1"
            disabled={!sport}
          >
            <option value="">리그 선택</option>
            {leagues.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 팀 선택 */}
      {league && (
        <div>
          <h3 className="text-sm font-semibold mb-2">팀</h3>
          <div className="border p-2 max-h-40 overflow-y-auto">
            <div className="grid grid-cols-2 divide-x divide-gray-300">
              {[0, 1].map((col) => (
                <div key={col} className="flex flex-col gap-2 px-2">
                  {teamList
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
                          checked={teams.includes(team)}
                          onChange={() => toggleTeam(team)}
                        />
                      </label>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SportPanel;
