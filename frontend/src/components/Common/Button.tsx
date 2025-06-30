import React from "react";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  scheme?: "primary" | "secondary";
  size?: "xsmall" | "small" | "medium" | "large";
  isLoading?: boolean;
  className?: string;
}

const Button = ({
  children,
  scheme = "primary",
  size = "medium",
  isLoading = false,
  disabled = false,
  className,
  ...props
}: ButtonProps) => {
  const baseClass =
    "w-full rounded-md font-semibold transition-colors duration-200 disabled:cursor-not-allowed";

  const sizeClass = {
    xsmall: "py-1 px-2",
    small: "py-2 px-3 text-sm",
    medium: "py-3 px-4 text-base",
    large: "py-4 px-6 text-lg",
  }[size];

  const schemeClass =
    scheme === "primary"
      ? "bg-gray-300 text-white hover:bg-gray-500"
      : "bg-gray-200 text-gray-800 hover:bg-gray-400 hover:text-white";

  return (
    <button
      className={classNames(baseClass, sizeClass, schemeClass, className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "로딩중..." : children}
    </button>
  );
};

export default Button;
