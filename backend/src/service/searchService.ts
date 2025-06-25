const searchService = {
  // 1. 현재 위치 기반 검색
  getNearbyStores: async (lat: number, lng: number, radius: number) => {
    console.log(
      `현재 위치 기반 검색: lat=${lat}, lng=${lng}, radius=${radius}`
    );

    if (lat === undefined || lng === undefined) {
      const error = new Error("위도 또는 경도가 누락되었습니다.");
      (error as any).status = 400;
      throw error;
    }

    // DB 로직이 들어갈 자리
    return []; // 실제 DB 결과 리턴
  },

  // 2. 통합 검색
  searchStores: async (filters: {
    search?: string;
    sport?: string;
    league?: string;
    team?: string;
    big_region?: string;
    small_region?: string;
    sort?: "date" | "name";
  }) => {
    console.log(`통합 검색 필터`, filters);

    const hasValidFilter =
      filters.search ||
      filters.sport ||
      filters.league ||
      filters.team ||
      filters.big_region ||
      filters.small_region;

    if (!hasValidFilter) {
      const error = new Error("최소 하나 이상의 필터를 입력해야 합니다.");
      (error as any).status = 400;
      throw error;
    }

    // DB 로직이 들어갈 자리
    return []; // 실제 DB 결과 리턴
  },
};

export default searchService;
