import { SearchOutlined } from '@ant-design/icons';
import { useSearchStore } from '../../stores/searchStore';
import { useRegionStore } from '../../stores/regionStore';
import { useSportStore } from '../../stores/sportStore';

const SearchButton = () => {
  const { searchText } = useSearchStore();
  const { mainRegion, subRegions } = useRegionStore();
  const { sport, league, teams } = useSportStore();

  const handleSearch = () => {
    const hasKeyword =
      searchText.trim() !== '' ||
      mainRegion !== '전체' ||
      subRegions.length > 0 ||
      sport !== '' ||
      league !== '' ||
      teams.length > 0;

    if (!hasKeyword) {
      alert('검색 조건을 하나 이상 입력해주세요.');
      return;
    }

    console.log('검색어:', searchText);
    console.log('지역:', { mainRegion, subRegions });
    console.log('경기:', { sport, league, teams });
  };

  return (
    <button
      onClick={handleSearch}
      className="p-2 rounded bg-primary2 text-white hover:bg-primary1"
    >
      <SearchOutlined />
    </button>
  );
};

export default SearchButton;
