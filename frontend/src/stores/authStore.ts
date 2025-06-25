import { create } from "zustand";

export type TAuthModal = "login" | "signup" | null;

interface AuthState {
  isLoginModalOpen: boolean;
  isSignupModalOpen: boolean;
  isLoggedIn: boolean;
  setIsLoginModalOpen: (modal: boolean) => void;
  setIsSignupModalOpen: (modal: boolean) => void;
  storeLogin: (token: string) => void;
  storeLogout: () => void;
}

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

const useAuthStore = create<AuthState>((set) => ({
  isLoginModalOpen: false,
  isSignupModalOpen: false,
  isAuthModalOpen: false,
  isLoggedIn: getToken() ? true : false,
  authModal: null,
  setIsLoginModalOpen: (modal) => {
    set({ isLoginModalOpen: modal });
  },
  setIsSignupModalOpen: (modal) => {
    set({ isSignupModalOpen: modal });
  },
  storeLogin: (token: string) => {
    set({ isLoggedIn: true });
    setToken(token);
  },
  storeLogout: () => {
    set({ isLoggedIn: false });
    removeToken();
  },
}));

export default useAuthStore;
