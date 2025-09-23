import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { DashboardSideMenuList } from "@/constant/dashboard";
import Link from "next/link";
const DashboardSidebar = () => {
  return (
    <div>
      <div className="lg:flex hidden">
        <div className="space-y-2 flex flex-col py-8 px-4  w-full">
          {DashboardSideMenuList.map((item, index) => (
            <Link className="text-lg font-semibold bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-md w-[100%] text-left py-2 px-3" key={index} href={item.url}>
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      {/* mobile and tablet */}
      <div className="lg:hidden flex items-center h-16  px-4 md:px-8 lg:px-8 xl:px-0">
        <FaBars className="" size={30} />
      </div>
    </div>
  );
};

export default DashboardSidebar;
