"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Navbar from "../_components/Navbar";
import SideMenu from "../_components/SideMenu";

type DashboardLayoutProps = {
  children: React.ReactNode;
  session: Session;
};

const DashboardGroupLayout: React.FC<DashboardLayoutProps> = ({
  children,
  session,
}) => {
  return (
    <SessionProvider session={session}>
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
    </SessionProvider>
  );
};

export default DashboardGroupLayout;
