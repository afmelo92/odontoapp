import { getIcon } from "@/utils/getIcon";
import { useProstheticsServices } from "../_hooks/useProstheticsServices";

export type PagnationActionProps = {
  type: "SET_NEXT_PAGE" | "SET_PREV_PAGE";
  payload?: any;
};

const Pagination: React.FC = () => {
  const { setPrevPage, setNextPage, totalPages, pagination, hasNext, hasPrev } =
    useProstheticsServices();

  return (
    <div className="border-[1px] w-fit border-gray-300 h-12 flex items-end justify-end self-end gap-2 rounded-full mb-6 mr-6">
      <button
        className="group flex items-center py-3 px-3 rounded-l-full border-r-gray-200 border-r-2 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-100"
        disabled={!hasPrev}
        onClick={() => setPrevPage()}
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
        {totalPages}
      </p>
      <button
        className="group flex items-center py-3 px-3 rounded-r-full border-l-gray-200 border-l-2 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-100 transition-all"
        disabled={!hasNext}
        onClick={() => setNextPage()}
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
