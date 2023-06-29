import { SelectHTMLAttributes, forwardRef } from "react";

interface ControlledSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ value: any; text: string }>;
  defaultLabel?: string;
  requierd?: boolean;
}

const ControlledSelect = forwardRef<HTMLSelectElement, ControlledSelectProps>(
  (
    {
      name,
      label,
      options,
      defaultLabel = "Choose Option",
      required = false,
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
        <div id="select-container" className="relative flex items-center gap-2">
          <span className="sr-only">{label}</span>
          <select
            className="w-full block py-2 px-4 bg-white outline-none border-gray-400 focus:border-blue-500 rounded-xl border-2"
            {...rest}
            ref={ref}
          >
            <option value="">{defaultLabel}</option>
            {options.map((op) => (
              <option key={op.value} value={op.value}>
                {op.text}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
);

ControlledSelect.displayName = "ControlledSelect";

export default ControlledSelect;