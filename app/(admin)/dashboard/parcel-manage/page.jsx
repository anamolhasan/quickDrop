// 'use client'

// import useTrackingLogger from '@/app/users/components/useTrackingLogger'
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import axios from 'axios'
// import { useSession } from 'next-auth/react'
// import React from 'react'
// import Swal from 'sweetalert2'

// export default function PendingParcelManage() {

//     const queryClient = useQueryClient()
//     const {logTracking} = useTrackingLogger()
//     const {data: session} = useSession()

//     // Load parcels assigned to the current rider
//     // const {data : parcels = [],isPending} = useQuery({
//     //     queryKey: ['riderParcels'],
//     //     enabled: !!session?.user?.email,
//     //     queryFn: async () => {
//     //         const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/rider/parcels?email=${session?.user?.email}`)
//     //         return res.data
//     //     }
//     // })
//     const {data : parcels = [],isPending} = useQuery({
//         queryKey: ['riderParcels'],
//         enabled: !!session?.user?.email,
//         queryFn: async () => {
//             const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/parcels`)
//             return res.data
//         }
//     })
//     console.log(parcels)

//     // Mutation for updating parcel status
//     const {mutateAsync: updateStatus} = useMutation({
//         mutationFn: async ({parcel, status}) => {
//             const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/parcels/${parcel._id}/status`, {
//                 status
//             })
//             return res.data
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries(['riderParcels'])
//         }
//     })


//        const handleStatusUpdate = (parcel, newStatus) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: `Mark parcel as ${newStatus.replace("_", " ")}?`,
//             icon: "question",
//             showCancelButton: true,
//             confirmButtonText: "Yes, update",
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 updateStatus({ parcel, status: newStatus })
//                     .then( async() => {
//                         Swal.fire("Updated!", "Parcel status updated.", "success");

//                         // log tracking
//                         let trackDetails = `Picked up by ${session?.user.displayName}`
//                         if (newStatus === 'delivered') {
//                             trackDetails = `Delivered by ${session?.user.displayName}`
//                         }
//                         await logTracking({
//                                 tracking_id: parcel.tracking_id,
//                                 status: newStatus,
//                                 details: trackDetails,
//                                updated_by: session?.user?.email,
//                             });

//                     })
//                     .catch(() => {
//                         Swal.fire("Error!", "Failed to update status.", "error");
//                     });
//             }
//         });
//     };


//     return (
//         <div className="p-4 sm:p-6 lg:p-8">
//             <h1 className="text-2xl font-bold mb-6 text-gray-600">
//                 Parcel Management
//             </h1>

//             {
//                 isPending ? (
//                     <p>Loading...</p>
//                 ) : parcels.length === 0 ? (
//                     <p className='text-gray-500'>No assigned deliveries.</p>
//                 ) : (                 
//                     <div className='overflow-x-auto'>
//                       <table>
//                          <thead>
//                             <tr>
//                                 <th>Tracking ID</th>
//                                 <th>Title</th>
//                                 <th>Type</th>
//                                 <th>Receiver</th>
//                                 <th>Receiver Center</th>
//                                 <th>Cost</th>
//                                 <th>Status</th>
//                                 <th>Action</th>
//                             </tr>
//                          </thead>
//                          <tbody>
//                             {parcels.map((parcel) => (
//                                 <tr key={parcel._id}>
//                                     <td>{parcel.tracking_id}</td>
//                                     <td>{parcel.title}</td>
//                                     <td>{parcel.type}</td>
//                                     <td>{parcel.receiver_name}</td>
//                                     <td>{parcel.receiver_center}</td>
//                                     <td>৳{parcel.cost}</td>
//                                     <td>{parcel.delivery_status.replace('_','')}</td>
//                                      <td>
//                                         {parcel.delivery_status === "rider_assigned" && (
//                                             <button
//                                                 className="btn btn-sm btn-primary text-black"
//                                                 onClick={() =>
//                                                     handleStatusUpdate(parcel, "in_transit")
//                                                 }
//                                             >
//                                                 Mark Picked Up
//                                             </button>
//                                         )}
//                                         {parcel.delivery_status === "in_transit" && (
//                                             <button
//                                                 className="btn btn-sm btn-success text-black"
//                                                 onClick={() =>
//                                                     handleStatusUpdate(parcel, "delivered")
//                                                 }
//                                             >
//                                                 Mark Delivered
//                                             </button>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))}
//                          </tbody>
//                       </table>
//                     </div>
//                 )
//             }
//         </div>
//     )
// }






