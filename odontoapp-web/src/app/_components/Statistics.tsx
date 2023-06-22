import { getIcon } from "@/utils/getIcon";
import React from "react";

const Statistics: React.FC = () => {
  return (
    <div className="w-full row-span-3 rounded-lg grid grid-cols-4 gap-4">
      <div className="w-full h-full rounded-lg bg-white shadow-md flex items-center justify-center gap-2 p-6">
        {getIcon({
          name: "bank-notes",
          className:
            "w-16 h-16 bg-green-100 p-4 rounded-full stroke-green-500 group-hover:stroke-green-600 transition-colors",
          strokeWidth: 2,
        })}
        <div className="flex flex-col">
          <h2 className="font-bold text-2xl text-gray-900">R$432.000,50</h2>
          <p className="text-gray-500 font-medium">Month gross revenue</p>
        </div>
      </div>
      <div className="w-full h-full rounded-lg bg-white shadow-md flex items-center justify-center gap-2 p-6">
        {getIcon({
          name: "users-group",
          className:
            "w-16 h-16 bg-blue-100 p-4 rounded-full stroke-blue-500 group-hover:stroke-blue-600 transition-colors",
          strokeWidth: 2,
        })}
        <div className="flex flex-col">
          <h2 className="font-bold text-2xl text-gray-900">132</h2>
          <p className="text-gray-500 font-medium">Patients scheduled</p>
        </div>
      </div>
      <div className="w-full h-full rounded-lg bg-white shadow-md flex items-center justify-center gap-2 p-6">
        {getIcon({
          name: "video-camera",
          className:
            "w-16 h-16 bg-violet-100 p-4 rounded-full stroke-violet-500 group-hover:stroke-violet-600 transition-colors",
          strokeWidth: 2,
        })}
        <div className="flex flex-col">
          <h2 className="font-bold text-2xl text-gray-900">35</h2>
          <p className="text-gray-500 font-medium">Video consults</p>
        </div>
      </div>
      <div className="w-full h-full rounded-lg bg-white shadow-md flex items-center justify-center gap-2 p-6">
        {getIcon({
          name: "star",
          className:
            "w-16 h-16 bg-yellow-100 p-4 rounded-full stroke-yellow-500 group-hover:stroke-yellow-600 transition-colors",
          strokeWidth: 2,
        })}
        <div className="flex flex-col">
          <h2 className="font-bold text-2xl text-gray-900">4.9</h2>
          <p className="text-gray-500 font-medium">Average rating</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
