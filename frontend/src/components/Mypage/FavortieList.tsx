import { useState } from "react";
import { FiTrash2, FiChevronLeft } from "react-icons/fi";
import { dummyRestaurantDetails } from "../../data/dummyRestaurantDetail";
import DetailStores from "../DetailStores/DetailStores";
import type { RestaurantDetail } from "../../types/restaurant.types";

const FavoriteList = () => {
  // 즐겨찾기 id만 관리 (초기값 예시)
  const [favoriteIds, setFavoriteIds] = useState<number[]>([1, 2, 3, 4, 5]);
  const [selectedDetail, setSelectedDetail] = useState<RestaurantDetail | null>(
    null
  );

  // 리스트에 표시할 즐겨찾기 매장 정보 추출 (FavoriteStore 타입처럼)
  const favoriteStores = dummyRestaurantDetails
    .filter((store) => favoriteIds.includes(store.id))
    .map((store) => ({
      store_id: store.id,
      store_name: store.store_name,
      main_img: store.img_list?.[0] || "",
      address: store.address,
      type: store.type,
    }));

  // 삭제
  const handleRemove = (store_id: number) => {
    setFavoriteIds((ids) => ids.filter((id) => id !== store_id));
  };

  // 상세보기 > 버튼 클릭
  const handleShowDetail = (store_id: number) => {
    const detail = dummyRestaurantDetails.find((d) => d.id === store_id);
    if (detail) setSelectedDetail(detail);
  };

  return (
    <section className="max-w-lg mx-auto mt-4">
      <h2 className="flex items-center gap-2 text-2xl font-bold pb-4 border-b border-gray-100">
        즐겨찾기
      </h2>
      {favoriteStores.length === 0 ? (
        <div className="text-gray-400 text-center py-16 text-lg tracking-wide">
          즐겨찾기한 매장이 없습니다.
        </div>
      ) : (
        <ul className="flex flex-col divide-y divide-gray-100">
          {favoriteStores.map((store) => (
            <li
              key={store.store_id}
              className="flex items-center gap-4 py-5 px-2 hover:bg-emerald-50 transition"
            >
              <img
                src={store.main_img || "https://via.placeholder.com/60"}
                alt={store.store_name}
                className="w-14 h-14 rounded-lg object-cover border border-gray-100 shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="block text-lg font-semibold text-gray-900 truncate">
                    {store.store_name}
                  </span>
                  <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">
                    {store.type}
                  </span>
                </div>
                <div className="text-gray-500 text-sm truncate mt-1">
                  {store.address}
                </div>
              </div>
              {/* 상세보기 > 버튼 */}
              <button
                onClick={() => handleShowDetail(store.store_id)}
                className="p-2 rounded-full bg-gray-50 hover:bg-emerald-100 transition-colors shadow"
                aria-label="식당 상세보기"
              >
                <FiChevronLeft className="text-emerald-500 text-xl" />
              </button>
              {/* 삭제 버튼 */}
              <button
                onClick={() => handleRemove(store.store_id)}
                className="ml-2 p-2 rounded-full bg-gray-50 hover:bg-red-100 transition-colors shadow"
                aria-label="즐겨찾기 삭제"
              >
                <FiTrash2 className="text-red-400 text-xl" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* 상세보기 사이드바/모달 */}
      {selectedDetail && (
        <DetailStores
          detail={selectedDetail}
          onClose={() => setSelectedDetail(null)}
        />
      )}
    </section>
  );
};

export default FavoriteList;
