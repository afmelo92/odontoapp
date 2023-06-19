import Input from "./Input";
import { ActionProps } from "../page";

export type HeaderProps = {
  searchData: string;
  dispatch: React.Dispatch<ActionProps>;
};

const Header: React.FC<HeaderProps> = ({ searchData, dispatch }) => {
  return (
    <div id="header" className="flex items-center justify-between p-6">
      <h2 className="text-base font-bold text-gray-700">
        6 appointments <span className="font-normal">for</span>{" "}
        <span className="text-blue-500"> 14 jun 2023</span>
      </h2>
      <Input searchData={searchData} dispatch={dispatch} />
    </div>
  );
};

export default Header;
