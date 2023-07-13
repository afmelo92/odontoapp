"use client";

import SearchInput from "./SearchInput";
import { usePatients } from "../_hooks/usePatients";

const Header: React.FC = () => {
  const { patients, setSearchValue, searchValue } = usePatients();

  return (
    <div id="header" className="flex items-center justify-between p-6">
      <h2 className="text-base font-medium text-gray-700">
        <span className="text-gray-900 font-bold">{`${patients.length}`}</span>{" "}
        patients total
      </h2>
      <SearchInput searchData={searchValue} setValue={setSearchValue} />
    </div>
  );
};

export default Header;
