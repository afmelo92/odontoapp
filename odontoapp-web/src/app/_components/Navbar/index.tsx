import { getIcon } from "@/utils/getIcon";
import Profile from "./Profile";

const Navbar: React.FC = () => {
  return (
    <nav
      id="top-bar"
      className="col-span-2 flex items-center justify-between px-6"
    >
      <div id="logo" className="">
        {getIcon({
          name: "tooth",
          className:
            "w-6 h-w-6 stroke-blue-500 group-hover:stroke-blue-500 transition-colors",
          strokeWidth: 2,
        })}
      </div>
      <Profile />
    </nav>
  );
};

export default Navbar;
