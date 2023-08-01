import Link from "next/link";
import { ProstheticsService } from "../_contexts/ProstheticsContext";
import { getIcon } from "@/utils/getIcon";

type TableRowProps = {
  order?: ProstheticsService;
  header?: boolean;
};

const TableRow: React.FC<TableRowProps> = ({ order, header = false }) => {
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
      key={order?.uid}
      className="grid grid-cols-6 h-full text-gray-700 text-base border-b-2 border-b-gray-100 px-6 py-4 items-center"
    >
      <td
        className="flex flex-col"
        title={`${order?.patient?.name} ${
          order?.status === 1
            ? ":: Pending confirmation"
            : order?.status === 2
            ? ":: Service confirmed"
            : ""
        }`}
      >
        <p className="font-bold text-gray-950 flex gap-2 items-center pr-2 truncate">
          {order?.patient?.name || order?.patient_name}
          {order?.status === 2 && (
            <span>
              {getIcon({
                name: "check-circle",
                className: "w-5 h-5 stroke-green-500",
                strokeWidth: 2,
              })}
            </span>
          )}
        </p>
      </td>
      <td
        title={`${order?.service_name} ${order?.service_material || ""}`}
        className="text-gray-700 font-medium text-sm truncate pr-2"
      >
        {`${order?.service_name} ${order?.service_material}`}
      </td>
      <td className="flex flex-col" title={`${order?.service_deadline}`}>
        <small className="text-base text-gray-500">
          {order?.service_deadline}
        </small>
      </td>
      <td>
        <p
          title={order?.lab?.name || ""}
          className="text-gray-700 font-medium text-sm truncate pr-2"
        >
          {order?.lab.name}
        </p>
      </td>
      <td>
        <div
          title={`${order?.formattedStatus}`}
          className={`${
            order?.status === 1
              ? "text-gray-500 bg-gray-200"
              : order?.status === 2
              ? "bg-blue-100 text-blue-500"
              : order?.status === 3
              ? "bg-amber-100 text-amber-50"
              : order?.status === 4
              ? "bg-violet-100 text-violet-500"
              : order?.status === 5
              ? "bg-red-100 text-red-500"
              : order?.status === 6
              ? "bg-green-100 text-green-500"
              : order?.status === 7
              ? "bg-orange-100 text-orange-500"
              : ""
          } max-w-fit p-4 rounded-lg`}
        >
          <p className="text-xs font-semibold">{`${
            order?.status === 1
              ? "Enviado"
              : order?.status === 2
              ? "Confirmado"
              : order?.status === 3
              ? "Em produção"
              : order?.status === 4
              ? "Ajuste"
              : order?.status === 5
              ? "Cancelado"
              : order?.status === 6
              ? "Finalizado"
              : order?.status === 7
              ? "Em análise"
              : ""
          }`}</p>
        </div>
      </td>
      <td className="flex items-center justify-between">
        <div className="flex gap-2">
          <Link
            href={`/prosthetics/${order?.uid}/details`}
            className="group bg-green-100 p-4 rounded-xl hover:bg-green-200 transition-colors"
            title="Service details"
          >
            {getIcon({
              name: "document-text",
              className:
                "w-5 h-5 stroke-green-500 group-hover:stroke-green-600 transition-colors",
              strokeWidth: 2,
            })}
          </Link>
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
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
