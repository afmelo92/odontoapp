import React from "react";

type PageProps = {
  params: {
    patient_id: string;
  };
};

const PatientDetailsPage: React.FC<PageProps> = ({ params }) => {
  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h1 className="font-bold text-2xl text-gray-900">
          Patient {params.patient_id}
        </h1>
      </div>
      <div className="bg-white w-full h-full rounded-lg shadow-sm shadow-gray-500 flex flex-col gap-4"></div>
    </>
  );
};

export default PatientDetailsPage;
