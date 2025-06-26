import { NextFunction, Request, Response } from "express";
import userService from "../service/userService";
import { AuthRequest } from "../middlewares/authMiddleware";

const userController = {
  // 1. 회원가입
  join: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userService.join(req);
      res.status(201).json({ success: true, message: "회원가입 성공!" });
    } catch (error) {
      next(error);
    }
  },
  // 2. 로그인
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await userService.login(req);
      res.status(201).json({ success: true, message: "로그인 성공!", token });
    } catch (error) {
      next(error);
    }
  },
  // 3. 비밀번호 초기화 요청
  requestResetPassword: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await userService.requestResetPassword();
      res
        .status(201)
        .json({ success: true, message: "메일이 전송되었습니다." });
    } catch (error) {
      next(error);
    }
  },
  //  4. 비밀번호 초기화
  resetPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userService.resetPassword();
      res
        .status(200)
        .json({ success: true, message: "비밀번호가 변경되었습니다." });
    } catch (error) {
      next(error);
    }
  },
  // 5. 내 정보 조회
  getMyInfo: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;

      const formatPhone = (phone: string): string => {
        return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
      };
      const userInfo = await userService.getMyInfo(userId);
      userInfo.phone = formatPhone(userInfo.phone);

      res.status(200).json({ success: true, data: userInfo });
    } catch (error) {
      next(error);
    }
  },
  // 6. 닉네임 변경
  updateNickname: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userService.updateNickname();
      res
        .status(200)
        .json({ success: true, message: "닉네임이 변경되었습니다." });
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
