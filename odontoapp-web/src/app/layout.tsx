import Navbar from "./_components/Navbar";
import SideMenu from "./_components/SideMenu";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata = {
  title: "OdontoApp",
  description: "Full management system for dentists",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className="grid grid-cols-[72px_1fr] grid-rows-[72px_1fr] h-screen overflow-hidden">
          <Navbar />
          <SideMenu />
          <section
            id="content"
            className="bg-indigo-50 p-6 flex flex-col gap-6"
          >
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
