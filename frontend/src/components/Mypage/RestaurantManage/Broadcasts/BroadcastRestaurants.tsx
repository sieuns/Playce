import { dummyRestaurantDetails } from "../../../../data/dummyRestaurantDetail";
import useBroadcastStore from "../../../../stores/broadcastStore";
import useMypageStore from "../../../../stores/mypageStore";

const BroadcastRestaurants = () => {
  const myStores = dummyRestaurantDetails;
  const { setRestaurant } = useBroadcastStore();
  const { setRestaurantSubpage } = useMypageStore();

  return (
    <section className="pl-2">
      {myStores.length === 0 ? (
        <div className="text-gray-400 text-center py-20 text-lg tracking-wide">
          등록된 식당이 없습니다.
        </div>
      ) : (
        <ul>
          {myStores.map((store) => (
            <div
              key={store.store_name}
              className="flex items-center gap-4 p-3 border-b border-gray-100 last:border-b-0 hover:bg-primary4 hover:cursor-pointer"
              onClick={() => {
                setRestaurant(store.store_name, store.id);
                setRestaurantSubpage("schedule-view-broadcasts");
              }}
            >
              <img
                src={store.img_list?.[0] || "/noimg.png"}
                alt={store.store_name}
                className="w-16 h-16 rounded-lg object-cover border border-gray-200 bg-gray-100"
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
            </div>
          ))}
        </ul>
      )}
    </section>
  );
};

export default BroadcastRestaurants;
