import SearchResultItem from "./SearchResultItem";
import { mockSearchResults } from "../../data/searchResult";
import { useState } from "react";
import { dummyRestaurantDetails } from "../../data/dummyRestaurantDetail";
import type { RestaurantDetail } from "../../types/restaurant.types";
import RestaurantDetailComponent from "../DetailStores/DetailStores";

type SortType = "distance" | "date";

const SearchResultList = () => {
  const [sortType, setSortType] = useState<SortType>("distance");
  const [selectedDetail, setSelectedDetail] = useState<RestaurantDetail | null>(
    null
  );

  const sortedResults = [...mockSearchResults].sort((a, b) => {
    if (sortType === "distance") {
      return a.distance - b.distance;
    }
    if (sortType === "date") {
      // matchInfo: "7/27 리버풀 vs 밀란"에서 날짜 파싱 필요
      const getDate = (matchInfo: string) => {
        const [month, day] = matchInfo.split(" ")[0].split("/").map(Number);
        return new Date(2025, month - 1, day); // 연도는 임시
      };
      return getDate(a.matchInfo).getTime() - getDate(b.matchInfo).getTime();
    }
    return 0;
  });

  return (
    <div>
      {/* 상단: 검색 결과 텍스트 + 정렬 아이콘 */}
      <div className="flex items-center justify-between border-b px-3">
        <p className="py-1 text-gray-600">검색 결과</p>
        <div className="flex gap-2">
          <button
            onClick={() => setSortType("distance")}
            className={`flex items-center gap-1 text-sm px-2 py-1 ${
              sortType === "distance"
                ? "text-primary5 font-semibold"
                : "text-gray-600 hover:text-primary5"
            }`}
          >
            <span className="py-1">거리순</span>
          </button>
          <div className="w-px h-8 bg-gray-300" />
          <button
            onClick={() => setSortType("date")}
            className={`flex items-center gap-1 text-sm px-2 py-1 ${
              sortType === "date"
                ? "text-primary5 font-semibold"
                : "text-gray-600 hover:text-primary5"
            }`}
          >
            <span className="py-1">날짜순</span>
          </button>
        </div>
      </div>

      {/* 검색 결과 리스트 */}
      <div>
        {sortedResults.map((item) => (
          <SearchResultItem
            key={item.id}
            data={item}
            onClick={() => {
              const detail = dummyRestaurantDetails.find(
                (d) => d.id === item.id
              );
              if (detail) setSelectedDetail(detail);
              else alert("상세 mock 데이터를 찾을 수 없습니다.");
            }}
          />
        ))}

        {selectedDetail && (
          <RestaurantDetailComponent
            detail={selectedDetail}
            onClose={() => setSelectedDetail(null)}
          />
        )}
      </div>
    </div>
  );
};

export default SearchResultList;
