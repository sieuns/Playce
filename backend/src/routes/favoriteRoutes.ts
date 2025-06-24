import { Router } from 'express';
import favoriteController from '../controller/favoriteController';

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
 */
router.post('/:store_id', favoriteController.addFavorite); // 1. 즐겨찾기 추가

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
 *     responses:
 *       201:
 *         description: 즐겨찾기 추가 성공
 */
router.delete('/:store_id', favoriteController.removeFavorite); // 2. 즐겨찾기 삭제

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
 *     responses:
 *       200:
 *         description: 즐겨찾기 삭제 성공
 */
router.get('/', favoriteController.getFavorites); // 3. 즐겨찾기 목록 조회

export default router;
