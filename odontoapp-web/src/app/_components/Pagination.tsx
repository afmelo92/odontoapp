import { getIcon } from "@/utils/getIcon";
import { usePatients } from "../(dashboard)/patients/_hooks/usePatients";

// Component model for specific paginators
export type PagnationActionProps = {
  type: "SET_NEXT_PAGE" | "SET_PREV_PAGE";
  payload?: any;
};

const Pagination: React.FC = () => {
  const { setPrevPage, setNextPage, pagination } = usePatients();
  return (
    <div className="border-[1px] w-fit border-gray-300 h-12 flex items-end justify-end self-end gap-2 rounded-full mb-6 mr-6">
      <button
        className="group flex items-center py-3 px-3 rounded-l-full border-r-gray-200 border-r-2 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-100"
        disabled={!pagination.prev}
        onClick={() =>
          // dispatch({
          //   type: "SET_PREV_PAGE",
          // })
          setPrevPage()
        }
      >
        {getIcon({
          name: "chevron-left",
          className:
            "w-4 h-4 stroke-gray-600 group-hover:stroke-blue-500 group-disabled:stroke-gray-600",
          strokeWidth: 2,
        })}
      </button>
      <p className="h-full flex items-center text-sm">
        page&nbsp;{" "}
        <span className="font-bold">&nbsp;{pagination.page}&nbsp;</span> /&nbsp;
        {pagination.totalPages}
      </p>
      <button
        className="group flex items-center py-3 px-3 rounded-r-full border-l-gray-200 border-l-2 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-100 transition-all"
        disabled={!pagination.next}
        onClick={() =>
          // dispatch({
          //   type: "SET_NEXT_PAGE",
          // })
          setNextPage()
        }
      >
        {getIcon({
          name: "chevron-right",
          className:
            "w-4 h-4 stroke-gray-600 group-hover:stroke-blue-500 group-disabled:stroke-gray-600",
          strokeWidth: 2,
        })}
      </button>
    </div>
  );
};

export default Pagination;
