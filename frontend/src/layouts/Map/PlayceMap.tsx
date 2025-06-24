import { Map } from "react-kakao-maps-sdk";
import useMapStore from "../../stores/map-store";
import PlayceMapMarker from "./PlayceMapMarker";
import PlayceModal from "./PlayceModal";

const PlayceMap: React.FC = () => {
  const { spots, openedModal, closeModal } = useMapStore();

  return (
    <div>
      <Map
        center={{ lat: 37.56368, lng: 126.97558 }}
        style={{ width: "100%", height: "100vh" }}
        onClick={() => {
          closeModal();
        }}
      >
        {spots.map((spot) => (
          <>
            <PlayceMapMarker spot={spot}></PlayceMapMarker>
            {openedModal === spot.id && <PlayceModal spot={spot} />}
          </>
        ))}
      </Map>
    </div>
  );
};

export default PlayceMap;
