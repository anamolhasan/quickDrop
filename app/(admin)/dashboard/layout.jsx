"use client";

import { DashboardSidebar } from "@/components/admin"; // Assuming this path is correct
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Bell, Phone, Search, Settings, Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import AdminOverviewSection from "./components/Overview";

const AdminLayout = ({ children }) => {
  const { data: session } = useSession();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false); // New state for mobile sidebar

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      setTime(`${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`);

      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      setDate(now.toLocaleDateString('en-US', options));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 
                         bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800
                         backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
        
        {/* Left Side: Hamburger (Mobile) + Logo */}
        <div className="flex items-center gap-4">
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 
                       hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200
                       hover:shadow-md active:scale-95"
            aria-label="Open sidebar menu"
          >
            <Menu size={20} className="text-gray-600 dark:text-gray-300" />
          </button>

          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 
                         flex items-center justify-center shadow-lg shadow-yellow-500/30
                         group-hover:shadow-xl group-hover:shadow-yellow-500/40 
                         transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-xl">Q</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 
                            dark:from-yellow-500 dark:to-orange-500 bg-clip-text text-transparent
                            group-hover:from-yellow-500 group-hover:to-orange-500 transition-all duration-300">
              QuickDrop
            </span>
          </Link>
        </div>


        {/* Right side (unchanged) */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Date & Time Display */}
          {/* <div className="hidden md:flex flex-col items-end mr-2">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {time}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {date}
            </span>
          </div> */}

          {/* Search Button (Desktop) */}
          <button 
            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl 
                     bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700
                     text-gray-600 dark:text-gray-300 transition-all duration-200
                     hover:shadow-md group"
            aria-label="Search"
          >
            <Search size={18} className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors" />
            <span className="text-sm">Search...</span>
            <kbd className="hidden xl:inline-flex items-center px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 
                           text-xs font-mono text-gray-600 dark:text-gray-400">
              ⌘K
            </kbd>
          </button>

          {/* Mobile Search */}
          <button 
            className="lg:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 
                     hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200
                     hover:shadow-md active:scale-95"
            aria-label="Search"
          >
            <Search size={20} className="text-gray-600 dark:text-gray-300" />
          </button>

          {/* Notification Bell */}
          <button 
            className="relative p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 
                     hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200
                     hover:shadow-md active:scale-95 group"
            aria-label="Notifications"
          >
            <Bell size={20} className="text-gray-600 dark:text-gray-300 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors" />
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 
                             text-white text-xs w-5 h-5 flex items-center justify-center 
                             rounded-full font-semibold shadow-lg animate-pulse">
              3
            </span>
          </button>

          {/* Call Icon with Tooltip */}
          <div className="relative group">
            <button 
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 
                        hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200
                        hover:shadow-md active:scale-95"
              aria-label="Call Moderator"
            >
              <Phone size={20} className="text-gray-600 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-500 transition-colors" />
            </button>
            {/* Tooltip */}
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 
                          bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg px-3 py-2 
                          opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                          transition-all duration-200 whitespace-nowrap shadow-xl z-50
                          before:content-[''] before:absolute before:bottom-full before:left-1/2 
                          before:-translate-x-1/2 before:border-4 before:border-transparent 
                          before:border-b-gray-900 dark:before:border-b-gray-800">
              Call Moderator
            </div>
          </div>

          {/* Settings (Desktop) */}
          <button 
            className="hidden md:block p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 
                     hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200
                     hover:shadow-md active:scale-95 group"
            aria-label="Settings"
          >
            <Settings size={20} className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Divider */}
          <div className="hidden md:block w-px h-8 bg-gray-300 dark:bg-gray-700"></div>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-2">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {session?.user?.name || "Guest User"}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {session?.user?.role || "User"}
              </span>
            </div>
            <div className="relative group cursor-pointer">
              <img
                src={
                  session?.user?.image ||
                  "https://i.ibb.co/2n8qPkw/default-avatar.png"
                }
                alt="User Avatar"
                className="w-11 h-11 rounded-full object-cover border-2 border-yellow-500 
                          shadow-md group-hover:shadow-xl group-hover:scale-105 
                          transition-all duration-300 group-hover:border-yellow-400"
              />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full 
                             border-2 border-white dark:border-gray-900 shadow-sm"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Layout with Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Container */}
        {/* The sidebar is rendered on desktop, and it has its own conditional mobile rendering logic */}
        <aside className="lg:block flex-shrink-0"> 
          <DashboardSidebar />
        </aside>

        {/* Main Content with adjusted left margin */}
        {/* The ml-72 is only applied on 'lg' screens to make space for the desktop sidebar */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950 lg:ml-72"> 
          <div className="p-4 md:p-6 lg:p-8 min-h-full">
            <div className="max-w-[1600px] mx-auto">
              {children}
            
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;