import { requestHandler } from "./http";

export interface LoginProps {
  email: string;
  password: string;
}

export interface SignupProps {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const login = (data: LoginProps) => {
  return requestHandler("post", "/users/login", data);
};

export const signup = (data: SignupProps) => {
  return requestHandler("post", "/users/signup", data);
};
