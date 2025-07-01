import { FaTimes } from "react-icons/fa";
import { dummyRestaurantDetails } from "../../data/dummyRestaurantDetail";
import useFavoriteStore from "../../stores/favoriteStore";
import FavoriteCardList from "../Favorite/FavoriteCardList";

interface FavoriteListProps {
  onClose: () => void;
}

const FavoriteList = ({ onClose }: FavoriteListProps) => {
  const { favoriteIds, removeFavorite } = useFavoriteStore();

  const favoriteStores = dummyRestaurantDetails
    .filter((store) => favoriteIds.includes(store.id))
    .map((store) => ({
      store_id: store.id,
      store_name: store.store_name,
      main_img: store.img_list?.[0] || "",
      address: store.address,
      type: store.type,
    }));

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
      <FavoriteCardList
        stores={favoriteStores}
        onRemove={removeFavorite}
        compact={false}
      />
    </section>
  );
};

export default FavoriteList;
