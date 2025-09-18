import React from 'react'

const CourierSolutions = () => {
  return (
    <section className="py-12 px-6 md:px-16 ">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-300">
              Reliable & Fast Courier Solutions
            </h2>
            <p className="leading-relaxed mb-6 text-gray-300">
              <span className="font-bold text-blue-500">Quick Drop</span>  Courier
              is a modern courier and delivery platform designed to make sending 
              and receiving parcels safe, fast, and hassle-free. With advanced tracking 
              technology, reliable delivery partners, and affordable rates, we ensure 
              your packages always arrive on time.
            </p>
            <p className="leading-relaxed text-gray-300">
              Our mission is to simplify logistics for both businesses and individuals 
              by providing secure, efficient, and trustworthy delivery solutions. 
              <span className="font-semibold"> Your trust is our greatest strength.</span>
            </p>

            <div className="mt-8">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src="/courier-delivery.svg"
              alt="Quick Drop Courier"
              className="w-full max-w-md rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>
  )
}

export default CourierSolutions