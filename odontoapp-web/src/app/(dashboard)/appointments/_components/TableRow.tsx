import { Appointment } from "../_contexts/AppointmentsContext";
import { getIcon } from "@/utils/getIcon";

type TableRowProps = {
  appointment?: Appointment;
  header?: boolean;
};

const TableRow: React.FC<TableRowProps> = ({ appointment, header = false }) => {
  const appointmentHour = new Date(appointment?.date || "").getHours();
  const appointmentMinutes = new Date(appointment?.date || "").getMinutes();

  if (header) {
    return (
      <thead>
        <tr className="grid grid-cols-4 text-gray-500 border-b-2 border-b-gray-100 px-6 py-4 text-sm">
          <th className="text-start">Patient</th>
          <th className="text-start">Reason</th>
          <th className="text-start">Appointment</th>
          <th className="text-start">Actions</th>
        </tr>
      </thead>
    );
  }
  return (
    <tr
      key={appointment?.id}
      className="grid grid-cols-4 h-full text-gray-700 text-base border-b-2 border-b-gray-100 px-6 py-4 items-center"
    >
      <td
        className="flex flex-col"
        title={`${appointment?.patient.name} :: ${appointment?.age} yo, ${
          appointment?.sex === "M" ? "M" : "F"
        } ${
          appointment?.patient.complete_bio
            ? ":: Complete bio"
            : ":: Incomplete bio"
        }  ${appointment?.confirmed ? ":: Appointment Confirmed" : ""}`}
      >
        <p className="font-bold text-gray-950 flex gap-2 items-center">
          {appointment?.patient.name}{" "}
          <span className="flex items-baseline">
            {appointment?.confirmed && appointment.patient.complete_bio && (
              <span>
                {getIcon({
                  name: "check-circle",
                  className: "w-5 h-5 stroke-green-500",
                  strokeWidth: 2,
                })}
              </span>
            )}
            {appointment?.confirmed && !appointment.patient.complete_bio ? (
              <span>
                {getIcon({
                  name: "check",
                  className: "w-5 h-5 stroke-green-500",
                  strokeWidth: 2,
                })}
              </span>
            ) : (
              ""
            )}
          </span>
        </p>
        <small className="text-gray-500">
          {appointment?.age} yo, {appointment?.sex === "M" ? "Male" : "Female"}
        </small>
      </td>
      <td
        title={`${appointment?.reason}`}
        className="text-gray-500 font-medium text-sm truncate pr-2"
      >
        {appointment?.reason}
      </td>
      <td className="flex flex-col" title={`${appointment?.formattedDate}`}>
        <small className="text-gray-500">{appointment?.formattedDate}</small>
        <p className="text-base font-bold text-gray-950">
          {`${appointmentHour}:${appointmentMinutes}`}
        </p>
      </td>
      <td className="flex items-center justify-between">
        <button
          className="group bg-green-100 p-4 rounded-xl hover:bg-green-200 transition-colors font-semibold text-xs text-green-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
          title={`${
            appointment?.confirmed
              ? "Click to check in"
              : "Patient must confirm first"
          }`}
          disabled={!appointment?.confirmed}
        >
          Check in
        </button>
        <div className="flex gap-2">
          <button
            className="group bg-green-100 p-4 rounded-xl hover:bg-green-200 transition-colors"
            title="Visualize appointment details"
          >
            {getIcon({
              name: "document-text",
              className:
                "w-5 h-5 stroke-green-500 group-hover:stroke-green-600 transition-colors",
              strokeWidth: 2,
            })}
          </button>
          <button
            className="group bg-blue-100 p-4 rounded-xl hover:bg-blue-200 transition-colors"
            title="Talk to patient"
          >
            {getIcon({
              name: "chat-bubble-left-ellipsis",
              className:
                "w-5 h-5 stroke-blue-500 group-hover:stroke-blue-600 transition-colors",
              strokeWidth: 2,
            })}
          </button>
          <button
            className="group bg-red-100 p-4 rounded-xl hover:bg-red-200 transition-colors"
            title="Cancel appointment"
          >
            {getIcon({
              name: "x-circle",
              className:
                "w-5 h-5 stroke-red-500 group-hover:stroke-red-600 transition-colors",
              strokeWidth: 2,
            })}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
