// import React from 'react'
// import { FaLocationArrow, FaMailBulk, FaPhone } from 'react-icons/fa'

// const ContactUs = () => {
//   return (
//     <section className="py-20  border-t-2 text-black">
// 	<div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
// 		<div className=" flex items-center">
// 			<div>
//                 <h1 className="text-4xl font-bold">Get in touch</h1>
// 			<p className="pt-2 pb-4">Fill in the form to start a conversation</p>
// 			<div className="space-y-4">
// 				<p className="flex items-center space-x-3">
// 					<FaLocationArrow />
// 					<span> Fake address, 9999 City</span>
// 				</p>
// 				<p className="flex items-center space-x-3">
// 					<FaPhone  />
// 					<span>123456789</span>
// 				</p>
// 				<p className="flex items-center space-x-3">
// 					<FaMailBulk />
// 					<span>quickdrop@business.com.bd</span>
// 				</p>
// 			</div>
//             </div>
// 		</div>
// 		<form noValidate="" className="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
// 			<label className="block">
// 				<span className="">Full name</span>
// 				<input type="text" placeholder="Anamol Hasan" className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-200 p-2 mt-2" />
// 			</label>
// 			<label className="block">
// 				<span className="mb-1">Email address</span>
// 				<input type="email" placeholder="anamolhasan.job@gamil.com" className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-200 p-2 mt-2" />
// 			</label>
// 			<label className="block">
// 				<span className="mb-1">Mobile Number</span>
// 				<input type="email" placeholder="+8801950029882" className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-200 p-2 mt-2" />
// 			</label>
// 			<label className="block">
// 				<span className="mb-1">Message</span>
// 				<textarea rows="3" className="block w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-200 mt-2"></textarea>
// 			</label>
// 			<button type="button" className="self-center px-8 py-3 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 dark:bg-violet-600 dark:text-gray-50 focus:dark:ring-violet-600 hover:dark:ring-violet-600">Submit</button>
// 		</form>
// 	</div>
// </section>
//   )
// }

// export default ContactUs




import React from "react";
import { FaLocationArrow, FaMailBulk, FaPhone } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="relative bg-gray-50 dark:bg-gray-900 py-20 border-t-2">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Get in <span className="text-yellow-500">Touch</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-md">
            Fill in the form to start a conversation with us. We’re always ready
            to help you with your delivery needs.
          </p>

          {/* Contact Info */}
          <div className="mt-8 space-y-4">
            <p className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <FaLocationArrow className="text-yellow-500" />
              <span>Fake address, 9999 City</span>
            </p>
            <p className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <FaPhone className="text-yellow-500" />
              <span>123456789</span>
            </p>
            <p className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <FaMailBulk className="text-yellow-500" />
              <span>quickdrop@business.com.bd</span>
            </p>
          </div>
        </div>

        {/* Right Form */}
        <form className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Anamol Hasan"
              className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none dark:bg-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="anamolhasan.job@gmail.com"
              className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none dark:bg-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium">
              Mobile Number
            </label>
            <input
              type="text"
              placeholder="+8801950029882"
              className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none dark:bg-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium">
              Message
            </label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 focus:ring-2 focus:ring-yellow-500 focus:outline-none dark:bg-gray-900 dark:text-white"
            ></textarea>
          </div>

          <button
            type="button"
            className="w-full py-3 px-6 rounded-xl bg-yellow-500 hover:bg-yellow-600 transition shadow-md text-white font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
