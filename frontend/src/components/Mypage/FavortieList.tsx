import { useState } from "react";
import { FiStar, FiTrash2 } from "react-icons/fi";
import type { FavoriteStore } from "../../types/Favorite";
import { dummyFavorites } from "../../data/dummyFavorites";

const FavoriteList = () => {
  const [favorites, setFavorites] = useState<FavoriteStore[]>(dummyFavorites);

  const handleRemove = (store_id: number) => {
    setFavorites((prev) => prev.filter((store) => store.store_id !== store_id));
  };

  return (
    <section className="max-w-lg mx-auto mt-4">
      <h2 className="flex items-center gap-2 text-2xl font-bold text-emerald-700 pb-4 border-b border-gray-100">
        <FiStar className="text-yellow-400" />
        즐겨찾기
      </h2>
      {favorites.length === 0 ? (
        <div className="text-gray-400 text-center py-16 text-lg tracking-wide">
          즐겨찾기한 매장이 없습니다.
        </div>
      ) : (
        <ul className="flex flex-col divide-y divide-gray-100">
          {favorites.map((store) => (
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
    </section>
  );
};

export default FavoriteList;
