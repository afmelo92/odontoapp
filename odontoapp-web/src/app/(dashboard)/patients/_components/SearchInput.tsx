import { Dispatch, SetStateAction } from "react";
import { getIcon } from "@/utils/getIcon";

type InputProps = {
  searchData: string;
  setValue: Dispatch<SetStateAction<string>>;
};

const SearchInput: React.FC<InputProps> = ({ searchData, setValue }) => {
  return (
    <div className="py-3 px-6 bg-gray-100 rounded-full flex items-center gap-4 text-sm">
      <input
        value={searchData}
        type="text"
        placeholder="Search..."
        className="bg-gray-100 focus:outline-none placeholder:text-gray-400 caret-gray-400"
        onChange={(e) => setValue(e.target.value)}
      />
      {getIcon({
        name: "magnifier",
        className: "w-5 h-5 stroke-gray-400",
        strokeWidth: 2,
      })}
    </div>
  );
};

export default SearchInput;
