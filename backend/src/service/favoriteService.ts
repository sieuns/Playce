import { AppDataSource } from "../data-source";
import { Favorite } from "../entities/Favorite";
import { Store } from "../entities/Store";
import { User } from "../entities/User";
import { createError } from "../utils/createError";
import { formatDateToKST } from "../utils/dateFormatter";

const favoriteRepository = AppDataSource.getRepository(Favorite);
const storeRepository = AppDataSource.getRepository(Store);
const userRepository = AppDataSource.getRepository(User);

const favoriteService = {
  // 1. 즐겨찾기 추가
  addFavorite: async (userId: number, storeId: number) => {
    console.log(
      "[Service]즐겨찾기 추가 - userId:",
      userId,
      "storeId:",
      storeId
    );

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) throw createError("사용자를 찾을 수 없습니다.", 404);
    console.log("사용자 확인 완료:", user.email);

    const store = await storeRepository.findOneBy({ id: storeId });
    if (!store) throw createError("해당 가게를 찾을 수 없습니다.", 404);
    console.log("가게 확인 완료:", store.storeName);

    const existing = await favoriteRepository.findOne({
      where: {
        user: { id: userId },
        store: { id: storeId },
      },
      relations: ["user", "store"],
    });

    if (existing) throw createError("이미 즐겨찾기에 추가된 가게입니다.", 409);

    const newFavorite = favoriteRepository.create({ user, store });
    const saved = await favoriteRepository.save(newFavorite);

    console.log("즐겨찾기 저장 완료 - ID:", saved.id);
    return {
      success : true,
      message: "즐겨찾기가 추가되었습니다.",
      favorite_id: saved.id,
      created_at: formatDateToKST(new Date(saved.createdAt)),
    };
  },

  // 2. 즐겨찾기 삭제
  removeFavorite: async (userId: number, storeId: number) => {
    console.log(
      "[Service]즐겨찾기 삭제 - userId:",
      userId,
      "storeId:",
      storeId
    );

    const favorite = await favoriteRepository.findOne({
      where: {
        user: { id: userId },
        store: { id: storeId },
      },
      relations: ["user", "store"],
    });

    if (!favorite) {
      throw createError("즐겨찾기 항목이 존재하지 않습니다.", 404);
    }

    await favoriteRepository.remove(favorite);
    console.log("즐겨찾기 삭제 완료");

    return {
      message: "즐겨찾기가 삭제되었습니다.",
    };
  },

  // 3. 즐겨찾기 목록 조회
  getFavorites: async (userId: number) => {
    console.log("[Service]즐겨찾기 목록 조회 - userId:", userId);

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) throw createError("사용자를 찾을 수 없습니다.", 404);

    const favorites = await favoriteRepository.find({
      where: { user: { id: userId } },
      relations: ["store", "store.images"],
      order: { createdAt: "ASC" },
    });

    console.log("즐겨찾기 개수:", favorites.length);
    if (favorites.length === 0) {
      throw createError("즐겨찾기 목록이 없습니다.", 404);
    }

    return favorites.map((fav) => {
      const images = fav.store.images || [];
      const mainImage = images.find((img) => img.isMain);

      console.log("즐겨찾기 매핑 중 -", fav.store.storeName);

      return {
        store_id: fav.store.id,
        store_name: fav.store.storeName,
        main_img: mainImage?.imgUrl || null,
        address: fav.store.address,
        type: fav.store.type,
        created_at: formatDateToKST(fav.createdAt),
      };
    });
  },
};

export default favoriteService;
