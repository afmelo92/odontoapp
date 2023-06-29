"use client";
import { useCustomers } from "../_hooks/useCustomers";
import SearchInput from "./SearchInput";

const Header: React.FC = () => {
  const { state, dispatch } = useCustomers();

  return (
    <div id="header" className="flex items-center justify-between p-6">
      <h2 className="text-base font-medium text-gray-700">
        <span className="text-gray-900 font-bold">{`${state.customers.length}`}</span>{" "}
        customers total
      </h2>
      <SearchInput searchData={state.searchData} dispatch={dispatch} />
    </div>
  );
};

export default Header;