// anam vai ----> ami ekhn theke code likhlm...apnar code upor e comment kora ache





// 'use client'

// import React, { useEffect, useState } from 'react'
// import Swal from 'sweetalert2'
// import axios from 'axios'
// import useTrackingLogger from '@/app/users/components/useTrackingLogger'
// import { useSession } from 'next-auth/react'

// export default function PendingParcelManage() {
//   const [parcels, setParcels] = useState([])
//   const [loading, setLoading] = useState(true)
//   const { data: session } = useSession()
//   const { logTracking } = useTrackingLogger()

//   // Fetch parcels on mount
//   useEffect(() => {
//     const fetchParcels = async () => {
//       if (!session?.user?.email) return

//       try {
//         const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/parcels`)
//         setParcels(res.data)
//       } catch (err) {
//         console.error('Error fetching parcels:', err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchParcels()
//   }, [session?.user?.email])

//   const handleStatusUpdate = async (parcel, newStatus) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: `Mark parcel as ${newStatus.replace('_', ' ')}?`,
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, update',
//     })

//     if (!result.isConfirmed) return

//     try {
//       await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/parcels/${parcel._id}/status`, {
//         status: newStatus,
//       })

//       // Update local state
//       setParcels((prev) =>
//         prev.map((p) => (p._id === parcel._id ? { ...p, delivery_status: newStatus } : p))
//       )

//       // Log tracking
//       const trackDetails =
//         newStatus === 'delivered'
//           ? `Delivered by ${session?.user.displayName}`
//           : `Picked up by ${session?.user.displayName}`

//       await logTracking({
//         tracking_id: parcel.tracking_id,
//         status: newStatus,
//         details: trackDetails,
//         updated_by: session?.user?.email,
//       })

//       Swal.fire('Updated!', 'Parcel status updated.', 'success')
//     } catch (err) {
//       console.error(err)
//       Swal.fire('Error!', 'Failed to update status.', 'error')
//     }
//   }

//   if (loading) return <p className="p-4 text-gray-600">Loading parcels...</p>

//   if (parcels.length === 0)
//     return <p className="p-4 text-gray-500">No assigned deliveries.</p>

//   return (
//     <div className="p-4 sm:p-6 lg:p-8">
//       <h1 className="text-2xl font-bold mb-6 text-gray-600">Parcel Management</h1>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
//           <thead className="bg-gray-100 dark:bg-gray-800">
//             <tr>
//               <th className="px-4 py-2">Tracking ID</th>
//               <th className="px-4 py-2">Title</th>
//               <th className="px-4 py-2">Type</th>
//               <th className="px-4 py-2">Receiver</th>
//               <th className="px-4 py-2">Receiver Center</th>
//               <th className="px-4 py-2">Cost</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {parcels.map((parcel) => (
//               <tr key={parcel._id} className="border-b border-gray-200 dark:border-gray-700">
//                 <td className="px-4 py-2">{parcel.tracking_id}</td>
//                 <td className="px-4 py-2">{parcel.title}</td>
//                 <td className="px-4 py-2">{parcel.type}</td>
//                 <td className="px-4 py-2">{parcel.receiver_name}</td>
//                 <td className="px-4 py-2">{parcel.receiver_center}</td>
//                 <td className="px-4 py-2">৳{parcel.cost}</td>
//                 <td className="px-4 py-2">{parcel.delivery_status.replace('_', ' ')}</td>
//                 <td className="px-4 py-2 space-x-2">
//                   {parcel.delivery_status === 'rider_assigned' && (
//                     <button
//                       onClick={() => handleStatusUpdate(parcel, 'in_transit')}
//                       className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
//                     >
//                       Mark Picked Up
//                     </button>
//                   )}
//                   {parcel.delivery_status === 'in_transit' && (
//                     <button
//                       onClick={() => handleStatusUpdate(parcel, 'delivered')}
//                       className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
//                     >
//                       Mark Delivered
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }







