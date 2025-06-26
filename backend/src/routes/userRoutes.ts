import { Router} from 'express';
import userController from '../controller/userController';
import { JoinValidator } from '../middlewares/userValidator';

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
 *                example: user@mail.com
 *              password:
 *                type: string
 *                format: password
 *                example: your_password
 *              name:
 *                type: string
 *                example: your_name
 *              nickname:
 *                type: string
 *                example: your_nickname
 *              phone:
 *                type: string
 *                example: 010-1234-5678
 *    responses:
 *      201:
 *        description: 회원가입 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "회원가입 성공!"
 *      400:
 *        description: 필수 입력값 누락
 *      409:
 *        description: 중복된 이메일 입력
 */
router.post('/join', JoinValidator, userController.join); // 1. 회원가입

/**
 * @swagger
 * /users/login:
 *  post:
 *    summary: 로그인
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
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *                example: user@mail.com
 *              password:
 *                type: string
 *                format: password
 *                example: your_password
 *    responses:
 *      201:
 *        description: 로그인 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "로그인 성공!"
 *                token:
 *                  type: string
 *                  example: your_jwt_token
 *      400:
 *        description: 필수 입력값 누락
 *      401:
 *        description: 이메일 또는 비밀번호 불일치
 */
router.post('/login', userController.login); // 2. 로그인

/**
 * @swagger
 * /users/reset:
 *  post:
 *    summary: 비밀번호 초기화 요청
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *                example: user@mail.com
 *            responses:
 *              201:
 *                description: 요청 성공
 *                content:
 *                  application/json:
 *                    schema:
 *                      type: object
 *                      properties:
 *                        message:
 *                          type: string
 *                  example: "메일이 전송되었습니다."
 *      400:
 *        description: 이메일 미입력 또는 유효하지 않은 이메일
 */
router.post('/reset', userController.requestResetPassword); // 3. 비밀번호 초기화 요청

/**
 * @swagger
 * /users/reset:
 *  patch:
 *    summary: 비밀번호 초기화
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - password
 *            properties:
 *              password:
 *                type: string
 *                format: password
 *                example: your_password
 *    responses:
 *      200:
 *        description: 초기화 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "비밀번호가 변경되었습니다."
 */
router.patch('/reset', userController.resetPassword); // 4. 비밀번호 초기화

/**
 * @swagger
 * /users/me:
 *  get:
 *    summary: 내 정보 조회
 *    tags: [User]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: 정보 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                  example: user@mail.com
 *                name:
 *                  type: string
 *                  example: your_name
 *                nickname:
 *                  type: string
 *                  example: your_nickname
 *                phone:
 *                  type: string
 *                  example: 010-1234-5678
 *      401:
 *        description: 유효하지 않은 토큰
 */
router.get('/me', userController.getMyInfo); // 5. 내 정보 조회

/**
 * @swagger
 * /users/nickname:
 *  patch:
 *    summary: 닉네임 변경
 *    tags: [User]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - nickname
 *            properties:
 *              nickname:
 *                type: string
 *                example: your_new_nickname
 *    responses:
 *      200:
 *        description: 닉네임 변경 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "닉네임이 변경되었습니다."
 */
router.patch('/nickname', userController.updateNickname); // 6. 닉네임 변경

export default router;