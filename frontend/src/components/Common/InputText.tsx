import React from "react";
import classNames from "classnames";

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={classNames(
          "border pl-4 p-2 rounded w-full text-mainText text-sm hover:border-primary1 focus:border-primary1 focus:outline-none focus:ring-1 focus:ring-primary1 transition-all",
          className
        )}
        autoComplete="off"
        {...props}
      />
    );
  }
);

InputText.displayName = "InputText";
export default InputText;
