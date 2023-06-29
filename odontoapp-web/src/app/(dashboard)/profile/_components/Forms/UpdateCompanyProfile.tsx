import ControlledInput from "@/app/_components/ControlledInput";
import ControlledSelect from "@/app/_components/ControlledSelect";
import Image from "next/image";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type UpdateCompanyProfileInputs = {
  company_name: string;
  company_cnpj: string;
  company_address: string;
  company_email: string;
  company_extra_email: string;
  company_cellphone: string;
  company_website: string;
  company_type: string | number;
};

const UpdateCompanyProfileForm: React.FC = () => {
  const { control, handleSubmit } = useForm<UpdateCompanyProfileInputs>({
    defaultValues: {
      company_address: "",
      company_cellphone: "",
      company_cnpj: "",
      company_email: "",
      company_extra_email: "",
      company_name: "",
      company_type: "",
      company_website: "",
    },
  });

  const onSubmit: SubmitHandler<UpdateCompanyProfileInputs> = (data) => {
    console.log(data);
  };

  return (
    <>
      <div id="image-container" className="relative w-64 h-64">
        <Image
          alt="company logo"
          src="https://i.pravatar.cc/256?img=65"
          fill
          className="rounded-full"
          quality={100}
        />
      </div>
      <div id="data-container" className="w-full overflow-y-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full flex flex-col gap-4 justify-between"
        >
          <div id="fields-container" className="grid grid-cols-2 gap-4">
            <Controller
              name="company_name"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="text"
                  label="Name"
                  placeholder="Odontoapp Odontologia"
                />
              )}
            />

            <Controller
              name="company_cnpj"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="text"
                  label="CNPJ"
                  placeholder="55.444.333-0001/55"
                />
              )}
            />

            <Controller
              name="company_address"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="text"
                  label="Address"
                  placeholder="John Doe Avenue 1560"
                />
              )}
            />

            <Controller
              name="company_email"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="email"
                  label="E-mail"
                  placeholder="john.doe@company.com"
                />
              )}
            />

            <Controller
              name="company_extra_email"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="email"
                  label="Extra email"
                  placeholder="john.doe.extra@company.com"
                />
              )}
            />

            <Controller
              name="company_cellphone"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="number"
                  label="Cellphone"
                  placeholder="Your secret password"
                />
              )}
            />

            <Controller
              name="company_website"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="text"
                  label="Site"
                  placeholder="https://odontoapp.com.br"
                />
              )}
            />

            <Controller
              name="company_type"
              control={control}
              render={({ field }) => (
                <ControlledSelect
                  {...field}
                  label="Company type"
                  defaultLabel="Select company type"
                  options={[
                    { value: 0, text: "Dental clinic" },
                    { value: 1, text: "Dental lab" },
                  ]}
                />
              )}
            />
          </div>
          <div id="actions-container" className="w-full">
            <button className="bg-blue-500 py-4 w-full rounded-xl font-medium text-white hover:bg-blue-700 transition-colors">
              Update company profile
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateCompanyProfileForm;
