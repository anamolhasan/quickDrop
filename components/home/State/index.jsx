import Image from 'next/image';
import React from 'react';

const index = () => {
    return (
        <div className=''>
            <h1 className='text-5xl text-center'>State</h1>
            <div className="w-8/12 mx-auto mt-10">

                {/* <h1 className="text-3xl font-bold text-center mb-5 dark:text-gray-200">Some Info about QuicDrop</h1> */}

                <div className='grid text-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10
             justify-center dark:text-gray-200'>
                    {/* single stat 1 Registered User*/}
                    <div className='bg-base-200 rounded-full border border-gray-200 dark:border-slate-700 
                flex items-center justify-center py-12 shadow-xl'>
                        <div >
                            <Image width={80} height={80} className='mx-auto w-20 h-20' src="/registerUser.svg" alt="" />
                            <h2 className='my-2 text-5xl font-bold'><span id="counter"></span>+1240</h2>
                            <p className='text-gray-500 dark:text-gray-300'>Registered User</p>
                        </div>
                    </div>

                    {/* single state 2 Delivery Man */}
                    <div className='bg-base-200 rounded-full  border border-gray-200 dark:border-slate-700
                 flex items-center justify-center py-12 shadow-xl'>
                        <div>
                            <Image width={80} height={80} className='mx-auto' src="/deliveryman.jpeg" alt="" />
                            <h2 className='my-2 text-5xl font-bold'><span id="counter2"></span>+120</h2>
                            <p className='text-gray-500 dark:text-gray-300'>Delivery Man</p>
                        </div>
                    </div>

                    {/* single state 3 Delivery Point*/}
                    <div className='bg-base-200 rounded-full border border-gray-200 dark:border-slate-700
                 flex items-center justify-center py-12 shadow-xl'>
                        <div>
                            <Image width={80} height={80} className='mx-auto' src="/deliverypoint.svg" alt="" />
                            <h2 className='my-2 text-5xl font-bold'><span id="counter3"></span>+86</h2>
                            <p className='text-gray-500 dark:text-gray-300'>Delivery Point</p>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    );
};

export default index;