"use client";

import Input from "./Input";
import { useAppointments } from "../_hooks/useAppointments";

const Header: React.FC = () => {
  const { state, dispatch } = useAppointments();

  return (
    <div id="header" className="flex items-center justify-between p-6">
      <h2 className="text-base font-bold text-gray-700">
        {`${state.appointments.length} appointments`}{" "}
        <span className="font-normal">for</span>{" "}
        <span className="text-blue-500">
          {new Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }).format(new Date())}
        </span>
      </h2>
      <Input searchData={state.searchData} dispatch={dispatch} />
    </div>
  );
};

export default Header;
