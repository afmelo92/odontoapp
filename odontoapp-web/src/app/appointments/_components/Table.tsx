"use client";

import { useAppointments } from "../_hooks/useAppointments";
import Pagination from "@/app/_components/Pagination";
import TableRow from "./TableRow";

const Table: React.FC = () => {
  const { state, dispatch } = useAppointments();

  return (
    <>
      <table className="h-full max-h-full w-full">
        <TableRow header />
        <tbody className="grid grid-rows-6 grid-cols-1 h-full">
          {state.filtered.length > 0 ? (
            state.filtered.map((appointment) => (
              <TableRow key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <tr className="row-span-full h-full">
              <td className="h-full flex flex-col gap-8 items-center justify-center">
                <h1 className="font-medium text-2xl text-gray-900">
                  Oops! It looks like there is no appointments scheduled yet.
                  Maybe you need to register a patient.
                </h1>
                <button className="bg-blue-500 p-6 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors">
                  Register patient now
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
