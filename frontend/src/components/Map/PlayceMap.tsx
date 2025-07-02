import { useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import useMapStore from "../../stores/mapStore";
import PlayceMapMarker from "./PlayceMapMarker";
import PlayceModal from "./PlayceModal";
import RestaurantDetailComponent from "../RestaurantDetail/RestaurantDetail.tsx";
import React from "react";
import { dummyRestaurantDetails } from "../../data/dummyRestaurantDetail";
import type { RestaurantDetail } from "../../types/restaurant.types";

const PlayceMap: React.FC = () => {
  const { position, spots, openedModal, closeModal, setRefreshBtn } =
    useMapStore();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<RestaurantDetail | null>(
    null
  );

  return (
    <>
      <Map
        className="w-full h-full"
        center={position}
        onClick={closeModal}
        onDragEnd={() => setRefreshBtn(true)}
      >
        {spots.map((spot) => {
          const detail = dummyRestaurantDetails.find((d) => d.id === spot.id);
          return (
            <React.Fragment key={spot.id}>
              <PlayceMapMarker spot={spot} />
              {openedModal === spot.id && detail && (
                <PlayceModal
                  spot={spot}
                  detail={detail}
                  // 이벤트 버블링 문제 해결을 위해 onMouseDown에서 stopPropagation!
                  onDetailClick={(_spot, detail) => {
                    setSelectedDetail(detail!);
                    setIsDetailOpen(true);
                    closeModal();
                  }}
                  onClose={closeModal}
                />
              )}
            </React.Fragment>
          );
        })}
      </Map>
      {isDetailOpen && selectedDetail && (
        <div className="fixed left-0 top-0 h-full w-[370px] z-[9999] shadow-2xl bg-white">
          <RestaurantDetailComponent
            detail={selectedDetail}
            onClose={() => {
              setIsDetailOpen(false);
              setSelectedDetail(null);
            }}
          />
        </div>
      )}
    </>
  );
};

export default PlayceMap;
