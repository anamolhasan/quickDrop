// import { DashboardSidebar } from "@/components/admin";
// import Link from "next/link";
// import React, { Children } from "react";

// const AdminLayout = ({ children }) => {
//   return (
//    <div>
//     <div>
//       <Link href={'/'}>Quick Drop</Link>
//     </div>
//      <div className="lg:flex-row flex flex-col h-screen">   
//       <div className="lg:w-[18%] h-16 lg:h-full bg-amber-50 ">
//         <DashboardSidebar />
//       </div>
//       <div className="lg:w-[82%] h-full bg-gray-50 overflow-y-auto p-6 text-black">{children}</div>
//     </div>
//    </div>
//   );
// };

// export default AdminLayout;


"use client";

import { DashboardSidebar } from "@/components/admin";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Bell, Phone } from "lucide-react";
import { useSession } from "next-auth/react";

const AdminLayout = ({ children }) => {
  const { data: session } = useSession();
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert to 12-hour format
      setTime(`${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3 shadow-md bg-white border-b">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-yellow-600">
          Quick Drop
        </Link>

        {/* Right side (Clock + Notification + Call + User Img) */}
        <div className="flex items-center gap-6">
          {/* Current Time */}
          <span className="text-gray-700 font-medium">{time}</span>

          {/* Notification Bell */}
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
            <Bell size={22} className="text-gray-600" />
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </button>

          {/* Call Icon with Tooltip */}
          <div className="relative group">
            <button className="p-2 rounded-full hover:bg-gray-100 transition">
              <Phone size={22} className="text-gray-600" />
            </button>
            {/* Tooltip */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-md">
              Call Moderator
            </div>
          </div>

          {/* User Image */}
          <img
            src={
              session?.user?.image ||
              "https://i.ibb.co/2n8qPkw/default-avatar.png"
            }
            alt="User"
            className="w-12 h-12 rounded-full object-cover border-2 border-yellow-500 shadow-md"
          />
        </div>
      </div>

      {/* Layout with Sidebar + Content */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="lg:w-[18%] bg-amber-50 border-r">
          <DashboardSidebar />
        </div>

        {/* Main Content */}
        <div className="lg:w-[82%] bg-gray-50 overflow-y-auto p-6 text-black">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
