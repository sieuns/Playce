import { Request } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrpyt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

const userService = {
  // 1. 회원가입
  join: async (req: Request) => {
    console.log("req.body:", req.body);
    const { email, password, name, nickname, phone } = req.body;

    if (!email || !password || !name || !nickname || !phone) {
      const error = new Error("모든 필드를 입력해주세요.");
      (error as any).status = 400;
      throw error;
    }

    const userRepository = AppDataSource.getRepository(User);

    const existingEmail = await userRepository.findOneBy({ email });
    if (existingEmail) {
      const error = new Error("이미 존재하는 이메일입니다.");
      (error as any).status = 409;
      throw error;
    }

    const hashPassword = await bcrpyt.hash(password, 10);

    const newUser = userRepository.create({
      email,
      password: hashPassword,
      name,
      nickname,
      phone: phone.replace(/-/g, ""),
    });

    await userRepository.save(newUser);
  },
  // 2. 로그인
  login: async (req: Request) => {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("이메일과 비밀번호를 입력해주세요.");
      (error as any).status = 400;
      throw error;
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });

    if (!user || !(await bcrpyt.compare(password, user.password))) {
      const error = new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
      (error as any).status = 401;
      throw error;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.PRIVATE_KEY as string,
      { expiresIn: "1h" }
    );

    return token;
  },
  // 3. 비밀번호 초기화 요청
  requestResetPassword: async () => {
    console.log("👤 유저 : 3. 비밀번호 초기화 요청");
  },
  // 4. 비밀번호 초기화
  resetPassword: async () => {
    console.log("👤 유저 : 4. 비밀번호 초기화");
  },
  // 5. 내 정보 조회
  getMyInfo: async () => {
    console.log("👤 유저 : 5. 내 정보 조회");
  },
  // 6. 닉네임 변경
  updateNickname: async () => {
    console.log("👤 유저 : 6. 닉네임 변경");
  },
};

export default userService;
