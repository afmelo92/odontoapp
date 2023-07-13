import React, { useEffect, useState } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { CreatePatientInputs } from "@/app/(dashboard)/patients/page";
import ActionButtonsContainer from "@/app/_components/Forms/ActionButtonsContainer";
import CreatePatientFormMainTab from "./MainTab";
import CreatePatientFormSecondaryTab from "./SecondaryTab";
import { useMutation } from "@tanstack/react-query";
import APIError from "@/utils/APIError";
import { APIResponse } from "@/pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { createPatientsMutation } from "@/services/mutations";
import { usePatients } from "../../../_hooks/usePatients";
import { onlyNumbers } from "@/utils";

type CreatePatientFormProps = {
  onCancel: () => void;
};

const CreatePatientForm: React.FC<CreatePatientFormProps> = ({ onCancel }) => {
  const [mainTab, setMainTab] = useState(true);
  const session = useSession();

  const userData = session.data?.user || null;
  const { queryReturn } = usePatients();
  const {
    handleSubmit,
    reset,
    formState: { isDirty },
    setError,
  } = useFormContext<CreatePatientInputs>();

  const { isLoading, mutateAsync } = useMutation<
    APIResponse,
    APIError,
    CreatePatientInputs
  >({
    mutationFn: (data) => {
      return createPatientsMutation({
        ...data,
        user_id: userData?.id || "",
        user_token: userData?.accessToken || "",
      });
    },
    onSuccess: () => {
      // show toast
      onCancel();
      queryReturn?.refetch();
    },
    onError: (error) => {
      // show toast
      error.setFormAPIErrors(error, setError);
    },
  });

  const onSubmit: SubmitHandler<CreatePatientInputs> = async (data) => {
    const formattedData: CreatePatientInputs = {
      ...data,
      patient_zip: onlyNumbers(data.patient_zip),
      patient_phone: onlyNumbers(data.patient_phone),
      patient_cellphone: onlyNumbers(data.patient_cellphone),
      patient_cpf: onlyNumbers(data.patient_cpf),
      patient_birth: new Date(data.patient_birth).toISOString(),
    };

    await mutateAsync(formattedData);
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
          <div id="tabs" className="grid grid-cols-2">
            <button
              type="button"
              onClick={() => setMainTab(true)}
              data-selected={mainTab}
              className={`font-semibold pb-4 ${
                mainTab
                  ? "text-blue-500 border-b-4 border-b-blue-500"
                  : "text-gray-400 border-b-4 border-b-gray-200"
              }`}
            >
              Personal
            </button>
            <button
              type="button"
              onClick={() => setMainTab(false)}
              data-selected={!mainTab}
              // At first the bio tab is deactivated
              className={`invisible font-semibold pb-4 ${
                !mainTab
                  ? "text-blue-500 border-b-4 border-b-blue-500"
                  : "text-gray-400 border-b-4 border-b-gray-200"
              }`}
            >
              Bio
            </button>
          </div>
          {mainTab ? (
            <CreatePatientFormMainTab isLoading={isLoading} />
          ) : (
            <CreatePatientFormSecondaryTab />
          )}
        </div>
        <ActionButtonsContainer
          isDirty={isDirty}
          isLoading={isLoading}
          submitLabel="Create user"
          onCancel={onCancel}
        />
      </form>
    </>
  );
};

export default CreatePatientForm;
