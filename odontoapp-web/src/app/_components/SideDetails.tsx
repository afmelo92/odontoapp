import { getIcon } from "@/utils/getIcon";

type SideDetailsProps = {
  onShow: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title?: string;
};

const SideDetails: React.FC<SideDetailsProps> = ({
  children,
  title = "",
  onShow,
}) => {
  return (
    <div
      className="bg-white shadow-[-6px_0px_5px_-4px_rgba(166,166,166,1)] absolute right-0 top-[72px] 
    bottom-0 left-[20%] md:left-[40%] lg:left-[50%] xl:left-[70%] flex flex-col"
    >
      <div className="w-full flex items-center justify-between bg-indigo-50 p-6">
        <h1 className="font-semibold text-2xl text-gray-900">{title}</h1>
        <button
          title="Close details"
          onClick={() => onShow(false)}
          className="font-bold"
        >
          {getIcon({
            name: "xmark",
            className:
              "w-5 h-5 stroke-gray-500 hover:stroke-gray-700 transition-colors",
            strokeWidth: 2,
          })}
        </button>
      </div>
      <div className="h-full overflow-y-auto overflow-x-hidden p-6">
        {children}
      </div>
    </div>
  );
};

export default SideDetails;
