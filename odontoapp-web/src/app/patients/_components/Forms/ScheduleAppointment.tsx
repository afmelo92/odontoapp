import { getIcon } from "@/utils/getIcon";
import { Patient } from "../../_contexts/PatientsContext";
import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import { ScheduleAppointmentInputs } from "../../page";
import { useEffect } from "react";
import ControlledSelect from "@/app/_components/ControlledSelect";
import ControlledInput from "@/app/_components/ControlledInput";
import ActionButtonsContainer from "@/app/_components/Forms/ActionButtonsContainer";

type ScheduleAppointmentFormProps = {
  onCancel: () => void;
  selectedPatient: Patient | null;
};

const ScheduleAppointmentForm: React.FC<ScheduleAppointmentFormProps> = ({
  onCancel,
  selectedPatient,
}) => {
  const { handleSubmit, control, reset } =
    useFormContext<ScheduleAppointmentInputs>();

  const onSubmit: SubmitHandler<ScheduleAppointmentInputs> = (data) => {
    console.log(data);
    onCancel();
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 h-full justify-between"
    >
      <div id="fields-container" className="flex flex-col gap-4">
        <div id="patient-header" className="flex flex-col gap-4">
          <h2 className="font-semibold text-xs">Patient</h2>
          <div id="patient-name" className="flex flex-col gap-1">
            <h1 className="font-semibold text-sm">{selectedPatient?.name}</h1>
            <h3 className="text-gray-500 font-medium text-xs">{`${selectedPatient?.age} yo`}</h3>
          </div>
          <div
            id="patient-info"
            className="flex flex-col gap-2 text-xs text-gray-900"
          >
            <h5 className="flex items-center gap-2">
              <span>
                {getIcon({
                  name: "phone",
                  className: "w-4 h-4 stroke-gray-400",
                  strokeWidth: 2,
                })}
              </span>
              +55 41 9 9901-3657
            </h5>
            <h5 className="flex items-center gap-2">
              <span>
                {getIcon({
                  name: "envelope",
                  className: "w-4 h-4 stroke-gray-400",
                  strokeWidth: 2,
                })}
              </span>
              johndoe@gmail.com
            </h5>
            <h5 className="flex items-center gap-2">
              <span>
                {getIcon({
                  name: "map-pin",
                  className: "w-4 h-4 stroke-gray-400",
                  strokeWidth: 2,
                })}
              </span>
              John Doe Avenue 1560, Dourados, MS
            </h5>
          </div>
        </div>

        <Controller
          name="appointment_provider"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Provider"
              options={[
                { value: 1, text: "Daiane Odontoapp" },
                { value: 2, text: "Soraia Silva" },
                { value: 3, text: "Jaqueline Odontoapp" },
              ]}
            />
          )}
        />

        <Controller
          name="appointment_datetime"
          control={control}
          render={({ field }) => (
            <ControlledInput
              {...field}
              type="datetime-local"
              label="Appointment Date/Time"
            />
          )}
        />

        <Controller
          name="appointment_duration"
          control={control}
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Appointment Duration"
              options={[
                { value: 15, text: "15 min" },
                { value: 30, text: "30 min" },
                { value: 60, text: "1 hour" },
                { value: 90, text: "1 hour 30 min" },
                { value: 120, text: "2 hours" },
                { value: 150, text: "2 hours 30 min" },
                { value: 180, text: "3 hours" },
                { value: 210, text: "3 hours 30 min" },
                { value: 240, text: "4 hours" },
                { value: 270, text: "4 hours 30 min" },
                { value: 300, text: "5 hours" },
              ]}
            />
          )}
        />

        <Controller
          name="appointment_reason"
          control={control}
          render={({ field }) => (
            <ControlledInput {...field} type="text" label="Reason" />
          )}
        />
      </div>
      <ActionButtonsContainer
        submitLabel="Create appointment"
        onCancel={onCancel}
      />
    </form>
  );
};

export default ScheduleAppointmentForm;
