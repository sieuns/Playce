import type { spot } from "../../types/map";
import { CustomOverlayMap } from "react-kakao-maps-sdk";

interface PlayceModalProps {
  spot: spot;
}

const PlayceModal = ({ spot }: PlayceModalProps) => {
  return (
    <CustomOverlayMap
      position={{ lat: spot.position.lat, lng: spot.position.lng }}
    >
      <div
        style={{ width: "100px", height: "100px", backgroundColor: "white" }}
      >
        <h1>{spot.name}</h1>
      </div>
    </CustomOverlayMap>
  );
};
export default PlayceModal;
