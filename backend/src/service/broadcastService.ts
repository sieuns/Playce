import { AppDataSource } from "../data-source";
import { Broadcast } from "../entities/Broadcast";

const broadcastRepo = AppDataSource.getRepository(Broadcast);

// ✅ 중계 일정 등록
const createBroadcast = async (data: Partial<Broadcast>) => {
  const newBroadcast = broadcastRepo.create(data);
  await broadcastRepo.save(newBroadcast);
  return newBroadcast;
};

// ✅ 중계 일정 수정
const updateBroadcast = async (broadcastId: number, data: Partial<Broadcast>) => {
  const broadcast = await broadcastRepo.findOneBy({ id: broadcastId });
  if (!broadcast) throw new Error("해당 중계 일정을 찾을 수 없습니다.");

  broadcastRepo.merge(broadcast, data);
  await broadcastRepo.save(broadcast);
  return broadcast;
};

// ✅ 중계 일정 삭제
const deleteBroadcast = async (broadcastId: number) => {
  const result = await broadcastRepo.delete(broadcastId);
  if (result.affected === 0) {
    throw new Error("삭제할 중계 일정이 없습니다.");
  }
};

// ✅ 특정 식당의 중계 일정 조회
const getBroadcastsByStore = async (storeId: number) => {
  const broadcasts = await broadcastRepo.find({
    where: { store: { id: storeId } },
    order: { matchDate: "ASC", matchTime: "ASC" },
  });
  return broadcasts;
};

export default {
  createBroadcast,
  updateBroadcast,
  deleteBroadcast,
  getBroadcastsByStore,
};
