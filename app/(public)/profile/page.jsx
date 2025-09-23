import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Profile() {
    return (
        <div className='min-h-screen'>
            <div className='border border-gray-300 rounded shadow-xl w-10/12 md:w-8/12 mx-auto mt-20 p-5'>
                <p className='text-center text-3xl font-bold underline '>Profile</p>
                <div className='mt-5'>
                    <Image src='/profileImg/manpho.jpg' className='rounded-[100px] h-48 w-48 mx-auto' width={200} height={200} alt='profile Img' />
                </div>
                <div className='mt-5'>
                    <p className='text-center font-xl font-semibold'>Name: Md. Hasan Sarder</p>
                    <p className='text-center'><span className='font-bold'>Role:</span> Admin</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-5 md:w-8/12 mx-auto'>
                    <p className=''><span className='font-bold'>Address:</span> Mirpur 10, Dhaka, Bangladesh</p>
                    <p><span className='font-bold md:ms-5'>Contact:</span> 01703752145</p>
                    <p><span className='font-bold'>Email:</span> kamal@gmail.com</p>
                    <p><span className='font-bold md:ms-5'>Contact:</span> 01703752145</p>
                </div>

                <div className='flex items-center justify-center mt-5'>
                    <Link href="/editprofile">
                        <button className="ml-2 px-6 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 cursor-pointer">
                            Edit Profile
                        </button>
                    </Link>
                </div>

            </div>

        </div>
    )
}
