// import Image from 'next/image'
// import React from 'react'

// export default function WhyChose() {
//     return (
//         <div className=' w-11/12 mx-auto'>
//             <h1 className='text-center text-2xl font-semibold'>Why you should choose
//                 QuickDrop?</h1>
//             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5'>

//                 {/* card Daily pickup */}
//                 <div className='border border-gray-300 rounded  p-5'>
//                     <Image
//                         className='border rounded-full border-black'
//                         src='/deliveryPicup.jpg'
//                         width='75'
//                         height='75'
//                         alt='Delivery pic'
//                     ></Image>
//                     <h1 className='mt-2 font-semibold'>Daily pickup, no limits</h1>
//                     <p className='mt-1'>QuickDrop Courier gives you the opportunity of unlimited pickup.</p>
//                 </div>

//                 {/* cash on Dalivery pickup */}
//                 <div className='border border-gray-300 rounded  p-5'>
//                     <Image
//                         className='border rounded-full border-black'
//                         src='/cashondelivery.png'
//                         width='75'
//                         height='75'
//                         alt='Delivery pic'
//                     ></Image>
//                     <h1 className='mt-2 font-semibold'>Cash on Delivery</h1>
//                     <p className='mt-1'>At QuickDrop Courier we will collect the cash on behalf of you.</p>
//                 </div>

//                 {/* Faster Payment */}
//                 <div className='border border-gray-300 rounded  p-5'>
//                     <Image
//                         className='border rounded-full border-black'
//                         src='/fasterpayment.png'
//                         width='75'
//                         height='75'
//                         alt='Delivery pic'
//                     ></Image>
//                     <h1 className='mt-2 font-semibold'>Faster Payment</h1>
//                     <p className='mt-1'>We provides multiple payment methods such as cash, Bank or Mobile Banking</p>
//                 </div>

//                 {/* Real-Time Tracking */}
//                 <div className='border border-gray-300 rounded  p-5'>
//                     <Image
//                         className='border rounded-full border-black'
//                         src='/realtime2.jpeg'
//                         width='75'
//                         height='75'
//                         alt='Delivery pic'
//                     ></Image>
//                     <h1 className='mt-2 font-semibold'>Real-Time Tracking</h1>
//                     <p className='mt-1'>QuickDrop Courier provides an unique tracking code for your every consignments.</p>
//                 </div>

//             </div>
//         </div>
//     )
// }





import Image from "next/image";
import React from "react";

export default function WhyChose() {
  return (
    <section className="relative bg-gray-50 dark:bg-gray-900 py-16">
      <div className="w-11/12 mx-auto max-w-7xl">
        {/* Title */}
        <h1 className="text-center text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          Why You Should Choose{" "}
          <span className="text-yellow-500">QuickDrop?</span>
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {/* Card 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex justify-center">
              <Image
                className="border-2 border-yellow-500 rounded-full"
                src="/deliveryPicup.jpg"
                width={75}
                height={75}
                alt="Daily pickup"
              />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white text-center">
              Daily Pickup, No Limits
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">
              QuickDrop Courier gives you the opportunity of unlimited pickup.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex justify-center">
              <Image
                className="border-2 border-yellow-500 rounded-full"
                src="/cashondelivery.png"
                width={75}
                height={75}
                alt="Cash on Delivery"
              />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white text-center">
              Cash on Delivery
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">
              At QuickDrop Courier we will collect the cash on behalf of you.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex justify-center">
              <Image
                className="border-2 border-yellow-500 rounded-full"
                src="/fasterpayment.png"
                width={75}
                height={75}
                alt="Faster Payment"
              />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white text-center">
              Faster Payment
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">
              We provide multiple payment methods such as Cash, Bank, or Mobile
              Banking.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex justify-center">
              <Image
                className="border-2 border-yellow-500 rounded-full"
                src="/realtime2.jpeg"
                width={75}
                height={75}
                alt="Real-Time Tracking"
              />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white text-center">
              Real-Time Tracking
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">
              QuickDrop Courier provides a unique tracking code for your every
              consignment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
