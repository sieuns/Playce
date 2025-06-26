import { useState } from "react";
import RegionModal from "../layouts/Search/RegionModal";
import { useRegionStore } from "../stores/regionStore";
import { getMainRegion } from "../data/regions";
import SportModal from "../layouts/Search/SportModal";
import { useSportStore } from "../stores/sportStore";
import SearchInput from "../layouts/Search/SearchInput";
import SearchButton from "../layouts/Search/SearchButton";
import SearchResultList from "../layouts/Search/SearchResultList";

const SearchPage = () => {
  const [showRegionModal, setShowRegionModal] = useState(false);
  const { subRegions } = useRegionStore();

  const selectedLabel =
    subRegions.length === 0
      ? "지역"
      : subRegions.length === 1
      ? `${getMainRegion(subRegions[0])} ${subRegions[0]}`
      : `${getMainRegion(subRegions[0])} ${subRegions[0]} 외 ${
          subRegions.length - 1
        }곳`;

  const [showSportModal, setShowSportModal] = useState(false);
  const { sport, league, teams } = useSportStore();

  const selectedSportLabel = !sport
    ? "경기"
    : teams.length === 0
    ? `${sport} ${league}`
    : teams.length === 1
    ? `${sport} ${league} ${teams[0]}`
    : `${sport} ${league} ${teams[0]} 외 ${teams.length - 1}팀`;

  return (
    <div className="h-screen bg-white">
      {/* 사이드바 */}
      <aside className="w-[430px] p-3 overflow-y-auto border-r">
        <div className="-mx-3 -my-3 bg-primary4 px-3 py-3">
          {/* 지역/경기 선택 */}
          <div className="flex gap-2 mb-2 w-full">
            <div className="flex-1">
              <button
                onClick={() => setShowRegionModal(true)}
                className="flex items-center justify-between w-full px-4 py-2 border rounded bg-white text-gray-700 text-sm shadow-sm hover:border-primary1"
              >
                <span>{selectedLabel}</span>
                <svg
                  className="w-4 h-4 text-gray-400 ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {showRegionModal && (
                <RegionModal
                  onClose={() => setShowRegionModal(false)}
                  onApply={() => {}}
                />
              )}
            </div>

            <div className="flex-1">
              <button
                onClick={() => setShowSportModal(true)}
                className="flex items-center justify-between w-full px-4 py-2 border rounded bg-white text-gray-700 text-sm shadow-sm hover:border-primary1"
              >
                <span>{selectedSportLabel}</span>
                <svg
                  className="w-4 h-4 text-gray-400 ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {showSportModal && (
                <SportModal
                  onClose={() => setShowSportModal(false)}
                  onApply={() => {}}
                />
              )}
            </div>
          </div>

          {/* 입력창 + 검색 버튼 */}
          <div className="flex gap-2 w-full">
            <div className="flex-1">
              <SearchInput className="w-full" />
            </div>
            <div>
              <SearchButton />
            </div>
          </div>
        </div>

        {/* 결과 리스트 */}
        <div className="mt-4 -mx-3">
          <SearchResultList />
        </div>
      </aside>
    </div>
  );
};

export default SearchPage;
