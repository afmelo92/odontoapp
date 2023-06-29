import ControlledInput from "@/app/_components/ControlledInput";
import Image from "next/image";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type UpdateUserProfileInputs = {
  user_name: string;
  user_cpf: string;
  user_birth_date: string;
  user_address: string;
  user_company: string;
  user_post: string;
  user_email: string;
  user_password: string;
  user_confirm_password: string;
};

const UpdateUserProfileForm: React.FC = () => {
  const { control, handleSubmit } = useForm<UpdateUserProfileInputs>({
    defaultValues: {
      user_address: "",
      user_birth_date: "",
      user_company: "",
      user_confirm_password: "",
      user_cpf: "",
      user_email: "",
      user_name: "",
      user_password: "",
      user_post: "",
    },
  });

  const onSubmit: SubmitHandler<UpdateUserProfileInputs> = (data) => {
    console.log(data);
  };

  return (
    <>
      <div id="image-container" className="relative w-64 h-64">
        <Image
          alt="user photo"
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
              name="user_name"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="text"
                  label="Name"
                  placeholder="John Doe"
                />
              )}
            />

            <Controller
              name="user_cpf"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="number"
                  label="CPF"
                  placeholder="123.456.789-55"
                />
              )}
            />

            <Controller
              name="user_birth_date"
              control={control}
              render={({ field }) => (
                <ControlledInput {...field} type="date" label="Birth date" />
              )}
            />

            <Controller
              name="user_address"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="text"
                  label="Address"
                  placeholder="Av Marcelino Pires, 890"
                />
              )}
            />

            <Controller
              name="user_company"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="text"
                  label="Company"
                  placeholder="Odontoapp Odontologia"
                />
              )}
            />

            <Controller
              name="user_post"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="text"
                  label="Post"
                  placeholder="Doctor, recepcionist, janitor..."
                  autoComplete="off"
                />
              )}
            />

            <Controller
              name="user_email"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="email"
                  label="E-mail"
                  placeholder="john.doe@email.com"
                />
              )}
            />

            <Controller
              name="user_password"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="password"
                  label="Password"
                  placeholder="Your secret password"
                />
              )}
            />

            <Controller
              name="user_confirm_password"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="password"
                  label="Confirm password"
                  placeholder="Your secret password confirmation"
                />
              )}
            />
          </div>
          <div id="actions-container" className="w-full">
            <button className="bg-blue-500 py-4 w-full rounded-xl font-medium text-white hover:bg-blue-700 transition-colors">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateUserProfileForm;
