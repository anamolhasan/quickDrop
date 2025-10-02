


"use client";

import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { DashboardSideMenuList } from "@/constant/dashboard";
import Link from "next/link";
import { useSession } from "next-auth/react";

const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const role = session?.user?.role || "user"; // fallback to "user"

  const renderMenuItems = () =>
    DashboardSideMenuList.filter((item) => item.roles.includes(role)).map(
      (item, index) => (
        <Link
          key={index}
          href={item.url}
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 rounded-lg px-4 py-2 font-medium text-lg 
                     transition-all duration-200 ease-in-out 
                     bg-yellow-500/20 hover:bg-white hover:text-yellow-600"
        >
          <span className="text-sm">{item.icon}</span>
          <span>{item.title}</span>
        </Link>
      )
    );

  return (
    <aside>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col fixed top-0 left-0 bg-gradient-to-b 
                from-yellow-500 to-yellow-600 text-white w-64 h-screen p-6 shadow-xl">
        <h1 className="text-2xl font-bold mb-8 tracking-wide">Dashboard</h1>
        <nav className="space-y-3">{renderMenuItems()}</nav>
        <Link href="/" className="mt-auto">
          <button className="w-full mt-6 bg-white text-yellow-600 font-semibold py-2 rounded-lg shadow hover:bg-gray-100">
            Back to Home
          </button>
        </Link>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-yellow-500 text-white shadow-md">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button onClick={() => setIsOpen(true)}>
          <FaBars size={28} />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Sidebar */}
          <div className="w-64 bg-gradient-to-b from-yellow-500 to-yellow-600 text-white p-6 space-y-4 shadow-lg flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Menu</h1>
              <button onClick={() => setIsOpen(false)}>
                <FaTimes size={24} />
              </button>
            </div>
            <nav className="space-y-3 flex-1">{renderMenuItems()}</nav>
            <Link href="/" className="mt-auto">
              <button className="w-full bg-white text-yellow-600 font-semibold py-2 rounded-lg shadow hover:bg-gray-100">
                Back to Home
              </button>
            </Link>
          </div>

          {/* Overlay Background */}
          <div
            className="flex-1 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
        </div>
      )}
    </aside>
  );
};

export default DashboardSidebar;
