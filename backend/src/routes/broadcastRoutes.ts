import { Router } from 'express';
import broadcastController from '../controller/broadcastController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Broadcasts
 *   description: 중계 일정 관련 API
 */

/**
 * @swagger
 * /broadcasts:
 *   post:
 *     summary: 중계 일정 등록
 *     tags: [Broadcasts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [store_id, match_date, match_time, sport, league]
 *             properties:
 *               store_id:
 *                 type: integer
 *               match_date:
 *                 type: string
 *                 format: date
 *               match_time:
 *                 type: string
 *                 format: time
 *               sport:
 *                 type: string
 *               league:
 *                 type: string
 *               team_one:
 *                 type: string
 *               team_two:
 *                 type: string
 *               etc:
 *                 type: string
 *     responses:
 *       201:
 *         description: 중계 일정 등록 성공
 */


/**
 * @swagger
 * /broadcasts/{broadcasts_id}:
 *   delete:
 *     summary: 중계 일정 삭제
 *     tags: [Broadcasts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: broadcasts_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 삭제 성공
 */

/**
 * @swagger
 * /broadcasts/{broadcasts_id}:
 *   put:
 *     summary: 중계 일정 수정
 *     tags: [Broadcasts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: broadcasts_id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               match_date:
 *                 type: string
 *                 format: date
 *               match_time:
 *                 type: string
 *                 format: time
 *               sport:
 *                 type: string
 *               league:
 *                 type: string
 *               team_one:
 *                 type: string
 *               team_two:
 *                 type: string
 *               etc:
 *                 type: string
 *     responses:
 *       200:
 *         description: 수정 성공
 */


/**
 * @swagger
 * /stores/{store_id}/broadcasts:
 *   get:
 *     summary: 특정 식당의 중계 일정 목록 조회
 *     tags: [Broadcasts]
 *     parameters:
 *       - in: path
 *         name: store_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 중계 일정 목록 조회 성공
 */
router.post('/', broadcastController.createBroadcast); // 1. 일정 등록
router.delete('/:broadcasts_id', broadcastController.deleteBroadcast); // 2. 일정 삭제
router.put('/:broadcasts_id', broadcastController.updateBroadcast); // 3. 일정 수정
router.get('/store/:store_id', broadcastController.getBroadcastsByStore); // 4. 특정 식당 일정 조회

export default router;
