import Navbar from "../_components/Navbar";
import SideMenu from "../_components/SideMenu";

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
  );
}
