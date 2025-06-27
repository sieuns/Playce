import { Like } from "typeorm";
import { AppDataSource } from "../data-source";
import { BigRegion } from "../entities/BigRegion";
import { BusinessNumber } from "../entities/BusinessNumber";
import { SmallRegion } from "../entities/SmallRegion";
import { Store } from "../entities/Store";
import { StoreImage } from "../entities/StoreImage";
import { getCoordinatesByAddress } from "../utils/kakaoAPI";
import { normalizeRegionName } from "../utils/regionNormalizer";
import { Broadcast } from "../entities/Broadcast";

const storeService = {
  // 1. 식당 등록
  createStore: async (userId: number, data: any) => {
    const { 
      store_name: storeName, 
      business_number: businessNumber,
      address,
      phone,
      opening_hours: openingHours,
      menus,
      type,
      description,
      img_urls: imgUrls
    } = data;

    // 사업자등록번호 유효성 검사
    const businessNumberRepo = AppDataSource.getRepository(BusinessNumber);

    const findBusinessNumber = await businessNumberRepo.findOne({
      where: { businessNumber: businessNumber },
      relations: ['store'],
    });
    if (!findBusinessNumber) {
      const error = new Error('유효하지 않은 사업자등록번호입니다.');
      (error as any).status = 400;
      throw error;
    }
    if (findBusinessNumber.store) {
      const error = new Error('이미 등록된 사업자등록번호입니다. 하나의 번호는 하나의 식당만 가질 수 있습니다.');
      (error as any).status = 409;
      throw error;
    }

    console.log(`- 사업자등록번호(id: ${findBusinessNumber.id}, number: ${findBusinessNumber.businessNumber})`);

    // DB에서 지역 대/소분류 id 찾기
    const { bigRegionName, smallRegionName, lat, lng } = await getCoordinatesByAddress(address);
    console.log(bigRegionName, smallRegionName);

    const bigRegionRepo = AppDataSource.getRepository(BigRegion);
    const smallRegionRepo = AppDataSource.getRepository(SmallRegion);

    const normalizeBigRegionName = normalizeRegionName(bigRegionName);
    const findBigRegion = await bigRegionRepo.findOne({
      where: { name: Like(`${normalizeBigRegionName}%`) }
    });
    if (!findBigRegion) {
      const error = new Error('유효하지 않은 지역-대분류입니다.');
      (error as any).status = 400;
      throw error;
    }

    const findSmallRegion = await smallRegionRepo.findOne({
      where: {
        name: Like(`${smallRegionName}%`),
        bigRegion: findBigRegion
      }
    });
    if (!findSmallRegion) {
      const error = new Error('유효하지 않은 지역-소분류입니다.');
      (error as any).status = 400;
      throw error;
    }
    console.log(`- 지역 id : 대분류(id: ${findBigRegion.id}, name: ${bigRegionName}), 소분류(id: ${findSmallRegion.id}, name: ${smallRegionName})`);

    // Point 객체 생성
    const location = `POINT(${lng} ${lat})`;
    console.log('- Point 객체 : ', location);

    // stores에 정보 저장
    const storeRepo = AppDataSource.getRepository(Store);
    const newStore = storeRepo.create({
      user: { id: userId },
      storeName,
      businessNumber: findBusinessNumber,
      address,
      bigRegion: findBigRegion,
      smallRegion: findSmallRegion,
      location,
      phone,
      openingHours,
      menus,
      type,
      description,
    });

    const saveStore = await storeRepo.save(newStore);
    console.log('- store에 데이터 저장 완료');

    // store_images에 데이터 저장
    if (imgUrls && Array.isArray(imgUrls) && imgUrls.length > 0) {
      const storeImageRepo = AppDataSource.getRepository(StoreImage);
      const newStoreImages = imgUrls.map((url: string, index: number) =>
        storeImageRepo.create({
          store: saveStore,
          imgUrl: url,
          isMain: index === 0
        })
      );

      await storeImageRepo.save(newStoreImages);
      console.log(`- ${newStoreImages.length}개의 이미지 저장 완료`);
    }
  },
  // 2. 식당 수정
  updateStore: async () => {
    console.log("식당 수정");
    // const error = new Error("해당 식당을 찾을 수 없습니다.");
    // (error as any).status = 404;
    // throw error;
  },
  // 3. 식당 삭제
  deleteStore: async (userId: number, storeId: number) => {
    const storeRepo = AppDataSource.getRepository(Store);

    const storeToDelete = await storeRepo.findOne({
      where: { id: storeId },
      relations: ['user'],
    });

    // 식당 유효성 검사
    if (!storeToDelete) {
      const error = new Error('식당을 찾을 수 없습니다.');
      (error as any).status = 404;
      throw error;
    }
    console.log('- 식당 유효성 검사 통과');

    // 소유권 확인
    if (storeToDelete.user.id !== userId) {
      const error = new Error('해당 식당에 대한 삭제 권한이 없습니다.');
      (error as any).status = 403;
      throw error;
    }
    console.log('- 식당 소유권 확인');

    // 삭제
    await storeRepo.remove(storeToDelete);
    return;
  },
  // 4. 식당 상세 조회
  getStoreDetail: async (userId: number | undefined, storeId: number) => {
    const storeRepo = AppDataSource.getRepository(Store);

    const store = await storeRepo.findOne({
      where: { id: storeId },
      relations: [
        'user',
        'images',
        'broadcasts',
        'broadcasts.sport',
        'broadcasts.league'
      ]
    });

    if (!store) {
      const error = new Error('존재하지 않는 식당입니다.');
      (error as any).status = 404;
      throw error;
    }
    console.log('- store 유효성 검사');

    const imgListData = store.images.map(img => img.imgUrl);
    const broadcastData = store.broadcasts.map(bc => ({
      match_date: bc.matchDate,
      match_time: bc.matchTime,
      sport: bc.sport.name,
      league: bc.league.name,
      team_one: bc.teamOne,
      team_two: bc.teamTwo,
      etc: bc.etc,
    }));
    const isOwner = !!userId && userId === store.user.id;

    const responseData = {
      store_name: store.storeName,
      address: store.address,
      phone: store.phone,
      opening_hours: store.openingHours,
      menus: store.menus,
      type: store.type,
      img_list: imgListData,
      description: store.description,
      broadcasts: broadcastData,
      is_owner: isOwner,
    };
    console.log('- 응답 데이터 : ', responseData);

    return responseData;
  },
  // 5. 내 식당 목록
  getMyStores: async (userId: number) => {
    const storeRepo = AppDataSource.getRepository(Store);

    const myStores= await storeRepo.find({
      where: { user: { id: userId } },
      relations: ['images'],
      select: ['id', 'storeName', 'address'],
    });

    const responseData = myStores.map(store => {
      const mainImageObj = store.images.find(img => img.isMain);
      const mainImage = mainImageObj ? mainImageObj.imgUrl : null;

      return {
        store_id: store.id,
        store_name: store.storeName,
        main_img: mainImage,
        address: store.address,
      }
    });
    console.log('- 응답 데이터 : ', responseData);

    return responseData;
  },
};

export default storeService;
