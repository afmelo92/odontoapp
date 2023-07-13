"use client";
import { usePatients } from "../_hooks/usePatients";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import Pagination from "./Pagination";

type TableProps = {
  // onScheduleAppointment: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line no-unused-vars
  onScheduleAppointment: (x: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  onEmptyList: (status: boolean) => void;
};

const Table: React.FC<TableProps> = ({
  onScheduleAppointment,
  onEmptyList,
}) => {
  const { filtered } = usePatients();

  return (
    <>
      <table className="h-full max-h-full w-full">
        <TableHeader />
        <tbody className="grid grid-rows-6 grid-cols-1 h-full">
          {filtered.length > 0 ? (
            filtered.map((patient) => (
              <TableRow
                key={patient.uid}
                patient={patient}
                onScheduleAppointment={onScheduleAppointment}
              />
            ))
          ) : (
            <tr className="row-span-full h-full">
              <td className="h-full flex flex-col gap-8 items-center justify-center">
                <h1 className="font-medium text-2xl text-gray-900">
                  Oops! It looks like there is no patient registered yet.
                </h1>
                <button
                  onClick={() => onEmptyList(true)}
                  className="bg-blue-500 p-6 rounded-lg text-white font-medium hover:bg-blue-700 transition-colors"
                >
                  Create patient now
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination />
    </>
  );
};

export default Table;
