interface ErrorTextProps {
  message?: string;
}

const ErrorText = ({ message }: ErrorTextProps) => {
  return <p className="pt-1 pl-1 text-red-500">{message}</p>;
};

export default ErrorText;
