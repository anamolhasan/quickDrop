import Image from 'next/image'
import React from 'react'

export default function ContactBanner() {
  return (
    <div className='md:flex items-center justify-center gap-36 py-10 my-10'>
        <div>
            <h1 className='text-xl md:text-2xl lg:text-5xl font-bold mb-4'>Quick Drop Press</h1>
            <p className='md:text-xl'>Our press release, coverage and press kit</p>
        </div>
        <div>
            <Image 
             className=''
                        src='/contact/press-title.png'
                        width='483'
                        height='185'
                        alt='Delivery pic'
            />
        </div>
    </div>
  )
}
