"use client";
import { useState } from "react";
import UpdateUserProfileForm from "./_components/Forms/UpdateUserProfile";
import UpdateCompanyProfileForm from "./_components/Forms/UpdateCompanyProfile";
import { signOut } from "next-auth/react";
import { getIcon } from "@/utils/getIcon";

const ProfilePage: React.FC = () => {
  const [mainTab, setMainTab] = useState(true);

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h1 className="font-bold text-2xl text-gray-900">Profile</h1>
        <button
          title="Create new patient"
          onClick={() => signOut({ callbackUrl: "/signin" })}
          className="group
          focus:outline-red-500
          text-white
          bg-red-500
          hover:bg-red-700
          p-2 rounded-lg flex gap-2 items-center text-sm font-medium transition-colors"
        >
          {getIcon({
            name: "power",
            className: "w-4 h-4 stroke-white",
            strokeWidth: 2,
          })}
          <p>Logout</p>
        </button>
      </div>
      <div className="bg-white w-full h-full rounded-lg shadow-sm shadow-gray-500 p-6 grid grid-rows-[64px_1fr] grid-cols-[256px_1fr] gap-x-6 gap-y-4">
        <div id="tabs" className="col-span-2 w-full flex items-center">
          <h3
            onClick={() => setMainTab(true)}
            className={`cursor-pointer font-semibold  w-64 border-b-4 text-center h-full flex items-center justify-center  ${
              mainTab
                ? "border-b-blue-500 text-blue-500 "
                : "border-b-gray-200 text-gray-400"
            }`}
          >
            User
          </h3>
          <h3
            onClick={() => setMainTab(false)}
            className={`cursor-pointer font-semibold w-64 border-b-4 text-center h-full flex items-center justify-center ${
              !mainTab
                ? "border-b-blue-500 text-blue-500"
                : "border-b-gray-200 text-gray-400"
            }`}
          >
            Company
          </h3>
        </div>
        {mainTab ? <UpdateUserProfileForm /> : <UpdateCompanyProfileForm />}
      </div>
    </>
  );
};

export default ProfilePage;
