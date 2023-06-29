import { ActionProps } from "@/app/appointments/_contexts/AppointmentsContext";
import { getIcon } from "@/utils/getIcon";

type InputProps = {
  searchData: string;
  dispatch: React.Dispatch<ActionProps>;
};

const SearchInput: React.FC<InputProps> = ({ searchData, dispatch }) => {
  return (
    <div className="py-3 px-6 bg-gray-100 rounded-full flex items-center gap-4 text-sm">
      <input
        value={searchData}
        type="text"
        placeholder="Search..."
        className="bg-gray-100 focus:outline-none placeholder:text-gray-400 caret-gray-400"
        onChange={(e) =>
          dispatch({
            type: "FILTER_DATA",
            payload: {
              data: e.target.value,
            },
          })
        }
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
