import { fetchSearchResults } from "../api/search.api";
import { useSearchStore } from "../stores/searchStore";
import { getDistanceFromLatLon } from "../utils/distanceUtils";
import useMapStore from "../stores/mapStore";
import type { SearchResultItem } from "../types/search";

export const useSearch = () => {
  const {
    searchText,
    sport,
    league,
    bigRegion,
    smallRegion,
    sort,
    setResults,
    setIsSearching,
    setHasSearched,
  } = useSearchStore();

  const { position } = useMapStore();

  const doSearch = async () => {
    setIsSearching(true);
    setHasSearched(true);
    try {
      console.log("검색 조건:", {
        searchText,
        sport,
        league,
        big_region: bigRegion,
        small_region: smallRegion,
        sort,
      });

      const res = await fetchSearchResults({
        search: searchText,
        sport,
        league,
        big_region: bigRegion,
        small_region: smallRegion,
        sort,
      });

      if (res.success) {
        const items: SearchResultItem[] = res.data;
        const enriched = items.map((item) => {
          if (
            position &&
            typeof position.lat === "number" &&
            typeof position.lng === "number"
          ) {
            const distance = getDistanceFromLatLon(
              position.lat,
              position.lng,
              item.lat,
              item.lng
            );
            return { ...item, distance };
          }

          return { ...item, distance: undefined };
        });

        setResults(enriched);
      } else {
        setResults([])
      }
    } catch (err) {
      console.error("검색 실패", err);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return { doSearch };
};
