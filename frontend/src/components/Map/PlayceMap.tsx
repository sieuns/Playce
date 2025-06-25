import { Map } from "react-kakao-maps-sdk";
import useMapStore from "../../stores/mapStore";
import PlayceMapMarker from "./PlayceMapMarker";
import PlayceModal from "./PlayceModal";

const PlayceMap: React.FC = () => {
  const { position, spots, openedModal, closeModal, setRefreshBtn } =
    useMapStore();

  return (
    <Map
      className="w-full h-full"
      center={position}
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
  );
};

export default PlayceMap;
