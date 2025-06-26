import { useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import useMapStore from "../../stores/mapStore";
import PlayceMapMarker from "./PlayceMapMarker";
import PlayceModal from "./PlayceModal";
import RestaurantDetailComponent from "../DetailStores/DetailStores";
import type { spot } from "../../types/map";

const PlayceMap: React.FC = () => {
  const { position, spots, openedModal, closeModal, setRefreshBtn } =
    useMapStore();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<spot | null>(null);

  return (
    <>
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
          <div key={spot.id}>
            <PlayceMapMarker spot={spot} />
            {openedModal === spot.id && (
              <PlayceModal
                spot={spot}
                onDetailClick={(spot, detail) => {
                  closeModal();
                  setSelectedSpot(spot);
                  setIsDetailOpen(true);
                  console.log(detail);
                }}
                onClose={closeModal}
              />
            )}
          </div>
        ))}
      </Map>
      {isDetailOpen && selectedSpot && (
        <div className="fixed left-0 top-0 h-full w-[370px] z-[9999] shadow-2xl bg-white">
          <RestaurantDetailComponent
            // spot={selectedSpot}
            onClose={() => {
              setIsDetailOpen(false);
              setSelectedSpot(null);
            }}
          />
        </div>
      )}
    </>
  );
};

export default PlayceMap;
