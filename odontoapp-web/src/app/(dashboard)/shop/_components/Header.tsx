"use client";

import { getIcon } from "@/utils/getIcon";

// import SearchInput from "./SearchInput";

const Header: React.FC = () => {
  // const { state, dispatch } = usePatients();

  return (
    <div id="header" className="flex items-center justify-between">
      <h2 className="text-base font-medium text-gray-700">
        More than <span className="text-gray-900 font-bold">500</span> products
        available
      </h2>
      {/* <SearchInput searchData={state.searchData} dispatch={dispatch} /> */}
      <div className="py-3 px-6 bg-gray-100 rounded-full flex items-center gap-4 text-sm">
        <input
          // value={searchData}
          type="text"
          placeholder="Search..."
          className="bg-gray-100 focus:outline-none placeholder:text-gray-400 caret-gray-400"
          // onChange={(e) =>
          //   dispatch({
          //     type: "FILTER_DATA",
          //     payload: {
          //       data: e.target.value,
          //     },
          //   })
          // }
        />
        {getIcon({
          name: "magnifier",
          className: "w-5 h-5 stroke-gray-400",
          strokeWidth: 2,
        })}
      </div>
    </div>
  );
};

export default Header;
