import { getIcon } from "@/utils/getIcon";

const SecondaryStats: React.FC = () => {
  return (
    <div className="w-full row-span-3 rounded-lg grid grid-cols-4 gap-4">
      <div className="w-full h-full rounded-lg bg-green-500 shadow-md flex items-center justify-center gap-2 p-6">
        <div className="flex flex-col text-center items-center">
          <h2 className="font-bold text-2xl text-white">R$ 5.600,00</h2>
          <p className="text-white font-medium w-3/5">
            Preventive Care Revenue Potential
          </p>
        </div>
      </div>
      <div className="w-full h-full rounded-lg bg-teal-500 shadow-md flex items-center justify-center gap-2 p-6">
        <div className="flex flex-col text-center items-center">
          <h2 className="font-bold text-2xl text-white">R$ 5.600,00</h2>
          <p className="text-white font-medium w-3/5">
            Preventive Care Revenue Potential
          </p>
        </div>
      </div>
      <div className="w-full h-full rounded-lg bg-blue-500 shadow-md flex items-center justify-center gap-2 p-6">
        <div className="flex flex-col text-center items-center">
          <h2 className="font-bold text-2xl text-white">R$ 5.600,00</h2>
          <p className="text-white font-medium w-3/5">
            Preventive Care Revenue Potential
          </p>
        </div>
      </div>
      <div className="w-full h-full rounded-lg bg-violet-500 shadow-md flex items-center justify-center gap-2 p-6">
        <div className="flex flex-col text-center items-center">
          <h2 className="font-bold text-2xl text-white">R$ 5.600,00</h2>
          <p className="text-white font-medium w-3/5">
            Preventive Care Revenue Potential
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecondaryStats;
