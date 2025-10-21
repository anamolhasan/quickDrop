import React from "react";
// import Lottie from "lottie-react";
import Link from "next/link";
// import notFoundAnim from "@/assets/lottie/not-found.json"; // 👉 তোমার লটি ফাইলের path বসাও
// import logo from "@/assets/logo.png"; // 👉 তোমার Quick Drop লোগো path বসাও
// import Image from "next/image";

const NotFound = () => {
  return (
   <div className="min-h-screen flex flex-col items-center justify-center 
  bg-gradient-to-br from-yellow-500 via-yellow-700 to-yellow-900 
  text-gray-900 px-4">
      {/* Logo */}
      <Link href="/">
          <div className="text-3xl font-extrabold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent hover:from-yellow-800 hover:to-yellow-900 transition-all duration-300 cursor-pointer">
            QuickDrop
          </div>
        </Link>

      {/* Animation */}
      {/* <div className="w-72 mb-6">
        <Lottie animationData={notFoundAnim} loop={true} />
      </div> */}

      {/* Text */}
      <h1 className="text-6xl font-extrabold drop-shadow-lg py-5">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h2>
      <p className="text-lg text-center mb-6 max-w-md">
        The page you’re looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      {/* Back Home Button */}
      <Link
        href="/"
        className="bg-gray-900 text-yellow-400 px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-800 transition duration-300 shadow-md"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
