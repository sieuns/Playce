import { Request } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/createError";
require("dotenv").config();

const userRepository = AppDataSource.getRepository(User);

const userService = {
  // 1. 회원가입
  join: async (req: Request) => {
    const { email, password, name, nickname, phone } = req.body;

    if (!email || !password || !name || !nickname || !phone) {
      throw createError("모든 필드를 입력해주세요.", 400);
    }
    console.log("유효성 검사 완료 - 필수 항목 존재");

    const existingEmail = await userRepository.findOneBy({ email });
    if (existingEmail) {
      throw createError("이미 존재하는 이메일입니다.", 409);
    }
    console.log("유효성 검사 완료 - 이메일 중복 없음");

    const formatPhone = (phone: string): string => {
      const onlyDigits = phone.replace(/\D/g, "");
      return onlyDigits.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    };

    const formattedPhone = formatPhone(phone);

    const existingPhone = await userRepository.findOneBy({
      phone: formattedPhone,
    });
    if (existingPhone) {
      throw createError("이미 등록된 전화번호입니다.", 409);
    }
    console.log("유효성 검사 완료 - 전화번호 중복 없음");

    const hashPassword = await bcrypt.hash(password, 10);
    console.log("비밀번호 해싱 완료");

    const newUser = userRepository.create({
      email,
      password: hashPassword,
      name,
      nickname,
      phone: formattedPhone,
    });

    await userRepository.save(newUser);
    console.log("[UserService] 회원가입 완료 - email:", email);
  },
  // 2. 로그인
  login: async (req: Request) => {
    const { email, password } = req.body;

    const user = await userRepository.findOneBy({ email });
    if (!user) {
      console.warn("⚠️ 존재하지 않는 사용자");
      throw createError("이메일 또는 비밀번호가 일치하지 않습니다.", 401);
    }
    console.log("유효성 검사 완료 - 사용자 존재 확인");

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.warn("⚠️ 비밀번호 불일치");
      throw createError("이메일 또는 비밀번호가 일치하지 않습니다.", 401);
    }
    console.log("유효성 검사 완료 - 비밀번호 일치");

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.PRIVATE_KEY as string,
      { expiresIn: "1h" }
    );

    console.log("[UserService] 로그인 성공 - userId:", user.id);
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
  getMyInfo: async (userId: number) => {
    const user = await userRepository.findOne({
      where: { id: userId },
      select: ["email", "name", "nickname", "phone"],
    });

    if (!user) {
      throw createError("사용자를 찾을 수 없습니다.", 404);
    }

    console.log("[UserService] 사용자 정보 조회 성공");
    console.log("응답 데이터:", user);
    return user;
  },

  // 6. 닉네임 변경
  updateNickname: async (userId: number, newNickname: string) => {
    if (!newNickname) {
      console.warn("⚠️ 닉네임 없음");
      throw createError("변경할 닉네임을 입력해주세요.", 400);
    }
    console.log("유효성 검사 완료 - 닉네임 입력 확인");

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      throw createError("사용자를 찾을 수 없습니다.", 404);
    }
    console.log("유효성 검사 완료 - 사용자 존재 확인");

    user.nickname = newNickname;
    await userRepository.save(user);
    console.log("[UserService] 닉네임 변경 완료 - nickname:", newNickname);
  },
};

export default userService;
