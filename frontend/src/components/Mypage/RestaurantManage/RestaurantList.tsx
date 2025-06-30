import { useState } from "react";
import type { MyStore } from "../../../types/MyStore";
import { dummyRestaurantDetails } from "../../../data/dummyRestaurantDetail";
import { FiChevronLeft } from "react-icons/fi";
import DetailStores from "../../DetailStores/DetailStores";
import type { RestaurantDetail } from "../../../types/restaurant.types";

const myStores: MyStore[] = dummyRestaurantDetails.map((store) => ({
  store_id: store.id,
  store_name: store.store_name,
  main_img: store.img_list?.[0] || "",
  address: store.address,
}));
{
  /*
const myStores: MyStore[] = [];*/
}

const MyStoreList = () => {
  const [stores] = useState<MyStore[]>(myStores);
  const [selectedDetail, setSelectedDetail] = useState<RestaurantDetail | null>(
    null
  );

  // 상세보기 열기
  const handleShowDetail = (store_id: number) => {
    const detail = dummyRestaurantDetails.find((d) => d.id === store_id);
    if (detail) setSelectedDetail(detail);
  };

  return (
    <section className="max-w-lg mx-auto mt-8">
      {stores.length === 0 ? (
        <div className="text-gray-400 text-center py-20 text-lg tracking-wide">
          등록된 식당이 없습니다.
        </div>
      ) : (
        <ul>
          {stores.map((store) => (
            <li
              key={store.store_id}
              className="flex items-center gap-4 py-5 border-b border-gray-100 last:border-b-0"
            >
              <img
                src={store.main_img || "/noimg.png"}
                alt={store.store_name}
                className="w-16 h-16 rounded-lg object-cover border border-gray-200 bg-gray-100"
              />
              <div className="flex-1 min-w-0">
                <span className="block font-bold text-lg md:text-xl text-gray-900 truncate">
                  {store.store_name}
                </span>
                <span className="block text-gray-600 text-base md:text-lg truncate">
                  {store.address}
                </span>
              </div>
              {/* 상세보기 < 버튼 */}
              <button
                onClick={() => handleShowDetail(store.store_id)}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-emerald-50 transition ml-1"
                aria-label="상세보기"
              >
                <FiChevronLeft className="text-emerald-500 text-xl" />
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

export default MyStoreList;
