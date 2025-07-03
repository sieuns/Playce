import { useRef, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import useMapStore from "../../stores/mapStore";
import PlayceMapMarker from "./PlayceMapMarker";
import PlayceModal from "./PlayceModal";
import RestaurantDetailComponent from "../RestaurantDetail/RestaurantDetail.tsx";
import React from "react";
import { dummyRestaurantDetails } from "../../data/dummyRestaurantDetail";
import type { RestaurantDetail } from "../../types/restaurant.types";

const PlayceMap: React.FC = () => {
  const {
    position,
    restaurants,
    openedModal,
    setPosition,
    closeModal,
    setRefreshBtn,
  } = useMapStore();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<RestaurantDetail | null>(
    null
  );

  const mapRef = useRef<kakao.maps.Map>(null);

  const getCurPosition = () => {
    const map = mapRef.current;
    if (!map) {
      return;
    }

    const center = map.getCenter();

    return {
      lat: center.getLat(),
      lng: center.getLng(),
    };
  };

  return (
    <>
      <Map
        className="w-full h-full"
        ref={mapRef}
        center={position}
        onClick={closeModal}
        onDragEnd={() => {
          setRefreshBtn(true);
          const pos = getCurPosition();
          if (pos === undefined) {
            alert("위치 정보를 불러올 수 없습니다");
            return;
          }
          setPosition(pos);
        }}
      >
        {restaurants.map((restaurant) => {
          const detail = dummyRestaurantDetails.find(
            (d) => d.id === restaurant.store_id
          );
          return (
            <React.Fragment key={restaurant.store_id}>
              <PlayceMapMarker restaurant={restaurant} />
              {openedModal === restaurant.store_id && detail && (
                <PlayceModal
                  restaurant={restaurant}
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
