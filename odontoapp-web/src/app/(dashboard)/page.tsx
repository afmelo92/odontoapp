import AdBanner from "@/app/_components/AdBanner";
import SecondaryStats from "@/app/_components/SecondaryStats";
import Statistics from "@/app/_components/Statistics";

export default function Dashboard() {
  return (
    <>
      <h1 className="font-bold text-2xl">Welcome, Andre Melo</h1>
      <div className="w-full h-full rounded-lg shadow-gray-500 grid grid-rows-[128px_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4">
        <AdBanner />
        <Statistics />
        <SecondaryStats />
      </div>
    </>
  );
}
