import { useState } from "react";
import {
  FiChevronRight,
  FiChevronDown,
  FiStar,
  FiTrash2,
} from "react-icons/fi";
import { dummyFavorites } from "../../data/dummyFavorites";

export default function FavoriteSidebar() {
  // 더미데이터를 상태로 관리 (삭제 반영)
  const [favorites, setFavorites] = useState(dummyFavorites);
  const [expanded, setExpanded] = useState(false);

  // 보여줄 목록 (펼침 여부에 따라 3개 or 전체)
  const visibleFavorites = expanded ? favorites : favorites.slice(0, 3);

  // 삭제 핸들러
  const handleRemove = (store_id: number) => {
    setFavorites(favorites.filter((f) => f.store_id !== store_id));
  };

  return (
    <aside className="w-[360px] h-full bg-white shadow-2xl flex flex-col border-r border-gray-100">
      {/* 헤더 및 토글 */}
      <button
        className="flex items-center w-full h-16 px-4 border-b border-gray-100 bg-white group"
        onClick={() => setExpanded((prev) => !prev)}
        aria-label="즐겨찾기 펼치기"
      >
        <FiStar className="text-emerald-500 text-2xl mr-2" />
        <span className="text-xl font-bold tracking-tight flex-1 text-left">
          즐겨찾기
        </span>
        {expanded ? (
          <FiChevronDown className="text-gray-400 text-2xl group-hover:text-emerald-500 transition" />
        ) : (
          <FiChevronRight className="text-gray-400 text-2xl group-hover:text-emerald-500 transition" />
        )}
      </button>
      {/* 안내문구 (접혔을 때만) */}
      {!expanded && (
        <div className="px-4 pt-3 pb-1 text-sm text-gray-400 leading-relaxed">
          저장한 즐겨찾기에 대해 '홈 목록 추가'한 장소가 나옵니다.
          <br />
          자주 쓰는 즐겨찾기를 더 빠르게 사용해 보세요.
        </div>
      )}
      {/* 즐겨찾기 리스트 */}
      <ul
        className={`flex-1 overflow-y-auto p-4 space-y-4 transition-all duration-300 ${
          expanded ? "max-h-[600px] opacity-100" : "max-h-[220px] opacity-90"
        }`}
      >
        {visibleFavorites.length === 0 ? (
          <li className="text-gray-400 text-center py-12">
            즐겨찾기한 식당이 없습니다.
          </li>
        ) : (
          visibleFavorites.map((store) => (
            <li
              key={store.store_id}
              className="flex items-center bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow p-3 gap-4 group"
            >
              <img
                src={store.main_img || "/noimg.png"}
                alt={store.store_name}
                className="w-14 h-14 rounded-lg object-cover bg-gray-200 border border-gray-100"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-semibold truncate">
                    {store.store_name}
                  </span>
                  <span className="ml-1 text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-600">
                    {store.type}
                  </span>
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {store.address}
                </div>
              </div>
              {/* 삭제 버튼 */}
              <button
                onClick={() => handleRemove(store.store_id)}
                className="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow hover:bg-red-50 transition ml-2"
                aria-label="삭제"
              >
                <FiTrash2 className="text-gray-400 group-hover:text-red-500 text-lg" />
              </button>
            </li>
          ))
        )}
      </ul>
    </aside>
  );
}
