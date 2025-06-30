import type { StoreFormRequest } from "../../../../types/storeFormRequest";
import { dummyRestaurantDetails } from "../../../../data/dummyRestaurantDetail";
import type { RestaurantDetail } from "../../../../types/restaurant.types";

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

const BroadcastRestaurants = () => {
  return (
    <section>
      {myStores.length === 0 ? (
        <div className="text-gray-400 text-center py-20 text-lg tracking-wide">
          등록된 식당이 없습니다.
        </div>
      ) : (
        <ul>
          {myStores.map((store) => (
            <div
              key={store.store_name}
              className="flex items-center gap-4 p-3 border-b border-gray-100 last:border-b-0 hover:bg-lightgray hover:cursor-pointer"
            >
              <img
                src={store.img_urls?.[0] || "/noimg.png"}
                alt={store.store_name}
                className="w-16 h-16 rounded-lg object-cover border border-gray-200 bg-gray-100"
              />
              <div className="flex-1">
                <span className="block font-bold text-lg md:text-xl text-gray-900 truncate">
                  {store.store_name}
                </span>
                <span className="block text-gray-600 text-base md:text-lg truncate">
                  {store.address}
                </span>
              </div>
            </div>
          ))}
        </ul>
      )}
    </section>
  );
};

export default BroadcastRestaurants;
