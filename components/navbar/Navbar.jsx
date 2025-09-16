import Link from "next/link";
import React from "react";

const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];
  return (
    <nav className="h-16 bg-gray-50 shadow-md">
      <div className="h-full max-w-7xl mx-auto flex item-center justify-between">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">
            Quick<span>Drop</span>
          </h1>
        </div>
        <div className="flex gap-x-8">
          {/* navlink */}
          <div className="flex items-center space-x-8 font-medium text-[16px]">
            {navItems.map((item, index) => (
              <Link href="" key={index} className="text-black transition">
                {item.name}
              </Link>
            ))}
          </div>
          {/* login logout btn */}
          <div className="flex items-center">
            <div className="flex gap-x-4 ">
              <button className="bg-amber-500  text-white font-medium rounded-md px-4 py-2">
                login
              </button>
              <button className="bg-amber-500  text-white font-medium rounded-md px-4 py-2">
                logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
