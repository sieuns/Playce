import { useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import useMapStore from "../../stores/map-store";
import PlayceMapMarker from "./PlayceMapMarker";
import PlayceModal from "./PlayceModal";
import SpotRefreshButton from "./SpotRefreshButton";
import RestaurantDetailComponent from "../DetailStores/DetailStores";
import type { spot } from "../../types/map";

const PlayceMap: React.FC = () => {
  const { spots, openedModal, isRefreshBtnOn, closeModal, setRefreshBtn } =
    useMapStore();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<spot | null>(null);

  console.log("isDetailOpen:", isDetailOpen);
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
          <div key={spot.id}>
            <PlayceMapMarker spot={spot} />
            {openedModal === spot.id && (
              <PlayceModal
                spot={spot}
                onDetailClick={(spot, detail) => {
                  closeModal();
                  setSelectedSpot(spot);
                  setIsDetailOpen(true);
                }}
                onClose={closeModal}
              />
            )}
          </div>
        ))}
      </Map>
      {isRefreshBtnOn && <SpotRefreshButton />}+{" "}
      {isDetailOpen && selectedSpot && (
        <div className="fixed left-0 top-0 h-full w-[370px] z-[9999] shadow-2xl bg-white">
          <RestaurantDetailComponent
            spot={selectedSpot}
            onClose={() => {
              setIsDetailOpen(false);
              setSelectedSpot(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PlayceMap;
