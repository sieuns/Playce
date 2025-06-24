import { Request, Response, NextFunction } from "express";
import searchService from "../service/searchService";

const searchController = {
  // 1. 현재 위치 기반 검색
  getNearbyStores: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { lat, lng, radius } = req.query;

      const result = await searchService.getNearbyStores(
        Number(lat),
        Number(lng),
        Number(radius)
      );

      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  // 2. 통합 검색
  searchStores: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        search,
        sport,
        league,
        team,
        big_region,
        small_region,
        sort
      } = req.query;

      const result = await searchService.searchStores({
        search: String(search || ''),
        sport: String(sport || ''),
        league: String(league || ''),
        team: String(team || ''),
        big_region: String(big_region || ''),
        small_region: String(small_region || ''),
        sort: String(sort || '') as 'date' | 'name',
      });

      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },
};

export default searchController;
