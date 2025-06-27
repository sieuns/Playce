import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import favoriteService from "../service/favoriteService";

const favoriteController = {
  // 1. 즐겨찾기 추가
  addFavorite: async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.userId;
      const storeId = parseInt(req.params.store_id);
      const result = await favoriteService.addFavorite(userId, storeId);
      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  // 2. 즐겨찾기 삭제
  removeFavorite: async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const storeId = parseInt(req.params.store_id);
      const userId = req.user!.userId;

      const result = await favoriteService.removeFavorite(userId, storeId);
      res.status(200).json(result);
    } catch (error: any) {
      next(error);
    }
  },

  // 3. 즐겨찾기 목록 조회
  getFavorites: async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.userId;
      const favorites = await favoriteService.getFavorites(userId);
      res.status(200).json({ stores: favorites });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },
};

export default favoriteController;