// 'use client'

// import React, { useEffect, useState } from 'react'
// import Swal from 'sweetalert2'
// import axios from 'axios'
// import useTrackingLogger from '@/app/users/components/useTrackingLogger'
// import { useSession } from 'next-auth/react'
// import AssignRiderModal from '@/app/(public)/about/components/AssignRiderModal'

// export default function PendingParcelManage() {
//   const [parcels, setParcels] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [selectedParcel, setSelectedParcel] = useState(null)
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const { data: session } = useSession()
//   const { logTracking } = useTrackingLogger()

//   // Fetch parcels on mount
//   useEffect(() => {
//     const fetchParcels = async () => {
//       if (!session?.user?.email) return

//       try {
//         const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/parcels`)
//         setParcels(res.data)
//       } catch (err) {
//         console.error('Error fetching parcels:', err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchParcels()
//   }, [session?.user?.email])

//   const handleAssignRider = (parcel) => {
//     setSelectedParcel(parcel)
//     setIsModalOpen(true)
//   }

//   const handleRiderAssigned = () => {
//     // Refresh the parcels list
//     const fetchParcels = async () => {
//       try {
//         const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/parcels`)
//         setParcels(res.data)
//       } catch (err) {
//         console.error('Error fetching parcels:', err)
//       }
//     }
//     fetchParcels()
//   }

//   const handleStatusUpdate = async (parcel, newStatus) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: `Mark parcel as ${newStatus.replace('_', ' ')}?`,
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, update',
//     })

//     if (!result.isConfirmed) return

//     try {
//       await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/parcels/${parcel._id}/status`, {
//         status: newStatus,
//       })

//       // Update local state
//       setParcels((prev) =>
//         prev.map((p) => (p._id === parcel._id ? { ...p, delivery_status: newStatus } : p))
//       )

//       // Log tracking
//       const trackDetails =
//         newStatus === 'delivered'
//           ? `Delivered by ${session?.user.displayName}`
//           : `Picked up by ${session?.user.displayName}`

//       await logTracking({
//         tracking_id: parcel.tracking_id,
//         status: newStatus,
//         details: trackDetails,
//         updated_by: session?.user?.email,
//       })

//       Swal.fire('Updated!', 'Parcel status updated.', 'success')
//     } catch (err) {
//       console.error(err)
//       Swal.fire('Error!', 'Failed to update status.', 'error')
//     }
//   }

//   const handleCashOut = async (parcel) => {
//     const result = await Swal.fire({
//       title: 'Confirm Cash Out?',
//       text: `Mark payment as cashed out for ${parcel.tracking_id}?`,
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, cash out',
//     })

//     if (!result.isConfirmed) return

//     try {
//       await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/parcels/${parcel._id}/cashout`)
      
//       // Update local state
//       setParcels((prev) =>
//         prev.map((p) => 
//           p._id === parcel._id ? { 
//             ...p, 
//             cashout_status: "cashed_out",
//             cashed_out_at: new Date().toISOString()
//           } : p
//         )
//       )

//       Swal.fire('Success!', 'Payment marked as cashed out.', 'success')
//     } catch (err) {
//       console.error(err)
//       Swal.fire('Error!', 'Failed to update cashout status.', 'error')
//     }
//   }

//   if (loading) return <p className="p-4 text-gray-600">Loading parcels...</p>

//   if (parcels.length === 0)
//     return <p className="p-4 text-gray-500">No parcels found.</p>

