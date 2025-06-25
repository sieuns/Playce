import { Modal } from "antd";
import useAuthStore from "../../stores/authStore";
import InputText from "../Common/InputText";
import { useForm } from "react-hook-form";
import type { SignupProps } from "../../api/auth.api";
import Button from "../Common/Button";
import ErrorText from "./ErrorText";
// import { useAuth } from "../../hooks/useAuth";

const SignupModal = () => {
  //   const { userSignup } = useAuth();
  const { isSignupModalOpen, setIsSignupModalOpen } = useAuthStore();

  const handleCancel = () => {
    setIsSignupModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupProps>();

  const onSubmit = (data: SignupProps) => {
    // userSignup(data);
    alert(data);
  };

  return (
    <div>
      <Modal open={isSignupModalOpen} onCancel={handleCancel} footer={null}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 p-5 mt-5">
            <fieldset>
              <InputText
                placeholder="이름"
                inputType="text"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="p-1  text-red-500">이름을 입력해주세요.</p>
              )}
            </fieldset>
            <fieldset>
              <InputText
                placeholder="이메일"
                inputType="email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+\.\S+$/,
                })}
              />
              {errors.email && (
                <ErrorText message="유효한 이메일을 입력해주세요" />
              )}
            </fieldset>
            <fieldset>
              <InputText
                placeholder="비밀번호"
                inputType="password"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password && <ErrorText message="6자 이상 입력해주세요" />}
            </fieldset>
            <fieldset>
              <InputText
                placeholder="비밀번호 재입력"
                inputType="password"
                {...register("passwordConfirm", {
                  required: "비밀번호를 재입력해주세요",
                  minLength: {
                    value: 6,
                    message: "6자 이상 입력해주세요",
                  },
                  validate: (value) =>
                    value === watch("password") ||
                    "비밀번호가 일치하지 않습니다.",
                })}
              />

              {errors.passwordConfirm && (
                <ErrorText message={errors.passwordConfirm.message} />
              )}
            </fieldset>
            <fieldset>
              <Button type="submit" className="mt-5">
                회원가입
              </Button>
            </fieldset>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SignupModal;
