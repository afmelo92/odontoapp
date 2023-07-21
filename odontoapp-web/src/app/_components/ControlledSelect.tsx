import { getIcon } from "@/utils/getIcon";
import { SelectHTMLAttributes, forwardRef } from "react";

interface ControlledSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  leftIcon?: string;
  options: Array<{ value: any; text: string }>;
  defaultLabel?: string;
  required?: boolean;
  sizeType?: "sm" | "base" | "lg";
  loading?: boolean;
  error?: string;
  defaultValue?: any;
}

const ControlledSelect = forwardRef<HTMLSelectElement, ControlledSelectProps>(
  (
    {
      name,
      label,
      leftIcon,
      options,
      defaultLabel = "Choose Option",
      required = false,
      sizeType = "base",
      loading = false,
      error = "",
      defaultValue = "",
      disabled = false,
      ...rest
    },
    ref
  ) => {
    return (
      <div id="select-wrapper" className="group flex flex-col gap-2">
        {label && (
          <label htmlFor={name} className="text-xs font-semibold text-gray-900">
            {label}{" "}
            {required && <span className="text-red-500 text-xs">{"*"}</span>}
          </label>
        )}
        <div
          id="select-container"
          data-error={Boolean(error)}
          data-loading={loading}
          data-disabled={disabled}
          className="group relative flex items-center gap-2 
            caret-blue-500 
            stroke-gray-400
            focus-within:stroke-blue-500
            data-[loading=true]:stroke-gray-500 
            data-[loading=true]:border-gray-500
            data-[error=true]:stroke-red-500
            "
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
          <select
            disabled={loading || disabled}
            className={`w-full block rounded-xl
            ${leftIcon ? "pl-8" : "pl-4"} 
            ${sizeType === "base" ? "py-2" : "py-3"}
            border-2
            border-gray-400
            bg-white
            placeholder:text-gray-400 block
            focus:outline-blue-500
            focus:stroke-blue-500
            group-data-[loading=true]:focus:outline-gray-900 
            group-data-[loading=true]:border-gray-500 
            group-data-[loading=true]:bg-gray-300 
            group-data-[loading=true]:text-gray-700
              group-data-[loading=true]:cursor-not-allowed
              group-data-[error=true]:outline-none
            group-data-[error=true]:border-red-500
            group-data-[error=true]:text-red-500
            disabled:cursor-not-allowed
            group-data-[disabled=true]:bg-gray-400

            `}
            {...rest}
            ref={ref}
          >
            <option value={defaultValue}>{defaultLabel}</option>
            {options.map((op) => (
              <option key={op.value} value={op.value}>
                {op.text}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <small className="text-xs font-normal text-red-500">{error}</small>
        )}
      </div>
    );
  }
);

ControlledSelect.displayName = "ControlledSelect";

export default ControlledSelect;
