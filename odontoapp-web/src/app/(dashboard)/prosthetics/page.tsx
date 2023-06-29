"use client";
import { getIcon } from "@/utils/getIcon";
import Header from "./_components/Header";
import Table from "./_components/Table";
import { useCallback, useState } from "react";
import SideDetails from "@/app/_components/SideDetails";
import { FormProvider, useForm } from "react-hook-form";
import CreateProstheticOrderForm from "./_components/Forms/CreateProstheticOrder";

export type CreateProstheticsInputs = {
  prosthetic_order_provider_id: number;
  prosthetic_order_patient_name: string;
  prosthetic_order_teeth_elements: number[];
  prosthetic_order_deadline: string | number | readonly string[] | undefined;
  prosthetic_order_service: string;
  prosthetic_order_material: string;
  prosthetic_order_color: string;
  prosthetic_order_details: string;
};

const ProstheticsPage: React.FC = () => {
  const [showCreateProstheticOrderForm, setShowCreateProstheticOrderForm] =
    useState(false);

  const createProstheticOrderMethods = useForm<CreateProstheticsInputs>({
    mode: "onSubmit",
    defaultValues: {
      prosthetic_order_provider_id: 1,
      prosthetic_order_patient_name: "",
      prosthetic_order_teeth_elements: [],
      prosthetic_order_deadline: "",
      prosthetic_order_service: "",
      prosthetic_order_material: "",
      prosthetic_order_color: "",
      prosthetic_order_details: "",
    },
  });

  const handleCreateProstheticOrderClick = useCallback((status: boolean) => {
    setShowCreateProstheticOrderForm(status);
  }, []);
  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h1 className="font-bold text-2xl text-gray-900">Prosthetics</h1>
        <button
          onClick={() => handleCreateProstheticOrderClick(true)}
          className="group flex gap-2 items-center text-sm font-semibold text-blue-500 transition-all"
        >
          {getIcon({
            name: "plus-circle",
            className: `w-6 h-w-6 transition-colors stroke-blue-500 group-hover:stroke-blue-700`,
            strokeWidth: 2,
          })}
          <p className="group-hover:text-blue-700">New prosthetic order</p>
        </button>
      </div>
      <div className="bg-white w-full h-full rounded-lg shadow-sm shadow-gray-500 flex flex-col gap-4">
        <Header />
        <Table />
      </div>

      {showCreateProstheticOrderForm && (
        <SideDetails
          title="Create Prosthetic Order"
          onShow={handleCreateProstheticOrderClick}
        >
          <FormProvider {...createProstheticOrderMethods}>
            <CreateProstheticOrderForm
              onCancel={() => handleCreateProstheticOrderClick(false)}
            />
          </FormProvider>
        </SideDetails>
      )}
    </>
  );
};

export default ProstheticsPage;
