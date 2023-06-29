const TableHeader: React.FC = () => {
  return (
    <thead>
      <tr className="grid grid-cols-3 text-gray-500 border-b-2 border-b-gray-100 px-6 py-4 text-sm">
        <th className="text-start">Company</th>
        <th className="text-start">CNPJ</th>
        {/* <th className="text-start">Appointment</th> */}
        <th className="text-end">Actions</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
