export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="border-2 border-red-500 grid grid-cols-[72px_1fr] grid-rows-[72px_1fr] h-screen ">
      <nav id="top-bar" className="border-2 border-blue-500 col-span-2"></nav>
      <aside
        id="side-menu"
        className="border-2 border-green-500 col-span-1"
      ></aside>
      <section
        id="content"
        className="border-2 border-orange-500 bg-indigo-50 p-6"
      >
        {children}
      </section>
    </main>
  );
}
