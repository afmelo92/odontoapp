const TableHeader: React.FC = () => {
  return (
    <thead>
      <tr className="grid grid-cols-4 text-gray-500 border-b-2 border-b-gray-100 px-6 py-4 text-sm">
        <th className="text-start">Patient</th>
        <th className="text-start">Provider</th>
        <th className="text-start">Appointment</th>
        <th className="text-end">Actions</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
