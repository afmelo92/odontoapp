import { getIcon } from "@/utils/getIcon";
import { InputHTMLAttributes, forwardRef } from "react";

interface ControlledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: string;
  rightIcon?: string;
  name: string;
  required?: boolean;
  sizeType?: "sm" | "base" | "lg";
  loading?: boolean;
  error?: string;
  disabled?: boolean;
  invisible?: boolean;
}

const ControlledInput = forwardRef<HTMLInputElement, ControlledInputProps>(
  (
    {
      name,
      label,
      leftIcon,
      rightIcon,
      required = false,
      sizeType = "base",
      loading = false,
      error = "",
      disabled = false,
      invisible = false,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        id="input-wrapper"
        className={`group flex flex-col gap-2 ${invisible && "invisible"}`}
      >
        {label && (
          <label htmlFor={name} className="text-xs font-semibold text-gray-900">
            {label}{" "}
            {required && <span className="text-red-500 text-xs">{"*"}</span>}
          </label>
        )}
        <div
          id="input-container"
          data-error={Boolean(error)}
          data-loading={loading}
          className={`group relative flex items-center gap-2 
            caret-blue-500 
            stroke-gray-400
            focus-within:stroke-blue-500
            data-[loading=true]:stroke-gray-500 
            data-[loading=true]:border-gray-500
            data-[error=true]:stroke-red-500
          `}
        >
          <span className="sr-only">{label}</span>
          {leftIcon && (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              {getIcon({
                name: leftIcon,
                className: "w-4 h-4 stroke-inherit",
                strokeWidth: 2,
              })}
            </span>
          )}
          <input
            disabled={loading || disabled}
            className={`w-full ${leftIcon ? "pl-8" : "pl-4"} ${
              rightIcon ? "pr-8" : "pr-4"
            } ${sizeType === "base" ? "py-2" : "py-3"} 
            rounded-xl border-2 
            border-gray-400 
            placeholder:text-gray-400 block
            focus:outline-blue-500
            focus:stroke-blue-500
            group-data-[loading=true]:focus:outline-gray-900 
            group-data-[loading=true]:bg-gray-300 
            group-data-[loading=true]:text-gray-500
            disabled:focus:outline-gray-900 
            disabled:bg-gray-300 
            disabled:text-gray-500
              disabled:cursor-not-allowed
              group-data-[error=true]:outline-none
            group-data-[error=true]:border-red-500
            group-data-[error=true]:text-red-500
             `}
            {...rest}
            ref={ref}
          />
          {rightIcon && (
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              {getIcon({
                name: rightIcon,
                className: "w-4 h-4 stroke-inherit",
                strokeWidth: 2,
              })}
            </span>
          )}
        </div>
        {error && (
          <small className="text-xs font-normal text-red-500">{error}</small>
        )}
      </div>
    );
  }
);

ControlledInput.displayName = "ControlledInput";

export default ControlledInput;
