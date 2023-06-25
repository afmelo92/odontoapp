import { PatientsContextProvider } from "./_contexts/PatientsContext";

type PatientsLayoutProps = {
  children: React.ReactNode;
};

const PatientsLayout: React.FC<PatientsLayoutProps> = ({ children }) => {
  return <PatientsContextProvider>{children}</PatientsContextProvider>;
};

export default PatientsLayout;
