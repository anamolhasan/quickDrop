import Image from 'next/image';
import React from 'react';

const index = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <h1 className='text-5xl text-center'>review</h1>
            <div className='flex flex-col-reverse md:flex-row md:items-center
             md:gap-16 mt-5'>
                <div className='md:w-1/2 mt-3 md:mt-0'>
                    <h1 className='text-3xl font-semibold'>Customer Satisfaction is Our First
                        Priority</h1>
                    <p className='text-justify mt-2 text-xl'>We offer the lowest delivery
                        charge with the highest value along with 100% safety of your product.
                        QuickDrop delivers your parcels to every corner of Bangladesh right
                        on time.</p>
                </div>
                <div className='w-1/2 flex justify-end'>
                    <Image className='rounded' width={500} height={500} src='/parcelhomedelivery.png' alt='customer setisfy img' />
                </div>
            </div>
        </div >
    );
};

export default index;