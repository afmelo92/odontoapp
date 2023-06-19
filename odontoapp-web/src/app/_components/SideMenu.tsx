import { CalendarDaysIcon } from "@/assets/icons/calendarDays";
import { Squares2x2Icon } from "@/assets/icons/squares2x2";
import { ToothIcon } from "@/assets/icons/tooth";
import { UsersIcon } from "@/assets/icons/users";
import { WrenchScrewdriverIcon } from "@/assets/icons/wrenchScrewdriver";

const SideMenu: React.FC = () => {
  return (
    <aside
      id="side-menu"
      className="col-span-1 flex flex-col items-center py-6 gap-1"
    >
      <button className="group bg-blue-100 p-4 rounded-lg" title="Appointments">
        <CalendarDaysIcon
          className="w-6 h-w-6 stroke-blue-500 group-hover:stroke-blue-500 transition-colors"
          strokeWidth={2}
        />
      </button>
      <button
        className="group p-4 rounded-lg hover:bg-blue-100 transition-colors"
        title="Patients"
      >
        <UsersIcon
          className="w-6 h-w-6 stroke-gray-500 transition-colors group-hover:stroke-blue-500"
          strokeWidth={2}
        />
      </button>
      <button
        className="group p-4 rounded-lg hover:bg-blue-100 transition-colors"
        title="Dashboard"
      >
        <Squares2x2Icon
          className="w-6 h-w-6 stroke-gray-500 transition-colors group-hover:stroke-blue-500"
          strokeWidth={2}
        />
      </button>
      <button
        className="group p-4 rounded-lg hover:bg-blue-100 transition-colors"
        title="Prosthetics"
      >
        <ToothIcon
          className="w-6 h-w-6 stroke-gray-500 transition-colors group-hover:stroke-blue-500"
          strokeWidth={2}
        />
      </button>
      <button
        className="group p-4 rounded-lg hover:bg-blue-100 transition-colors"
        title="Admin"
      >
        <WrenchScrewdriverIcon
          className="w-6 h-w-6 stroke-gray-500 transition-colors group-hover:stroke-blue-500"
          strokeWidth={2}
        />
      </button>
    </aside>
  );
};

export default SideMenu;
