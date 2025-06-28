// FavoriteSidebar.jsx
import { useState } from "react";
import {
  FiChevronRight,
  FiChevronDown,
  FiStar,
  FiTrash2,
} from "react-icons/fi";
import { dummyFavorites } from "../../data/dummyFavorites";

export default function FavoriteSidebar() {
  const [favorites, setFavorites] = useState(dummyFavorites);
  const [expanded, setExpanded] = useState(false);

  const visibleFavorites = expanded ? favorites : favorites.slice(0, 3);

  const handleRemove = (store_id: number) => {
    setFavorites(favorites.filter((f) => f.store_id !== store_id));
  };

  return (
    <section className="w-full bg-white mb-4">
      <div>
        {/* 헤더 및 토글 */}
        <button
          className="flex items-center w-full h-7 px-4 border-b border-gray-50 bg-white group"
          onClick={() => setExpanded((prev) => !prev)}
          aria-label="즐겨찾기 펼치기"
        >
          <FiStar className="text-primary1 text-xl mr-2" />
          <span className="text-lg font-bold text-mainText tracking-tight flex-1 text-left">
            즐겨찾기
          </span>
          {expanded ? (
            <FiChevronDown className="text-gray-600 text-xl group-hover:text-primary5 transition" />
          ) : (
            <FiChevronRight className="text-gray-600 text-xl group-hover:text-primary5 transition" />
          )}
        </button>
        {/* 안내문구 (접혔을 때만) */}
        {!expanded && (
          <div className="px-4 pt-3 pb-1 text-sm text-subText leading-relaxed">
            저장한 즐겨찾기에 대해 '홈 목록 추가'한 장소가 나옵니다.
            <br />
            자주 쓰는 즐겨찾기를 더 빠르게 사용해 보세요.
          </div>
        )}
      </div>
      <div className="border-t border-gray-200 my-1" />
      {/* 즐겨찾기 리스트 */}
      <div>
        <ul className="flex-1 p-2 space-y-2">
          {visibleFavorites.length === 0 ? (
            <li className="text-gray-400 text-center py-8">
              즐겨찾기한 식당이 없습니다.
            </li>
          ) : (
            visibleFavorites.map((store, index) => (
              <li
                key={store.store_id}
                className={`flex items-center w-full p-2 gap-3 group ${
                  index !== visibleFavorites.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
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
                    <span className="ml-1 text-xs px-2 py-0.5 rounded  bg-primary3 text-primary5">
                      {store.type}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {store.address}
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(store.store_id)}
                  className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-red-50 transition ml-1"
                  aria-label="삭제"
                >
                  <FiTrash2 className="text-gray-400 group-hover:text-red-500 text-base" />
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
