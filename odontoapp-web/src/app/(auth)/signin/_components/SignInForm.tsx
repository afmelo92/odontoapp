"use client";
import ControlledInput from "@/app/_components/ControlledInput";
import { getIcon } from "@/utils/getIcon";
import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Button from "@/app/_components/Button";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type SignInInputs = {
  email: string;
  password: string;
};

const SignInForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInInputs> = async (data) => {
    setLoading(true);
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/",
    });
    setLoading(false);
  };

  const searchParams = useSearchParams();

  useEffect(() => {
    const queryError = searchParams?.get("error");

    if (queryError === "CredentialsSignin") {
      setError("email", { message: "Invalid email/password combination" });
      setError("password", { message: "Invalid email/password combination" });
    }
  }, [searchParams, setError]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-3/4 w-3/4 flex flex-col items-center justify-center gap-6"
    >
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
              error={errors.email?.message}
              loading={loading}
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
              error={errors.password?.message}
              loading={loading}
            />
          )}
        />
        <Button label="Login" loading={loading} />

        <div
          id="links-container"
          className="w-full flex flex-col justify-center gap-2 text-xs font-semibold text-blue-500"
        >
          <Link
            href="/forgot-password"
            className="w-fit self-center border-2 
            border-white 
            hover:text-blue-700 
            hover:border-b-blue-500 
            focus:outline-blue-500"
          >
            Forgot Password
          </Link>
          <small className="text-center">or</small>
          <Link
            href="/signup"
            className="text-base border-2 p-4 rounded-xl font-semibold text-center transition-colors
            border-blue-500 
            text-blue-500 
            hover:border-blue-700 
            hover:bg-blue-700 
            hover:text-white
            focus:outline-blue-900
            "
          >
            Create account
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
