import { NextFunction, Request, Response } from "express";
import storeService from "../service/storeService";
import { logApiError } from "../utils/errorHandler";
import { AuthRequest } from "../middlewares/authMiddleware";

const storeController = {
  // 1. 식당 등록
  registerStore: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      console.log("\n🍴 식당 등록");
      const userId: number = req.user!.userId;
      const createData = req.body;

      await storeService.createStore(userId, createData);

      console.log("✅ 식당 등록 - 성공");
      res.status(201).json({ success: true, message: "식당 등록" });
    } catch (error) {
      logApiError('식당 등록', error);
      next(error);
    }
  },
  // 2. 식당 수정
  updateStore: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      console.log("\n🍴 식당 수정");
      const userId: number = 1; //req.user!.userId;
      const storeId: number = parseInt(req.params.storeId);
      const updateData = req.body;

      await storeService.updateStore(userId, storeId, updateData);

      console.log("✅ 식당 수정 - 성공");
      res.status(200).json({ success: true, message: "식당 수정" });
    } catch (error) {
      logApiError('식당 수정', error);
      next(error);
    }
  },
  // 3. 식당 삭제
  deleteStore: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      console.log("\n🍴 식당 삭제");
      const userId: number = req.user!.userId;
      const storeId = parseInt(req.params.storeId);

      if (isNaN(storeId)) {
        const error = new Error('유효하지 않은 식당 id입니다.');
        (error as any).status = 400;
        throw error;
      }

      await storeService.deleteStore(userId, storeId);

      console.log("✅ 식당 삭제 - 성공");
      res.status(200).json({ success: true, message: "식당 삭제" });
    } catch (error) {
      logApiError('식당 삭제', error);
      next(error);
    }
  },
  // 4. 식당 상세 조회
  getStoreDetail: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      console.log("\n🍴 식당 상세 조회");
      const userId: number | undefined = req.user?.userId;
      const storeId = parseInt(req.params.storeId);

      if (isNaN(storeId)) {
        const error = new Error('유효하지 않은 식당 id입니다.');
        (error as any).status = 400;
        throw error;
      }

      const responseData = await storeService.getStoreDetail(userId, storeId);

      console.log("✅ 식당 상세 조회 - 성공");
      res.status(200).json({ success: true, message: "식당 상세 조회", data: responseData });
    } catch (error) {
      logApiError('식당 상세 조회', error);
      next(error);
    }
  },
  // 5. 내 식당 목록 조회
  getMyStores: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      console.log("\n🍴 내 식당 목록 조회");
      const userId: number = req.user!.userId;

      const responseData = await storeService.getMyStores(userId);

      console.log("✅ 내 식당 목록 조회 - 성공");
      res.status(200).json({ success: true, message: "내 식당 목록 조회", data: responseData });
    } catch (error) {
      logApiError('내 식당 목록 조회', error);
      next(error);
    }
  },
};

export default storeController;