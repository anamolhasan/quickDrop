// // components/Banner.jsx
// import Link from "next/link";
// import { FaBox, FaSearch } from "react-icons/fa";

// export default function Banner() {
//   return (
//     <section className="relative bg-gray-50 dark:bg-gray-900">
//       <div className="max-w-7xl max-h-screen mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//         {/* Left Content */}
//         <div className="text-center md:text-left">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
//             Delivering <span className="text-yellow-500">Speed</span>,
//             <br /> Security & <span className="text-yellow-500">Trust</span>
//           </h1>
//           <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-lg">
//             QuickDrop Courier helps you send parcels across Bangladesh with
//             real-time tracking, reliable riders, and the fastest delivery
//             experience.
//           </p>

//           {/* CTA Buttons */}
//           <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//             <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 transition shadow-md text-white font-semibold">
//               <FaBox />
//               Send Parcel
//             </button>
//             <Link href="/track-product">
//               <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 transition shadow-md text-white font-semibold dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
//                 <FaSearch />
//                 Track Now
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* Right Image */}
//         <div className="flex justify-center md:justify-end">
//           <img
//             src="/bannerimg.png"
//             className="w-full max-w-md md:max-w-lg drop-shadow-lg"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }


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
          src="/mobilebanner.png" // replace with your mobile image
          alt="QuickDrop Banner Mobile"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/60 dark:bg-black/60"></div>

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
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 transition shadow-md text-black font-semibold">
            <FaBox /> Send Parcel
          </button>
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
