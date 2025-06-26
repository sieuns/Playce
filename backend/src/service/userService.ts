import { Request } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrpyt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/email";
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

    const formatPhone = (phone: string): string => {
      const onlyDigits = phone.replace(/\D/g, "");
      return onlyDigits.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    };

    const formattedPhone = formatPhone(phone);

    const newUser = userRepository.create({
      email,
      password: hashPassword,
      name,
      nickname,
      phone: formattedPhone,
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
  requestResetPassword: async (email: string) => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      const error = new Error("가입된 이메일이 없습니다.");
      (error as any).status = 404;
      throw error;
    }

    const jwtSecret = process.env.PRIVATE_KEY;
    if (!jwtSecret) {
      throw new Error("JWT 시크릿 키가 설정되지 않았습니다.");
    }

    const token = jwt.sign({ email: user.email }, jwtSecret, {
      expiresIn: "10m",
    });

    const resetUrl = `https://your-frontend.com/reset-password?token=${token}`;
    const html = `<p>비밀번호를 재설정하려면 아래 링크를 클릭하세요:</p><a href="${resetUrl}">${resetUrl}</a>`;

    await sendMail({
      to: email,
      subject: "비밀번호 재설정",
      html,
    });
  },
  // 4. 비밀번호 초기화
  resetPassword: async () => {
    console.log("👤 유저 : 4. 비밀번호 초기화");
  },
  // 5. 내 정보 조회
  getMyInfo: async (userId: number) => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: userId },
      select: ["email", "name", "nickname", "phone"],
    });

    if (!user) {
      const error = new Error("사용자를 찾을 수 없습니다.");
      (error as any).status = 404;
      throw error;
    }

    return user;
  },

  // 6. 닉네임 변경
  updateNickname: async (userId: number, newNickname: string) => {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      const error = new Error("사용자를 찾을 수 없습니다.");
      (error as any).status = 404;
      throw error;
    }

    user.nickname = newNickname;
    await userRepository.save(user);
  },
};

export default userService;
