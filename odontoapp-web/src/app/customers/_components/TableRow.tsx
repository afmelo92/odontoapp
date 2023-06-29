import { Customer } from "../_contexts/CustomersContext";
import { getIcon } from "@/utils/getIcon";

type TableRowProps = {
  customer?: Customer;
  header?: boolean;
};

const TableRow: React.FC<TableRowProps> = ({ customer }) => {
  return (
    <tr
      key={customer?.id}
      className="grid grid-cols-3 h-full text-gray-700 text-base border-b-2 border-b-gray-100 px-6 py-4 items-center"
    >
      <td className="flex flex-col" title={`${customer?.name}`}>
        <p className="font-bold text-gray-950 flex gap-2 items-center">
          {customer?.name}
          {/* {patient?.complete_bio && (
            <span>
              {getIcon({
                name: "check",
                className: "w-5 h-5 stroke-green-500",
                strokeWidth: 2,
              })}
            </span>
          )} */}
        </p>
        {/* <small className="text-gray-500">
          {patient?.age} yo, {patient?.sex === "M" ? "Male" : "Female"}
        </small> */}
      </td>
      <td
        title={`${customer?.cnpj}`}
        className="text-gray-700 font-medium text-sm"
      >
        {customer?.cnpj}
      </td>

      <td className="flex items-center justify-end">
        <div className="flex gap-2">
          <button
            className="group focus:outline-green-500 bg-green-100 p-4 rounded-xl hover:bg-green-200 transition-colors"
            title="Visualize customer details"
          >
            {getIcon({
              name: "document-text",
              className:
                "w-5 h-5 stroke-green-500 group-hover:stroke-green-600 transition-colors",
              strokeWidth: 2,
            })}
          </button>
          <button
            className="group focus:outline-blue-500 bg-blue-100 p-4 rounded-xl hover:bg-blue-200 transition-colors"
            title="Talk to customer"
          >
            {getIcon({
              name: "chat-bubble-left-ellipsis",
              className:
                "w-5 h-5 stroke-blue-500 group-hover:stroke-blue-600 transition-colors",
              strokeWidth: 2,
            })}
          </button>
          <button
            className="group focus:outline-red-500 bg-red-100 p-4 rounded-xl hover:bg-red-200 transition-colors"
            title="Delete customer"
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
