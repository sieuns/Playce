import { Router} from 'express';
import userController from '../controller/userController';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: User
 *  description: 유저 관련 API
 */

/**
 * @swagger
 * /users/join:
 *  post:
 *    summary: 회원가입
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *              - name
 *              - nickname
 *              - phone
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *                format: password
 *              name:
 *                type: string
 *              nickname:
 *                type: string
 *              phone:
 *                type: string
 *    responses:
 *      201:
 *        description: 회원가입 성공
 *      400:
 *        description: 필수 입력값 누락
 *      409:
 *        description: 중복된 이메일 입력
 */
router.post('/join', userController.join); // 1. 회원가입
router.post('/login', userController.login); // 2. 로그인
router.post('/reset', userController.requestResetPassword); // 3. 비밀번호 초기화 요청
router.put('/reset', userController.resetPassword); // 4. 비밀번호 초기화
router.get('/me', userController.getMyInfo); // 5. 내 정보 조회
router.put('/nickname', userController.updateNickname); // 6. 닉네임 변경

export default router;