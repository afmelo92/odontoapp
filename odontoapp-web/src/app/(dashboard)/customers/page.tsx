"use client";
import { getIcon } from "@/utils/getIcon";
import React, { useState } from "react";
import Header from "./_components/Header";
import Table from "./_components/Table";
import { FormProvider, useForm } from "react-hook-form";
import SideDetails from "@/app/_components/SideDetails";
import CreateCustomerForm from "./_components/Forms/CreateCustomer";

export type CreateCustomerInputs = {
  customer_name: string;
  customer_cnpj: string;
  customer_email: string;
  customer_cellphone: string;
  customer_phone: string;
  customer_main_contact: string;
  customer_secondary_contact: string;
  customer_address: string;
};

const CustomersPage: React.FC = () => {
  const [showCreateCustomerForm, setShowCreateCustomerForm] = useState(false);

  const createCustomerMethods = useForm<CreateCustomerInputs>({
    defaultValues: {
      customer_name: "",
      customer_cnpj: "",
      customer_email: "",
      customer_cellphone: "",
      customer_phone: "",
      customer_main_contact: "",
      customer_secondary_contact: "",
      customer_address: "",
    },
  });

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h1 className="font-bold text-2xl text-gray-900">Customers</h1>
        <button
          title="Create new patient"
          onClick={() => setShowCreateCustomerForm(true)}
          className="group focus:outline-blue-500 flex gap-2 items-center text-sm font-semibold text-blue-500 transition-all"
        >
          {getIcon({
            name: "plus-circle",
            className: `w-6 h-w-6 stroke-blue-500 group-hover:stroke-blue-700`,
            strokeWidth: 2,
          })}
          <p className="group-hover:text-blue-700">Add new customer</p>
        </button>
      </div>
      <div className="bg-white w-full h-full rounded-lg shadow-sm shadow-gray-500 flex flex-col gap-4">
        <Header />
        <Table />
      </div>

      {showCreateCustomerForm && (
        <SideDetails title="Create Customer" onShow={setShowCreateCustomerForm}>
          <FormProvider {...createCustomerMethods}>
            <CreateCustomerForm
              onCancel={() => setShowCreateCustomerForm(false)}
            />
          </FormProvider>
        </SideDetails>
      )}
    </>
  );
};

export default CustomersPage;
