import { body, param } from "express-validator";
import validate from "./validate";

export const createBroadcastValidator = [
  body("store_id")
    .notEmpty().withMessage("store_id는 필수입니다.")
    .isInt({ min: 1 }).withMessage("store_id는 1 이상의 정수여야 합니다."),
  body("sport_id")
    .notEmpty().withMessage("sport_id는 필수입니다.")
    .isInt({ min: 1 }).withMessage("sport_id는 1 이상의 정수여야 합니다."),
  body("league_id")
    .notEmpty().withMessage("league_id는 필수입니다.")
    .isInt({ min: 1 }).withMessage("league_id는 1 이상의 정수여야 합니다."),
  body("match_date")
    .notEmpty().withMessage("match_date는 필수입니다.")
    .isISO8601().withMessage("match_date는 올바른 날짜 형식이어야 합니다."),
  body("match_time")
    .notEmpty().withMessage("match_time은 필수입니다.")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage("match_time은 HH:mm 형식이어야 합니다."),
  body("team_one").optional().isString(),
  body("team_two").optional().isString(),
  body("etc").optional().isString(),
  validate,
];

export const updateBroadcastValidator = [
  body("store_id").optional().isInt({ min: 1 }).withMessage("store_id는 1 이상의 정수여야 합니다."),
  body("sport_id").optional().isInt({ min: 1 }).withMessage("sport_id는 1 이상의 정수여야 합니다."),
  body("league_id").optional().isInt({ min: 1 }).withMessage("league_id는 1 이상의 정수여야 합니다."),
  body("match_date").optional().isISO8601().withMessage("match_date는 올바른 날짜 형식이어야 합니다."),
  body("match_time").optional()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage("match_time은 HH:mm 형식이어야 합니다."),
  body("team_one").optional().isString(),
  body("team_two").optional().isString(),
  body("etc").optional().isString(),
  validate,
];
