import { Controller, useFormContext } from "react-hook-form";
import ControlledInput from "@/app/_components/ControlledInput";
import ControlledSelect from "@/app/_components/ControlledSelect";
import { CreatePatientInputs } from "@/app/(dashboard)/patients/page";
import { cellphoneMask, cpfMask, zipCodeMask } from "@/utils";

type CreatePatientsFormMainTabProps = {
  isLoading?: boolean;
};

const CreatePatientFormMainTab: React.FC<CreatePatientsFormMainTabProps> = ({
  isLoading = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreatePatientInputs>();

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
            error={errors.patient_name?.message}
            loading={isLoading}
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
            error={errors.patient_email?.message}
            loading={isLoading}
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
            error={errors.patient_address?.message}
            loading={isLoading}
          />
        )}
      />

      <div id="row-4" className="grid grid-cols-2 gap-2">
        <Controller
          name="patient_zip"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <ControlledInput
              {...field}
              type="tel"
              label="Patient zipcode"
              placeholder="12345-000"
              required
              maxLength={9}
              value={zipCodeMask(field.value)}
              error={errors.patient_zip?.message}
              loading={isLoading}
            />
          )}
        />

        <Controller
          name="patient_cellphone"
          control={control}
          render={({ field }) => (
            <ControlledInput
              {...field}
              type="tel"
              label="Patient cellphone"
              placeholder="(99) 9 9999-9999"
              required
              maxLength={15}
              value={cellphoneMask(field.value)}
              error={errors.patient_cellphone?.message}
              loading={isLoading}
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
              label="Patient phone"
              placeholder="(99) 3333-3333"
              error={errors.patient_phone?.message}
              loading={isLoading}
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
              value={cpfMask(field.value)}
              error={errors.patient_cpf?.message}
              loading={isLoading}
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
              error={errors.patient_birth?.message}
              loading={isLoading}
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
              options={[
                { value: "M", text: "Male" },
                { value: "F", text: "Female" },
              ]}
              required
              error={errors.patient_sex?.message}
              loading={isLoading}
            />
          )}
        />
      </div>
    </>
  );
};

export default CreatePatientFormMainTab;
