import { Router } from "express";
import searchController from "../controller/searchController";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Search
 *  description: 검색 관련 API
 */

/**
 * @swagger
 * /search/nearby:
 *   get:
 *     summary: 현재 위치 기반 식당 검색 (메인페이지용)
 *     tags: [Search]
 *     parameters:
 *       - name: lat
 *         in: query
 *         required: true
 *         schema:
 *           type: number
 *         description: 현재 위치 위도
 *       - name: lng
 *         in: query
 *         required: true
 *         schema:
 *           type: number
 *         description: 현재 위치 경도
 *       - name: radius
 *         in: query
 *         required: false
 *         schema:
 *           type: number
 *         description: 검색 반경 (km 단위, 기본값 5)
 *     responses:
 *       200:
 *         description: 인근 식당 목록 또는 결과 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 검색 결과가 없습니다.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       store_id:
 *                         type: integer
 *                       store_name:
 *                         type: string
 *                       type:
 *                         type: string
 *                       main_img:
 *                         type: string
 *                       address:
 *                         type: string
 *                       broadcasts:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             match_date:
 *                               type: string
 *                             match_time:
 *                               type: string
 *                             sport:
 *                               type: string
 *                             league:
 *                               type: string
 *                             team_one:
 *                               type: string
 *                             team_two:
 *                               type: string
 *                             etc:
 *                               type: string
 */

/**
 * @swagger
 * /search:
 *   get:
 *     summary: 통합 검색
 *     tags: [Search]
 *     parameters:
 *       - name: search
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: "식당 이름 검색 키워드"
 *       - name: sport
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: "종목 (예: 축구, 야구 등)"
 *       - name: league
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: "리그 (예: 프리미어리그)"
 *       - name: team
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: "응원팀 (예: 맨유)"
 *       - name: big_region
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: "시/도 단위 지역명 (예: 서울)"
 *       - name: small_region
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: "구/군 단위 지역명 (예: 강남구)"
 *       - name: sort
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [date, name]
 *         description: "정렬 기준 (date 또는 name)"
 *     responses:
 *       200:
 *         description: 검색된 식당 목록 또는 검색 결과 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 검색 결과가 없습니다.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: 식당 ID
 *                       store_name:
 *                         type: string
 *                       img_url:
 *                         type: string
 *                       address:
 *                         type: string
 *                       lat:
 *                         type: number
 *                       lng:
 *                         type: number
 *                       match_id:
 *                         type: integer
 *                         description: 가장 가까운 중계 일정 ID
 */

router.get("/nearby", searchController.getNearbyStores);
router.get("/", searchController.searchStores);

export default router;
