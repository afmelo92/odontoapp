"use client";
import React, { useState } from "react";
import Header from "./_components/Header";
import Table from "./_components/Table";
import { getIcon } from "@/utils/getIcon";
import SideDetails from "../_components/SideDetails";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import CreatePatientForm from "./_components/Forms/CreatePatient";

export type CreatePatientInputs = {
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  patient_cpf: string;
  patient_birth: string;
  patient_sex: "M" | "F" | "";
} & FieldValues;

const PatientsPage: React.FC = () => {
  const [showCreatePatientForm, setShowCreatePatientForm] = useState(false);
  const createPatientMethods = useForm<CreatePatientInputs>({
    defaultValues: {
      patient_name: "",
      patient_email: "",
      patient_phone: "",
      patient_cpf: "",
      patient_birth: "",
      patient_sex: "",
    },
  });

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h1 className="font-bold text-2xl text-gray-900">Patients</h1>
        <button
          title="Create new patient"
          className="group flex gap-2 items-center text-sm font-semibold text-blue-500 transition-all"
        >
          {getIcon({
            name: "plus-circle",
            className: `w-6 h-w-6 stroke-blue-500 group-hover:stroke-blue-700`,
            strokeWidth: 2,
          })}
          <p
            onClick={() => setShowCreatePatientForm(true)}
            className="group-hover:text-blue-700"
          >
            Add new patient
          </p>
        </button>
      </div>
      <div className="bg-white w-full h-full rounded-lg shadow-sm shadow-gray-500 flex flex-col gap-4">
        <Header />
        <Table />
      </div>
      {showCreatePatientForm && (
        <SideDetails title="Create Patient" onShow={setShowCreatePatientForm}>
          <FormProvider {...createPatientMethods}>
            <CreatePatientForm
              onCancel={() => setShowCreatePatientForm(false)}
            />
          </FormProvider>
        </SideDetails>
      )}
    </>
  );
};

export default PatientsPage;
