import type { RestaurantBasic } from "../../types/restaurant.types";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { FiStar, FiMapPin, FiX } from "react-icons/fi";
import Button from "../Common/Button";
import useFavoriteStore from "../../stores/favoriteStore";

const defaultImage = "https://placehold.co/300x200?text=No+Image";

interface PlayceModalProps {
  restaurant: RestaurantBasic;
  onDetailClick: (restaurant: RestaurantBasic) => void;
  onClose: () => void;
}

const PlayceModal = ({
  restaurant,
  onDetailClick,
  onClose,
}: PlayceModalProps) => {
  const { favoriteIds, addFavorite, removeFavorite } = useFavoriteStore();
  const isFavorite = favoriteIds.includes(restaurant.store_id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(restaurant.store_id);
    } else {
      addFavorite(restaurant.store_id);
    }
  };

  return (
    <CustomOverlayMap
      position={{ lat: restaurant.lat, lng: restaurant.lng }}
      yAnchor={1.2}
    >
      <div className="relative w-72 bg-white rounded-2xl shadow-xl p-4 font-pretendard">
        {/* 대표 이미지 + 닫기/저장 버튼 */}
        <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
          <img
            src={restaurant.main_img || defaultImage}
            alt={restaurant.store_name || "가게 이미지"}
            className="w-full h-full object-cover"
          />
          {/* 좌상단: 저장(즐겨찾기) 버튼 */}
          <div className="absolute left-2 top-2 flex gap-2 z-10">
            <button
              onMouseDown={(e) => e.stopPropagation()}
              onClick={handleToggleFavorite}
              className="bg-white/80 rounded-full p-2 shadow hover:bg-primary3 transition flex items-center justify-center"
              aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
            >
              {isFavorite ? (
                <FiStar className="text-yellow-400 text-lg" />
              ) : (
                <FiStar className="text-primary5 text-lg" />
              )}
            </button>
          </div>
          {/* 우상단: 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute right-2 top-2 z-10 bg-white/80 rounded-full p-2 shadow hover:bg-primary3 transition flex items-center justify-center"
            aria-label="닫기"
          >
            <FiX className="text-primary5 text-lg" />
          </button>
        </div>

        {/* 가게 이름 + 업종 뱃지 */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold text-gray-900 truncate">
            {restaurant.store_name || "가게명 없음"}
          </span>
          <span className="ml-2 text-xs bg-primary3 text-primary5 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
            {restaurant.type}
          </span>
        </div>

        {/* 주소 */}
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <FiMapPin className="text-base text-primary5" />
          <span className="truncate">
            {restaurant.address || "주소 정보 없음"}
          </span>
        </div>

        {/* 상세보기 버튼 */}
        <Button
          size="medium"
          scheme="primary"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => onDetailClick(restaurant)}
          className="w-full"
        >
          상세보기
        </Button>
      </div>
    </CustomOverlayMap>
  );
};

export default PlayceModal;
