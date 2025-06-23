import 'dotenv/config';
import express from 'express';

// 스웨거, 라우터
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';

import userRoutes from './routes/userRoutes';

// 기타
import testMiddleware from './middlewares/test';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// 카카오 API 테스트
app.use(express.static(path.join(__dirname, '../public'))); // 정적 파일 제공

// 라우터 등록
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // 스웨거
app.use('/users', userRoutes); // 유저

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