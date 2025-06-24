import AuthHeader from "../components/Auth/AuthHeader";
import Map from "../components/Map/PlayceMap";
import SpotRefreshButton from "../components/Map/SpotRefreshButton";
import { useGeoLocation } from "../hooks/useGeoLocation";
import useMapStore from "../stores/map-store";

const Home: React.FC = () => {
  const { isRefreshBtnOn } = useMapStore();

  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 10,
    maximumAge: 1000 * 3600 * 24,
  };

  useGeoLocation(geolocationOptions);

  return (
    <div className="relative w-full h-screen">
      <Map />
      {/* 이 위치에서 재탐색 버튼 */}
      {isRefreshBtnOn && <SpotRefreshButton />}
      <AuthHeader />
    </div>
  );
};

export default Home;
