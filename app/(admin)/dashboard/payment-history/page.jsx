'use client'

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React from 'react';


const formatDate = (iso) => new Date(iso).toLocaleString()

const PaymentHistory = () => {
    const {data: session} = useSession()
    // console.log(session)
    // console.log(session?.user?.email)

    const {isPending, data : payments = []} = useQuery({
        queryKey:['payment', session?.user?.email],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payments?email=${session?.user?.email}`)
            return res.data
        }
    })

    console.log(payments)

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

                <tbody>
                    {payments?.length > 0 ? (
                        payments.map((p, index) => (
                            <tr key={p.transactionId}>
                               <td>{index + 1}</td>
                               <td></td>
                               <td>৳{p.amount}</td>
                               <td></td>
                               <td>{formatDate(p.paid_at_string)}</td>
                            </tr>
                        ))
                    ) : (
                         <tr>
                            <td colSpan="7" className="text-center text-gray-500 py-6">
                                No payment history found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;