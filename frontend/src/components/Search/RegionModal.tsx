import ModalBase from "../common/ModalBase";
import RegionPanel from "./RegionPanel";
import { useRegionStore } from "../../stores/regionStore";

interface RegionModalProps {
  onClose: () => void;
  onApply: (selected: string[]) => void;
}

const RegionModal = ({ onClose, onApply }: RegionModalProps) => {
  const { subRegions, resetRegion } = useRegionStore();

  return (
    <ModalBase onClose={onClose} title="지역">
      <RegionPanel />
      <div className="border-t p-4 flex gap-3">
        <button
          onClick={resetRegion}
          className="px-4 py-2 border rounded hover:bg-gray-50"
        >
          초기화
        </button>
        <button
          onClick={() => {
            onApply(subRegions);
            onClose();
          }}
          className="flex-1 px-4 py-2 bg-primary2 text-white rounded hover:bg-primary1"
        >
          적용
        </button>
      </div>
    </ModalBase>
  );
};

export default RegionModal;
