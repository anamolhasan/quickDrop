import React from 'react'
import { FaLocationArrow, FaMailBulk, FaPhone } from 'react-icons/fa'

const ContactUs = () => {
  return (
    <section className="py-10 my-10 border-t-2">
	<div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
		<div className=" flex items-center">
			<div>
                <h1 className="text-4xl font-bold">Get in touch</h1>
			<p className="pt-2 pb-4">Fill in the form to start a conversation</p>
			<div className="space-y-4">
				<p className="flex items-center space-x-3">
					<FaLocationArrow />
					<span> Fake address, 9999 City</span>
				</p>
				<p className="flex items-center space-x-3">
					<FaPhone  />
					<span>123456789</span>
				</p>
				<p className="flex items-center space-x-3">
					<FaMailBulk />
					<span>quickdrop@business.com.bd</span>
				</p>
			</div>
            </div>
		</div>
		<form noValidate="" className="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
			<label className="block">
				<span className="">Full name</span>
				<input type="text" placeholder="Anamol Hasan" className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-700 p-2 mt-2" />
			</label>
			<label className="block">
				<span className="mb-1">Email address</span>
				<input type="email" placeholder="anamolhasan.job@gamil.com" className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-700 p-2 mt-2" />
			</label>
			<label className="block">
				<span className="mb-1">Mobile Number</span>
				<input type="email" placeholder="+8801950029882" className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-700 p-2 mt-2" />
			</label>
			<label className="block">
				<span className="mb-1">Message</span>
				<textarea rows="3" className="block w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-700 mt-2"></textarea>
			</label>
			<button type="button" className="self-center px-8 py-3 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 dark:bg-violet-600 dark:text-gray-50 focus:dark:ring-violet-600 hover:dark:ring-violet-600">Submit</button>
		</form>
	</div>
</section>
  )
}

export default ContactUs