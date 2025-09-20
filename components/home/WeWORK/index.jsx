// import React from 'react';

// const index = () => {

//      const brands = [
//     { name: "ghorerbazar", logo: "/ghoerbazar.webp" },
//     { name: "illiyan", logo: "/illiyan.png" },
//     { name: "pikaboo", logo: "/Pickaboo.png" },
//     { name: "rokomari", logo: "/rokomari.png" },
//     { name: "aroggo", logo: "/agoggo.jpeg" },
//   ];


//     return (
//         <section className="relative bg-gray-50 dark:bg-gray-900 py-16">
//       <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
//         <h1 className="text-2xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-12">
//           We Work With
//         </h1>

//         {/* Brands Grid */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center">
//           {brands.map((brand, index) => (
//             <div
//               key={index}
//               className="flex justify-center items-center p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition"
//             >
//               <img
//                 src={brand.logo}
//                 alt={brand.name}
//                 className="h-16 object-contain"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//     );
// };

// export default index;



"use client";
import React from "react";
import Marquee from "react-fast-marquee";

const Index = () => {
  const brands = [
    { name: "ghorerbazar", logo: "/ghoerbazar.webp" },
    { name: "illiyan", logo: "/illiyan.png" },
    { name: "pikaboo", logo: "/Pickaboo.png" },
    { name: "rokomari", logo: "/rokomari.png" },
    { name: "aroggo", logo: "/agoggo.jpeg" },
  ];

  return (
    <section className="relative bg-gray-50 dark:bg-gray-900 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h1 className="text-2xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-12">
          We Work With
        </h1>

        {/* Auto moving logos with Marquee */}
        <Marquee
          gradient={false}
          speed={50}      // adjust speed
          pauseOnHover={true} // stop when hover
        >
          {brands.map((brand, index) => (
            <div
              key={index}
              className="mx-8 flex justify-center items-center p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition w-40"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-16 object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Index;
