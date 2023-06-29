import { CustomersContextProvider } from "./_contexts/CustomersContext";

export default function CustomersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CustomersContextProvider>{children}</CustomersContextProvider>;
}
