import { BellIcon } from "@/assets/icons/bell";
import { PlusCircleIcon } from "@/assets/icons/plusCircle";
import Image from "next/image";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav
      id="top-bar"
      className="col-span-2 flex items-center justify-between px-6"
    >
      <div id="logo" className="">
        <PlusCircleIcon
          className="w-6 h-w-6 stroke-blue-500 group-hover:stroke-blue-500 transition-colors"
          strokeWidth={2}
        />
      </div>
      <div id="profile" className="flex gap-4 items-center">
        <div
          id="notification-container"
          className="mr-4 relative group hover:cursor-pointer hover:bg-blue-100 p-2 rounded-lg transition-colors"
          title="9 notifications"
        >
          <BellIcon
            className="w-6 h-w-6 stroke-gray-400 transition-colors group-hover:stroke-blue-500"
            strokeWidth={2}
          />
          <div className="absolute -top-0 -right-0 flex items-center justify-center text-[10px] text-white font-semibold bg-red-500 py-[3px] px-[7px] rounded-full group-hover:bg-red-700">
            <small>9</small>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <small className="text-gray-400">Bem-vindo,</small>
          <strong className="font-semibold text-gray-700">Andre Melo</strong>
        </div>
        <div id="image-container" className="relative w-12 h-12">
          <Image
            alt="user photo"
            src="https://i.pravatar.cc/150?img=65"
            fill
            className="rounded-full"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
