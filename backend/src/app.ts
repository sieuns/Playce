import 'dotenv/config';
import express from 'express';

// 라우터
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';

// 라우터
import userRoutes from './routes/userRoutes';
import broadcastRoutes from './routes/broadcastRoutes';
import favoriteRoutes from './routes/favoriteRoutes';

// 기타
import testMiddleware from './middlewares/test';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// 라우터 등록
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // 스웨거

app.use('/users', userRoutes); // 유저
app.use('/broadcasts', broadcastRoutes); // 중계 일정
app.use('/favorites', favoriteRoutes); // 즐겨찾기

// 정의되지 않은 라우터 -> 404 에러 처리
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

// TODO: 제대로된 미들웨어 등록할 
// TODO: 필요하다면 커스텀 에러를 만들 것
// 에러 처리 미들웨어 등록
app.use(testMiddleware);

// 서버 시작
app.listen(port, () => {
    console.log(`🚀 서버가 http://localhost:${port} 에서 실행 중입니다.`);
    console.log(`서버가 성공적으로 시작되었습니다.`);
});