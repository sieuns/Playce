import { body } from "express-validator";
import validate from "./validate";

export const createStoreValidator = [
  body('store_name')
    .notEmpty().withMessage('식당 이름을 입력해주세요.').bail()
    .isString().withMessage('식당 이름은 문자열이어야 합니다.'),

  body('business_number')
    .notEmpty().withMessage('사업자등록번호를 입력해주세요.').bail()
    .isString().withMessage('사업자등록번호는 문자열이어야 합니다.').bail()
    .matches(/^\d{3}-\d{2}-\d{5}$/, 'i')
    .withMessage('사업자등록번호를 형식에 맞게 입력해주세요. 예: 123-45-67890'),

  body('address')
    .notEmpty().withMessage('주소를 입력해주세요.').bail()
    .isString().withMessage('주소는 문자열이어야 합니다.'),

  body('phone')
    .notEmpty().withMessage('전화번호를 입력해주세요.').bail()
    .isString().withMessage('전화번호는 문자열이어야 합니다.').bail()
    .matches(/^(0?(2|3[1-3]|4[1-4]|5[1-5]|6[1-4])-\d{3,4}-\d{4}|01[016789]-\d{4}-\d{4})$/, 'i')
    .withMessage('전화번호를 형식에 맞게 입력해주세요. 예: 02-123-1111, 031-1234-1111, 010-1234-1111'),

  body('opening_hours')
    .notEmpty().withMessage('영업 시간을 입력해주세요.').bail()
    .isString().withMessage('영업 시간은 문자열이어야 합니다.'),

  body('menus')
    .notEmpty().withMessage('메뉴를 입력해주세요.').bail()
    .isString().withMessage('메뉴는 문자열이어야 합니다.'),

  body('type')
    .notEmpty().withMessage('업종을 입력해주세요.').bail()
    .isString().withMessage('업종은 문자열이어야 합니다.'),

  body('description')
    .optional()
    .isString().withMessage('설명은 문자열이어야 합니다.'),

  body('img_urls')
    .optional().isArray().withMessage('이미지 URL 리스트는 배열이어야 합니다.'),

  body('img_urls.*')
    .optional().isURL().withMessage('각 이미지 URL은 유효한 형식이어야 합니다.'),

  validate,
];
