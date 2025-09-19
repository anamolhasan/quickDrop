import Link from "next/link";
import React from "react";
import { CiMenuFries } from "react-icons/ci";
const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
    { name: "Be a Rider", path: "/be-a-rider" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];
  return (
    <nav className="h-16 bg-red-50 shadow-md sticky top-0 z-40">
      <div className="h-full max-w-7xl mx-auto flex item-center justify-between px-4 md:px-6 lg-px-8 xl:px-0">
        <div className="flex items-center">
          {/* menu */}
          <div className=" flex items-center lg:hidden mr-3">
            <CiMenuFries size={28} />
          </div>
          <h1 className="md:text-3xl text-2xl font-bold">
            Quick<span>Drop</span>
          </h1>
        </div>
        <div className="flex gap-x-8">
          {/* navlink */}
          <div className="lg:flex items-center space-x-8 font-medium text-[16px] hidden ">
            {navItems.map((item, index) => (
              <Link
                href={item.path}
                key={index}
                className="text-black transition"
              >
                {item.name}
              </Link>
            ))}
          </div>
          {/* login logout btn */}
          <div className="flex items-center">
            <div className="flex gap-x-4 text-[14px] md:text-xl">
              <Link href="/login">
                <button className="bg-amber-500  text-white font-medium rounded-md px-4 py-2">
                  login
                </button>
              </Link>
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
