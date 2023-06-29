import React, { useEffect } from "react";
import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import { CreateCustomerInputs } from "../../page";
import ActionButtonsContainer from "@/app/_components/Forms/ActionButtonsContainer";
import ControlledInput from "@/app/_components/ControlledInput";

type CreateCustomerFormProps = {
  onCancel: () => void;
};

const CreateCustomerForm: React.FC<CreateCustomerFormProps> = ({
  onCancel,
}) => {
  const { handleSubmit, reset, control } =
    useFormContext<CreateCustomerInputs>();

  const onSubmit: SubmitHandler<CreateCustomerInputs> = (data) => {
    console.log(data);
    onCancel();
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 h-full justify-between"
      >
        <div id="fields-container" className="flex flex-col gap-4">
          <Controller
            name="customer_name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <ControlledInput
                {...field}
                type="text"
                label="Company name"
                placeholder="Odontoapp company"
                required
              />
            )}
          />

          <Controller
            name="customer_cnpj"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <ControlledInput
                {...field}
                type="text"
                label="Company CNPJ"
                placeholder="11.333.666/0001-55"
                required
              />
            )}
          />

          <Controller
            name="customer_main_contact"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <ControlledInput
                {...field}
                type="text"
                label="Main contact name"
                placeholder="John Doe"
                required
              />
            )}
          />

          <Controller
            name="customer_secondary_contact"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <ControlledInput
                {...field}
                type="text"
                label="Secondary contact name"
                placeholder="John Doe"
              />
            )}
          />

          <Controller
            name="customer_cellphone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <ControlledInput
                {...field}
                type="text"
                label="Cellphone"
                placeholder="55 99 9 9988-7755"
                required
              />
            )}
          />

          <Controller
            name="customer_phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <ControlledInput
                {...field}
                type="text"
                label="Phone"
                placeholder="55 99 3322-3322"
              />
            )}
          />

          <Controller
            name="customer_email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <ControlledInput
                {...field}
                type="email"
                label="E-mail"
                placeholder="john.doe@email.com"
                required
              />
            )}
          />

          <Controller
            name="customer_address"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <ControlledInput
                {...field}
                type="text"
                label="Company address"
                placeholder="Av John Doe, 1337"
                required
              />
            )}
          />
        </div>
        <ActionButtonsContainer
          submitLabel="Create customer"
          onCancel={onCancel}
        />
      </form>
    </>
  );
};

export default CreateCustomerForm;
