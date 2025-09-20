// import Image from 'next/image'
// import React from 'react'

// export default function CoreValues() {
//   return (
//    <div className="dark:bg-gray-100 dark:text-gray-900 py-10">
// 	 <div className='flex max-w-6xl mx-auto'>
//         <div className="max-w-3xl mx-auto p-6">
//       {/* First Paragraph */}
//       <p className="text-lg mb-4">
//         Life at<span className="text-blue-500 font-semibold">Quick Drop</span> Courier Solutions.
//       </p>

//       {/* One Heading */}
//       <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4">What Quick Drop</h2>

//       {/* Two Descriptions */}
//       <p className="mb-3">
//        Founded in 2025, Quick Drop is among the fastest growing tech startups in Asia which has dedicated itself to create solutions to minimize infrastructural problems.
//       </p>
//       <p>
//         A fast paced organization, the company gives it employees an immense amount of space to grow professionally as well as take ownership of the initiatives undertaken in the organization.
//       </p>
//     </div>
//      <div className="max-w-3xl mx-auto p-6">
//       {/* First Paragraph */}
//       <p className="text-lg mb-4">
//         Why Choose <span className="text-blue-500 font-semibold">Quick Drop</span>
//       </p>

//       {/* One Heading */}
//       <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4">What Quick Drop Does</h2>

//       {/* Two Descriptions */}
//       <p className="mb-3">
//        With a hope to accelerate the establishment of digital Bangladesh, Quick Drop provides an app based solution through ride sharing, food delivery and e-commerce logistics services.
//       </p>
//       <p>
//         By harnessing the power of technology, Quick Drop aims to provide all services in one platform.
//       </p>
//     </div>
//      </div>
// </div>
//   )
// }




import React from "react";

export default function CoreValues() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 md:px-12 items-center">
        {/* Left Section */}
        <div>
          <p className="text-lg mb-3 text-gray-700 dark:text-gray-300">
            Life at{" "}
            <span className="text-yellow-500 font-semibold">Quick Drop</span>{" "}
            Courier Solutions
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white leading-snug">
            What <span className="text-yellow-500">Quick Drop</span> Means
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Founded in 2025, Quick Drop is among the fastest-growing tech
            startups in Asia, dedicated to creating innovative solutions that
            minimize infrastructural challenges.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            A fast-paced organization, Quick Drop gives its employees immense
            opportunities to grow professionally and take ownership of impactful
            initiatives.
          </p>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-lg mb-3 text-gray-700 dark:text-gray-300">
            Why Choose{" "}
            <span className="text-yellow-500 font-semibold">Quick Drop</span>
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white leading-snug">
            What We <span className="text-yellow-500">Do</span>
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            To accelerate the vision of a digital Bangladesh, Quick Drop
            provides app-based solutions in ride sharing, food delivery, and
            e-commerce logistics — all in one platform.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            By harnessing technology, we aim to make everyday services more
            accessible, secure, and efficient for everyone.
          </p>
        </div>
      </div>
    </section>
  );
}
