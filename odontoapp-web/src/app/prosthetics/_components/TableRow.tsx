import { ProstheticsService } from "../_contexts/ProstheticsContext";
import { getIcon } from "@/utils/getIcon";

type TableRowProps = {
  service?: ProstheticsService;
  header?: boolean;
};

const TableRow: React.FC<TableRowProps> = ({ service, header = false }) => {
  if (header) {
    return (
      <thead>
        <tr className="grid grid-cols-6 text-gray-500 border-b-2 border-b-gray-100 px-6 py-4 text-sm">
          <th className="text-start">Patient</th>
          <th className="text-start">Service</th>
          <th className="text-start">Deadline</th>
          <th className="text-start">Lab</th>
          <th className="text-start">Status</th>
          <th className="text-start">Actions</th>
        </tr>
      </thead>
    );
  }

  return (
    <tr
      key={service?.id}
      className="grid grid-cols-6 h-full text-gray-700 text-base border-b-2 border-b-gray-100 px-6 py-4 items-center"
    >
      <td
        className="flex flex-col"
        title={`${service?.patient.name} :: ${service?.age} yo, ${
          service?.sex === "M" ? "M" : "F"
        }  ${service?.confirmed ? ":: Service confirmed" : ""}`}
      >
        <p className="font-bold text-gray-950 flex gap-2 items-center pr-2 truncate">
          {service?.patient.name}{" "}
          {service?.confirmed && (
            <span>
              {getIcon({
                name: "check",
                className: "w-5 h-5 stroke-green-500",
                strokeWidth: 2,
              })}
            </span>
          )}
        </p>
        <small className="text-gray-500">
          {service?.age} yo, {service?.sex === "M" ? "Male" : "Female"}
        </small>
      </td>
      <td
        title={`${service?.name}`}
        className="text-gray-700 font-medium text-sm truncate pr-2"
      >
        {service?.name}
      </td>
      <td className="flex flex-col" title={`${service?.formattedDate}`}>
        <small className="text-base text-gray-500">
          {service?.formattedDate}
        </small>
      </td>
      <td>
        <p
          title={service?.lab}
          className="text-gray-700 font-medium text-sm truncate pr-2"
        >
          Pucci Dental Lab
        </p>
      </td>
      <td>
        <div
          title={service?.formattedStatus}
          className={`${
            service?.status === 1
              ? "bg-green-100 text-green-500"
              : service?.status === 2
              ? "bg-amber-100 text-amber-500"
              : service?.status === 3
              ? "bg-blue-100 text-blue-500"
              : service?.status === 4
              ? "bg-violet-100 text-violet-500"
              : "bg-red-100 text-red-500"
          } max-w-fit p-4 rounded-lg`}
        >
          <p className="text-xs font-semibold">{service?.formattedStatus}</p>
        </div>
      </td>
      <td className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            className="group bg-green-100 p-4 rounded-xl hover:bg-green-200 transition-colors"
            title="Visualize service details"
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
            title="Talk to lab"
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
            title="Cancel service"
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
