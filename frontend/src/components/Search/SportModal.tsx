import ModalBase from "../Common/ModalBase";
import Button from "../Common/Button";
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

const SportModal = ({ onClose, onApply }: SportModalProps) => {
  const { sport, league, teams, resetSport } = useSportStore();

  return (
    <ModalBase onClose={onClose} title="경기" className="p-5">
      <div className="flex flex-col gap-5">
        <div className="flex-1 overflow-auto">
          <SportPanel />
        </div>
        <div className="flex gap-2">
          <Button onClick={resetSport} scheme="secondary">
            초기화
          </Button>
          <Button
            onClick={() => {
              onApply({ sport, league, teams });
              onClose();
            }}
            scheme="primary"
            className="flex-1"
          >
            적용
          </Button>
        </div>
      </div>
    </ModalBase>
  );
};

export default SportModal;
