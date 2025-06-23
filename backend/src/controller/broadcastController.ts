import { Request, Response, NextFunction } from "express";
import broadcastService from "../service/broadcastService";

const broadcastController = {
  // 1. 일정 등록
  createBroadcast: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await broadcastService.createBroadcast(req.body);
      res.status(201).json({ success: true, message: '중계 일정이 등록되었습니다.', broadcast_id: result.id });
    } catch (error) {
      next(error);
    }
  },

  // 2. 일정 삭제
  deleteBroadcast: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { broadcasts_id } = req.params;
      await broadcastService.deleteBroadcast(Number(broadcasts_id));
      res.status(200).json({ success: true, message: '중계 일정이 삭제되었습니다.' });
    } catch (error) {
      next(error);
    }
  },

  // 3. 일정 수정
  updateBroadcast: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { broadcasts_id } = req.params;
      await broadcastService.updateBroadcast(Number(broadcasts_id), req.body);
      res.status(200).json({ success: true, message: '중계 일정이 수정되었습니다.' });
    } catch (error) {
      next(error);
    }
  },

  // 4. 특정 식당의 일정 조회
  getBroadcastsByStore: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { store_id } = req.params;
      const broadcasts = await broadcastService.getBroadcastsByStore(Number(store_id));
      res.status(200).json({ success: true, broadcasts });
    } catch (error) {
      next(error);
    }
  }
};

export default broadcastController;
