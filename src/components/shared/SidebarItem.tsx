"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { CiBookmarkCheck } from "react-icons/ci";

interface Props {
  text: string;
  path: string;
}

export const SidebarItem: FC<Props> = ({ text, path }) => {
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
        className={`px-4 py-3 flex items-center space-x-4 rounded-md ${activeClassName}`}
      >
        <CiBookmarkCheck size={30} />
        <span className="group-hover:text-gray-700">{text}</span>
      </Link>
    </li>
  );
};
