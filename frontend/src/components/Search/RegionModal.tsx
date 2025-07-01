import ModalBase from "../Common/ModalBase";
import RegionPanel from "./RegionPanel";
import { useRegionStore } from "../../stores/regionStore";
import Button from "../Common/Button";

interface RegionModalProps {
  onClose: () => void;
  onApply: (selected: string[]) => void;
}

const RegionModal = ({ onClose, onApply }: RegionModalProps) => {
  const { subRegions, resetRegion } = useRegionStore();

  return (
    <ModalBase onClose={onClose} title="지역" className="p-5">
      <RegionPanel />
      <div className="border-t p-4 flex gap-3">
        <Button onClick={resetRegion} scheme="secondary">
          초기화
        </Button>
        <Button
          onClick={() => {
            onApply(subRegions);
            onClose();
          }}
          scheme="primary"
          className="flex-1"
        >
          적용
        </Button>
      </div>
    </ModalBase>
  );
};

export default RegionModal;
