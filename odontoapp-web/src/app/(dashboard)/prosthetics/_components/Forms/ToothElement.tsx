import { getIcon } from "@/utils/getIcon";

type ToothElementProps = {
  id: number;
  selected: boolean;
  // eslint-disable-next-line no-unused-vars
  onSelect: (id: number) => void;
};
const ToothElement: React.FC<ToothElementProps> = ({
  id,
  selected = false,
  onSelect,
}) => {
  return (
    <p
      id={`tooth-${id}`}
      data-selected={selected}
      className="flex flex-col items-center justify-center gap-1 text-[10px] fill-none data-[selected=true]:fill-blue-500 cursor-pointer"
      onClick={() => onSelect(id)}
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
    </p>
  );
};

export default ToothElement;
