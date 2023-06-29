import React, { useEffect, useState } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { CreatePatientInputs } from "@/app/patients/page";
import ActionButtonsContainer from "@/app/_components/Forms/ActionButtonsContainer";
import CreatePatientFormMainTab from "./MainTab";
import CreatePatientFormSecondaryTab from "./SecondaryTab";

type CreatePatientFormProps = {
  onCancel: () => void;
};

const CreatePatientForm: React.FC<CreatePatientFormProps> = ({ onCancel }) => {
  const [mainTab, setMainTab] = useState(true);
  const { handleSubmit, reset } = useFormContext<CreatePatientInputs>();

  const onSubmit: SubmitHandler<CreatePatientInputs> = (data) => {
    console.log(data);
    onCancel();
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
              className={`font-semibold pb-4 ${
                !mainTab
                  ? "text-blue-500 border-b-4 border-b-blue-500"
                  : "text-gray-400 border-b-4 border-b-gray-200"
              }`}
            >
              Bio
            </button>
          </div>
          {mainTab ? (
            <CreatePatientFormMainTab />
          ) : (
            <CreatePatientFormSecondaryTab />
          )}
        </div>
        <ActionButtonsContainer submitLabel="Create user" onCancel={onCancel} />
      </form>
    </>
  );
};

export default CreatePatientForm;
