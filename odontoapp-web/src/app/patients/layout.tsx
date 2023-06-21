import { PatientsContextProvider } from "./_contexts/PatientContext";

type PatientsLayoutProps = {
  children: React.ReactNode;
};

const PatientsLayout: React.FC<PatientsLayoutProps> = ({ children }) => {
  return <PatientsContextProvider>{children}</PatientsContextProvider>;
};

export default PatientsLayout;
