import { FiChevronLeft, FiTrash2, FiEdit2 } from "react-icons/fi";

interface RestaurantCardListProps {
  stores: {
    store_id: number;
    store_name: string;
    main_img: string;
    address: string;
    type: string;
  }[];
  onRemove?: (store_id: number) => void;
  onEdit?: (store_id: number) => void;
  onDetail?: (store_id: number) => void;
  showDelete?: boolean;
  showEdit?: boolean;
  showDetail?: boolean;
  compact?: boolean;
}

export default function RestaurantCardList({
  stores,
  onRemove,
  onEdit,
  onDetail,
  showDelete = false,
  showEdit = false,
  showDetail = true,
  compact = false,
}: RestaurantCardListProps) {
  return (
    <ul className={compact ? "" : "flex flex-col divide-y divide-gray-100"}>
      {stores.length === 0 ? (
        <li className="text-gray-400 text-center py-8">식당이 없습니다.</li>
      ) : (
        stores.map((store) => (
          <li
            key={store.store_id}
            className={
              compact
                ? "flex items-center gap-3 py-3 border-b border-gray-100 last:border-0"
                : "flex items-center gap-4 p-3"
            }
          >
            <img
              src={store.main_img || "/noimg.png"}
              alt={store.store_name}
              className={
                compact
                  ? "w-11 h-11 rounded object-cover bg-gray-200 border border-gray-100"
                  : "w-16 h-16 rounded-lg object-cover border border-gray-100 shadow-sm"
              }
            />
            <div className="flex-1 min-w-0">
              <div
                className={
                  compact
                    ? "flex items-center gap-1"
                    : "flex items-center gap-2"
                }
              >
                <span
                  className={
                    compact
                      ? "font-semibold truncate"
                      : "block text-lg font-semibold text-gray-900 truncate"
                  }
                >
                  {store.store_name}
                </span>
                <span
                  className={
                    compact
                      ? "ml-1 text-xs px-2 py-0.5 rounded bg-primary3 text-primary5"
                      : "text-xs bg-primary4 text-emerald-600 px-2 py-0.5 rounded-full font-medium"
                  }
                >
                  {store.type}
                </span>
              </div>
              <div
                className={
                  compact
                    ? "text-xs text-gray-500 truncate"
                    : "text-gray-500 text-sm truncate mt-1"
                }
              >
                {store.address}
              </div>
            </div>
            {/* 상세보기 버튼 */}
            {showDetail && (
              <button
                onClick={() => onDetail && onDetail(store.store_id)}
                className={
                  compact
                    ? "w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-primary1 transition ml-1"
                    : "p-2 rounded-full bg-gray-50 hover:bg-emerald-100 transition-colors shadow"
                }
                aria-label="상세보기"
              >
                <FiChevronLeft
                  className={
                    compact
                      ? "text-primary5 text-xl"
                      : "text-emerald-500 text-xl"
                  }
                />
              </button>
            )}
            {/* 수정 버튼 */}
            {showEdit && (
              <button
                onClick={() => onEdit && onEdit(store.store_id)}
                className={
                  compact
                    ? "w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-blue-50 transition ml-1"
                    : "ml-2 p-2 rounded-full bg-gray-50 hover:bg-blue-100 transition-colors shadow"
                }
                aria-label="수정"
              >
                <FiEdit2 className="text-blue-400 text-xl" />
              </button>
            )}
            {/* 삭제 버튼 */}
            {showDelete && (
              <button
                onClick={() => onRemove && onRemove(store.store_id)}
                className={
                  compact
                    ? "w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-red-50 transition ml-1"
                    : "ml-2 p-2 rounded-full bg-gray-50 hover:bg-red-100 transition-colors shadow"
                }
                aria-label="삭제"
              >
                <FiTrash2
                  className={
                    compact
                      ? "text-gray-400 group-hover:text-red-500 text-base"
                      : "text-red-400 text-xl"
                  }
                />
              </button>
            )}
          </li>
        ))
      )}
    </ul>
  );
}