//   return (
//     <div className="p-4 sm:p-6 lg:p-8">
//       <h1 className="text-2xl font-bold mb-6 text-gray-600">Parcel Management</h1>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
//           <thead className="bg-gray-100 dark:bg-gray-800">
//             <tr>
//               <th className="px-4 py-2">Tracking ID</th>
//               <th className="px-4 py-2">Title</th>
//               <th className="px-4 py-2">Type</th>
//               <th className="px-4 py-2">Receiver</th>
//               <th className="px-4 py-2">Receiver Center</th>
//               <th className="px-4 py-2">Cost</th>
//               <th className="px-4 py-2">Payment Status</th>
//               <th className="px-4 py-2">Delivery Status</th>
//               <th className="px-4 py-2">Assigned Rider</th>
//               <th className="px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {parcels.map((parcel) => (
//               <tr key={parcel._id} className="border-b border-gray-200 dark:border-gray-700">
//                 <td className="px-4 py-2">{parcel.tracking_id}</td>
//                 <td className="px-4 py-2">{parcel.title}</td>
//                 <td className="px-4 py-2">{parcel.type}</td>
//                 <td className="px-4 py-2">{parcel.receiver_name}</td>
//                 <td className="px-4 py-2">{parcel.receiver_center}</td>
//                 <td className="px-4 py-2">৳{parcel.cost}</td>
                
//                 {/* Payment Status */}
//                 <td className="px-4 py-2">
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     parcel.payment_status === 'paid' 
//                       ? 'bg-green-100 text-green-800' 
//                       : 'bg-red-100 text-red-800'
//                   }`}>
//                     {parcel.payment_status}
//                   </span>
//                   {parcel.cashout_status === 'cashed_out' && (
//                     <span className="ml-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
//                       Cashed Out
//                     </span>
//                   )}
//                 </td>

//                 {/* Delivery Status */}
//                 <td className="px-4 py-2">
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     parcel.delivery_status === 'delivered' 
//                       ? 'bg-green-100 text-green-800'
//                       : parcel.delivery_status === 'in_transit'
//                       ? 'bg-blue-100 text-blue-800'
//                       : parcel.delivery_status === 'rider_assigned'
//                       ? 'bg-yellow-100 text-yellow-800'
//                       : 'bg-gray-100 text-gray-800'
//                   }`}>
//                     {parcel.delivery_status.replace('_', ' ')}
//                   </span>
//                 </td>

//                 {/* Assigned Rider */}
//                 <td className="px-4 py-2">
//                   {parcel.assigned_rider_name ? (
//                     <div>
//                       <p className="font-medium">{parcel.assigned_rider_name}</p>
//                       <p className="text-xs text-gray-500">{parcel.assigned_rider_email}</p>
//                     </div>
//                   ) : (
//                     <span className="text-gray-400">Not assigned</span>
//                   )}
//                 </td>

//                 {/* Actions */}
//                 <td className="px-4 py-2 space-x-2">
//                   {/* Assign Rider Button - Show for pending parcels without rider */}
//                   {(!parcel.assigned_rider_id && parcel.delivery_status === 'pending') && (
//                     <button
//                       onClick={() => handleAssignRider(parcel)}
//                       className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-md text-sm"
//                     >
//                       Assign Rider
//                     </button>
//                   )}

//                   {/* Status Update Buttons */}
//                   {parcel.delivery_status === 'rider_assigned' && (
//                     <button
//                       onClick={() => handleStatusUpdate(parcel, 'in_transit')}
//                       className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
//                     >
//                       Mark Picked Up
//                     </button>
//                   )}
//                   {parcel.delivery_status === 'in_transit' && (
//                     <button
//                       onClick={() => handleStatusUpdate(parcel, 'delivered')}
//                       className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
//                     >
//                       Mark Delivered
//                     </button>
//                   )}

