import { getIcon } from "@/utils/getIcon";

export type PagnationActionProps = {
  type: "SET_NEXT_PAGE" | "SET_PREV_PAGE";
  payload?: any;
};

export type PaginationStateProps = {
  index: number;
  perPage: number;
  totalPages: number;
  page: number;
  next: boolean;
  prev: boolean;
};

type PaginationProps = {
  state: PaginationStateProps;
  dispatch: React.Dispatch<PagnationActionProps>;
};

const Pagination: React.FC<PaginationProps> = ({ state, dispatch }) => {
  return (
    <div className="border-[1px] w-fit border-gray-300 h-12 flex items-end justify-end self-end gap-2 rounded-full mb-6 mr-6">
      <button
        className="group flex items-center py-3 px-3 rounded-l-full border-r-gray-200 border-r-2 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-100"
        disabled={!state.prev}
        onClick={() =>
          dispatch({
            type: "SET_PREV_PAGE",
          })
        }
      >
        {getIcon({
          name: "chevron-left",
          className: "w-4 h-4 stroke-gray-900 transition-colors",
          strokeWidth: 2,
        })}
      </button>
      <p className="h-full flex items-center text-sm">
        page <span className="font-bold">&nbsp;{state.page}&nbsp;</span> /{" "}
        {state.totalPages}
      </p>
      <button
        className="group flex items-center py-3 px-3 rounded-r-full border-l-gray-200 border-l-2 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-100"
        disabled={!state.next}
        onClick={() =>
          dispatch({
            type: "SET_NEXT_PAGE",
          })
        }
      >
        {getIcon({
          name: "chevron-right",
          className: "w-4 h-4 stroke-gray-900 transition-colors",
          strokeWidth: 2,
        })}
      </button>
    </div>
  );
};

export default Pagination;
