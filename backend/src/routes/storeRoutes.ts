import { Router } from "express";
import storeController from "../controller/storeController";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Store
 *  description: 식당 관련 API
 */

/**
 * @swagger
 * /stores:
 *   post:
 *     summary: 식당 등록
 *     tags: [Store]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - store_name
 *               - business_number
 *               - address
 *               - lat
 *               - lng
 *               - phone
 *               - opening_hours
 *               - menus
 *               - type
 *               - img_id
 *             properties:
 *               store_name:
 *                 type: string
 *                 example: 플레이스 강남점
 *               business_number:
 *                 type: string
 *                 example: 123-45-67890
 *               address:
 *                 type: string
 *                 example: 서울특별시 강남구 테헤란로 123
 *               lat:
 *                 type: number
 *                 example: 37.5665
 *               lng:
 *                 type: number
 *                 example: 126.9780
 *               phone:
 *                 type: string
 *                 example: 02-1234-5678
 *               opening_hours:
 *                 type: string
 *                 example: 매일 10:00 ~ 23:00
 *               menus:
 *                 type: string
 *                 example: 맥주, 피자, 치킨
 *               type:
 *                 type: string
 *                 example: 스포츠펍
 *               img_id:
 *                 type: integer
 *                 example: 5
 *               description:
 *                 type: string
 *                 example: 축구 경기 생중계가 있는 강남 최고의 스포츠펍
 *     responses:
 *       201:
 *         description: 식당이 등록되었습니다.
 *       400:
 *         description: 필수 입력값 누락
 *       401:
 *         description: 유효하지 않은 토큰
 */
router.post("/", storeController.registerStore);

/**
 * @swagger
 * /stores/{id}:
 *   patch:
 *     summary: 식당 정보 수정
 *     tags: [Store]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: 수정할 식당의 고유 ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               store_name:
 *                 type: string
 *                 example: 플레이스 강남점
 *               business_number:
 *                 type: string
 *                 example: 123-45-67890
 *               address:
 *                 type: string
 *                 example: 서울특별시 강남구 테헤란로 123
 *               lat:
 *                 type: number
 *                 example: 37.5665
 *               lng:
 *                 type: number
 *                 example: 126.9780
 *               phone:
 *                 type: string
 *                 example: 02-1234-5678
 *               opening_hours:
 *                 type: string
 *                 example: 매일 10:00 ~ 23:00
 *               menus:
 *                 type: string
 *                 example: 맥주, 피자, 치킨
 *               type:
 *                 type: string
 *                 example: 스포츠펍
 *               img_id:
 *                 type: integer
 *                 example: 3
 *               description:
 *                 type: string
 *                 example: 최신 프리미어리그 경기 중계!
 *     responses:
 *       200:
 *         description: 식당 정보가 수정되었습니다.
 *       400:
 *         description: 유효하지 않은 요청
 *       403:
 *         description: 권한 없음 (본인 식당 아님)
 *       404:
 *         description: 식당을 찾을 수 없음
 */
router.patch("/:id", storeController.updateStore);

/**
 * @swagger
 * /stores/{id}:
 *   delete:
 *     summary: 식당 삭제
 *     tags: [Store]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: 삭제할 식당의 고유 ID
 *     responses:
 *       200:
 *         description: 식당이 삭제되었습니다.
 *       401:
 *         description: 유효하지 않은 토큰
 *       403:
 *         description: 권한 없음 (본인 식당 아님)
 *       404:
 *         description: 식당을 찾을 수 없음
 */
router.delete("/:id", storeController.deleteStore);

/**
 * @swagger
 * /stores/{id}:
 *   get:
 *     summary: 식당 상세 조회
 *     tags: [Store]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: 식당 고유 ID
 *     responses:
 *       200:
 *         description: 식당 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 store_name:
 *                   type: string
 *                   example: 플레이스 강남점
 *                 address:
 *                   type: string
 *                   example: 서울특별시 강남구 테헤란로 123
 *                 phone:
 *                   type: string
 *                   example: 02-1234-5678
 *                 opening_hours:
 *                   type: string
 *                   example: 매일 10:00 ~ 23:00
 *                 menus:
 *                   type: string
 *                   example: 맥주, 피자, 치킨
 *                 type:
 *                   type: string
 *                   example: 스포츠펍
 *                 img_list:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["https://image.com/1.jpg", "https://image.com/2.jpg"]
 *                 description:
 *                   type: string
 *                   example: EPL 생중계 가능!
 *                 broadcasts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       match_date:
 *                         type: string
 *                         format: date
 *                         example: 2025-06-30
 *                       match_time:
 *                         type: string
 *                         format: time
 *                         example: 20:00:00
 *                       sport:
 *                         type: string
 *                         example: soccer
 *                       league:
 *                         type: string
 *                         example: K League
 *                       team_one:
 *                         type: string
 *                         example: FC서울
 *                       team_two:
 *                         type: string
 *                         example: 수원삼성
 *                       etc:
 *                         type: string
 *                         example: 경기 후 이벤트 있음
 *       404:
 *         description: 식당을 찾을 수 없음
 */
router.get("/:id", storeController.getStoreDetail);

/**
 * @swagger
 * /stores/mypage:
 *   get:
 *     summary: 내 식당 목록 조회 (마이페이지)
 *     tags: [Store]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 사용자가 등록한 식당 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       store_id:
 *                         type: integer
 *                         example: 1
 *                         description: 식당 고유 ID
 *                       store_name:
 *                         type: string
 *                         example: 플레이스 강남점
 *                         description: 식당 이름
 *                       main_img:
 *                         type: string
 *                         example: https://image.com/1.jpg
 *                         description: 식당 대표 사진 URL
 *                       address:
 *                         type: string
 *                         example: 서울특별시 강남구 테헤란로 123
 *                         description: 식당 주소
 *       401:
 *         description: 유효하지 않은 토큰
 */
router.get("/mypage", storeController.getMyStores);

export default router;
