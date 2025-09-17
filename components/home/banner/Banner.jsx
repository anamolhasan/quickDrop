// components/Banner.jsx
import Link from "next/link";
import { FaBox, FaSearch } from "react-icons/fa";

export default function Banner() {
  return (
    <section className="relative bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl max-h-screen mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Delivering <span className="text-yellow-500">Speed</span>,
            <br /> Security & <span className="text-yellow-500">Trust</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-lg">
            QuickDrop Courier helps you send parcels across Bangladesh with
            real-time tracking, reliable riders, and the fastest delivery
            experience.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 transition shadow-md text-white font-semibold">
              <FaBox />
              Send Parcel
            </button>
            <Link href='/track-product'>
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 transition shadow-md text-white font-semibold dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
                <FaSearch />
                Track Now
              </button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src="https://media.istockphoto.com/id/1221101939/photo/delivery-concept-asian-man-hand-accepting-a-delivery-boxes-from-professional-deliveryman-at.webp?a=1&b=1&s=612x612&w=0&k=20&c=6IIu9paId66RiyGT12bIL4hFKGxDGKPRT8O8pNmewZg="
            alt="Courier Service"
            className="w-full max-w-md md:max-w-lg drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
