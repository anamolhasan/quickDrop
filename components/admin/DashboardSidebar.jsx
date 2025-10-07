"use client";

import React, { useState } from "react";
import { FaBars, FaTimes, FaHome, FaChevronRight } from "react-icons/fa";
import { DashboardSideMenuList } from "@/constant/dashboard";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const role = session?.user?.role || "user";



  // useEffect(() => {
  //     const updateClock = () => {
  //       const now = new Date();
  //       let hours = now.getHours();
  //       const minutes = now.getMinutes();
  //       const ampm = hours >= 12 ? "PM" : "AM";
  //       hours = hours % 12 || 12;
  //       setTime(`${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`);
  
  //       const options = { weekday: 'short', month: 'short', day: 'numeric' };
  //       setDate(now.toLocaleDateString('en-US', options));
  //     };
  
  //     updateClock();
  //     const interval = setInterval(updateClock, 1000);
  //     return () => clearInterval(interval);
  //   }, []);



  const renderMenuItems = () =>
    DashboardSideMenuList.filter((item) => item.roles.includes(role)).map(
      (item, index) => {
        const isActive = pathname === item.url;

        return (
          <Link
            key={index}
            href={item.url}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-sm 
              transition-all duration-300 ease-in-out group relative overflow-hidden
              ${
                isActive
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/30"
                  : "text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-700/70 hover:text-yellow-600 dark:hover:text-yellow-400 hover:shadow-md"
              }`}
          >
            <span
              className={`absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 
                transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left
                ${isActive ? "scale-x-0" : ""}`}
            />
            <span
              className={`relative text-lg transition-transform duration-300 ${
                isActive ? "scale-110" : "group-hover:scale-110"
              }`}
            >
              {item.icon}
            </span>
            {!isCollapsed && (
              <>
                <span className="relative">{item.title}</span>
                <FaChevronRight
                  className={`relative ml-auto text-xs transition-all duration-300 ${
                    isActive
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                  }`}
                />
              </>
            )}
          </Link>
        );
      }
    );

  return (
    <>
      {/* Hamburger for Mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-6 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 
            transition-all duration-200 hover:shadow-md active:scale-95"
            aria-label="Open menu"
          >
            <FaBars className="text-gray-600 dark:text-gray-300 text-xl" />
          </button>

          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {role}
            </p>
          </div>
        </div>

        {session?.user?.image ? (
          <img
            src={session.user.image}
            alt={session.user.name || "User Avatar"}
            className="w-10 h-10 rounded-full border-2 border-yellow-500 shadow-md object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 
            flex items-center justify-center text-white font-bold shadow-md">
            {session?.user?.name?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:flex flex-col fixed top-0 left-0 
          bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          text-gray-800 dark:text-white h-screen p-6 shadow-xl dark:shadow-2xl 
          transition-all duration-300 z-40 ${isCollapsed ? "w-20" : "w-72"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Control Panel
              </p>
            </div>
          )}
          {/* <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 
              transition-all duration-200 hover:shadow-md active:scale-95"
          >
            <FaBars className="text-gray-600 dark:text-gray-300 text-lg" />
          </button> */}
        </div>

        {/* User Info */}
        {/* {!isCollapsed && session?.user && (
          <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-to-br from-gray-50 to-gray-100 
            dark:from-gray-800 dark:to-gray-800/50 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50">
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name}
                className="w-12 h-12 rounded-full border-2 border-yellow-500 shadow-md object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 
                flex items-center justify-center text-white font-bold text-lg shadow-md">
                {session.user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {session.user.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{role}</p>
            </div>
          </div>
        )} */}


        

        


        {/* Menu */}
        <nav className="space-y-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
          {renderMenuItems()}
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800">
          <Link href="/">
            <button className="w-full flex items-center gap-3 justify-center py-3.5 px-4 border-amber-500 text-white font-semibold 
              rounded-xl shadow-lg ">
              <FaHome className="text-lg text-red-500" />
              {!isCollapsed && <span> Back to Home </span>}
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex h-full">
          {/* Sidebar */}
          <div
            className={`w-80 max-w-[85vw] bg-white dark:bg-gray-900 p-6 space-y-4 shadow-2xl 
              flex flex-col transform transition-transform duration-300 ${
                mobileOpen ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 
                  transition-all duration-200 hover:shadow-md active:scale-95"
              >
                <FaTimes className="text-gray-600 dark:text-gray-300 text-xl" />
              </button>
            </div>

            {/* Menu */}
            <nav className="space-y-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
              {renderMenuItems()}
            </nav>

            {/* Footer */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <Link href="/" onClick={() => setMobileOpen(false)}>
                <button className="w-full flex items-center justify-center gap-3 py-3.5 px-4 
                  bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold 
                  rounded-xl shadow-lg hover:shadow-yellow-500/30 transition-all duration-300">
                  <FaHome className="text-lg" />
                  <span>Back to Home</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Background Overlay */}
          <div
            className={`flex-1 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
              mobileOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setMobileOpen(false)}
          />
        </div>
      </div>
    </>
  );
}
