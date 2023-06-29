"use client";
import ControlledInput from "@/app/_components/ControlledInput";
import { getIcon } from "@/utils/getIcon";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

type ForgotPasswordInputs = {
  email: string;
};

const ForgotPasswordPage: React.FC = () => {
  const { control } = useForm<ForgotPasswordInputs>({
    defaultValues: {
      email: "",
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
            <button className="bg-blue-500 hover:bg-blue-700 transition-colors p-4 rounded-xl font-semibold text-white">
              Send recovering email
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

export default ForgotPasswordPage;
