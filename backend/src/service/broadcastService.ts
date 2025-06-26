import { AppDataSource } from "../data-source";
import { Broadcast } from "../entities/Broadcast";
import { Store } from "../entities/Store";
import { Sport } from "../entities/Sport";
import { League } from "../entities/League";

const broadcastRepo = AppDataSource.getRepository(Broadcast);
const storeRepo = AppDataSource.getRepository(Store);
const sportRepo = AppDataSource.getRepository(Sport);
const leagueRepo = AppDataSource.getRepository(League);

// 중계 일정 등록
const createBroadcast = async (data: any) => {
  const store = await storeRepo.findOneBy({ id: data.store_id });
  const sport = await sportRepo.findOneBy({ id: data.sport_id });
  const league = await leagueRepo.findOneBy({ id: data.league_id });

  if (!store) throw new Error("존재하지 않는 매장입니다.");
  if (!sport) throw new Error("존재하지 않는 스포츠입니다.");
  if (!league) throw new Error("존재하지 않는 리그입니다.");

  const newBroadcast = broadcastRepo.create({
    store,
    sport,
    league,
    matchDate: data.match_date,
    matchTime: data.match_time,
    teamOne: data.team_one,
    teamTwo: data.team_two,
    etc: data.etc,
  });

  await broadcastRepo.save(newBroadcast);
  return newBroadcast;
};

// 중계 일정 수정
const updateBroadcast = async (broadcastId: number, data: any) => {
  const broadcast = await broadcastRepo.findOne({
    where: { id: broadcastId },
    relations: ["store", "sport", "league"],
  });
  if (!broadcast) throw new Error("해당 중계 일정을 찾을 수 없습니다.");

  // 관계형 데이터 수정 처리
  if (data.store_id) {
    const store = await storeRepo.findOneBy({ id: data.store_id });
    if (!store) throw new Error("존재하지 않는 매장입니다.");
    broadcast.store = store;
  }

  if (data.sport_id) {
    const sport = await sportRepo.findOneBy({ id: data.sport_id });
    if (!sport) throw new Error("존재하지 않는 스포츠입니다.");
    broadcast.sport = sport;
  }

  if (data.league_id) {
    const league = await leagueRepo.findOneBy({ id: data.league_id });
    if (!league) throw new Error("존재하지 않는 리그입니다.");
    broadcast.league = league;
  }

  // 일반 필드 업데이트
  broadcast.matchDate = data.match_date ?? broadcast.matchDate;
  broadcast.matchTime = data.match_time ?? broadcast.matchTime;
  broadcast.teamOne = data.team_one ?? broadcast.teamOne;
  broadcast.teamTwo = data.team_two ?? broadcast.teamTwo;
  broadcast.etc = data.etc ?? broadcast.etc;

  await broadcastRepo.save(broadcast);
  return broadcast;
};

// 중계 일정 삭제
const deleteBroadcast = async (broadcastId: number) => {
  const result = await broadcastRepo.delete(broadcastId);
  if (result.affected === 0) {
    throw new Error("삭제할 중계 일정이 없습니다.");
  }
};

// 특정 식당의 중계 일정 조회
const getBroadcastsByStore = async (storeId: number) => {
  const broadcasts = await broadcastRepo.find({
    where: { store: { id: storeId } },
    relations: ["store", "sport", "league"],
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
