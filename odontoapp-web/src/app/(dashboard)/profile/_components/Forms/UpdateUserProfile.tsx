import ControlledInput from "@/app/_components/ControlledInput";
import { updateUserMutation } from "@/services/mutations";
import { cpfMask } from "@/utils";
import APIError from "@/utils/APIError";
import { updateUserProfileSchema } from "@/utils/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { subYears } from "date-fns";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { UpdateResponse } from "@/pages/api/auth/[...nextauth]";
import Button from "@/app/_components/Button";

export type UpdateUserProfileInputs = {
  user_name: string;
  user_cpf: string;
  user_cro: string;
  user_birth: string;
  user_address: string;
  user_company: string;
  user_post: string;
  user_email: string;
  user_confirm_email: string;
  user_password: string;
  user_confirm_password: string;
};

const UpdateUserProfileForm: React.FC = () => {
  const session = useSession();

  const userData = session.data?.user || null;

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isDirty, dirtyFields },
    resetField,
  } = useForm<UpdateUserProfileInputs>({
    defaultValues: {
      user_address: userData?.address || "",
      user_birth: userData?.birth?.split("T")[0] || "",
      user_company: userData?.company?.name || `${userData?.name}'s clinic`,
      user_cpf: userData?.cpf || "",
      user_email: userData?.email || "",
      user_confirm_email: userData?.email || "",
      user_name: userData?.name || "",
      user_post: userData?.post || "",
      user_password: "",
      user_confirm_password: "",
      user_cro: userData?.cro || "",
    },
    resolver: yupResolver(updateUserProfileSchema),
  });

  const { mutateAsync, isLoading } = useMutation<
    UpdateResponse,
    APIError,
    UpdateUserProfileInputs
  >({
    mutationFn: (data) => {
      return updateUserMutation({
        ...data,
        user_id: userData?.id || "",
        user_token: userData?.accessToken || "",
      });
    },
    onSuccess: async (data) => {
      // SHOW TOAST
      const userResponseData = data.data;

      await session.update({ ...userResponseData });

      resetField("user_password");
      resetField("user_confirm_password");
      resetField("user_confirm_email");
    },
    onError: (error) => {
      // SHOW TOAST
      console.log({ error });
      error.setFormAPIErrors(error, setError);
    },
  });

  const onSubmit: SubmitHandler<UpdateUserProfileInputs> = async (data) => {
    let formattedUserBirth: Date | string = "";

    if (data.user_birth) {
      formattedUserBirth = new Date(data.user_birth).toISOString();
    }

    const formattedInput: UpdateUserProfileInputs = {
      ...data,
      user_birth: formattedUserBirth,
    };

    await mutateAsync(formattedInput);
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
                  loading={isLoading}
                  error={errors.user_name?.message}
                />
              )}
            />

            <Controller
              name="user_birth"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="date"
                  label="Birth date"
                  loading={isLoading}
                  max={subYears(new Date(), 18).toISOString().split("T")[0]}
                  error={errors.user_birth?.message}
                />
              )}
            />

            <Controller
              name="user_cpf"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="text"
                  label="CPF"
                  placeholder="123.456.789-55"
                  value={cpfMask(field.value)}
                  disabled
                  error={errors.user_cpf?.message}
                />
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
                  loading={isLoading}
                  error={errors.user_address?.message}
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
                  disabled={true}
                  title="Change this field in company tab"
                  loading={isLoading}
                  error={errors.user_company?.message}
                />
              )}
            />

            <Controller
              name="user_cro"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="text"
                  label="CRO"
                  placeholder="12345-SP"
                  title={field.value}
                  loading={isLoading}
                  error={errors.user_cro?.message}
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
                  loading={isLoading}
                  title={field.value}
                  error={errors.user_post?.message}
                />
              )}
            />

            <ControlledInput
              name="invisible"
              type="text"
              autoComplete="off"
              invisible={true}
              readOnly={true}
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
                  loading={isLoading}
                  error={errors.user_email?.message}
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
                  autoComplete="new-password"
                  loading={isLoading}
                  error={errors.user_password?.message}
                />
              )}
            />

            <Controller
              name="user_confirm_email"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="text"
                  label="Confirm E-mail"
                  placeholder="Confirm your new e-mail"
                  loading={isLoading}
                  error={errors.user_confirm_email?.message}
                  invisible={!dirtyFields.user_email}
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
                  loading={isLoading}
                  error={errors.user_confirm_password?.message}
                  invisible={!dirtyFields.user_password}
                />
              )}
            />
          </div>

          <div id="actions-container" className="w-full">
            <Button
              type="submit"
              label="Update Profile"
              disabled={!isDirty}
              loading={isLoading}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateUserProfileForm;
