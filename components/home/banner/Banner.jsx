// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { FaBox, FaSearch } from "react-icons/fa";

// const Hero = () => {
  

//   return (
//     <section className="relative w-full h-[90vh] flex items-center">
//       {/* Background Image for Desktop */}
//       <div className="absolute inset-0 hidden md:block">
//         <Image
//           src="/banner.png" // replace with your desktop image
//           alt="QuickDrop Banner Desktop"
//           fill
//           priority
//           className="object-cover object-center"
//         />
//       </div>

//       {/* Background Image for Mobile */}
//       <div className="absolute inset-0 block md:hidden">
//         <Image
//           src="/mobilebanner.png" 
//           alt="QuickDrop Banner Mobile"
//           fill
//           priority
//           className="object-cover object-center"
//         />
//       </div>

//       {/* Overlay for readability */}
//       <div className="absolute inset-0 bg-black/20 dark:bg-black/60"></div>

//       {/* Content */}
//       <div className="relative z-10 container mx-auto px-6 lg:px-10 text-center md:text-left">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
//           Delivering <span className="text-yellow-400">Speed</span>,{" "}
//           <br></br>
//           <span className="text-yellow-400">Security</span> &{" "}
//           <span className="text-yellow-400">Trust</span>
//         </h1>
//         <p className="mt-6 text-lg text-gray-200 max-w-lg">
//           QuickDrop Courier helps you send parcels across Bangladesh with
//           real-time tracking, reliable riders, and the fastest delivery
//           experience.
//         </p>

//         {/* CTA Buttons */}
//         <div className="mt-8 flex sm:flex-row gap-4 justify-center md:justify-start">
//           <Link href="Users/Sendpercel">
//           <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 transition shadow-md text-black font-semibold">
//             <FaBox /> Send Parcel
//           </button>
//           </Link>
          
//           <Link href="/track-product">
//             <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-900 hover:bg-gray-200 transition shadow-md font-semibold">
//               <FaSearch /> Track Now
//             </button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

"use client";

import Image from "next/image";
import Link from "next/link";
import { FaBox, FaSearch, FaTag, FaTimes } from "react-icons/fa";
import { useState } from "react";

const Hero = ({ activeOffer }) => {
  const [showOffer, setShowOffer] = useState(true);

  return (
    <section className="relative w-full h-[90vh] flex items-center">
      {/* Background Image for Desktop */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/banner.png"
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

      {/* Active Offer Banner */}
      {activeOffer && showOffer && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-4xl px-4">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 shadow-2xl border-2 border-white/30 relative">
            {/* Close Button */}
            <button 
              onClick={() => setShowOffer(false)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition shadow-lg"
            >
              <FaTimes className="text-xs" />
            </button>

            <div className="flex items-center justify-between flex-col md:flex-row gap-3">
              <div className="flex items-center gap-3">
                <FaTag className="text-xl text-white" />
                <div className="text-white text-center md:text-left">
                  <h3 className="text-lg md:text-xl font-bold">{activeOffer.title}</h3>
                  <p className="text-sm md:text-base opacity-90">{activeOffer.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 flex-col sm:flex-row">
                <button 
                  onClick={() => window.open(activeOffer.buttonLink, '_blank')}
                  className="px-6 py-2 bg-white text-yellow-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg text-sm whitespace-nowrap"
                >
                  {activeOffer.buttonText} 🎉
                </button>
                
                {/* Expiry Date */}
                {activeOffer.expiresAt && (
                  <span className="bg-orange-600 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
                    ⏰ {new Date(activeOffer.expiresAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
          Delivering <span className="text-yellow-400">Speed</span>,{" "}
          <br />
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
          <Link href="/users/Sendpercel">
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