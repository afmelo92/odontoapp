"use client";

import { getIcon } from "@/utils/getIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mock = [
  {
    id: 1,
    title: "Appointments",
    href: "/appointments",
    icon: "calendar-days",
  },
  {
    id: 2,
    title: "Patients",
    href: "/patients",
    icon: "users",
  },
  {
    id: 3,
    title: "Dashboard",
    href: "/",
    icon: "squares2x2",
  },
  {
    id: 4,
    title: "Prosthetics",
    href: "/prosthetics",
    icon: "tooth",
  },
  {
    id: 5,
    title: "Admin",
    href: "/admin",
    icon: "wrench-screwdriver",
  },
  {
    id: 6,
    title: "Shop",
    href: "/shop",
    icon: "shopping-cart",
  },
];

const SideMenu: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside
      id="side-menu"
      className="col-span-1 flex flex-col items-center py-6 gap-1"
    >
      {mock.map((item) => (
        <Link
          key={item.id}
          href={item.href}
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
