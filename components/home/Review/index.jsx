// import Image from 'next/image';
// import React from 'react';

// const index = () => {
//     return (
//         <div className='w-11/12 mx-auto'>
//             <h1 className='text-5xl text-center'>review</h1>
//             <div className='flex flex-col-reverse md:flex-row md:items-center
//              md:gap-16 mt-5'>
//                 <div className='md:w-1/2 mt-3 md:mt-0'>
//                     <h1 className='text-3xl font-semibold'>Customer Satisfaction is Our First
//                         Priority</h1>
//                     <p className='text-justify mt-2 text-xl'>We offer the lowest delivery
//                         charge with the highest value along with 100% safety of your product.
//                         QuickDrop delivers your parcels to every corner of Bangladesh right
//                         on time.</p>
//                 </div>
//                 <div className='md:w-1/2 md:flex md:justify-end'>
//                     <Image style={{ height: "auto", width: "auto" }} className='rounded' width={500} height={500} src='/parcelhomedelivery.png' alt='customer setisfy img' />
//                 </div>
//             </div>
//         </div >
//     );
// };

// export default index;







import Image from "next/image";
import React from "react";

const ReviewSection = () => {
  return (
    <section className="py-20 px-6 lg:px-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-12">
          What Our <span className="text-yellow-500">Customers Say</span>
        </h2>

        {/* Content */}
        <div className="flex flex-col-reverse md:flex-row items-center md:gap-16">
          {/* Text */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Customer Satisfaction is Our First Priority
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl text-justify leading-relaxed">
              We offer the lowest delivery charges with the highest value along with 100% safety of your products. 
              <span className="font-semibold text-yellow-500"> QuickDrop</span> delivers your parcels to every corner of Bangladesh right on time.
            </p>
          </div>

          {/* Image */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-md md:max-w-lg shadow-lg rounded-2xl overflow-hidden">
              <Image
                src="/parcelhomedelivery.png"
                width={500}
                height={500}
                alt="Customer Satisfaction"
                className="rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
