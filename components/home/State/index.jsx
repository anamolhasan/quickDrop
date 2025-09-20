// import Image from 'next/image';
// import React from 'react';

// const index = () => {
//     return (
//         <div className=''>
//             <h1 className='text-5xl text-center'>State</h1>
//             <div className="w-8/12 mx-auto mt-10">

//                 {/* <h1 className="text-3xl font-bold text-center mb-5 dark:text-gray-200">Some Info about QuicDrop</h1> */}

//                 <div className='grid text-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10
//              justify-center dark:text-gray-200'>
//                     {/* single stat 1 Registered User*/}
//                     <div className='bg-base-200 rounded-full border border-gray-200 dark:border-slate-700 
//                 flex items-center justify-center py-12 shadow-xl'>
//                         <div >
//                             <Image width={80} height={80} className='mx-auto w-20 h-20' src="/registerUser.svg" alt="" />
//                             <h2 className='my-2 text-5xl font-bold'><span id="counter"></span>+1240</h2>
//                             <p className='text-gray-500 dark:text-gray-300'>Registered User</p>
//                         </div>
//                     </div>

//                     {/* single state 2 Delivery Man */}
//                     <div className='bg-base-200 rounded-full  border border-gray-200 dark:border-slate-700
//                  flex items-center justify-center py-12 shadow-xl'>
//                         <div>
//                             <Image width={80} height={80} className='mx-auto' src="/deliveryman.jpeg" alt="" />
//                             <h2 className='my-2 text-5xl font-bold'><span id="counter2"></span>+120</h2>
//                             <p className='text-gray-500 dark:text-gray-300'>Delivery Man</p>
//                         </div>
//                     </div>

//                     {/* single state 3 Delivery Point*/}
//                     <div className='bg-base-200 rounded-full border border-gray-200 dark:border-slate-700
//                  flex items-center justify-center py-12 shadow-xl'>
//                         <div>
//                             <Image width={80} height={80} className='mx-auto' src="/deliverypoint.svg" alt="" />
//                             <h2 className='my-2 text-5xl font-bold'><span id="counter3"></span>+86</h2>
//                             <p className='text-gray-500 dark:text-gray-300'>Delivery Point</p>
//                         </div>
//                     </div>


//                 </div>

//             </div>
//         </div>
//     );
// };

// export default index;








import Image from "next/image";
import React from "react";

export default function State() {
  return (
    <section className="relative bg-gray-50 dark:bg-gray-900 py-16">
      <div className="w-11/12 mx-auto max-w-7xl">
        {/* Section Title */}
        <h1 className="text-center text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          QuickDrop <span className="text-yellow-500">at a Glance</span>
        </h1>
        <p className="text-center mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Trusted by thousands of users, delivery partners, and service points
          across Bangladesh.
        </p>

        {/* Stats Grid */}
        <div className="grid text-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
          {/* Stat 1: Registered User */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-slate-700 p-8 shadow-md hover:shadow-xl transition">
            <Image
              width={80}
              height={80}
              className="mx-auto w-20 h-20 border-2 border-yellow-500 rounded-full p-2"
              src="/registerUser.svg"
              alt="Registered User"
            />
            <h2 className="my-4 text-5xl font-extrabold text-gray-900 dark:text-white">
              +1240
            </h2>
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              Registered Users
            </p>
          </div>

          {/* Stat 2: Delivery Man */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-slate-700 p-8 shadow-md hover:shadow-xl transition">
            <Image
              width={80}
              height={80}
              className="mx-auto w-20 h-20 border-2 border-yellow-500 rounded-full p-2"
              src="/deliveryman.jpeg"
              alt="Delivery Man"
            />
            <h2 className="my-4 text-5xl font-extrabold text-gray-900 dark:text-white">
              +120
            </h2>
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              Delivery Men
            </p>
          </div>

          {/* Stat 3: Delivery Point */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-slate-700 p-8 shadow-md hover:shadow-xl transition">
            <Image
              width={80}
              height={80}
              className="mx-auto w-20 h-20 border-2 border-yellow-500 rounded-full p-2"
              src="/deliverypoint.svg"
              alt="Delivery Point"
            />
            <h2 className="my-4 text-5xl font-extrabold text-gray-900 dark:text-white">
              +86
            </h2>
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              Delivery Points
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
