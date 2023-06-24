"use client";

import { useProstheticsServices } from "../_hooks/useProstheticsServices";
import Pagination from "@/app/_components/Pagination";
import TableRow from "./TableRow";

const Table: React.FC = () => {
  const { state, dispatch } = useProstheticsServices();

  return (
    <>
      <table className="h-full max-h-full w-full">
        <TableRow header />
        <tbody className="grid grid-rows-6 grid-cols-1 h-full">
          {state.filtered.length > 0 ? (
            state.filtered.map((service) => (
              <TableRow key={service.id} service={service} />
            ))
          ) : (
            <tr className="row-span-full h-full">
              <td className="h-full flex flex-col gap-8 items-center justify-center">
                <h1 className="font-medium text-2xl text-gray-900">
                  Oops! It looks like there is no services scheduled yet. Maybe
                  you need to order a service.
                </h1>
                <button className="bg-blue-500 p-6 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors">
                  Create order
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination state={state.pagination} dispatch={dispatch} />
    </>
  );
};

export default Table;
