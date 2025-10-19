"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes, FaGlobe } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLanguage = () => setIsLanguageOpen(!isLanguageOpen);

  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = () => {
    toggleMenu();
    signOut();
  };

  const handleProtectedClick = (path) => {
    if (status !== "authenticated") {
      router.push("/login");
    } else {
      router.push(path);
    }
    toggleMenu();
  };

  const handleLanguageChange = (path) => {
    setCurrentLanguage(language);
    setIsLanguageOpen(false);
    // Add your language change logic here
    console.log(`Language changed to: ${language}`);
  };

  const role = session?.user?.role || "guest";

  return (
    <nav className="sticky top-0 z-50 bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-700/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/">
          <div className="text-2xl font-extrabold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 cursor-pointer">
            QuickDrop
          </div>
        </Link>

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

          {/* Send Parcel - Protected */}
          <div
            onClick={() => handleProtectedClick("/Users/Sendpercel")}
            className="px-4 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer"
          >
            Send Parcel
          </div>

          {/* Be a Rider - Protected */}
          <div
            onClick={() => handleProtectedClick("/be-a-rider")}
            className="px-4 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer"
          >
            Be a Rider
          </div>

          <Link href="/coverage">
            <div className="px-4 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer">
              Coverage
            </div>
          </Link>
       
          {/* Language Toggler */}
          <div className="relative ml-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200"
            >
              <FaGlobe className="text-gray-600 dark:text-gray-300" />
              <span className="text-sm font-medium">{currentLanguage}</span>
            </button>

            {/* Language Dropdown */}
            {isLanguageOpen && (
              <div className="absolute top-full left-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                <button
                  onClick={() => handleLanguageChange("English")}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    currentLanguage === "English" 
                      ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400" 
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageChange("Bangla")}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    currentLanguage === "Bangla" 
                      ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400" 
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  বাংলা
                </button>
              </div>
            )}
          </div>

          {status === "authenticated" ? (
            <div className="flex items-center gap-4 ml-4">
              <Link href="/dashboard">
                <div className="px-4 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer">
                  Dashboard
                </div>
              </Link>

              {/* Show Role */}
              <span className="px-3 py-1 rounded-lg bg-yellow-500 text-white text-sm font-semibold">
                {role.toUpperCase()}
              </span>

              {/* Profile Image / Fallback */}
              {session.user?.image ? (
                <img
                  src={session.user.photo}
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

            {/* Send Parcel - Protected Mobile */}
            <div
              onClick={() => handleProtectedClick("/Users/Sendpercel")}
              className="px-4 py-3 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer text-center"
            >
              Send Parcel
            </div>

            {/* Be a Rider - Protected Mobile */}
            <div
              onClick={() => handleProtectedClick("/be-a-rider")}
              className="px-4 py-3 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer text-center"
            >
              Be a Rider
            </div>

            <Link href="/coverage" onClick={toggleMenu}>
              <div className="px-4 py-3 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200 cursor-pointer text-center">
                Coverage
              </div>
            </Link>

            {/* Mobile Language Toggler */}
            <div className="relative mt-2">
              <button
                onClick={toggleLanguage}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200"
              >
                <FaGlobe className="text-gray-600 dark:text-gray-300" />
                <span className="font-medium">{currentLanguage}</span>
              </button>

              {/* Mobile Language Dropdown */}
              {isLanguageOpen && (
                <div className="mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                  <button
                    onClick={() => handleLanguageChange("English")}
                    className={`w-full px-4 py-3 text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                      currentLanguage === "English" 
                        ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400" 
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageChange("Bangla")}
                    className={`w-full px-4 py-3 text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                      currentLanguage === "Bangla" 
                        ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400" 
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    বাংলা
                  </button>
                </div>
              )}
            </div>

            {status === "authenticated" ? (
              <div className="flex flex-col items-center gap-4 mt-4">
                {/* Role on mobile */}
                <span className="px-3 py-1 rounded-lg bg-yellow-500 text-white text-sm font-semibold">
                  {role.toUpperCase()}
                </span>

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

      {/* Overlay for language dropdown */}
      {isLanguageOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsLanguageOpen(false)}
        />
      )}
    </nav>
  );
}