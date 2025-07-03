import Button from "../Common/Button";
import useMapStore from "../../stores/mapStore";
import { IoReloadOutline } from "react-icons/io5";
import { searchNearby } from "../../api/map.api";

interface SpotRefreshButtonProps {
  position: kakao.maps.LatLng | undefined;
}

const SpotRefreshButton = ({ position }: SpotRefreshButtonProps) => {
  const { setRefreshBtn, setRestaurants } = useMapStore();
  return (
    <Button
      icon={<IoReloadOutline />}
      size="medium"
      scheme="secondary"
      className="absolute top-[80px] left-1/2 -translate-x-1/2 z-10 rounded-lg"
      onClick={async () => {
        if (position === undefined) {
          alert("위치 정보를 받아오는 데 실패했습니다");
          return;
        }
        const res = await searchNearby({
          lat: position.getLat(),
          lng: position.getLng(),
          radius: 5,
        });
        setRestaurants(res.data);
        setRefreshBtn(false);
      }}
    >
      이 위치에서 재탐색
    </Button>
  );
};

export default SpotRefreshButton;
