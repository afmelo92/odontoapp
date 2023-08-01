import ControlledInput from "@/app/_components/ControlledInput";
import ControlledSelect from "@/app/_components/ControlledSelect";
import React, { useEffect, useMemo } from "react";
import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import { CreateProstheticsInputs } from "../../page";
import ActionButtonsContainer from "@/app/_components/Forms/ActionButtonsContainer";
import ControlledTextArea from "@/app/_components/ControlledTextArea";
import ToothElement from "./ToothElement";
import { usePatients } from "@/app/(dashboard)/patients/_hooks/usePatients";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { APIResponse } from "@/pages/api/auth/[...nextauth]";
import APIError from "@/utils/APIError";
import { createProstheticsOrderMutation } from "@/services/mutations";
import { Service } from "../../../../../../types/next-auth";
import { useProstheticsServices } from "../../_hooks/useProstheticsServices";

type CreateProstheticOrderFormProps = {
  onCancel: () => void;
};

const CreateProstheticOrderForm: React.FC<CreateProstheticOrderFormProps> = ({
  onCancel,
}) => {
  const session = useSession();
  const userData = session.data?.user || null;

  const {
    handleSubmit,
    control,
    reset,
    resetField,
    setValue,
    watch,
    register,
    setError,
    clearErrors,
    formState: { errors, isDirty },
  } = useFormContext<CreateProstheticsInputs>();

  const { queryReturn: patientsQueryReturn, patients } = usePatients();
  const { queryReturn: prostheticsQueryReturn } = useProstheticsServices();

  const selectedElements = watch("prosthetic_order_teeth_elements");
  const selectedService = watch("prosthetic_order_service_id");
  const selectedOption = watch("prosthetic_order_options_id");

  const currentService = useMemo<Service | null>(
    () =>
      userData?.services?.find(
        (service) => service.id === Number(selectedService)
      ) || null,
    [selectedService, userData?.services]
  );

  const currentColorScale = useMemo(
    () =>
      userData?.colorScale
        ?.filter((color) => color.group === currentService?.colors)
        .map((item) => ({ value: item.id, text: item.title })) || [],
    [currentService?.colors, userData?.colorScale]
  );

  const { isLoading, mutateAsync } = useMutation<
    APIResponse,
    APIError,
    CreateProstheticsInputs
  >({
    mutationFn: (data) => {
      return createProstheticsOrderMutation({
        ...data,
        user_token: userData?.accessToken || "",
      });
    },
    onSuccess: () => {
      // show toast
      onCancel();
      prostheticsQueryReturn?.refetch();
    },
    onError: (error) => {
      // show toast
      error.setFormAPIErrors(error, setError);
    },
  });

  const onSubmit: SubmitHandler<CreateProstheticsInputs> = async (data) => {
    const formattedData = {
      ...data,
      prosthetic_order_teeth_elements:
        selectedElements.length > 0
          ? selectedElements
          : currentService?.options.find(
              (option) => option.id === Number(selectedOption)
            )?.elements || [],
    };

    await mutateAsync(formattedData);
  };

  useEffect(() => {
    register("prosthetic_order_teeth_elements");

    setValue("prosthetic_order_user_role", userData?.role || "");

    return () => {
      reset();
    };
  }, [reset, register, userData?.role, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 h-full justify-between"
    >
      <div id="fields-container" className="flex flex-col gap-4">
        {session.data?.user?.role === "DENTIST" ? (
          <>
            <Controller
              name="prosthetic_order_lab_uid"
              control={control}
              render={({ field }) => (
                <ControlledSelect
                  {...field}
                  loading={isLoading}
                  label="Lab name"
                  defaultLabel="Choose lab"
                  options={[
                    {
                      text: "Pucci Dental Lab",
                      value: "bee3c541-c299-4f2c-b7e8-0a0387792304",
                    },
                  ]}
                  error={errors.prosthetic_order_lab_uid?.message}
                />
              )}
            />

            {patients.length > 0 ? (
              <Controller
                name="prosthetic_order_patient_uid"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <ControlledSelect
                    {...field}
                    label="Patient name"
                    loading={patientsQueryReturn?.isLoading || isLoading}
                    defaultLabel="Choose patient"
                    options={patients.map((patient) => ({
                      value: patient.uid,
                      text: patient.name,
                    }))}
                    error={errors.prosthetic_order_patient_uid?.message}
                  />
                )}
              />
            ) : (
              <Link
                href="/patients"
                className="bg-blue-500 p-2 text-center font-medium text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add new patient
              </Link>
            )}
          </>
        ) : (
          <>
            <Controller
              name="prosthetic_order_clinic_name"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  loading={isLoading}
                  label="Clinic name"
                  placeholder="OdontoApp clinic"
                  error={errors.prosthetic_order_clinic_name?.message}
                />
              )}
            />
            <Controller
              name="prosthetic_order_dentist_name"
              control={control}
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  loading={isLoading}
                  label="Dentist name"
                  placeholder="John Doe"
                  error={errors.prosthetic_order_dentist_name?.message}
                />
              )}
            />

            <Controller
              name="prosthetic_order_patient_name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <ControlledInput
                  {...field}
                  loading={isLoading}
                  label="Patient name"
                  placeholder="Jane Doe"
                  error={errors.prosthetic_order_patient_name?.message}
                />
              )}
            />
          </>
        )}

        <div id="row-2" className="grid grid-cols-2 gap-2">
          <Controller
            name="prosthetic_order_service_id"
            control={control}
            render={({ field }) => (
              <ControlledSelect
                {...field}
                onChange={(e) => {
                  resetField("prosthetic_order_color_id");
                  resetField("prosthetic_order_options_id");
                  resetField("prosthetic_order_teeth_elements");
                  clearErrors("prosthetic_order_color_id");
                  clearErrors("prosthetic_order_options_id");
                  return field.onChange(e);
                }}
                error={errors.prosthetic_order_service_id?.message}
                label="Service"
                defaultLabel="Choose service"
                loading={isLoading}
                options={
                  userData?.services?.map((service) => ({
                    value: service.id,
                    text: service.title,
                  })) || []
                }
              />
            )}
          />
          <Controller
            name="prosthetic_order_options_id"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <ControlledSelect
                {...field}
                disabled={!currentService?.options?.length}
                label="Options"
                defaultLabel="Choose option"
                loading={isLoading}
                options={
                  currentService?.options.map((selected) => ({
                    value: selected.id,
                    text: selected.title,
                  })) || []
                }
                error={errors.prosthetic_order_options_id?.message}
              />
            )}
          />
        </div>

        <div id="row-3" className="grid grid-cols-2 gap-2">
          <Controller
            name="prosthetic_order_color_id"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <ControlledSelect
                {...field}
                disabled={!currentService?.colors}
                label="Color"
                defaultLabel="Choose color"
                options={currentColorScale}
                error={errors.prosthetic_order_color_id?.message}
                loading={isLoading}
              />
            )}
          />
          <Controller
            name="prosthetic_order_deadline"
            control={control}
            render={({ field }) => (
              <ControlledInput
                {...field}
                type="date"
                label="Service deadline"
                error={errors.prosthetic_order_deadline?.message}
                loading={isLoading}
              />
            )}
          />
        </div>

        <div
          id="row-4"
          className="flex flex-col items-center justify-center gap-[2px] data-[error=true]:border-2 data-[error=true]:border-red-500"
          data-error={!!errors.prosthetic_order_teeth_elements}
        >
          <label className="text-xs font-semibold text-gray-900">
            Select elements for service
          </label>

          <div id="toothmap-row-1" className="flex gap-1">
            {[
              18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
            ].map((item) => {
              const isIn = selectedElements.includes(item);

              return (
                <ToothElement
                  key={item}
                  id={item}
                  disabled={!currentService?.elements || isLoading}
                  selected={isIn}
                  onSelect={(id) => {
                    setValue(
                      "prosthetic_order_teeth_elements",
                      selectedElements.length === 0
                        ? [id]
                        : isIn
                        ? selectedElements.filter((el) => el !== id)
                        : [...selectedElements, id]
                    );
                  }}
                />
              );
            })}
          </div>
          <div id="toothmap-row-2" className="flex gap-1">
            {[
              48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
            ].map((item) => {
              const isIn = selectedElements.includes(item);
              return (
                <ToothElement
                  key={item}
                  id={item}
                  disabled={!currentService?.elements || isLoading}
                  selected={isIn}
                  onSelect={(id) => {
                    setValue(
                      "prosthetic_order_teeth_elements",
                      selectedElements.length === 0
                        ? [id]
                        : isIn
                        ? selectedElements.filter((el) => el !== id)
                        : [...selectedElements, id]
                    );
                  }}
                />
              );
            })}
          </div>
          {!!errors.prosthetic_order_teeth_elements && (
            <small className="w-full text-xs text-red-500">
              At least one element must be provided
            </small>
          )}
        </div>

        <div id="row-5">
          <Controller
            name="prosthetic_order_description"
            control={control}
            render={({ field }) => (
              <ControlledTextArea
                {...field}
                disabled={isLoading}
                label="Service description"
                placeholder="Insert some details/observations about the service"
                rows={5}
              />
            )}
          />
        </div>
      </div>
      <ActionButtonsContainer
        submitLabel="Create order"
        onCancel={onCancel}
        isDirty={isDirty}
        isLoading={isLoading}
      />
    </form>
  );
};

export default CreateProstheticOrderForm;
