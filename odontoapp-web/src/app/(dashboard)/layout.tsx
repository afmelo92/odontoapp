"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Navbar from "../_components/Navbar";
import SideMenu from "../_components/SideMenu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type DashboardLayoutProps = {
  children: React.ReactNode;
  session: Session;
};

const DashboardGroupLayout: React.FC<DashboardLayoutProps> = ({
  children,
  session,
}) => {
  const queryClient = new QueryClient();

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <section className="grid grid-cols-[72px_1fr] grid-rows-[72px_1fr] h-screen relative overflow-hidden">
          <Navbar />
          <SideMenu />
          <div
            id="content"
            className="bg-indigo-50 p-6 flex flex-col gap-6 overflow-hidden"
          >
            {children}
          </div>
        </section>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default DashboardGroupLayout;
