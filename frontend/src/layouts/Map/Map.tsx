import { Map } from "react-kakao-maps-sdk";

const MapContainer: React.FC = () => {
  return (
    <Map
      center={{ lat: 37.5664, lng: 126.9784 }}
      style={{ width: "100%", height: "100vh" }}
      level={3}
    />
  );
};

export default MapContainer;
