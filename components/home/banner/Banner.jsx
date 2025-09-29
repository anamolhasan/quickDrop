"use client";

import Image from "next/image";
import Link from "next/link";
import { FaBox, FaSearch } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative w-full h-[90vh] flex items-center">
      {/* Background Image for Desktop */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/banner.png" // replace with your desktop image
          alt="QuickDrop Banner Desktop"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Background Image for Mobile */}
      <div className="absolute inset-0 block md:hidden">
        <Image
          src="/mobilebanner.png" 
          alt="QuickDrop Banner Mobile"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
          Delivering <span className="text-yellow-400">Speed</span>,{" "}
          <br></br>
          <span className="text-yellow-400">Security</span> &{" "}
          <span className="text-yellow-400">Trust</span>
        </h1>
        <p className="mt-6 text-lg text-gray-200 max-w-lg">
          QuickDrop Courier helps you send parcels across Bangladesh with
          real-time tracking, reliable riders, and the fastest delivery
          experience.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex sm:flex-row gap-4 justify-center md:justify-start">
          <Link href="Users/Sendpercel">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 transition shadow-md text-black font-semibold">
            <FaBox /> Send Parcel
          </button>
          </Link>
          
          <Link href="/track-product">
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-900 hover:bg-gray-200 transition shadow-md font-semibold">
              <FaSearch /> Track Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
