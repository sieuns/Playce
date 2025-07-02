import { regionMap } from "../../data/regions";
import { useRegionStore } from "../../stores/regionStore";
import Tag from "../Common/Tag";

const RegionPanel = () => {
  const { mainRegion, subRegions, setMainRegion, toggleSubRegion } =
    useRegionStore();
  const subRegionList = regionMap[mainRegion] || [];

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-1 divide-x overflow-y-auto">
        {/* 좌측 상위 지역 리스트 */}
        <div className="w-1/2">
          {Object.keys(regionMap).map((region) => (
            <div
              key={region}
              onClick={() => setMainRegion(region)}
              className={`py-4 px-3 cursor-pointer hover:bg-gray-100 ${
                region === mainRegion ? "font-bold text-primary5" : ""
              }`}
            >
              {region}
            </div>
          ))}
        </div>

        {/* 우측 하위 지역 리스트 */}
        <div className="w-1/2">
          {subRegionList.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full text-gray-400 text-center">
              <p>지역을 선택하면</p>
              <p>상세 지역을 확인할 수 있습니다</p>
            </div>
          ) : (
            subRegionList.map((sub) => (
              <label
                key={sub}
                className="py-4 px-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
              >
                <span>{sub}</span>
                <input
                  type="checkbox"
                  className="accent-primary1"
                  checked={subRegions.includes(sub)}
                  onChange={() => toggleSubRegion(sub)}
                />
              </label>
            ))
          )}
        </div>
      </div>
      {/* 선택된 지역 표시 */}
      <div className="flex flex-wrap gap-2 p-3 border-t bg-white">
        {subRegions.map((sub) => (
          <Tag key={sub} name={sub} onRemove={() => toggleSubRegion(sub)} />
        ))}
      </div>
    </div>
  );
};

export default RegionPanel;
