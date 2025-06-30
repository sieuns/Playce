import { useState } from "react";
import type { StoreFormRequest } from "../../../types/storeFormRequest";
import { dummyRestaurantDetails } from "../../../data/dummyRestaurantDetail";
import { FiChevronLeft, FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import DetailStores from "../../DetailStores/DetailStores";
import type { RestaurantDetail } from "../../../types/restaurant.types";
import StoreFormModal from "./modals/StoreFormModal";

// 변환 함수: RestaurantDetail → StoreFormRequest
const toStoreFormRequest = (store: RestaurantDetail): StoreFormRequest => ({
  store_name: store.store_name,
  business_number: "",
  address: store.address,
  phone: store.phone ?? "",
  opening_hours: store.opening_hours ?? "",
  menus: store.menus ?? [],
  type: store.type ?? "",
  description: store.description ?? "",
  img_urls: store.img_list ?? [],
});

// 초기값: dummyRestaurantDetails를 StoreFormRequest로 변환
const myStores: StoreFormRequest[] =
  dummyRestaurantDetails.map(toStoreFormRequest);

const MyStoreList = () => {
  const [stores, setStores] = useState<StoreFormRequest[]>(myStores);
  const [selectedDetail, setSelectedDetail] = useState<RestaurantDetail | null>(
    null
  );
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<StoreFormRequest | null>(null);

  // 삭제
  const handleRemove = (store_name: string) => {
    if (window.confirm("정말 이 식당을 삭제하시겠습니까?")) {
      setStores((stores) =>
        stores.filter((store) => store.store_name !== store_name)
      );
    }
  };

  // 등록/수정 폼 제출
  const handleSubmit = (data: StoreFormRequest) => {
    if (editTarget) {
      // 수정
      setStores((stores) =>
        stores.map((store) =>
          store.store_name === data.store_name ? data : store
        )
      );
    } else {
      setStores((stores) => [...stores, data]);
    }
    setFormOpen(false);
    setEditTarget(null);
  };

  return (
    <section className="max-w-lg mx-auto mt-8">
      {stores.length === 0 ? (
        <div className="text-gray-400 text-center py-20 text-lg tracking-wide">
          등록된 식당이 없습니다.
          <div className="flex justify-center mt-6">
            <button
              onClick={() => {
                setFormOpen(true);
                setEditTarget(null);
              }}
              className="flex items-center gap-1 px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition"
            >
              <FiPlus className="text-lg" />
              식당 등록
            </button>
          </div>
        </div>
      ) : (
        <>
          <ul>
            {stores.map((store) => (
              <li
                key={store.store_name}
                className="flex items-center gap-4 py-5 border-b border-gray-100 last:border-b-0"
              >
                <img
                  src={store.img_urls?.[0] || "/noimg.png"}
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
                  onClick={() =>
                    setSelectedDetail(
                      dummyRestaurantDetails.find(
                        (d) => d.store_name === store.store_name
                      ) || null
                    )
                  }
                  className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-emerald-50 transition ml-1"
                  aria-label="상세보기"
                >
                  <FiChevronLeft className="text-emerald-500 text-xl" />
                </button>
                {/* 수정 버튼 */}
                <button
                  onClick={() => {
                    setFormOpen(true);
                    setEditTarget(store);
                  }}
                  className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-blue-50 transition ml-1"
                  aria-label="수정"
                >
                  <FiEdit2 className="text-blue-500 text-xl" />
                </button>
                {/* 삭제 버튼 */}
                <button
                  onClick={() => handleRemove(store.store_name)}
                  className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-red-50 transition ml-1"
                  aria-label="삭제"
                >
                  <FiTrash2 className="text-red-500 text-xl" />
                </button>
              </li>
            ))}
          </ul>
          {/* 등록 버튼 (리스트 하단) */}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => {
                setFormOpen(true);
                setEditTarget(null);
              }}
              className="flex items-center gap-1 px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition"
            >
              <FiPlus className="text-lg" />
              식당 등록
            </button>
          </div>
        </>
      )}
      {/* 상세보기 */}
      {selectedDetail && (
        <DetailStores
          detail={selectedDetail}
          onClose={() => setSelectedDetail(null)}
        />
      )}
      {/* 등록/수정 폼 모달 */}
      {formOpen && (
        <StoreFormModal
          mode={editTarget ? "edit" : "create"}
          initial={editTarget ?? undefined}
          onSubmit={handleSubmit}
          onClose={() => {
            setFormOpen(false);
            setEditTarget(null);
          }}
        />
      )}
    </section>
  );
};

export default MyStoreList;
