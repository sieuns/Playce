// seed/businessNumberSeeder.ts
import { AppDataSource } from "../src/data-source";
import { BusinessNumber } from "../src/entities/BusinessNumber";

const businessNumbers = [
  { number: "111-11-12345", is_valid: true },
  { number: "222-22-12345", is_valid: true },
  { number: "333-33-12345", is_valid: false },
];

const seed = async () => {
  const dataSource = await AppDataSource.initialize();

  try {
    for (const item of businessNumbers) {
      const businessNumber = dataSource.manager.create(BusinessNumber, item);
      await dataSource.manager.save(businessNumber);
    }

    console.log("✅ 사업자등록번호 시드 완료");
  } catch (error) {
    console.error("❌ 시드 에러:", error);
  } finally {
    await dataSource.destroy();
  }
};

seed();
