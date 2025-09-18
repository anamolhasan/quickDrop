import Image from 'next/image'
import React from 'react'

export default function WhyChose() {
    return (
        <div className=' w-11/12 mx-auto'>
            <h1 className='text-center text-2xl font-semibold'>Why you should choose
                QuickDrop?</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>

                {/* card Daily pickup */}
                <div className='border border-gray-300 rounded  p-5'>
                    <Image
                        className='border rounded-full border-black'
                        src='/deliveryPicup.jpg'
                        width='75'
                        height='75'
                        alt='Delivery pic'
                    ></Image>
                    <h1 className='mt-2 font-semibold'>Daily pickup, no limits</h1>
                    <p className='mt-1'>QuickDrop Courier gives you the opportunity of unlimited pickup.</p>
                </div>

                {/* cash on Dalivery pickup */}
                <div className='border border-gray-300 rounded  p-5'>
                    <Image
                        className='border rounded-full border-black'
                        src='/cashondelivery.png'
                        width='75'
                        height='75'
                        alt='Delivery pic'
                    ></Image>
                    <h1 className='mt-2 font-semibold'>Cash on Delivery</h1>
                    <p className='mt-1'>At QuickDrop Courier we will collect the cash on behalf of you.</p>
                </div>

                {/* Faster Payment */}
                <div className='border border-gray-300 rounded  p-5'>
                    <Image
                        className='border rounded-full border-black'
                        src='/fasterpayment.png'
                        width='75'
                        height='75'
                        alt='Delivery pic'
                    ></Image>
                    <h1 className='mt-2 font-semibold'>Faster Payment</h1>
                    <p className='mt-1'>We provides multiple payment methods such as cash, Bank or Mobile Banking</p>
                </div>

                {/* Real-Time Tracking */}
                <div className='border border-gray-300 rounded  p-5'>
                    <Image
                        className='border rounded-full border-black'
                        src='/realtime2.jpeg'
                        width='75'
                        height='75'
                        alt='Delivery pic'
                    ></Image>
                    <h1 className='mt-2 font-semibold'>Real-Time Tracking</h1>
                    <p className='mt-1'>QuickDrop Courier provides an unique tracking code for your every consignments.</p>
                </div>

            </div>
        </div>
    )
}
