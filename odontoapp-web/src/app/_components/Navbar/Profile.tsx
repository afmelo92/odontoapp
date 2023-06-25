import { getIcon } from "@/utils/getIcon";
import Image from "next/image";
import Link from "next/link";

const Profile: React.FC = () => {
  return (
    <div id="profile" className="flex gap-4 items-center">
      <div
        id="notification-container"
        className="mr-4 relative group hover:cursor-pointer hover:bg-blue-100 p-2 rounded-lg transition-colors"
        title="9 notifications"
      >
        {getIcon({
          name: "bell",
          className:
            "w-6 h-w-6 stroke-gray-400 transition-colors group-hover:stroke-blue-500",
          strokeWidth: 2,
        })}
        <div className="absolute -top-0 -right-0 flex items-center justify-center text-[10px] text-white font-semibold bg-red-500 py-[3px] px-[7px] rounded-full group-hover:bg-red-700">
          <small>9</small>
        </div>
      </div>
      <div id="profile-button" className="flex gap-2 items-center group">
        <div className="flex flex-col justify-center">
          <small className="text-gray-400">Bem-vindo,</small>
          <strong className="font-semibold text-gray-700">Andre Melo</strong>
        </div>
        <Link
          href="/profile"
          id="image-container"
          className="relative w-12 h-12 cursor-pointer group-hover:scale-[1.1] transition-all"
          title="Click to view your profile settings"
        >
          <Image
            alt="user photo"
            src="https://i.pravatar.cc/150?img=65"
            fill
            className="rounded-full"
          />
        </Link>
      </div>
    </div>
  );
};

export default Profile;
