"use client";

import { usePatients } from "../_hooks/usePatients";
import Pagination from "@/app/_components/Pagination";
import TableRow from "./TableRow";

const Table: React.FC = () => {
  const { state, dispatch } = usePatients();

  return (
    <>
      <table className="h-full max-h-full w-full">
        <TableRow header />
        <tbody className="grid grid-rows-6 grid-cols-1 h-full">
          {state.filtered.length > 0 ? (
            state.filtered.map((patient) => (
              <TableRow key={patient.id} patient={patient} />
            ))
          ) : (
            <tr className="row-span-full h-full">
              <td className="h-full flex flex-col gap-8 items-center justify-center">
                <h1 className="font-medium text-2xl text-gray-900">
                  Oops! It looks like there is no patient registered yet.
                </h1>
                <button className="bg-blue-500 p-6 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors">
                  Create patient now
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
