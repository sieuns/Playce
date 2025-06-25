import { Request, Response, NextFunction } from "express";
import favoriteService from "../service/favoriteService";

const favoriteController = {
  // 1. 즐겨찾기 추가
  addFavorite: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { store_id } = req.params;
      const userId = 1; // 목업 유저 ID
      const result = await favoriteService.addFavorite(userId, Number(store_id));
      res.status(201).json({ success: true, message: '즐겨찾기가 추가되었습니다.', favorite_id: result.id });
    } catch (error) {
      next(error);
    }
  },

  // 2. 즐겨찾기 삭제
  removeFavorite: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { store_id } = req.params;
      const userId = 1; // 목업 유저 ID
      await favoriteService.removeFavorite(userId, Number(store_id));
      res.status(200).json({ success: true, message: '즐겨찾기가 삭제되었습니다.' });
    } catch (error) {
      next(error);
    }
  },

  // 3. 즐겨찾기 목록 조회
  getFavorites: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = 1; // 목업 유저 ID
      const favorites = await favoriteService.getFavorites(userId);
      res.status(200).json({ success: true, stores: favorites });
    } catch (error) {
      next(error);
    }
  }
};



export default favoriteController;
