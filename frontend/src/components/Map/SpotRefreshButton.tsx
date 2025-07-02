import Button from "../Common/Button";
import useMapStore from "../../stores/mapStore";
import { IoReloadOutline } from "react-icons/io5";
import { searchNearby } from "../../api/map.api";

const SpotRefreshButton = () => {
  const { setRefreshBtn } = useMapStore();
  return (
    <Button
      icon={<IoReloadOutline />}
      size="medium"
      scheme="secondary"
      className="absolute top-[80px] left-1/2 -translate-x-1/2 z-10 rounded-lg"
      onClick={() => {
        searchNearby({ lat: 37.5665, lng: 126.978, radius: 5 });
        setRefreshBtn(false);
      }}
    >
      이 위치에서 재탐색
    </Button>
  );
};

export default SpotRefreshButton;
