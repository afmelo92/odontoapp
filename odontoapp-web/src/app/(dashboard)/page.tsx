"use client";
import AdBanner from "@/app/_components/AdBanner";
import SecondaryStats from "@/app/_components/SecondaryStats";
import Statistics from "@/app/_components/Statistics";
import { useSession } from "next-auth/react";
import Spinner from "../_components/Spinner";

export default function Dashboard() {
  const session = useSession({ required: true });

  return (
    <>
      {session.status === "loading" ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner
            size="w-24 h-24"
            fill="fill-blue-700"
            trail="text-blue-200"
          />
        </div>
      ) : (
        <>
          <h1 className="font-bold text-2xl">
            Welcome, {session.data?.user?.name || "User"}
          </h1>
          <div className="w-full h-full rounded-lg shadow-gray-500 grid grid-rows-[128px_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4">
            <AdBanner />
            <Statistics />
            <SecondaryStats />
          </div>
        </>
      )}
    </>
  );
}
