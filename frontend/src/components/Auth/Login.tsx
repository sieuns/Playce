import { Modal } from "antd";
// import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import type { LoginProps } from "../../api/auth.api";
import InputText from "../Common/InputText";
import useAuthStore from "../../stores/authStore";
import Button from "../Common/Button";

const LoginModal = () => {
  //   const { userLogin } = useAuth();
  const { isLoginModalOpen, setIsLoginModalOpen } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit = (data: LoginProps) => {
    // userLogin(data);
    alert(data);
  };

  const handleCancel = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <Modal open={isLoginModalOpen} onCancel={handleCancel} footer={null}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 p-5 mt-5">
          <fieldset>
            <InputText
              placeholder="이메일"
              inputType="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="error-text">이메일을 입력해주세요.</p>
            )}
          </fieldset>
          <fieldset>
            <InputText
              placeholder="비밀번호"
              inputType="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="error-text">비밀번호를 입력해주세요.</p>
            )}
          </fieldset>
          <Button type="submit" className="mt-5">
            로그인
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginModal;
