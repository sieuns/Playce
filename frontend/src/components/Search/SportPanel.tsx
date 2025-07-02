import { useSportStore } from "../../stores/sportStore";
import { sportsMap } from "../../data/sports";

import SportSelect from "../Select/SportSelect";
import LeagueSelect from "../Select/LeagueSelect";
import TeamSelect from "../Select/TeamSelect";

const SportPanel = () => {
  const { sport, league, teams, setSport, setLeague, toggleTeam } =
    useSportStore();

  const teamList = sport && league ? sportsMap[sport][league] : [];

  return (
    <div>
      <div className="flex gap-5 mt-5">
        <div className="flex-1">
          <SportSelect value={sport} onChange={setSport} />
        </div>
        <div className="flex-1">
          <LeagueSelect sport={sport} value={league} onChange={setLeague} />
        </div>
      </div>

      {league && (
        <TeamSelect teams={teamList} selected={teams} toggle={toggleTeam} />
      )}
    </div>
  );
};

export default SportPanel;
