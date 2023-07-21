import { PatientsContextProvider } from "../patients/_contexts/PatientsContext";
import { ProstheticsContextProvider } from "./_contexts/ProstheticsContext";

type ProstheticsLayoutProps = {
  children: React.ReactNode;
};

const ProstheticsLayout: React.FC<ProstheticsLayoutProps> = ({ children }) => {
  return (
    <PatientsContextProvider>
      <ProstheticsContextProvider>{children}</ProstheticsContextProvider>
    </PatientsContextProvider>
  );
};

export default ProstheticsLayout;
