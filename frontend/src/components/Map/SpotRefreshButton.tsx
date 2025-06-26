import { Button } from "antd";
import useMapStore from "../../stores/mapStore";
import { IoReloadOutline } from "react-icons/io5";

const SpotRefreshButton = () => {
  const { setRefreshBtn } = useMapStore();
  return (
    <Button
      icon={<IoReloadOutline />}
      size="large"
      className="absolute top-[80px] left-1/2 -translate-x-1/2 z-10 text-lg"
      onClick={() => setRefreshBtn(false)}
    >
      이 위치에서 재탐색
    </Button>
  );
};

export default SpotRefreshButton;
