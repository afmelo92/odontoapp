import { AppointmentContextProvider } from "./_contexts/AppointmentContext";

type AppointmentsLayoutProps = {
  children: React.ReactNode;
};

const AppointmentsLayout: React.FC<AppointmentsLayoutProps> = ({
  children,
}) => {
  return <AppointmentContextProvider>{children}</AppointmentContextProvider>;
};

export default AppointmentsLayout;
