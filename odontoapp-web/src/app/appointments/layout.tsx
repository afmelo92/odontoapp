import { AppointmentsContextProvider } from "./_contexts/AppointmentsContext";

type AppointmentsLayoutProps = {
  children: React.ReactNode;
};

const AppointmentsLayout: React.FC<AppointmentsLayoutProps> = ({
  children,
}) => {
  return <AppointmentsContextProvider>{children}</AppointmentsContextProvider>;
};

export default AppointmentsLayout;
