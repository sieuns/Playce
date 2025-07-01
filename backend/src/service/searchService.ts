import { AppDataSource } from "../data-source";
import { Store } from "../entities/Store";
import { createError } from "../utils/createError";

const parsePoint = (point: string) => {
  const match = /POINT\(([^ ]+) ([^ ]+)\)/.exec(point);
  return match
    ? { lng: parseFloat(match[1]), lat: parseFloat(match[2]) }
    : { lng: null, lat: null };
};

const searchService = {
  // 현재 위치 기반 검색
  getNearbyStores: async (lat: number, lng: number, radius: number = 5) => {
    console.log(`\n📍 [현재 위치 검색] lat: ${lat}, lng: ${lng}, radius: ${radius}km`);

    const storeRepo = AppDataSource.getRepository(Store);

    const stores = await storeRepo
      .createQueryBuilder("store")
      .leftJoinAndSelect("store.images", "image", "image.isMain = true")
      .leftJoinAndSelect("store.broadcasts", "broadcast")
      .leftJoinAndSelect("broadcast.sport", "sport")
      .leftJoinAndSelect("broadcast.league", "league")
      .where(
        `ST_Distance_Sphere(POINT(:lng, :lat), store.location) <= :radius`,
        { lat, lng, radius: radius * 1000 }
      )
      .getMany();

    console.log(`- 검색 결과: ${stores.length}개`);

    if (stores.length === 0) {
      console.log("❌ 근처 식당 없음");
      return [];
    }

    const result = stores.map((store) => {
      const { lat, lng } = store.location
        ? parsePoint(store.location as any)
        : { lat: null, lng: null };

      return {
        store_id: store.id,
        store_name: store.storeName,
        type: store.type,
        main_img: store.images[0]?.imgUrl ?? null,
        address: store.address,
        lat,
        lng,
        broadcasts: store.broadcasts.map((b) => ({
          match_date: b.matchDate,
          match_time: b.matchTime,
          sport: b.sport.name,
          league: b.league.name,
          team_one: b.teamOne,
          team_two: b.teamTwo,
          etc: b.etc,
        })),
      };
    });

    console.log("✅ 현재 위치 검색 완료");
    return result;
  },

  // 통합 검색
  searchStores: async (filters: {
    search?: string;
    sport?: string;
    league?: string;
    team?: string;
    big_region?: string;
    small_region?: string;
    sort?: "date" | "name";
  }) => {
    console.log("\n🔎 [통합 검색] 요청 필터:", filters);

    const {
      search,
      sport,
      league,
      team,
      big_region,
      small_region,
      sort,
    } = filters;

    const storeRepo = AppDataSource.getRepository(Store);

    const query = storeRepo
      .createQueryBuilder("store")
      .leftJoinAndSelect("store.images", "image", "image.isMain = true")
      .leftJoinAndSelect("store.broadcasts", "broadcast")
      .leftJoinAndSelect("broadcast.sport", "sport")
      .leftJoinAndSelect("broadcast.league", "league")
      .leftJoinAndSelect("store.bigRegion", "bigRegion")
      .leftJoinAndSelect("store.smallRegion", "smallRegion");

    // 필터링
    if (search) {
      console.log(`- 필터: 검색어 '${search}'`);
      query.andWhere(
        "store.storeName LIKE :search OR store.address LIKE :search",
        { search: `%${search}%` }
      );
    }

    if (sport) {
      console.log(`- 필터: 스포츠 '${sport}'`);
      query.andWhere("sport.name = :sport", { sport });
    }

    if (league) {
      console.log(`- 필터: 리그 '${league}'`);
      query.andWhere("league.name = :league", { league });
    }

    if (team) {
      console.log(`- 필터: 팀 '${team}'`);
      query.andWhere(
        "broadcast.teamOne = :team OR broadcast.teamTwo = :team",
        { team }
      );
    }

    if (big_region) {
      console.log(`- 필터: 대지역 '${big_region}'`);
      query.andWhere("bigRegion.name = :bigRegion", { bigRegion: big_region });
    }

    if (small_region) {
      console.log(`- 필터: 소지역 '${small_region}'`);
      query.andWhere("smallRegion.name = :smallRegion", {
        smallRegion: small_region,
      });
    }

    // 정렬
    if (sort === "date") {
      console.log("- 정렬: 날짜순");
      query.orderBy("broadcast.matchDate", "ASC");
    } else if (sort === "name") {
      console.log("- 정렬: 이름순");
      query.orderBy("store.storeName", "ASC");
    }

    const stores = await query.getMany();

    console.log(`- 검색 결과: ${stores.length}개`);

    if (stores.length === 0) {
      console.log("❌ 검색 결과 없음");
      return [];
    }

    const result = stores.map((store) => {
      const { lat, lng } = store.location
        ? parsePoint(store.location as any)
        : { lat: null, lng: null };

      return {
        id: store.id,
        store_name: store.storeName,
        img_url: store.images[0]?.imgUrl ?? null,
        address: store.address,
        lat,
        lng,
        match_id: store.broadcasts[0]?.id ?? null,
      };
    });

    console.log("✅ 통합 검색 완료");
    return result;
  },
};


export default searchService;
