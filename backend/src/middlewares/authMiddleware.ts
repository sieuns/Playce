import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userService from "../service/userService";

export interface AuthRequest extends Request {
  user?: { userId: number };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "토큰이 없습니다." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    // 토큰 유효성 검사
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY as string) as {
      userId: number;
    };

    // 토큰에서 사용자 id 추출 -> DB에서 유저 존재 여부 확인
    const user = await userService.getMyInfo(decoded.userId);
    if (!user) {
      const error = new Error("사용자를 찾을 수 없습니다.");
      (error as any).status = 404;
      return next(error);
    }

    // 유효성 검사 통과 -> req 객체에 유저 추가
    req.user = { userId: decoded.userId };
    next();

    // const decoded = jwt.verify(token, process.env.PRIVATE_KEY as string) as {
    //   userId: number;
    // };
    // req.user = { userId: decoded.userId };
    // next();
  } catch (err) {
    res.status(401).json({ message: "유효하지 않은 토큰입니다." });
  }
};
