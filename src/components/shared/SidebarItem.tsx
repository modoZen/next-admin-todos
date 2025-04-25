"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface Props {
  text: string;
  path: string;
  icon: React.ReactNode;
}

export const SidebarItem: FC<Props> = ({ text, path, icon }) => {
  const currentPath = usePathname();

  const isActive = currentPath === path;

  const activeClassName = isActive
    ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
    : "text-gray-600 group";

  return (
    <li>
      {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
      <Link
        href={path}
        className={`px-4 py-3 flex items-center space-x-4 rounded-md hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white ${activeClassName}`}
      >
        {icon}
        <span className="group-hover:text-white">{text}</span>
      </Link>
    </li>
  );
};
