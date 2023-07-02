"use client";
import ControlledInput from "@/app/_components/ControlledInput";
import { getIcon } from "@/utils/getIcon";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import ControlledSelect from "@/app/_components/ControlledSelect";

type SignUpInputs = {
  fullName: string;
  cpf_cnpj: string;
  email: string;
  password: string;
  confirm_password: string;
  account_type: string;
};

const SignUpPage: React.FC = () => {
  const { control } = useForm<SignUpInputs>({
    defaultValues: {
      fullName: "",
      cpf_cnpj: "",
      email: "",
      password: "",
      confirm_password: "",
      account_type: "",
    },
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6">
        <form className="h-3/4 w-3/4 flex flex-col items-center justify-center gap-6">
          <span>
            {getIcon({
              name: "tooth",
              className: "w-10 h-10 stroke-blue-500",
              strokeWidth: 2,
            })}
          </span>
          <div
            id="inputs-container"
            className="flex flex-col justify-center gap-4 w-full"
          >
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="text"
                  label="Name"
                  placeholder="John Doe"
                  required
                  leftIcon="user"
                  sizeType="lg"
                />
              )}
            />
            <Controller
              name="cpf_cnpj"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="text"
                  label="CPF/CNPJ"
                  placeholder="123.456.789-55 or 11.222.333/0001-55"
                  required
                  leftIcon="building-office"
                  sizeType="lg"
                />
              )}
            />
            <Controller
              name="account_type"
              control={control}
              render={({ field }) => (
                <ControlledSelect
                  {...field}
                  label="Account type"
                  placeholder="123.456.789-55 or 11.222.333/0001-55"
                  required
                  // leftIcon="building-office"
                  defaultLabel="Choose account type"
                  sizeType="lg"
                  options={[
                    { value: 1, text: "Dental Clinic" },
                    { value: 2, text: "Prosthetic Lab" },
                  ]}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="email"
                  label="E-mail"
                  placeholder="john.doe@email.com"
                  required
                  leftIcon="envelope"
                  sizeType="lg"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="password"
                  label="Password"
                  placeholder="Your secret passsword"
                  required
                  leftIcon="lock-closed"
                  sizeType="lg"
                />
              )}
            />
            <Controller
              name="confirm_password"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="password"
                  label="Confirm password"
                  placeholder="Confirm your secret passsword"
                  required
                  leftIcon="lock-closed"
                  sizeType="lg"
                />
              )}
            />
            <button className="bg-blue-500 hover:bg-blue-700 transition-colors p-4 rounded-xl font-semibold text-white">
              Create account
            </button>

            <div
              id="links-container"
              className="w-full flex flex-col justify-center gap-2 text-xs font-semibold text-blue-500"
            >
              <Link
                href="/signin"
                className="w-fit self-center border-2 border-white hover:text-blue-700 hover:border-b-blue-500"
              >
                Back to login
              </Link>
            </div>
          </div>
        </form>
      </div>
      <div className="bg-blue-500 lg:flex flex-col items-center justify-center gap-6 p-2 text-center text-white invisible lg:visible hidden">
        <h1 className="text-6xl font-bold">OdontoApp</h1>
        <h3 className="text-lg">
          Full command central for dental clinics and prosthetics labs
        </h3>
      </div>
    </>
  );
};

export default SignUpPage;
