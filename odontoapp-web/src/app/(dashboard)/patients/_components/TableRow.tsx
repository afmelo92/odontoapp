import { Patient } from "../_contexts/PatientsContext";
import { getIcon } from "@/utils/getIcon";
import { usePatients } from "../_hooks/usePatients";
import { useMutation } from "@tanstack/react-query";
import APIError from "@/utils/APIError";
import { APIResponse } from "@/pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { deletePatientsMutation } from "@/services/mutations";

type TableRowProps = {
  patient?: Patient;
  header?: boolean;
  // onScheduleAppointment: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line no-unused-vars
  onScheduleAppointment: (x: boolean) => void;
};

type DeletePatientInputs = {
  patientUID: string;
};

const TableRow: React.FC<TableRowProps> = ({
  patient,
  onScheduleAppointment,
}) => {
  const session = useSession();

  const userData = session.data?.user || null;

  const { dispatch, queryReturn } = usePatients();

  const { isLoading, mutateAsync } = useMutation<
    APIResponse,
    APIError,
    DeletePatientInputs
  >({
    mutationFn: (data) => {
      return deletePatientsMutation({
        patient_id: data.patientUID,
        user_token: userData?.accessToken || "",
      });
    },
    onSuccess: () => {
      // show toast
      queryReturn?.refetch();
    },
    onError: (error) => {
      // show toast
      console.log(error);
    },
  });

  async function handleDeletePatient(patientUID: string) {
    // implement modal to confirm
    if (patientUID) {
      await mutateAsync({ patientUID });
    }
  }

  return (
    <tr
      key={patient?.uid}
      className="grid grid-cols-4 h-full text-gray-700 text-base border-b-2 border-b-gray-100 px-6 py-4 items-center"
    >
      <td
        className="flex flex-col"
        title={`${patient?.name} :: ${patient?.age} yo, ${
          patient?.sex === "M" ? "M" : "F"
        } ${patient?.complete_bio ? ":: Bio Confirmed" : ""}`}
      >
        <p className="font-bold text-gray-950 flex gap-2 items-center">
          {patient?.name}
          {patient?.complete_bio && (
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
        {patient && patient?.next_appointments?.length > 0 ? (
          <p className="font-medium text-sm flex items-baseline gap-2">
            {new Intl.DateTimeFormat("pt-BR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }).format(new Date(patient?.next_appointments[0]))}

            <span title="Edit apppointment date">
              {getIcon({
                name: "pencil",
                className:
                  "w-5 h-5 stroke-green-500 hover:cursor-pointer hover:stroke-green-700 transition-colors",
                strokeWidth: 2,
              })}
            </span>
          </p>
        ) : (
          <button
            className="before:content-['Comming_soon'] before:bg-red-500 before:text-white 
              before:p-2 before:rounded-xl before:text-xs before:absolute before:-right-5 
              before:-top-5 before:font-medium
              relative group focus:outline-green-500 bg-green-100 p-4 rounded-xl 
              hover:bg-green-200 transition-colors font-semibold text-xs text-green-500 
              hover:text-green-700 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
            title="Schedule appointment"
            disabled
            onClick={() => {
              dispatch({
                type: "SELECT_PATIENT",
                payload: { data: patient?.uid },
              });
              onScheduleAppointment(true);
            }}
          >
            Schedule appointment
          </button>
        )}
      </td>
      <td className="flex items-center justify-end">
        <div className="flex gap-2">
          <button
            className="group 
            focus:outline-green-500 
            bg-green-100 p-4 rounded-xl 
            hover:bg-green-200 transition-colors
            stroke-green-600
            disabled:cursor-not-allowed 
            disabled:bg-gray-300 
            disabled:stroke-gray-500"
            disabled
            title="Visualize patient info"
          >
            {getIcon({
              name: "document-text",
              className:
                "w-5 h-5 stroke-inherit group-hover:inherit transition-colors",
              strokeWidth: 2,
            })}
          </button>
          <button
            className="group 
            focus:outline-blue-500 
            bg-blue-100 p-4 rounded-xl 
            hover:bg-blue-200 transition-colors
            stroke-blue-600
              disabled:cursor-not-allowed 
            disabled:bg-gray-300 
            disabled:stroke-gray-500 "
            disabled
            title="Talk to patient"
          >
            {getIcon({
              name: "chat-bubble-left-ellipsis",
              className:
                "w-5 h-5 stroke-inherit group-hover:inherit transition-colors",
              strokeWidth: 2,
            })}
          </button>
          <button
            className="group 
            focus:outline-red-500 
            bg-red-100 p-4 rounded-xl 
            hover:bg-red-200 transition-colors
            stroke-red-600
            disabled:cursor-not-allowed 
            disabled:bg-gray-300 
            disabled:stroke-gray-500 "
            title="Delete patient"
            disabled={isLoading}
            onClick={() => handleDeletePatient(patient?.uid || "")}
          >
            {getIcon({
              name: "trash",
              className:
                "w-5 h-5 stroke-inherit group-hover:inherit transition-colors",
              strokeWidth: 2,
            })}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
