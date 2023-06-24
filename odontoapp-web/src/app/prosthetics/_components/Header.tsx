"use client";

import { useProstheticsServices } from "../_hooks/useProstheticsServices";
import SearchInput from "./SearchInput";

const Header: React.FC = () => {
  const { state, dispatch } = useProstheticsServices();

  return (
    <div id="header" className="flex items-center justify-between p-6">
      <h2 className="text-base font-medium text-gray-700">
        <span className="text-gray-900 font-bold">{`${state.services.length}`}</span>{" "}
        services total
      </h2>
      <SearchInput searchData={state.searchData} dispatch={dispatch} />
    </div>
  );
};

export default Header;
