import { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiTrash2,
} from "react-icons/fi";
import { dummyRestaurantDetails } from "../../data/dummyRestaurantDetail";
import DetailStores from "../DetailStores/DetailStores";
import type { RestaurantDetail } from "../../types/restaurant.types";

export default function FavoriteSidebar() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([1, 2, 3, 4, 5]);
  const [expanded, setExpanded] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<RestaurantDetail | null>(
    null
  );

  const favorites = dummyRestaurantDetails
    .filter((store) => favoriteIds.includes(store.id))
    .map((store) => ({
      store_id: store.id,
      store_name: store.store_name,
      main_img: store.img_list?.[0] || "",
      address: store.address,
      type: store.type,
    }));

  const visibleFavorites = expanded ? favorites : favorites.slice(0, 3);

  const handleRemove = (store_id: number) => {
    setFavoriteIds((ids) => ids.filter((id) => id !== store_id));
  };

  const handleShowDetail = (store_id: number) => {
    const detail = dummyRestaurantDetails.find((d) => d.id === store_id);
    if (detail) setSelectedDetail(detail);
  };

  return (
    <section className="w-full bg-white rounded-xl shadow-md border border-gray-100 px-0 py-0 mb-4">
      {/* 헤더 및 토글 */}
      <button
        className="flex items-center w-full h-14 px-4 border-b border-gray-50 bg-white group"
        onClick={() => setExpanded((prev) => !prev)}
        aria-label="즐겨찾기 펼치기"
      >
        <FiStar className="text-emerald-500 text-xl mr-2" />
        <span className="text-lg font-bold tracking-tight flex-1 text-left">
          즐겨찾기
        </span>
        {expanded ? (
          <FiChevronRight className="text-gray-400 text-xl group-hover:text-emerald-500 transition rotate-90" />
        ) : (
          <FiChevronRight className="text-gray-400 text-xl group-hover:text-emerald-500 transition" />
        )}
      </button>
      {/* 안내문구 (접혔을 때만) */}
      {!expanded && (
        <div className="px-4 pt-3 pb-1 text-sm text-gray-400 leading-relaxed">
          저장한 즐겨찾기에 대해 '홈 목록 추가'한 장소가 나옵니다.
          <br />
          자주 쓰는 즐겨찾기를 더 빠르게 사용해 보세요.
        </div>
      )}
      {/* 즐겨찾기 리스트 */}
      <ul className="flex-1 p-2 space-y-2">
        {visibleFavorites.length === 0 ? (
          <li className="text-gray-400 text-center py-8">
            즐겨찾기한 식당이 없습니다.
          </li>
        ) : (
          visibleFavorites.map((store) => (
            <li
              key={store.store_id}
              className="flex items-center w-full bg-gray-50 rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow p-2 gap-3 group"
            >
              <img
                src={store.main_img || "/noimg.png"}
                alt={store.store_name}
                className="w-12 h-12 rounded object-cover bg-gray-200 border border-gray-100"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-semibold truncate">
                    {store.store_name}
                  </span>
                  <span className="ml-1 text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-600">
                    {store.type}
                  </span>
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {store.address}
                </div>
              </div>
              {/* 상세보기 < 버튼 */}
              <button
                onClick={() => handleShowDetail(store.store_id)}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-emerald-50 transition ml-1"
                aria-label="상세보기"
              >
                <FiChevronLeft className="text-emerald-500 text-xl" />
              </button>
              {/* 삭제 버튼 */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(store.store_id);
                }}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-red-50 transition ml-1"
                aria-label="삭제"
              >
                <FiTrash2 className="text-gray-400 group-hover:text-red-500 text-base" />
              </button>
            </li>
          ))
        )}
      </ul>
      {/* 상세보기 사이드바/모달 */}
      {selectedDetail && (
        <DetailStores
          detail={selectedDetail}
          onClose={() => setSelectedDetail(null)}
        />
      )}
    </section>
  );
}
