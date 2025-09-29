"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const { data: session, status } = useSession();

  const handleLogout = () => {
    toggleMenu();
    signOut();
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-700/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="text-2xl font-extrabold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 cursor-pointer">
          QuickDrop
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1 text-gray-700 dark:text-gray-200 font-medium">
          <Link href="/">
            <div className="px-4 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer">
              Home
            </div>
          </Link>
          <Link href="/pricing">
            <div className="px-4 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer">
              Pricing
            </div>
          </Link>
          <Link href="/be-a-rider">
            <div className="px-4 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer">
              Be a Rider
            </div>
          </Link>
          <Link href="/contact">
            <div className="px-4 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer">
              Contact
            </div>
          </Link>
          <Link href="/about">
            <div className="px-4 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer">
              About
            </div>
          </Link>

          {status === "authenticated" ? (
            <div className="flex items-center gap-4 ml-4">
              <Link href="/dashboard">
                <div className="px-4 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer">
                  Dashboard
                </div>
              </Link>

              {/* Profile Image / Fallback */}
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User Avatar"}
                  className="w-10 h-10 rounded-full border-2 border-yellow-500"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-800 dark:text-white font-bold border-2 border-yellow-500">
                  {session.user?.name?.charAt(0).toUpperCase()}
                </div>
              )}

              <button
                onClick={() => signOut()}
                className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md transition-transform transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login">
              <div className="ml-2 px-6 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 cursor-pointer">
                Login
              </div>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 text-gray-900 dark:text-white text-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
        >
          <div className="transition-transform duration-300">
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-120 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/20 dark:border-gray-700/20">
          <div className="flex flex-col gap-2 py-6 px-6 text-gray-700 dark:text-gray-200 font-medium">
            <Link href="/" onClick={toggleMenu}>
              <div className="px-4 py-3 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer text-center">
                Home
              </div>
            </Link>
            <Link href="/pricing" onClick={toggleMenu}>
              <div className="px-4 py-3 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer text-center">
                Pricing
              </div>
            </Link>
            <Link href="/be-a-rider" onClick={toggleMenu}>
              <div className="px-4 py-3 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer text-center">
                Be a Rider
              </div>
            </Link>
            <Link href="/contact" onClick={toggleMenu}>
              <div className="px-4 py-3 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer text-center">
                Contact
              </div>
            </Link>
            <Link href="/about" onClick={toggleMenu}>
              <div className="px-4 py-3 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer text-center">
                About
              </div>
            </Link>

            {status === "authenticated" ? (
              <div className="flex flex-col items-center gap-4 mt-4">
                <div className="flex items-center gap-3">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User Avatar"}
                      className="w-12 h-12 rounded-full border-2 border-yellow-500"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold border-2 border-yellow-500">
                      {session.user?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="font-semibold text-lg dark:text-white">
                    {session.user?.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full mt-4 px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" onClick={toggleMenu}>
                <div className="mt-2 mx-4 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold shadow-lg text-center">
                  Login
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
