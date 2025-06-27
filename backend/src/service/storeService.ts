import { Like } from "typeorm";
import { AppDataSource } from "../data-source";
import { BigRegion } from "../entities/BigRegion";
import { BusinessNumber } from "../entities/BusinessNumber";
import { SmallRegion } from "../entities/SmallRegion";
import { Store } from "../entities/Store";
import { StoreImage } from "../entities/StoreImage";
import { getCoordinatesByAddress } from "../util/kakaoAPI";
import { normalizeRegionName } from "../util/regionNormalizer";

const storeServcie = {
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
  deleteStore: async () => {
    console.log("식당 삭제");
    // const error = new Error("삭제 권한이 없습니다.");
    // (error as any).status = 403;
    // throw error;
  },
  // 4. 식당 상세 조회
  getStoreDetail: async () => {
    console.log("식당 상세 조회");
    // const error = new Error("해당 식당이 존재하지 않습니다.");
    // (error as any).status = 404;
    // throw error;
  },
  // 5. 내 식당 목록
  getMyStores: async () => {
    console.log("내가 등록한 식당 목록");
    // const error = new Error("인증 정보가 없습니다.");
    // (error as any).status = 401;
    // throw error;
  },
};

export default storeServcie;
