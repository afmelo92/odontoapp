import React from "react";

type AppointmentsLayoutProps = {
  children: React.ReactNode;
};

const AppointmentsLayout: React.FC<AppointmentsLayoutProps> = ({
  children,
}) => {
  return <>{children}</>;
};

export default AppointmentsLayout;
