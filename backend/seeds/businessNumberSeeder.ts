import { AppDataSource } from "../src/data-source";
import { BusinessNumber } from "../src/entities/BusinessNumber";

const businessNumbers = [
  { businessNumber: "111-11-12345", isValid: true },
  { businessNumber: "222-22-12345", isValid: true },
  { businessNumber: "333-33-12345", isValid: false },
];

export const seedBusinessNumbers = async () => {
  const businessNumberRepo = AppDataSource.getRepository(BusinessNumber);

  for (const item of businessNumbers) {
    const businessNumber = businessNumberRepo.create(item);
    await businessNumberRepo.save(businessNumber);
  }

  console.log("✅ 사업자등록번호 시드 완료");
};

// const seed = async () => {
//   const dataSource = await AppDataSource.initialize();

//   try {
//     for (const item of businessNumbers) {
//       const businessNumber = dataSource.manager.create(BusinessNumber, item);
//       await dataSource.manager.save(businessNumber);
//     }

//     console.log("✅ 사업자등록번호 시드 완료");
//   } catch (error) {
//     console.error("❌ 시드 에러:", error);
//   } finally {
//     await dataSource.destroy();
//   }
// };

// seed();
