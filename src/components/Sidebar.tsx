import Image from "next/image";
import Link from "next/link";
import { CiLogout } from "react-icons/ci";
import {
  IoBaseballOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
} from "react-icons/io5";
import { SidebarItem } from "./SidebarItem";

const sidebarItems = [
  {
    text: "Dashboard",
    path: "/dashboard",
    icon: <IoCalendarOutline />,
  },
  {
    text: "Rest TODOS",
    path: "/dashboard/rest-todos",
    icon: <IoCheckboxOutline />,
  },
  {
    text: "Server Actions",
    path: "/dashboard/server-todos",
    icon: <IoListOutline />,
  },
  {
    text: "Cookies",
    path: "/dashboard/cookies",
    icon: <IoCodeWorkingOutline />,
  },
  {
    text: "Productos",
    path: "/dashboard/products",
    icon: <IoBaseballOutline />,
  },
];

export const Sidebar = () => {
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link className="flex items-center" href="/dashboard" title="home">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7RDEtPGvqNOxsei62fAUnKqBZkR5tyrOilA&s"
              width={150}
              height={150}
              alt="Logo"
              className="w-auto"
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c"
            width={120}
            height={120}
            alt="User avatar"
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            priority
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            Max Diaz
          </h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {sidebarItems.map(({ path, text, icon }) => (
            <SidebarItem key={path} text={text} path={path} icon={icon} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <CiLogout />
          <span className="group-hover:text-gray-700">Logout</span>
        </button>
      </div>
    </aside>
  );
};
