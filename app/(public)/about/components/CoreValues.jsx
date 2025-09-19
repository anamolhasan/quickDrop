import Image from 'next/image'
import React from 'react'

export default function CoreValues() {
  return (
   <div className="dark:bg-gray-100 dark:text-gray-900 py-10">
	 <div className='flex max-w-6xl mx-auto'>
        <div className="max-w-3xl mx-auto p-6">
      {/* First Paragraph */}
      <p className="text-lg mb-4">
        Life at<span className="text-blue-500 font-semibold">Quick Drop</span> Courier Solutions.
      </p>

      {/* One Heading */}
      <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4">What Quick Drop</h2>

      {/* Two Descriptions */}
      <p className="mb-3">
       Founded in 2025, Quick Drop is among the fastest growing tech startups in Asia which has dedicated itself to create solutions to minimize infrastructural problems.
      </p>
      <p>
        A fast paced organization, the company gives it employees an immense amount of space to grow professionally as well as take ownership of the initiatives undertaken in the organization.
      </p>
    </div>
     <div className="max-w-3xl mx-auto p-6">
      {/* First Paragraph */}
      <p className="text-lg mb-4">
        Why Choose <span className="text-blue-500 font-semibold">Quick Drop</span>
      </p>

      {/* One Heading */}
      <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4">What Quick Drop Does</h2>

      {/* Two Descriptions */}
      <p className="mb-3">
       With a hope to accelerate the establishment of digital Bangladesh, Quick Drop provides an app based solution through ride sharing, food delivery and e-commerce logistics services.
      </p>
      <p>
        By harnessing the power of technology, Quick Drop aims to provide all services in one platform.
      </p>
    </div>
     </div>
</div>
  )
}
