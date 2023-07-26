"use client";

import { getIcon } from "@/utils/getIcon";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideMenu: React.FC = () => {
  const pathname = usePathname();
  const session = useSession();
  const userData = session.data?.user || null;

  return (
    <aside
      id="side-menu"
      className="col-span-1 flex flex-col items-center py-6 gap-1"
    >
      {userData?.menu?.map((item) => (
        <Link
          key={item.uid}
          href={`/${item.href}`}
          className={`group p-4 rounded-lg ${
            pathname === item.href ? "bg-blue-100" : ""
          }`}
          title={item.title}
        >
          {getIcon({
            name: item.icon,
            className: `w-6 h-w-6 transition-colors ${
              pathname === item.href ? "stroke-blue-500" : "stroke-gray-500"
            } group-hover:stroke-blue-500`,
            strokeWidth: 2,
          })}
        </Link>
      ))}
    </aside>
  );
};

export default SideMenu;
