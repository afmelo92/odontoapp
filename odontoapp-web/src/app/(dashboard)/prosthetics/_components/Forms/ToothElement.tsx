import { getIcon } from "@/utils/getIcon";

type ToothElementProps = {
  id: number;
  selected: boolean;
  // eslint-disable-next-line no-unused-vars
  onSelect: (id: number) => void;
  disabled?: boolean;
};
const ToothElement: React.FC<ToothElementProps> = ({
  id,
  selected = false,
  onSelect,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      id={`tooth-${id}`}
      data-selected={selected}
      className="flex flex-col items-center justify-center gap-1 text-[10px] 
      fill-none 
      data-[selected=true]:fill-blue-500 
      cursor-pointer 
      disabled:cursor-not-allowed
      disabled:fill-gray-300"
      onClick={() => onSelect(id)}
      disabled={disabled}
    >
      {id < 31 && id}
      <span>
        {getIcon({
          name: `t${id}`,
          className: "w-fit h-12 stroke-black fill-inherit",
          strokeWidth: 2,
        })}
      </span>
      {id >= 31 && id}
    </button>
  );
};

export default ToothElement;
