import { SelectHTMLAttributes } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  register: UseFormRegister<FieldValues>;
  name: keyof FieldValues;
  label?: string;
  options: Array<{ value: any; text: string }>;
}

const Select: React.FC<SelectProps> = ({
  register,
  name,
  label,
  options,
  ...rest
}) => {
  return (
    <div id="select-wrapper" className="group flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="text-xs font-semibold text-gray-900">
          {label}
        </label>
      )}
      <div id="select-container" className="relative flex items-center gap-2">
        <span className="sr-only">{label}</span>
        <select
          className="w-full block py-2 px-4 bg-white outline-none border-gray-400 focus:border-blue-500 rounded-xl border-2"
          {...rest}
          {...register(name)}
        >
          <option value="">Choose option</option>
          {options.map((op) => (
            <option key={op.value} value={op.value}>
              {op.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
