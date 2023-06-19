import { DocumentTextIcon } from "@/assets/icons/document";
import { XCircleIcon } from "@/assets/icons/xcircle";
import { ActionProps, Appointment } from "../page";

type TableData = {
  data: Appointment[];
  dispatch: React.Dispatch<ActionProps>;
};

const Table: React.FC<TableData> = ({ data, dispatch }) => {
  return (
    <>
      <table className="h-full max-h-full w-full border-2 border-red-500">
        <thead>
          <tr className="grid grid-cols-4 text-gray-500 border-b-2 border-b-gray-100 px-6 py-4 text-sm">
            <th className="text-start">Patient</th>
            <th className="text-start">Reason</th>
            <th className="text-start">Appointment</th>
            <th className="text-start">Actions</th>
          </tr>
        </thead>
        <tbody className="flex flex-col">
          {data.map((appointment) => {
            const appointmentHour = new Date(appointment.date).getHours();
            const appointmentMinutes = new Date(appointment.date).getMinutes();

            return (
              <tr
                key={appointment.id}
                className="grid grid-cols-4 text-gray-700 text-base border-b-2 border-b-gray-100 px-6 py-4 items-center"
              >
                <td
                  className="flex flex-col"
                  title={`${appointment.patient} :: ${appointment.age} yo, ${
                    appointment.sex === "M" ? "M" : "F"
                  }`}
                >
                  <p className="font-bold text-gray-950">
                    {appointment.patient}
                  </p>
                  <small className="text-gray-500">
                    {appointment.age} yo,{" "}
                    {appointment.sex === "M" ? "Male" : "Female"}
                  </small>
                </td>
                <td title={`${appointment.reason}`}>{appointment.reason}</td>
                <td
                  className="flex flex-col"
                  title={`${appointment.formattedDate}`}
                >
                  <small className="text-gray-500">
                    {appointment.formattedDate}
                  </small>
                  <p className="text-base font-bold text-gray-950">
                    {`${appointmentHour}:${appointmentMinutes}`}
                  </p>
                </td>
                <td className="flex gap-1">
                  <button
                    className="group bg-green-100 p-4 rounded-xl hover:bg-green-200 transition-colors"
                    title="Visualize appointment info"
                  >
                    <DocumentTextIcon
                      className="w-5 h-5 stroke-green-500 group-hover:stroke-green-600 transition-colors"
                      strokeWidth={2}
                    />
                  </button>
                  <button
                    className="group bg-red-100 p-4 rounded-xl hover:bg-red-200 transition-colors"
                    title="Cancel appointment"
                  >
                    <XCircleIcon
                      className="w-5 h-5 stroke-red-500 group-hover:stroke-red-600 transition-colors"
                      strokeWidth={2}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="border-2 border-blue-500 h-full flex items-center justify-end gap-2 px-6">
        <button
          className="bg-green-300 py-2 px-4"
          onClick={() =>
            dispatch({
              type: "SET_PREV_PAGE",
            })
          }
        >
          {"<"}
        </button>
        <p>pag 1 de 10</p>
        <button
          className="bg-green-300 py-2 px-4"
          onClick={() =>
            dispatch({
              type: "SET_NEXT_PAGE",
            })
          }
        >
          {">"}
        </button>
      </div>
    </>
  );
};

export default Table;
