import "dotenv/config";
import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";

// TypeORM 설정
import { AppDataSource } from "./data-source";

// 스웨거
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger";

// 라우터
import userRoutes from "./routes/userRoutes";
import storeRoutes from "./routes/storeRoutes";
import searchRoutes from "./routes/searchRoutes";
import broadcastRoutes from "./routes/broadcastRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";

//헬퍼
import { fail } from "./utils/response";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// 라우터 등록
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // 스웨거

app.use("/users", userRoutes); // 유저
app.use("/stores", storeRoutes); // 식당
app.use("/search", searchRoutes); // 검색
app.use("/broadcasts", broadcastRoutes); // 중계 일정
app.use("/favorites", favoriteRoutes); // 즐겨찾기

// 정의되지 않은 라우터 -> 404 에러 처리
app.use((req: Request, res: Response, next: NextFunction) => {
  return fail(res, "Not Found", 404);
});

//  전역 에러 핸들러
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  const status = err.status || 500;
  const message = err.message || "서버 내부 오류입니다.";

  return fail(res, message, status);
});

// TODO: 제대로된 미들웨어 등록할
// TODO: 필요하다면 커스텀 에러를 만들 것
// 에러 처리 미들웨어 등록

// TypeORM 연결 후 서버 실행
AppDataSource.initialize()
  .then(() => {
    console.log("DB 연결 성공(TypeORM)");
    app.listen(port, () => {
      console.log(`🚀서버가 http://localhost:${port} 에서 실행 중입니다.`);
    });
  })
  .catch((error: any) => {
    console.error("DB 연결 실패:", error);
  });
