import { AppDataSource } from "../data-source";
import { Broadcast } from "../entities/Broadcast";
import { Store } from "../entities/Store";
import { Sport } from "../entities/Sport";
import { League } from "../entities/League";

const broadcastRepo = AppDataSource.getRepository(Broadcast);
const storeRepo = AppDataSource.getRepository(Store);
const sportRepo = AppDataSource.getRepository(Sport);
const leagueRepo = AppDataSource.getRepository(League);


// 매장 소유권 확인
const checkStoreOwnership = async (storeId: number, userId: number) => {
  const store = await storeRepo.findOne({
    where: { id: storeId },
    relations: ["user"],
  });
  if (!store) throw new Error("존재하지 않는 매장입니다.");
  if (store.user.id !== userId) throw new Error("권한이 없습니다.");
  return store;
};

// 중계 일정 생성
const createBroadcast = async (data: any, userId: number) => {
  const store = await checkStoreOwnership(data.store_id, userId);

  const sport = await sportRepo.findOneBy({ id: data.sport_id });
  if (!sport) throw new Error("존재하지 않는 스포츠입니다.");

  const league = await leagueRepo.findOneBy({ id: data.league_id });
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
const updateBroadcast = async (broadcastId: number, data: any, userId: number) => {
  const broadcast = await broadcastRepo.findOne({
    where: { id: broadcastId },
    relations: ["store", "store.user", "sport", "league"],
  });
  if (!broadcast) throw new Error("해당 중계 일정을 찾을 수 없습니다.");

  if (broadcast.store.user.id !== userId) throw new Error("권한이 없습니다.");

  if (data.store_id && data.store_id !== broadcast.store.id) {
    // store 변경 시 권한 재검증
    const store = await checkStoreOwnership(data.store_id, userId);
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

  broadcast.matchDate = data.match_date ?? broadcast.matchDate;
  broadcast.matchTime = data.match_time ?? broadcast.matchTime;
  broadcast.teamOne = data.team_one ?? broadcast.teamOne;
  broadcast.teamTwo = data.team_two ?? broadcast.teamTwo;
  broadcast.etc = data.etc ?? broadcast.etc;

  await broadcastRepo.save(broadcast);
  return broadcast;
};

// 중계 일정 삭제
const deleteBroadcast = async (broadcastId: number, userId: number) => {
  const broadcast = await broadcastRepo.findOne({
    where: { id: broadcastId },
    relations: ["store", "store.user"],
  });
  if (!broadcast) throw new Error("삭제할 중계 일정이 없습니다.");

  if (broadcast.store.user.id !== userId) throw new Error("권한이 없습니다.");

  await broadcastRepo.delete(broadcastId);
};

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
