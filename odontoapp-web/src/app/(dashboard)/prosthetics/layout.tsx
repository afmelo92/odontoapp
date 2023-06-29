import { ProstheticsContextProvider } from "./_contexts/ProstheticsContext";

type ProstheticsLayoutProps = {
  children: React.ReactNode;
};

const ProstheticsLayout: React.FC<ProstheticsLayoutProps> = ({ children }) => {
  return <ProstheticsContextProvider>{children}</ProstheticsContextProvider>;
};

export default ProstheticsLayout;
