'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'

// import BangladeshMap from './components/BangladeshMap'
// dynamic import – disables SSR for Leaflet
const BangladeshMap = dynamic(() => import('./components/BangladeshMap'), {
  ssr: false,
})

export default function page() {
  const [serviceCenters, setServiceCenters] = useState([])

  const {data: session} = useSession()
  
  console.log(session?.user?.email)

  useEffect(()=>{
     fetch('/serviceCenter/serviceCenter.json')
       .then(res => res.json())
       .then(data => {
        // console.log(data)
        setServiceCenters(data)
      })
      .catch(error => console.log(error))
  },[])
  return (
   <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-6">We are available in 64 districts</h1>

            {/* Later you can add your search box here */}
            {/* <SearchDistrictBox /> */}

            <BangladeshMap  serviceCenters={serviceCenters}/>
        </div>
  )
}
