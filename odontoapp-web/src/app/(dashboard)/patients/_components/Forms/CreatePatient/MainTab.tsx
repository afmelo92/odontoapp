import { Controller, useFormContext } from "react-hook-form";
import ControlledInput from "@/app/_components/ControlledInput";
import ControlledSelect from "@/app/_components/ControlledSelect";
import { CreatePatientInputs } from "@/app/patients/page";

const CreatePatientFormMainTab: React.FC = () => {
  const { control } = useFormContext<CreatePatientInputs>();

  return (
    <>
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
            required
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
            required
          />
        )}
      />

      <Controller
        name="patient_address"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <ControlledInput
            {...field}
            type="text"
            label="Patient address"
            placeholder="R D Pedro II"
            required
          />
        )}
      />

      <div id="row-4" className="grid grid-cols-2 gap-2">
        <Controller
          name="patient_address_number"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <ControlledInput
              {...field}
              type="number"
              label="Patient address number"
              placeholder="123"
            />
          )}
        />
        <Controller
          name="patient_zip"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <ControlledInput
              {...field}
              type="text"
              label="Patient zipcode"
              placeholder="12345-000"
              required
            />
          )}
        />
      </div>

      <div id="row-5" className="grid grid-cols-2 gap-2">
        <Controller
          name="patient_phone"
          control={control}
          render={({ field }) => (
            <ControlledInput
              {...field}
              type="tel"
              label="Patient cellphone/phone"
              placeholder="(99) 9 9999-9999"
              required
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
              required
            />
          )}
        />
      </div>

      <div id="row-6" className="grid grid-cols-2 gap-2">
        <Controller
          name="patient_birth"
          control={control}
          render={({ field }) => (
            <ControlledInput
              {...field}
              type="date"
              label="Patient birth date"
              placeholder="01/01/2023"
              required
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
                { value: 0, text: "Male" },
                { value: 1, text: "Female" },
              ]}
              required
            />
          )}
        />
      </div>
    </>
  );
};

export default CreatePatientFormMainTab;
