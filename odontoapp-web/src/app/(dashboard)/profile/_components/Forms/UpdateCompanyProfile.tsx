import Button from "@/app/_components/Button";
import ControlledInput from "@/app/_components/ControlledInput";
import { UpdateResponse } from "@/pages/api/auth/[...nextauth]";
import { updateUserMutation } from "@/services/mutations";
import { cellphoneMask, cnpjMask } from "@/utils";
import APIError from "@/utils/APIError";
import { updateCompanyProfileSchema } from "@/utils/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export type UpdateCompanyProfileInputs = {
  company_name: string;
  company_cnpj: string;
  company_address: string;
  company_primary_email: string;
  company_secondary_email: string;
  company_cellphone: string;
  company_phone: string;
  company_website: string;
};

const UpdateCompanyProfileForm: React.FC = () => {
  const session = useSession();

  const userData = session.data?.user || null;

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isDirty },
  } = useForm<UpdateCompanyProfileInputs>({
    defaultValues: {
      company_address: userData?.company?.address || "",
      company_cellphone: userData?.company?.cellphone || "",
      company_phone: userData?.company?.phone || "",
      company_cnpj: userData?.company?.cnpj || "",
      company_primary_email: userData?.company?.primary_email || "",
      company_secondary_email: userData?.company?.secondary_email || "",
      company_name: userData?.company?.name || "",
      company_website: userData?.company?.website || "",
    },
    resolver: yupResolver(updateCompanyProfileSchema),
  });

  const { mutateAsync, isLoading } = useMutation<
    UpdateResponse,
    APIError,
    UpdateCompanyProfileInputs
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
    },
    onError: (error) => {
      // SHOW TOAST
      console.log({ error });
      error.setFormAPIErrors(error, setError);
    },
  });

  const onSubmit: SubmitHandler<UpdateCompanyProfileInputs> = async (data) => {
    await mutateAsync(data);
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
                  loading={isLoading}
                  error={errors.company_name?.message}
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
                  value={cnpjMask(field.value)}
                  loading={isLoading}
                  error={errors.company_cnpj?.message}
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
                  loading={isLoading}
                  error={errors.company_address?.message}
                />
              )}
            />

            <Controller
              name="company_primary_email"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="email"
                  label="E-mail"
                  placeholder="john.doe@company.com"
                  loading={isLoading}
                  error={errors.company_primary_email?.message}
                />
              )}
            />

            <Controller
              name="company_secondary_email"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="email"
                  label="Extra email"
                  placeholder="john.doe.extra@company.com"
                  loading={isLoading}
                  error={errors.company_secondary_email?.message}
                />
              )}
            />

            <Controller
              name="company_cellphone"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="text"
                  label="Cellphone"
                  placeholder="+55 (11) 9 9999-9999"
                  value={cellphoneMask(field.value)}
                  loading={isLoading}
                  error={errors.company_cellphone?.message}
                />
              )}
            />

            <Controller
              name="company_phone"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  type="text"
                  label="Phone"
                  placeholder="11 3333-3333"
                  loading={isLoading}
                  error={errors.company_phone?.message}
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
                  loading={isLoading}
                  error={errors.company_website?.message}
                />
              )}
            />
          </div>
          <div id="actions-container" className="w-full">
            <Button
              type="submit"
              label="Update Company Profile"
              disabled={!isDirty}
              loading={isLoading}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateCompanyProfileForm;
