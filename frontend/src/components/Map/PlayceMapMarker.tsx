import { useMap, MapMarker } from "react-kakao-maps-sdk";
import type { spot } from "../../types/map";
import useMapStore from "../../stores/mapStore";

interface PlayceMapMarkerProps {
  spot: spot;
}

const PlayceMapMarker = ({ spot }: PlayceMapMarkerProps) => {
  const map = useMap();
  const { setOpenedModal } = useMapStore();

  return (
    <MapMarker
      position={spot.position}
      onClick={(marker) => {
        map.panTo(marker.getPosition());
        setOpenedModal(spot.id);
      }}
    />
  );
};

export default PlayceMapMarker;
