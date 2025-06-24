import { NextFunction, Request, Response } from "express";
import storeService from "../service/storeService";

const storeController = {
  // 1. 식당 등록
  registerStore: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await storeService.registerStore();
      res.status(201).json({ success: true, message: "식당 등록 성공" });
    } catch (error) {
      next(error);
    }
  },
  // 2. 식당 수정
   updateStore: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await storeService.updateStore();
      res.status(200).json({ success: true, message: "식당 수정 성공" });
    } catch (error) {
      next(error);
    }
  },
  // 3. 식당 삭제
  deleteStore: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await storeService.deleteStore();
      res.status(200).json({ success: true, message: "식당 삭제 성공" });
    } catch (error) {
      next(error);
    }
  },
  // 4. 식당 상세 조회
  getStoreDetail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await storeService.getStoreDetail();
      res.status(200).json({ success: true, message: "식당 상세 조회 성공" });
    } catch (error) {
      next(error);
    }
  },
  // 5. 내 식당 목록
  getMyStores: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await storeService.getMyStores();
      res.status(200).json({ success: true, message: "내가 등록한 식당 목록들" });
    } catch (error) {
      next(error);
    }
  },
};

export default storeController;