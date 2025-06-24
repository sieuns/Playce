import type { spot } from "../../types/map";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { FiStar, FiShare2, FiMapPin, FiClock, FiPhone } from "react-icons/fi";

interface PlayceModalProps {
  spot: spot;
  onDetailClick: (spot: spot) => void;
}

const defaultImage =
  "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&w=400&q=80";

const PlayceModal = ({ spot, onDetailClick }: PlayceModalProps) => (
  <CustomOverlayMap
    position={{ lat: spot.position.lat, lng: spot.position.lng }}
  >
    <div className="w-72 bg-white rounded-xl shadow-xl p-4 font-pretendard">
      {/* 대표 이미지 */}
      <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
        <img
          src={spot.img_url || defaultImage}
          alt={spot.name}
          className="w-full h-full object-cover"
        />
        {/* 저장/공유 버튼 (이미지 위 우상단) */}
        <div className="absolute top-2 right-2 flex gap-2">
          <button className="bg-white/80 rounded-full p-2 shadow hover:bg-green-100 transition">
            <FiStar className="text-green-600 text-lg" />
          </button>
          <button className="bg-white/80 rounded-full p-2 shadow hover:bg-green-100 transition">
            <FiShare2 className="text-green-600 text-lg" />
          </button>
        </div>
      </div>

      {/* 정보 */}
      <div className="flex items-center gap-2 mb-1 text-sm">
        <FiMapPin className="text-base" />
        <span>{spot.address}</span>
      </div>
      <div className="flex items-center gap-2 mb-1 text-sm">
        <FiClock className="text-base" />
        <span>{spot.opening_hours}</span>
      </div>
      <div className="flex items-center gap-2 mb-3 text-sm">
        <FiPhone className="text-base" />
        <span>{spot.phone}</span>
      </div>
      {/* 상세보기 버튼 */}
      <button
        onClick={() => onDetailClick(spot)}
        className="w-full py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
      >
        상세보기
      </button>
    </div>
  </CustomOverlayMap>
);

export default PlayceModal;
