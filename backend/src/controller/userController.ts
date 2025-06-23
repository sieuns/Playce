import { NextFunction, Request, Response } from "express";
import userService from "../service/userService";

// TODO: userContoller로 하나로 묶었지만 필요하다면 분리할 것
// 컨트롤러 단위로 관리/테스트/확장하기 쉬움
// export나 import 코드가 짧아짐

// TODO: response 부분은 메시지만 작성함, 나머지 코드 추가 필요
// TODO: userService의 함수에서 필요한 데이터 삽입 ex) await userService.join(req.body);
// TODO: userService의 함수에서 리턴값이 있으면 변수 선언 ex) const result = await userService.join();

// TODO: 에러 부분은 userService에서 던지기 -> 제대로 동작 안함. 확인할 것

const userController = {
    // 1. 회원가입
    join: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await userService.join();
            res.status(201).json({ success: true, message: '회원가입 성공!'});
        } catch (error) {
            next(error);
        }
    },
    // 2. 로그인
    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await userService.login();
            res.status(200).json({ success: true, message: '로그인 성공!'});
        } catch (error) {
            next(error);
        }
    },
    // 3. 비밀번호 초기화 요청
    requestResetPassword: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await userService.requestResetPassword();
            res.status(201).json({ success: true, message: '메일이 전송되었습니다.' });
        } catch (error) {
            next(error);
        }
    },
    //  4. 비밀번호 초기화
    resetPassword: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await userService.resetPassword();
            res.status(200).json({ success: true, message: '비밀번호가 변경되었습니다.' });
        } catch (error) {
            next(error);
        }
    },
    // 5. 내 정보 조회
    getMyInfo: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await userService.getMyInfo();
            res.status(200).json({ success: true });
        } catch (error) {
            next(error);
        }
    },
    // 6. 닉네임 변경
    updateNickname: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await userService.updateNickname();
            res.status(200).json({ success: true, message: '닉네임이 변경되었습니다.' });
        } catch (error) {
            next(error);
        }
    }
};

export default userController;