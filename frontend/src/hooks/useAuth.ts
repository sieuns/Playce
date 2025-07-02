import {
  login,
  signup,
  type LoginProps,
  type SignupProps,
} from "../api/auth.api";
import useAuthStore from "../stores/authStore";

export const useAuth = () => {
  const { storeLogin, storeLogout } = useAuthStore();

  const userLogin = async (data: LoginProps) => {
    try {
      const res = await login(data);
      storeLogin(res.token);
      alert("로그인이 완료되었습니다.");
    } catch (error) {
      alert(`Error: ${error} 로그인에 실패했습니다.`);
    }
  };

  const userLogout = async () => {
    try {
      storeLogout();
      alert("로그아웃이 완료되었습니다.");
    } catch (error) {
      alert(`Error: ${error}로그아웃에 실패하였습니다.`);
    }
  };

  const userSignup = async (data: SignupProps) => {
    try {
      const response = await signup(data);
      console.log(response);
      alert("회원가입이 완료되었습니다.");
    } catch (error) {
      alert(`Error: ${error}회원가입에 실패했습니다.`);
    }
  };

  return {
    userLogin,
    userLogout,
    userSignup,
  };
};
