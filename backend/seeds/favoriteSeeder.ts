import { AppDataSource } from "../src/data-source";
import { Favorite } from "../src/entities/Favorite";

const favorites = [
  {
    user: { id: 1 },
    store: { id: 1 },
  },
  {
    user: { id: 2 },
    store: { id: 2 },
  },
];

export const seedFavorites = async () => {
  const favoriteRepo = AppDataSource.getRepository(Favorite);

  for (const item of favorites) {
    const favorite = favoriteRepo.create(item);
    await favoriteRepo.save(favorite);
  }

  console.log("✅ 즐겨찾기 시드 완료");
};