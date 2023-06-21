import { Patient } from "../_contexts/PatientContext";
import { getIcon } from "@/utils/getIcon";

type TableRowProps = {
  patient?: Patient;
  header?: boolean;
};

const TableRow: React.FC<TableRowProps> = ({ patient, header = false }) => {
  if (header) {
    return (
      <thead>
        <tr className="grid grid-cols-4 text-gray-500 border-b-2 border-b-gray-100 px-6 py-4 text-sm">
          <th className="text-start">Patient</th>
          <th className="text-start">Provider</th>
          <th className="text-start">Appointment</th>
          <th className="text-end">Actions</th>
        </tr>
      </thead>
    );
  }

  return (
    <tr
      key={patient?.id}
      className="grid grid-cols-4 h-full text-gray-700 text-base border-b-2 border-b-gray-100 px-6 py-4 items-center"
    >
      <td
        className="flex flex-col"
        title={`${patient?.name} :: ${patient?.age} yo, ${
          patient?.sex === "M" ? "M" : "F"
        } `}
      >
        <p className="font-bold text-gray-950 flex gap-2 items-center">
          {patient?.name}
        </p>
        <small className="text-gray-500">
          {patient?.age} yo, {patient?.sex === "M" ? "Male" : "Female"}
        </small>
      </td>
      <td
        title={`${patient?.doctor}`}
        className="text-gray-700 font-medium text-sm"
      >
        {patient?.doctor}
      </td>
      <td>
        {patient && patient?.next_appointments.length > 0 ? (
          <p className="font-medium text-sm">
            {new Intl.DateTimeFormat("pt-BR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }).format(new Date(patient.next_appointments[0]))}
          </p>
        ) : (
          <button
            className="group bg-green-100 p-4 rounded-xl hover:bg-green-200 transition-colors font-semibold text-xs text-green-500 hover:text-green-700 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
            title="Schedule appointment"
          >
            Schedule appointment
          </button>
        )}
      </td>
      <td className="flex items-center justify-end">
        <div className="flex gap-2">
          <button
            className="group bg-green-100 p-4 rounded-xl hover:bg-green-200 transition-colors"
            title="Visualize patient info"
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
            title="Delete patient"
          >
            {getIcon({
              name: "trash",
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
