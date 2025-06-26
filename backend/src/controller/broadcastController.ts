import { Request, Response } from 'express';
import broadcastService from '../service/broadcastService';
import { AuthRequest } from '../middlewares/authMiddleware';

const createBroadcast = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const newBroadcast = await broadcastService.createBroadcast(req.body, userId);
    res.status(201).json({
      message: '중계 일정이 등록되었습니다.',
      broadcast_id: newBroadcast.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '중계 일정 등록 실패' });
  }
};

const deleteBroadcast = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { broadcasts_id } = req.params;
    await broadcastService.deleteBroadcast(Number(broadcasts_id), userId);
    res.status(200).json({ message: '중계 일정이 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '중계 일정 삭제 실패' });
  }
};

const updateBroadcast = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { broadcasts_id } = req.params;
    await broadcastService.updateBroadcast(Number(broadcasts_id), req.body, userId);
    res.status(200).json({ message: '중계 일정이 수정되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '중계 일정 수정 실패' });
  }
};

const getBroadcastsByStore = async (req: Request, res: Response) => {
  try {
    const { store_id } = req.params;
    const broadcasts = await broadcastService.getBroadcastsByStore(Number(store_id));
    res.status(200).json({ broadcasts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '중계 일정 조회 실패' });
  }
};

export default {
  createBroadcast,
  deleteBroadcast,
  updateBroadcast,
  getBroadcastsByStore,
};
