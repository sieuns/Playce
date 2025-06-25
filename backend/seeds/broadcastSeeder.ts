import { AppDataSource } from "../src/data-source";
import { Broadcast } from "../src/entities/Broadcast";

const broadcasts = [
  {
    store: { id: 1 },
    matchDate: "2025-06-30",
    matchTime: "20:00",
    sport: { id: 1 },
    league: { id: 1},
    teamOne: "맨유",
    teamTwo: "리버풀",
    etc: "빅매치",
  },
  {
    store: { id: 2 },
    matchDate: "2025-06-28",
    matchTime: "18:00",
    sport: { id: 2 },
    league: { id: 2 },
    teamOne: "LG 트윈스",
    teamTwo: "두산 베어스",
    etc: "잠실 라이벌전",
  },
];

export const seedBroadcasts = async () => {
  const broadcastRepo = AppDataSource.getRepository(Broadcast);

  for (const item of broadcasts) {
    const broadcast = broadcastRepo.create(item);
    await broadcastRepo.save(broadcast);
  }
  
  console.log("✅ 중계 일정 시드 완료");
};