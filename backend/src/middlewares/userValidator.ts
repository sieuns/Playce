import { body } from "express-validator";
import validate from "./validate";

export const JoinValidator = [
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("이메일 형식이 올바르지 않습니다."),
  body("password")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("비밀번호는 최소 3자 이상이어야 합니다."),
  body("name").notEmpty().withMessage("이름을 입력해주세요."),
  body("nickname").notEmpty().withMessage("닉네임을 입력해주세요."),
  body("phone")
    .notEmpty()
    .matches(/^01[016789]-\d{3,4}-\d{4}$/)
    .withMessage("전화번호 형식을 확인해주세요. 예: 010-1234-5678"),
  validate,
];
