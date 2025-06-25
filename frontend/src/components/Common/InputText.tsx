import React, { type ForwardedRef } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  inputType?: string;
}

const InputText = React.forwardRef(
  (
    { placeholder, inputType = "text", ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        className="w-full p-2 text-[16px] border border-gray-300 border-1.5 rounded-md"
        type={inputType}
        placeholder={placeholder}
        ref={ref}
        autoComplete="off"
        {...props}
      />
    );
  }
);

export default InputText;
