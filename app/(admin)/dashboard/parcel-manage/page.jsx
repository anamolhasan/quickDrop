'use client'

import useTrackingLogger from '@/app/users/components/useTrackingLogger'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React from 'react'
import Swal from 'sweetalert2'

export default function PendingParcelManage() {

    const queryClient = useQueryClient()
    const {logTracking} = useTrackingLogger()
    const {data: session} = useSession()

    // Load parcels assigned to the current rider
    // const {data : parcels = [],isPending} = useQuery({
    //     queryKey: ['riderParcels'],
    //     enabled: !!session?.user?.email,
    //     queryFn: async () => {
    //         const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/rider/parcels?email=${session?.user?.email}`)
    //         return res.data
    //     }
    // })
    const {data : parcels = [],isPending} = useQuery({
        queryKey: ['riderParcels'],
        enabled: !!session?.user?.email,
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/parcels`)
            return res.data
        }
    })
    console.log(parcels)

    // Mutation for updating parcel status
    const {mutateAsync: updateStatus} = useMutation({
        mutationFn: async ({parcel, status}) => {
            const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/parcels/${parcel._id}/status`, {
                status
            })
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['riderParcels'])
        }
    })


       const handleStatusUpdate = (parcel, newStatus) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Mark parcel as ${newStatus.replace("_", " ")}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, update",
        }).then((result) => {
            if (result.isConfirmed) {
                updateStatus({ parcel, status: newStatus })
                    .then( async() => {
                        Swal.fire("Updated!", "Parcel status updated.", "success");

                        // log tracking
                        let trackDetails = `Picked up by ${session?.user.displayName}`
                        if (newStatus === 'delivered') {
                            trackDetails = `Delivered by ${session?.user.displayName}`
                        }
                        await logTracking({
                                tracking_id: parcel.tracking_id,
                                status: newStatus,
                                details: trackDetails,
                               updated_by: session?.user?.email,
                            });

                    })
                    .catch(() => {
                        Swal.fire("Error!", "Failed to update status.", "error");
                    });
            }
        });
    };


    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-600">
                Parcel Management
            </h1>

            {
                isPending ? (
                    <p>Loading...</p>
                ) : parcels.length === 0 ? (
                    <p className='text-gray-500'>No assigned deliveries.</p>
                ) : (                 
                    <div className='overflow-x-auto'>
                      <table>
                         <thead>
                            <tr>
                                <th>Tracking ID</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Receiver</th>
                                <th>Receiver Center</th>
                                <th>Cost</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                         </thead>
                         <tbody>
                            {parcels.map((parcel) => (
                                <tr key={parcel._id}>
                                    <td>{parcel.tracking_id}</td>
                                    <td>{parcel.title}</td>
                                    <td>{parcel.type}</td>
                                    <td>{parcel.receiver_name}</td>
                                    <td>{parcel.receiver_center}</td>
                                    <td>৳{parcel.cost}</td>
                                    <td>{parcel.delivery_status.replace('_','')}</td>
                                     <td>
                                        {parcel.delivery_status === "rider_assigned" && (
                                            <button
                                                className="btn btn-sm btn-primary text-black"
                                                onClick={() =>
                                                    handleStatusUpdate(parcel, "in_transit")
                                                }
                                            >
                                                Mark Picked Up
                                            </button>
                                        )}
                                        {parcel.delivery_status === "in_transit" && (
                                            <button
                                                className="btn btn-sm btn-success text-black"
                                                onClick={() =>
                                                    handleStatusUpdate(parcel, "delivered")
                                                }
                                            >
                                                Mark Delivered
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                         </tbody>
                      </table>
                    </div>
                )
            }
        </div>
    )
}
