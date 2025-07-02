import { Router } from "express";
import staticdataController from "../controller/staticdataController";

const router = Router();

// 지역 대분류 조회
router.get("/bigRegions", staticdataController.getBigRegions);

// 지역 소분류 조회 
router.get("/smallRegions/:big_region_id", staticdataController.getSmallRegions);

// 종목 조회
router.get("/sports", staticdataController.getSports);

// 리그 조회 
router.get("/leagues/:sport_id", staticdataController.getLeagues);

export default router;
