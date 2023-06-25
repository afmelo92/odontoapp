import React from "react";
import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import { CreatePatientInputs } from "../../page";
import ControlledInput from "../ControlledInput";
import ControlledSelect from "../ControlledSelect";

type CreatePatientFormProps = {
  onCancel: () => void;
};

const CreatePatientForm: React.FC<CreatePatientFormProps> = ({ onCancel }) => {
  const { handleSubmit, control } = useFormContext<CreatePatientInputs>();

  const onSubmit: SubmitHandler<CreatePatientInputs> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 h-full justify-between"
    >
      <div id="fields-container" className="flex flex-col gap-4">
        <Controller
          name="patient_name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <ControlledInput
              {...field}
              type="text"
              label="Patient name"
              placeholder="John Doe"
            />
          )}
        />

        <Controller
          name="patient_email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <ControlledInput
              {...field}
              type="email"
              label="Patient email"
              placeholder="patient@email.com"
            />
          )}
        />

        <div id="row-3" className="grid grid-cols-2 gap-2">
          <Controller
            name="patient_phone"
            control={control}
            render={({ field }) => (
              <ControlledInput
                {...field}
                type="tel"
                label="Patient cellphone/phone"
                placeholder="(99) 9 9999-9999"
                pattern="[1-9]{3}"
              />
            )}
          />
          <Controller
            name="patient_cpf"
            control={control}
            render={({ field }) => (
              <ControlledInput
                {...field}
                type="tel"
                label="Patient CPF"
                placeholder="123.456.789-00"
              />
            )}
          />
        </div>
        <div id="row-4" className="grid grid-cols-2 gap-2">
          <Controller
            name="patient_birth"
            control={control}
            render={({ field }) => (
              <ControlledInput
                {...field}
                type="date"
                label="Patient birth date"
                placeholder="01/01/2023"
              />
            )}
          />

          <Controller
            name="patient_sex"
            control={control}
            render={({ field }) => (
              <ControlledSelect
                {...field}
                label="Patient sex"
                placeholder="01/01/2023"
                options={[
                  { value: "M", text: "Male" },
                  { value: "F", text: "Female" },
                ]}
              />
            )}
          />
        </div>
      </div>
      <div id="actions-container" className="grid grid-cols-4 gap-2">
        <button
          onClick={onCancel}
          className="col-span-1 py-3 rounded-xl border-2 border-gray-400 text-gray-500 font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="col-span-3 bg-blue-500 hover:bg-blue-700 transition-colors py-3 rounded-xl text-white font-medium"
        >
          Create user
        </button>
      </div>
    </form>
  );
};

export default CreatePatientForm;
