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
 *               business_number:
 *                 type: string
 *               address:
 *                 type: string
 *               lat:
 *                 type: number
 *               lng:
 *                 type: number
 *               phone:
 *                 type: string
 *               opening_hours:
 *                 type: string
 *               menus:
 *                 type: string
 *               type:
 *                 type: string
 *               img_id:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: 식당이 등록되었습니다.
 *       400:
 *         description: 필수 입력값 누락
 *       401:
 *         description: 유효하지 않은 토큰
 *
 */
router.post("/", storeController.registerStore); // 1. 식당 등록

/**
 * @swagger
 * /stores/{id}:
 *   put:
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               store_name:
 *                 type: string
 *                 description: 식당 이름
 *               business_number:
 *                 type: string
 *                 description: 사업자 등록번호
 *               address:
 *                 type: string
 *               lat:
 *                 type: number
 *                 format: float
 *               lng:
 *                 type: number
 *                 format: float
 *               phone:
 *                 type: string
 *               opening_hours:
 *                 type: string
 *               menus:
 *                 type: string
 *               type:
 *                 type: string
 *               img_id:
 *                 type: integer
 *                 description: 대표 이미지 ID
 *               description:
 *                 type: string
 *             description: 수정하고 싶은 필드만 포함해서 전송 (전부 수정 가능)
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
router.put("/:id", storeController.updateStore); // 2. 식당 수정

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
router.delete("/:id", storeController.deleteStore); // 3. 식당 삭제

/**
 * @swagger
 * /stores/{id}:
 *   get:
 *     summary: 식당 상세 조회
 *     tags: [Store]
 *     security:
 *       - bearerAuth: []  # 조건부 토큰
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
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
 *                 address:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 opening_hours:
 *                   type: string
 *                 menus:
 *                   type: string
 *                 type:
 *                   type: string
 *                 img_list:
 *                   type: array
 *                   items:
 *                     type: string
 *                 description:
 *                   type: string
 *                 broadcasts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       match_date:
 *                         type: string
 *                         format: date
 *                       match_time:
 *                         type: string
 *                       sport:
 *                         type: string
 *                       league:
 *                         type: string
 *                       team_one:
 *                         type: string
 *                       team_two:
 *                         type: string
 *                       etc:
 *                         type: string
 *       404:
 *         description: 식당을 찾을 수 없음
 */
router.get("/mypage", storeController.getMyStores); // 5. 내 식당 목록

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
 *                         description: 식당 고유 ID
 *                       store_name:
 *                         type: string
 *                         description: 식당 이름
 *                       main_img:
 *                         type: string
 *                         description: 식당 대표 사진 URL
 *                       address:
 *                         type: string
 *                         description: 식당 주소
 *       401:
 *         description: 유효하지 않은 토큰
 */
router.get("/:id", storeController.getStoreDetail); // 4. 식당 상세 조회

export default router;