//                   {/* Cash Out Button - Show for delivered parcels with paid payment */}
//                   {parcel.delivery_status === 'delivered' && 
//                    parcel.payment_status === 'paid' && 
//                    parcel.cashout_status !== 'cashed_out' && (
//                     <button
//                       onClick={() => handleCashOut(parcel)}
//                       className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-sm"
//                     >
//                       Cash Out
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Assign Rider Modal */}
//       {selectedParcel && (
//         <AssignRiderModal
//           parcel={selectedParcel}
//           isOpen={isModalOpen}
//           onClose={() => {
//             setIsModalOpen(false)
//             setSelectedParcel(null)
//           }}
//           onAssign={handleRiderAssigned}
//         />
//       )}
//     </div>
//   )
// }


















































































'use client'

import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import useTrackingLogger from '@/app/users/components/useTrackingLogger'
import { useSession } from 'next-auth/react'
import AssignRiderModal from '@/app/(public)/about/components/AssignRiderModal'

export default function PendingParcelManage() {
  const [parcels, setParcels] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedParcel, setSelectedParcel] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPayment, setFilterPayment] = useState('all')
  const { data: session } = useSession()
  const { logTracking } = useTrackingLogger()

  // Fetch parcels on mount
  useEffect(() => {
    fetchParcels()
  }, [session?.user?.email])

  const fetchParcels = async () => {
    if (!session?.user?.email) return

    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/parcels`)
      setParcels(res.data)
    } catch (err) {
      console.error('Error fetching parcels:', err)
    } finally {
      setLoading(false)
    }
  }

  // Filter parcels based on selected filters
  const filteredParcels = parcels.filter(parcel => {
    const statusMatch = filterStatus === 'all' || parcel.delivery_status === filterStatus
    const paymentMatch = filterPayment === 'all' || parcel.payment_status === filterPayment
    return statusMatch && paymentMatch
  })

  const handleAssignRider = (parcel) => {
    setSelectedParcel(parcel)
    setIsModalOpen(true)
  }

  const handleRiderAssigned = () => {
    fetchParcels()
  }

  const handleStatusUpdate = async (parcel, newStatus) => {
    const result = await Swal.fire({
      title: 'Update Status?',
      text: `Change status to "${newStatus.replace('_', ' ')}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, update it!',
      background: document.documentElement.classList.contains('dark') ? '#1F2937' : '#fff',
      color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
    })

    if (!result.isConfirmed) return

    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/parcels/${parcel._id}/status`, {
        status: newStatus,
      })

      setParcels((prev) =>
        prev.map((p) => (p._id === parcel._id ? { ...p, delivery_status: newStatus } : p))
      )

      const trackDetails =
        newStatus === 'delivered'
          ? `Delivered by ${session?.user.displayName}`
          : `Picked up by ${session?.user.displayName}`

      await logTracking({
        tracking_id: parcel.tracking_id,
        status: newStatus,
        details: trackDetails,
        updated_by: session?.user?.email,
      })

      Swal.fire({
        title: 'Updated!',
        text: 'Parcel status updated successfully.',
        icon: 'success',
        confirmButtonColor: '#10B981',
        background: document.documentElement.classList.contains('dark') ? '#1F2937' : '#fff',
        color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
      })
    } catch (err) {
      console.error(err)
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update status.',
        icon: 'error',
        confirmButtonColor: '#EF4444',
        background: document.documentElement.classList.contains('dark') ? '#1F2937' : '#fff',
        color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
      })
    }
  }

  const handleCashOut = async (parcel) => {
    const result = await Swal.fire({
      title: 'Confirm Cash Out?',
      text: `Mark payment as cashed out for ${parcel.tracking_id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F59E0B',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, cash out!',
      background: document.documentElement.classList.contains('dark') ? '#1F2937' : '#fff',
      color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
    })

    if (!result.isConfirmed) return

    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/parcels/${parcel._id}/cashout`)
      
      setParcels((prev) =>
        prev.map((p) => 
          p._id === parcel._id ? { 
            ...p, 
            cashout_status: "cashed_out",
            cashed_out_at: new Date().toISOString()
          } : p
        )
      )

      Swal.fire({
        title: 'Success!',
        text: 'Payment marked as cashed out.',
        icon: 'success',
        confirmButtonColor: '#10B981',
        background: document.documentElement.classList.contains('dark') ? '#1F2937' : '#fff',
        color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
      })
    } catch (err) {
      console.error(err)
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update cashout status.',
        icon: 'error',
        confirmButtonColor: '#EF4444',
        background: document.documentElement.classList.contains('dark') ? '#1F2937' : '#fff',
        color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
      })
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300', label: 'Pending' },
      rider_assigned: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', label: 'Rider Assigned' },
      in_transit: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', label: 'In Transit' },
      delivered: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', label: 'Delivered' },
      not_collected: { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', label: 'Not Collected' }
    }
    
    const config = statusConfig[status] || statusConfig.pending
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  const getPaymentBadge = (status, cashoutStatus) => {
    const paymentConfig = {
      paid: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', label: 'Paid' },
      unpaid: { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', label: 'Unpaid' }
    }
    
    const config = paymentConfig[status] || paymentConfig.unpaid
    return (
      <div className="flex flex-col gap-1">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
          {config.label}
        </span>
        {cashoutStatus === 'cashed_out' && (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs">
            Cashed Out
          </span>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-6"></div>
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Parcel Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track all parcel deliveries in one place
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Delivery Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="rider_assigned">Rider Assigned</option>
                <option value="in_transit">In Transit</option>
                <option value="delivered">Delivered</option>
                <option value="not_collected">Not Collected</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Payment Status
              </label>
              <select
                value={filterPayment}
                onChange={(e) => setFilterPayment(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Payments</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>

            <div className="flex items-end">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredParcels.length} of {parcels.length} parcels
              </div>
            </div>
          </div>
        </div>

        {/* Parcels Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {filteredParcels.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📦</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No parcels found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {parcels.length === 0 
                  ? 'No parcels available in the system.' 
                  : 'No parcels match your current filters.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Tracking Info
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Rider
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredParcels.map((parcel) => (
                    <tr key={parcel._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {parcel.tracking_id}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {parcel.title}
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-sm text-gray-900 dark:text-white">
                            To: {parcel.receiver_name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {parcel.receiver_center}
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            ৳{parcel.cost}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {getStatusBadge(parcel.delivery_status)}
                      </td>

                      <td className="px-6 py-4">
                        {getPaymentBadge(parcel.payment_status, parcel.cashout_status)}
                      </td>

                      <td className="px-6 py-4">
                        {parcel.assigned_rider_name ? (
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {parcel.assigned_rider_name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {parcel.assigned_rider_email}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400 dark:text-gray-500 text-sm">Not assigned</span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end space-x-2">
                          {/* Assign Rider Button */}
                          {(!parcel.assigned_rider_id && parcel.delivery_status === 'pending') && (
                            <button
                              onClick={() => handleAssignRider(parcel)}
                              className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-sm"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                              </svg>
                              Assign
                            </button>
                          )}

                          {/* Status Update Buttons */}
                          {parcel.delivery_status === 'rider_assigned' && (
                            <button
                              onClick={() => handleStatusUpdate(parcel, 'in_transit')}
                              className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all shadow-sm"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Pick Up
                            </button>
                          )}
                          
                          {parcel.delivery_status === 'in_transit' && (
                            <button
                              onClick={() => handleStatusUpdate(parcel, 'delivered')}
                              className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-all shadow-sm"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Deliver
                            </button>
                          )}

                          {/* Cash Out Button */}
                          {parcel.delivery_status === 'delivered' && 
                           parcel.payment_status === 'paid' && 
                           parcel.cashout_status !== 'cashed_out' && (
                            <button
                              onClick={() => handleCashOut(parcel)}
                              className="inline-flex items-center px-3 py-1.5 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-all shadow-sm"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                              </svg>
                              Cash Out
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Assign Rider Modal */}
      {selectedParcel && (
        <AssignRiderModal
          parcel={selectedParcel}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedParcel(null)
          }}
          onAssign={handleRiderAssigned}
        />
      )}
    </div>
  )
}