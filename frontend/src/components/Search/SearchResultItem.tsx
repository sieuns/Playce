import type { FC } from "react";

interface SearchResultItemProps {
  data: {
    storeName: string;
    address: string;
    distance: number;
    matchInfo: string;
    imgUrl: string;
  };
}

const SearchResultItem: FC<SearchResultItemProps> = ({ data }) => {
  const { storeName, address, distance, matchInfo, imgUrl } = data;

  return (
    <div
      className="w-full hover:bg-primary4 transition-colors cursor-pointer border-b border-gray-200"
      onClick={() => console.log(`클릭한 식당: ${storeName}`)}
    >
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex flex-col">
          <h3 className="text-base font-semibold text-gray-800">{storeName}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {distance.toFixed(1)}km · {address}
          </p>
          <p className="text-sm text-primary5 mt-1">{matchInfo}</p>
        </div>

        <img
          src={imgUrl}
          alt={`${storeName} 썸네일`}
          className="w-[100px] h-[90px] object-cover rounded-md ml-4 flex-shrink-0"
        />
      </div>
    </div>
  );
};

export default SearchResultItem;
