import ControlledInput from "@/app/_components/ControlledInput";
import ControlledSelect from "@/app/_components/ControlledSelect";
import { patientsMock } from "@/app/patients/_contexts/PatientsContext";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import { CreateProstheticsInputs } from "../../page";
import ActionButtonsContainer from "@/app/_components/Forms/ActionButtonsContainer";
import ControlledTextArea from "@/app/_components/ControlledTextArea";
import ToothElement from "./ToothElement";

type CreateProstheticOrderFormProps = {
  onCancel: () => void;
};
const CreateProstheticOrderForm: React.FC<CreateProstheticOrderFormProps> = ({
  onCancel,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useFormContext<CreateProstheticsInputs>();

  const selectedElements = watch("prosthetic_order_teeth_elements");

  const onSubmit: SubmitHandler<CreateProstheticsInputs> = (data) => {
    console.log(data);

    onCancel();
  };

  useEffect(() => {
    register("prosthetic_order_teeth_elements", {
      minLength: 1,
      required: true,
    });

    return () => {
      reset();
    };
  }, [reset, register]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 h-full justify-between"
    >
      <div id="fields-container" className="flex flex-col gap-4">
        <Controller
          name="prosthetic_order_patient_name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <ControlledSelect
              {...field}
              label="Patient name"
              defaultLabel="Choose patient"
              options={patientsMock.map((patient) => ({
                value: patient.id,
                text: patient.name,
              }))}
            />
          )}
        />

        <div id="row-2" className="grid grid-cols-2 gap-2">
          <Controller
            name="prosthetic_order_service"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <ControlledSelect
                {...field}
                label="Service"
                defaultLabel="Choose service"
                options={[
                  { value: 1, text: "Faceta" },
                  { value: 2, text: "Coroa" },
                  { value: 3, text: "Onlay/Inlay/Overlay" },
                  { value: 4, text: "Adesiva" },
                ]}
              />
            )}
          />
          <Controller
            name="prosthetic_order_material"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <ControlledSelect
                {...field}
                label="Material"
                defaultLabel="Choose material"
                options={[
                  { value: 1, text: "Dissilicato de lítio" },
                  { value: 2, text: "Feldspática" },
                  { value: 3, text: "Metalocerâmcia" },
                  { value: 4, text: "Resina fotopolimerizável" },
                ]}
              />
            )}
          />
        </div>

        <div id="row-3" className="grid grid-cols-2 gap-2">
          <Controller
            name="prosthetic_order_color"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <ControlledSelect
                {...field}
                label="Color"
                defaultLabel="Choose color"
                options={[
                  { value: 1, text: "A1" },
                  { value: 2, text: "A2" },
                  { value: 3, text: "A3" },
                  { value: 4, text: "A4" },
                ]}
              />
            )}
          />
          <Controller
            name="prosthetic_order_deadline"
            control={control}
            render={({ field }) => (
              <ControlledInput
                {...field}
                type="date"
                label="Service deadline"
              />
            )}
          />
        </div>

        <div
          id="row-4"
          className="flex flex-col items-center justify-center gap-[2px] data-[error=true]:border-2 data-[error=true]:border-red-500"
          data-error={!!errors.prosthetic_order_teeth_elements}
        >
          <label className="text-xs font-semibold text-gray-900 mb-2">
            Select elements for service
          </label>

          <div id="toothmap-row-1" className="flex gap-1">
            {[
              18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
            ].map((item) => {
              const isIn = selectedElements.includes(item);
              return (
                <ToothElement
                  key={item}
                  id={item}
                  selected={isIn}
                  onSelect={(id) => {
                    setValue(
                      "prosthetic_order_teeth_elements",
                      selectedElements.length === 0
                        ? [id]
                        : isIn
                        ? selectedElements.filter((el) => el !== id)
                        : [...selectedElements, id]
                    );
                  }}
                />
              );
            })}
          </div>
          <div id="toothmap-row-2" className="flex gap-1">
            {[
              48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
            ].map((item) => {
              const isIn = selectedElements.includes(item);
              return (
                <ToothElement
                  key={item}
                  id={item}
                  selected={isIn}
                  onSelect={(id) => {
                    setValue(
                      "prosthetic_order_teeth_elements",
                      selectedElements.length === 0
                        ? [id]
                        : isIn
                        ? selectedElements.filter((el) => el !== id)
                        : [...selectedElements, id]
                    );
                  }}
                />
              );
            })}
          </div>
          {!!errors.prosthetic_order_teeth_elements && (
            <small className="w-full text-xs text-red-500">
              At least one element must be provided
            </small>
          )}
        </div>

        <div id="row-5">
          <Controller
            name="prosthetic_order_details"
            control={control}
            render={({ field }) => (
              <ControlledTextArea
                {...field}
                label="Service description"
                placeholder="Insert some details/observations about the service"
                rows={5}
              />
            )}
          />
        </div>
      </div>
      <ActionButtonsContainer submitLabel="Create order" onCancel={onCancel} />
    </form>
  );
};

export default CreateProstheticOrderForm;
