'use client'

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React from 'react';


const formatDate = (iso) => new Date(iso).toLocaleString()

const PaymentHistory = () => {
    const {data: session} = useSession()
    console.log(session)
    console.log(session?.user?.email)

    const {isPending, data : payment = []} = useQuery({
        queryKey:['payment', session?.user?.email],
        queryFn: async () => {
            const res = await axios.get(`/payments?email=${session?.user?.email}`)
            return res.data
        }
    })

    if(isPending){
        return <p>Loading...</p>
    }
    
    return (
        <div className='overflow-x-auto shadow-md rounded-xl'>
            <h1 className='text-xl md:text-2xl lg:text-4xl text-gray-400 font-semibold'>Payment history</h1>

            <table className='table table-zebra w-full mt-10'>
                <thead className='bg-amber-600 text-base font-semibold'>
                    <tr>
                        <th>#</th>
                        <th>Parcel ID</th>
                        <th>Amount</th>
                        <th>Transaction</th>
                        <th>Paid At</th>
                    </tr>
                </thead>

                <tbody>table body</tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;