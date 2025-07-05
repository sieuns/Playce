import { SearchOutlined } from "@ant-design/icons";
import { useSearchStore } from "../../stores/searchStore";
import { useRegionStore } from "../../stores/regionStore";
import { useSportStore } from "../../stores/sportStore";
import Button from "../Common/Button";

const SearchButton = () => {
  const {
    searchText,
    setTriggerSearch,
    setBigRegion,
    setSmallRegion,
    setSport,
    setLeague,
    setIsSearching,
  } = useSearchStore();
  const { selectedRegions } = useRegionStore();
  const { sport, selectedLeagues } = useSportStore();

  const handleSearch = () => {
    const hasKeyword =
      searchText.trim() !== "" ||
      selectedRegions.length > 0 ||
      sport !== "" ||
      selectedLeagues.length > 0;

    if (!hasKeyword) {
      alert("검색 조건을 하나 이상 입력해주세요.");
      return;
    }

    if (selectedRegions.length > 0) {
      const first = selectedRegions[0];
      setBigRegion(first.bigRegion);
      setSmallRegion(first.smallRegion);
    } else {
      setBigRegion("");
      setSmallRegion("");
    }

    setSport(sport);
    if (selectedLeagues.length > 0) {
      setLeague(selectedLeagues[0].league);
    } else {
      setLeague("");
    }
    setIsSearching(true);
    setTriggerSearch(true);
  };

  return (
    <Button onClick={handleSearch} scheme="primary" fullWidth size="semi">
      <SearchOutlined className="text-sm mr-2" />
      검색
    </Button>
  );
};

export default SearchButton;
