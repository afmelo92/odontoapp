import { getIcon } from "@/utils/getIcon";
import Header from "./_components/Header";
import Table from "./_components/Table";

const ProstheticsPage: React.FC = () => {
  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h1 className="font-bold text-2xl text-gray-900">Prosthetics</h1>
        <button className="group flex gap-2 items-center text-sm font-semibold text-blue-500 transition-all">
          {getIcon({
            name: "plus-circle",
            className: `w-6 h-w-6 transition-colors stroke-blue-500 group-hover:stroke-blue-700`,
            strokeWidth: 2,
          })}
          <p className="group-hover:text-blue-700">New prosthetic order</p>
        </button>
      </div>
      <div className="bg-white w-full h-full rounded-lg shadow-sm shadow-gray-500 flex flex-col gap-4">
        <Header />
        <Table />
      </div>
    </>
  );
};

export default ProstheticsPage;
