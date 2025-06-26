import AuthHeader from "../components/Auth/AuthHeader";
import LoginModal from "../components/Auth/Login";
import SignupModal from "../components/Auth/Signup";
import Map from "../components/Map/PlayceMap";
import SpotRefreshButton from "../components/Map/SpotRefreshButton";
import { useGeoLocation } from "../hooks/useGeoLocation";
import useMapStore from "../stores/mapStore";
import SearchPage from "./SearchPage";

const Home: React.FC = () => {
  const { isRefreshBtnOn } = useMapStore();

  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 10,
    maximumAge: 1000 * 3600 * 24,
  };

  useGeoLocation(geolocationOptions);

  return (
    <div className="flex">
      <SearchPage />

      <div className="relative w-full h-screen">
        <Map />
        {/* 이 위치에서 재탐색 버튼 */}
        {isRefreshBtnOn && <SpotRefreshButton />}
        <AuthHeader />
        <LoginModal />
        <SignupModal />
      </div>
    </div>
  );
};

export default Home;
