import React, { ButtonHTMLAttributes } from "react";
import Spinner from "./Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  error?: boolean;
  label: string;
  className?: string;
  leftIcon?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  loading = false,
  error = false,
  className = "",
  ...rest
}) => {
  return (
    <button
      disabled={loading || error}
      className={`w-full flex items-center justify-center transition-colors p-4 rounded-xl font-semibold
      bg-blue-500 
      hover:bg-blue-700 
      text-white
      focus:outline-blue-900 
      disabled:bg-gray-500 
        disabled:cursor-not-allowed
      ${className}  
      `}
      {...rest}
    >
      {loading ? (
        <Spinner size="w-6 h-6" fill="fill-blue-500" trail="text-gray-200" />
      ) : (
        <p>{label}</p>
      )}
    </button>
  );
};

export default Button;

<Spinner size="w-24 h-24" fill="fill-blue-700" trail="text-blue-200" />;
