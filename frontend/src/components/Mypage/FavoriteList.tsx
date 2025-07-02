import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { dummyRestaurantDetails } from "../../data/dummyRestaurantDetail";
import useFavoriteStore from "../../stores/favoriteStore";
import RestaurantCardList from "../RestaurantCardList/RestaurantCardList";
import RestaurantDetailComponent from "../RestaurantDetail/RestaurantDetail.tsx";
import type { RestaurantDetail } from "../../types/restaurant.types";

interface FavoriteListProps {
  onClose: () => void;
}

const FavoriteList = ({ onClose }: FavoriteListProps) => {
  const { favoriteIds, removeFavorite } = useFavoriteStore();
  const [selectedDetail, setSelectedDetail] = useState<RestaurantDetail | null>(
    null
  );

  const favoriteStores = dummyRestaurantDetails
    .filter((store) => favoriteIds.includes(store.id))
    .map((store) => ({
      store_id: store.id,
      store_name: store.store_name,
      main_img: store.img_list?.[0] || "",
      address: store.address,
      type: store.type,
    }));

  // 상세보기 버튼 클릭 시
  const handleDetail = (store_id: number) => {
    const detail = dummyRestaurantDetails.find((d) => d.id === store_id);
    if (detail) setSelectedDetail(detail);
  };

  return (
    <section className="px-2">
      <div className="flex items-center justify-between text-lg font-semibold my-5">
        <div className="flex items-center gap-3">즐겨찾기</div>
        <button
          onClick={onClose}
          className="hover:text-primary5"
          aria-label="마이페이지 닫기"
        >
          <FaTimes />
        </button>
      </div>
      <RestaurantCardList
        stores={favoriteStores}
        onRemove={removeFavorite}
        showDelete
        showDetail
        compact={false}
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
};

export default FavoriteList;
