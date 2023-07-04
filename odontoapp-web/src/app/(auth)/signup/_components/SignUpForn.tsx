"use client";
import Button from "@/app/_components/Button";
import ControlledInput from "@/app/_components/ControlledInput";
import ControlledSelect from "@/app/_components/ControlledSelect";
import { signUpMutation } from "@/services/mutations";
import { cnpjMask, cpfMask } from "@/utils";
import APIError from "@/utils/APIError";
import { getIcon } from "@/utils/getIcon";
import { signUpSchema } from "@/utils/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export type SignUpInputs = {
  name: string;
  cpf_cnpj: string;
  email: string;
  password: string;
  confirm_password: string;
  account_type: number;
};

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpInputs>({
    defaultValues: {
      name: "",
      cpf_cnpj: "",
      email: "",
      password: "",
      confirm_password: "",
      account_type: 0,
    },
    resolver: yupResolver(signUpSchema),
  });

  const formHasErrors = Object.values(errors).filter(Boolean).length > 0;

  const { mutateAsync, isLoading } = useMutation<
    Response,
    APIError,
    SignUpInputs
  >({
    mutationFn: (data) => {
      return signUpMutation(data);
    },
    onSuccess: () => {
      // SHOW TOAST
      router.replace("/signin");
    },
    onError: (error) => {
      // SHOW TOAST
      error.setFormAPIErrors(error, setError);
    },
  });

  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    const formattedInput: SignUpInputs = {
      ...data,
      cpf_cnpj: data.cpf_cnpj.replace(/\D+/g, ""),
    };
    await mutateAsync(formattedInput);
  };

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
          name="name"
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
              loading={isLoading}
              error={errors.name?.message}
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
              loading={isLoading}
              value={
                field.value.length >= 15
                  ? cnpjMask(field.value)
                  : cpfMask(field.value)
              }
              error={errors.cpf_cnpj?.message}
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
              leftIcon="building-office"
              defaultLabel="Choose account type"
              // defaultValue={0}
              sizeType="lg"
              options={[
                { value: 1, text: "Dental Clinic" },
                { value: 2, text: "Prosthetic Lab" },
              ]}
              loading={isLoading}
              error={errors.account_type?.message}
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
              loading={isLoading}
              error={errors.email?.message}
              autoComplete="new-password"
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
              loading={isLoading}
              error={errors.password?.message}
              autoComplete="new-password"
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
              loading={isLoading}
              error={errors.confirm_password?.message}
            />
          )}
        />
        <Button
          type="submit"
          label="Create account"
          loading={isLoading}
          error={formHasErrors}
        />

        <div
          id="links-container"
          className="w-full flex flex-col justify-center gap-2 text-xs font-semibold text-blue-500"
        >
          <Link
            href="/signin"
            className="w-fit self-center border-2 border-white hover:text-blue-700 hover:border-b-blue-500 focus:outline-blue-500"
          >
            Back to login
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
