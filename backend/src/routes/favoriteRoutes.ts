import { Router } from "express";
import favoriteController from "../controller/favoriteController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: 즐겨찾기 관련 API
 */

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: 즐겨찾기 목록 조회
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 즐겨찾기 목록 조회 성공
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
 *                       store_name:
 *                         type: string
 *                         example: "신라면옥"
 *                       main_img:
 *                         type: string
 *                         example: "https://cdn.example.com/image.jpg"
 *                       address:
 *                         type: string
 *                         example: "서울시 강남구"
 *                       type:
 *                         type: string
 *                         example: "한식"
 */
router.get("/", authenticate, favoriteController.getFavorites); // 1. 즐겨찾기 목록 조회

/**
 * @swagger
 * /favorites/{store_id}:
 *   post:
 *     summary: 즐겨찾기 추가
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: store_id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       201:
 *         description: 즐겨찾기 추가 성공
 */
router.post("/:store_id", authenticate, favoriteController.addFavorite); // 2. 즐겨찾기 추가

/**
 * @swagger
 * /favorites/{store_id}:
 *   delete:
 *     summary: 즐겨찾기 삭제
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: store_id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: 즐겨찾기 삭제 성공
 */
router.delete("/:store_id", authenticate, favoriteController.removeFavorite); // 3. 즐겨찾기 삭제

export default router;
