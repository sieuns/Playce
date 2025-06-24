import { Button } from "antd";
import useMapStore from "../../stores/map-store";
import { IoReloadOutline } from "react-icons/io5";

const SpotRefreshButton = () => {
  const { setRefreshBtn } = useMapStore();
  return (
    <Button
      icon={<IoReloadOutline />}
      className="absolute top-10 left-1/2 -translate-x-1/2 z-10 items-center justify-center text-lg  pr-[16px] pl-[16px]"
      onClick={() => setRefreshBtn(false)}
    >
      {" "}
      이 위치에서 재탐색
    </Button>
  );
};

export default SpotRefreshButton;
