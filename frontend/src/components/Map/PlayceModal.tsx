import type { spot } from "../../types/map";
import type { RestaurantDetail } from "../../types/restaurant.types";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import {
  FiStar,
  FiShare2,
  FiMapPin,
  FiClock,
  FiPhone,
  FiX,
} from "react-icons/fi";
import Button from "../Common/Button";

const defaultImage =
  "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&w=400&q=80";

interface PlayceModalProps {
  spot: spot;
  detail?: RestaurantDetail;
  onDetailClick: (spot: spot, detail?: RestaurantDetail) => void;
  onClose: () => void;
}

const PlayceModal = ({
  spot,
  detail,
  onDetailClick,
  onClose,
}: PlayceModalProps) => (
  <CustomOverlayMap
    position={{ lat: spot.position.lat, lng: spot.position.lng }}
    yAnchor={1.2}
  >
    <div className="relative w-72 bg-white rounded-2xl shadow-xl p-4 font-pretendard">
      {/* 대표 이미지 + 닫기/저장/공유 버튼 */}
      <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
        <img
          src={detail?.img_list?.[0] || defaultImage}
          alt={detail?.store_name || "가게 이미지"}
          className="w-full h-full object-cover"
        />
        {/* 좌상단: 저장/공유 버튼 */}
        <div className="absolute left-2 top-2 flex gap-2 z-10">
          <button className="bg-white/80 rounded-full p-2 shadow hover:bg-primary3 transition flex items-center justify-center">
            <FiStar className="text-primary5 text-lg" />
          </button>
          <button className="bg-white/80 rounded-full p-2 shadow hover:bg-primary3 transition flex items-center justify-center">
            <FiShare2 className="text-primary5 text-lg" />
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

      {/* 정보 */}
      <div className="flex items-center gap-2 mb-1 text-sm">
        <FiMapPin className="text-base text-primary5" />
        <span>{detail?.address || "주소 정보 없음"}</span>
      </div>
      <div className="flex items-center gap-2 mb-1 text-sm">
        <FiClock className="text-base text-primary5" />
        <span>{detail?.opening_hours || "영업시간 정보 없음"}</span>
      </div>
      <div className="flex items-center gap-2 mb-3 text-sm">
        <FiPhone className="text-base text-primary5" />
        <span>{detail?.phone || "전화번호 정보 없음"}</span>
      </div>
      {/* 상세보기 버튼 */}
      <Button
        size="medium"
        scheme="primary"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={() => {
          console.log("PlayceModal 상세보기 버튼 클릭!", spot, detail);
          onDetailClick(spot, detail);
        }}
        className="w-full"
      >상세보기</Button>
    </div>
  </CustomOverlayMap>
);

export default PlayceModal;
