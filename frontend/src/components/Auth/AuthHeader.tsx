import { Button } from "antd";
import { FaRegUser, FaSignInAlt } from "react-icons/fa";
import useAuthStore from "../../stores/authStore";

const AuthHeader: React.FC = () => {
  const { setIsLoginModalOpen, setIsSignupModalOpen } = useAuthStore();
  return (
    <div className="absolute top-5 right-5 z-10 text-lg">
      <div className="flex gap-3">
        <Button
          icon={<FaSignInAlt />}
          size="large"
          onClick={() => {
            setIsLoginModalOpen(true);
          }}
        >
          로그인
        </Button>
        <Button
          icon={<FaRegUser />}
          size="large"
          onClick={() => {
            setIsSignupModalOpen(true);
          }}
        >
          회원가입
        </Button>
      </div>
    </div>
  );
};

export default AuthHeader;
