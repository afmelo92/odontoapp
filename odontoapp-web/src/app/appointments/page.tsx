import Table from "./_components/Table";
import Header from "./_components/Header";

const AppointmentsPage: React.FC = () => {
  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h1 className="font-bold text-2xl text-gray-900">Appointments</h1>
      </div>
      <div className="bg-white w-full h-full rounded-lg shadow-sm shadow-gray-500 flex flex-col gap-4">
        <Header />
        <Table />
      </div>
    </>
  );
};

export default AppointmentsPage;
