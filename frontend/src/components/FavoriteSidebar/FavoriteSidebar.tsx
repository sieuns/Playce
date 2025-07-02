import { useState } from "react";
import { FiStar } from "react-icons/fi";
import { dummyRestaurantDetails } from "../../data/dummyRestaurantDetail";
import useFavoriteStore from "../../stores/favoriteStore";
import RestaurantCardList from "../RestaurantCardList/RestaurantCardList";
import RestaurantDetailComponent from "../RestaurantDetail/RestaurantDetail.tsx";
import type { RestaurantDetail } from "../../types/restaurant.types";

export default function FavoriteSidebar() {
  const { favoriteIds, removeFavorite } = useFavoriteStore();
  const [expanded, setExpanded] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<RestaurantDetail | null>(
    null
  );

  // 즐겨찾기된 식당 리스트 필터링 및 필요한 필드만 추출
  const favorites = dummyRestaurantDetails
    .filter((store) => favoriteIds.includes(store.id))
    .map((store) => ({
      store_id: store.id,
      store_name: store.store_name,
      main_img: store.img_list?.[0] || "",
      address: store.address,
      type: store.type,
    }));

  // 펼침 여부에 따라 보여줄 식당 리스트 제한
  const visibleFavorites = expanded ? favorites : favorites.slice(0, 3);

  // 상세보기 버튼 클릭 시 해당 식당 상세 데이터 찾아 상태에 저장
  const handleDetail = (store_id: number) => {
    const detail = dummyRestaurantDetails.find((d) => d.id === store_id);
    if (detail) setSelectedDetail(detail);
  };

  return (
    <section className="w-full bg-white px-4 pt-4 pb-3 rounded-xl shadow">
      {/* 헤더 및 펼침/접기 토글 버튼 */}
      <button
        className="flex items-center w-full h-8 border-b border-gray-100 bg-white group mb-3"
        onClick={() => setExpanded((prev) => !prev)}
        aria-label="즐겨찾기 펼치기"
      >
        <FiStar className="text-primary1 text-xl mr-2" />
        <span className="text-lg font-bold flex-1 text-left">즐겨찾기</span>
        <span className="text-xs text-gray-400 mr-2">
          {expanded ? "접기" : "더보기"}
        </span>
      </button>

      {/* 공통 식당 카드 리스트 컴포넌트 */}
      <RestaurantCardList
        stores={visibleFavorites}
        onRemove={removeFavorite}
        showDelete
        showDetail
        compact
        onDetail={handleDetail}
      />

      {/* 상세보기 모달/사이드바 */}
      {selectedDetail && (
        <RestaurantDetailComponent
          detail={selectedDetail}
          onClose={() => setSelectedDetail(null)}
        />
      )}
    </section>
  );
}
