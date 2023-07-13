"use client";
import React, { useCallback, useState } from "react";
import Header from "./_components/Header";
import Table from "./_components/Table";
import { getIcon } from "@/utils/getIcon";
import SideDetails from "@/app/_components/SideDetails";
import { FormProvider, useForm } from "react-hook-form";
import CreatePatientForm from "./_components/Forms/CreatePatient";
import { usePatients } from "./_hooks/usePatients";
import ScheduleAppointmentForm from "./_components/Forms/ScheduleAppointment";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPatientsSchema } from "@/utils/schemas";
import Spinner from "@/app/_components/Spinner";

export type CreatePatientInputs = {
  patient_name: string;
  patient_email: string;
  patient_address: string;
  patient_zip: string;
  patient_phone: string;
  patient_cellphone: string;
  patient_cpf: string;
  patient_birth: string;
  patient_sex: "M" | "F" | "";
  // patient_taking_medicine: string | number;
  // patient_taking_medicine_description: string;
  // patient_in_medical_treatment: string | number;
  // patient_in_medical_treatment_description: string;
  // patient_has_allergy: string | number;
  // patient_has_allergy_description: string;
  // patient_blood_pressure: string | number;
  // patient_has_heart_problems: string | number;
  // patient_has_heart_problems_description: string;
  // patient_has_rheumatic_fever: string | number;
  // patient_has_diabetes: string | number;
  // patient_bleeding_level: string | number;
  // patient_healing_level: string | number;
  // patient_has_hepatitis: string | number;
  // patient_has_breathing_problems: string | number;
  // patient_has_gastric_problems: string | number;
  // patient_has_joint_problems_or_rheumatism: string | number;
  // patient_has_hiv: string | number;
  // patient_desease_description: string;
  // patient_has_anesthesia_reaction: string | number;
  // patient_has_anesthesia_reaction_description: string;
  // patient_has_teeth_gum_pain: string | number;
  // patient_has_gum_bleeding: string | number;
  // patient_has_pain_ear_area: string | number;
  // patient_has_difficulty_opening_mouth: string | number;
  // patient_grind_clench_teeth: string | number;
  // patient_smokes: string | number;
  // patient_alcohol: string | number;
  // patient_pregnant_lactating: string | number;
  // patient_has_important_information: string | number;
  // patient_has_important_information_description: string;
  // patient_bio_confirmation: string | number;
};

export type ScheduleAppointmentInputs = {
  appointment_provider: number;
  appointment_datetime: string | number | readonly string[] | undefined;
  appointment_duration: number;
  appointment_reason: string;
};

const PatientsPage: React.FC = () => {
  const [showCreatePatientForm, setShowCreatePatientForm] = useState(false);
  const [showScheduleAppointment, setShowScheduleAppointment] = useState(false);
  const {
    state: { selected: selectedPatient },
    queryReturn,
  } = usePatients();

  const createPatientMethods = useForm<CreatePatientInputs>({
    defaultValues: {
      patient_name: "",
      patient_email: "",
      patient_address: "",
      patient_zip: "",
      patient_cellphone: "",
      patient_phone: "",
      patient_cpf: "",
      patient_birth: "",
      patient_sex: "M",
      // patient_taking_medicine: 0,
      // patient_taking_medicine_description: "",
      // patient_in_medical_treatment: 0,
      // patient_in_medical_treatment_description: "",
      // patient_has_allergy: 0,
      // patient_has_allergy_description: "",
      // patient_blood_pressure: 0,
      // patient_has_heart_problems: 0,
      // patient_has_heart_problems_description: "",
      // patient_has_rheumatic_fever: 0,
      // patient_has_diabetes: 0,
      // patient_bleeding_level: 0,
      // patient_healing_level: 0,
      // patient_has_hepatitis: 0,
      // patient_has_breathing_problems: 0,
      // patient_has_gastric_problems: 0,
      // patient_has_joint_problems_or_rheumatism: 0,
      // patient_has_hiv: 0,
      // patient_desease_description: "",
      // patient_has_anesthesia_reaction: 0,
      // patient_has_anesthesia_reaction_description: "",
      // patient_has_teeth_gum_pain: 0,
      // patient_has_gum_bleeding: 0,
      // patient_has_pain_ear_area: 0,
      // patient_has_difficulty_opening_mouth: 0,
      // patient_grind_clench_teeth: 0,
      // patient_smokes: 0,
      // patient_alcohol: 0,
      // patient_pregnant_lactating: 0,
      // patient_has_important_information: 0,
      // patient_has_important_information_description: "",
      // patient_bio_confirmation: 0,
    },
    resolver: yupResolver(createPatientsSchema),
  });

  const scheduleAppointmentMethods = useForm<ScheduleAppointmentInputs>({
    defaultValues: {
      appointment_datetime: "",
      appointment_duration: 15,
      appointment_provider: 1,
      appointment_reason: "",
    },
  });

  const handleCreatePatientClick = useCallback(
    (status: boolean) => {
      if (showScheduleAppointment) {
        setShowScheduleAppointment(false);
      }
      setShowCreatePatientForm(status);
    },
    [showScheduleAppointment]
  );

  const handleScheduleAppointmentClick = useCallback(
    (status: boolean) => {
      if (showCreatePatientForm) {
        setShowCreatePatientForm(false);
      }
      setShowScheduleAppointment(status);
    },
    [showCreatePatientForm]
  );

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h1 className="font-bold text-2xl text-gray-900">Patients</h1>
        <button
          title="Create new patient"
          onClick={() => handleCreatePatientClick(true)}
          className="group focus:outline-blue-500 flex gap-2 items-center text-sm font-semibold text-blue-500 transition-all"
        >
          {getIcon({
            name: "plus-circle",
            className: `w-6 h-w-6 stroke-blue-500 group-hover:stroke-blue-700`,
            strokeWidth: 2,
          })}
          <p className="group-hover:text-blue-700">Add new patient</p>
        </button>
      </div>
      <div className="bg-white w-full h-full rounded-lg shadow-sm shadow-gray-500 flex flex-col gap-4">
        <Header />
        {queryReturn?.isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner
              size="w-24 h-24"
              fill="fill-blue-700"
              trail="text-blue-200"
            />
          </div>
        ) : (
          <Table
            onEmptyList={handleCreatePatientClick}
            onScheduleAppointment={handleScheduleAppointmentClick}
          />
        )}
      </div>

      {showCreatePatientForm && (
        <SideDetails title="Create Patient" onShow={handleCreatePatientClick}>
          <FormProvider {...createPatientMethods}>
            <CreatePatientForm
              onCancel={() => handleCreatePatientClick(false)}
            />
          </FormProvider>
        </SideDetails>
      )}

      {showScheduleAppointment && (
        <SideDetails
          title="Schedule Appointment"
          onShow={handleScheduleAppointmentClick}
        >
          <FormProvider {...scheduleAppointmentMethods}>
            <ScheduleAppointmentForm
              onCancel={() => handleScheduleAppointmentClick(false)}
              selectedPatient={selectedPatient}
            />
          </FormProvider>
        </SideDetails>
      )}
    </>
  );
};

export default PatientsPage;
