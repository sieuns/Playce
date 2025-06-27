import ModalBase from "../Common/ModalBase";
import SportPanel from "./SportPanel";
import { useSportStore } from "../../stores/sportStore";

interface SportModalProps {
  onClose: () => void;
  onApply: (selected: {
    sport: string;
    league: string;
    teams: string[];
  }) => void;
}

const SportModal = ({ onClose, onApply}: SportModalProps) => {
  const { sport, league, teams, resetSport } = useSportStore();

  return (
    <ModalBase onClose={onClose} title="경기">
      <div className="p-4 flex-1 overflow-auto">
        <SportPanel />
      </div>
      <div className="border-t p-4 flex gap-2">
        <button
          onClick={resetSport}
          className="px-4 py-2 border rounded hover:bg-gray-50"
        >
          초기화
        </button>
        <button
          onClick={() => {
            onApply({ sport, league, teams });
            onClose();
          }}
          className="flex-1 px-4 py-2 bg-primary2 text-black rounded hover:bg-primary1"
        >
          적용
        </button>
      </div>
    </ModalBase>
  );
};

export default SportModal;
