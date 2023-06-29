import { getIcon } from "@/utils/getIcon";
import { InputHTMLAttributes } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<FieldValues>;
  name: keyof FieldValues;
  label?: string;
  leftIcon?: string;
  rightIcon?: string;
}

const Input: React.FC<InputProps> = ({
  register,
  name,
  label,
  leftIcon,
  rightIcon,
  ...rest
}) => {
  return (
    <div id="input-wrapper" className="group flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="text-xs font-semibold text-gray-900">
          {label}
        </label>
      )}
      <div
        id="input-container"
        className="relative flex items-center gap-2 caret-blue-500 stroke-gray-400 focus-within:stroke-blue-500"
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
          className={`w-full ${leftIcon ? "pl-8" : "pl-4"} ${
            rightIcon ? "pr-8" : "pr-4"
          } py-2 border-2 border-gray-400 rounded-xl outline-2 focus:outline-blue-500 placeholder:text-gray-400 block`}
          {...rest}
          {...register(name)}
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
    </div>
  );
};

export default Input;
