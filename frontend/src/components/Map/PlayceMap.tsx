import { Map } from "react-kakao-maps-sdk";
import useMapStore from "../../stores/map-store";
import PlayceMapMarker from "./PlayceMapMarker";
import PlayceModal from "./PlayceModal";
import SpotRefreshButton from "./SpotRefreshButton";

const PlayceMap: React.FC = () => {
  const { spots, openedModal, isRefreshBtnOn, closeModal, setRefreshBtn } =
    useMapStore();

  return (
    <div className="relative w-full h-screen">
      <Map
        className="w-full h-full"
        center={{ lat: 37.56368, lng: 126.97558 }}
        onClick={() => {
          closeModal();
        }}
        onDragEnd={() => {
          setRefreshBtn(true);
        }}
      >
        {spots.map((spot) => (
          <>
            <PlayceMapMarker spot={spot}></PlayceMapMarker>
            {openedModal === spot.id && <PlayceModal spot={spot} />}
          </>
        ))}
      </Map>
      {/* 이 위치에서 재탐색 버튼 */}
      {isRefreshBtnOn && <SpotRefreshButton />}
    </div>
  );
};

export default PlayceMap;
