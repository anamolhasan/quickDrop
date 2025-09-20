// import React from 'react'

// const SendPackage = () => {
//   return (
//     <section className="py-16 px-6 md:px-16 text-black bg-white">
//         <div className="max-w-4xl mx-auto text-center ">
//           <h2 className="text-3xl font-bold mb-6">Ready to Send Your Package?</h2>
//           <p className="mb-8 leading-relaxed">
//             Join thousands of happy customers who trust Quick Drop Courier 
//             for their personal and business deliveries every single day.
//           </p>
//           <button className="px-10 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow hover:bg-gray-100 transition">
//             Get Started Now
//           </button>
//         </div>
//       </section>
//   )
// }

// export default SendPackage







import React from 'react';

const SendPackage = () => {
  return (
    <section className="py-24 px-6 md:px-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white leading-snug">
          Ready to <span className="text-yellow-500">Send Your Package?</span>
        </h2>

        {/* Description */}
        <p className="mb-10 text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
          Join thousands of happy customers who trust{" "}
          <span className="font-semibold text-yellow-500">Quick Drop Courier</span>{" "}
          for their personal and business deliveries every single day.
        </p>

        {/* CTA Button */}
        <button className="px-12 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-xl shadow-md hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 transition-all">
          Get Started Now
        </button>
      </div>
    </section>
  );
};

export default SendPackage;
