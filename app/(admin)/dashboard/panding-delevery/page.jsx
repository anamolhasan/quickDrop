'use client'

import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useSession } from 'next-auth/react'

export default function RiderPendingDelivery() {
  const [parcels, setParcels] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    assigned: 0,
    inTransit: 0,
    delivered: 0
  })
  const { data: session } = useSession()

  // Fetch rider's assigned parcels
  useEffect(() => {
    const fetchRiderParcels = async () => {
      if (!session?.user?.email) return

      try {
        setLoading(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/rider/parcels?email=${session.user.email}`)
        setParcels(res.data)
        
        // Calculate stats
        const assigned = res.data.filter(p => p.delivery_status === 'rider_assigned').length
        const inTransit = res.data.filter(p => p.delivery_status === 'in_transit').length
        const delivered = res.data.filter(p => p.delivery_status === 'delivered').length
        
        setStats({
          total: res.data.length,
          assigned,
          inTransit,
          delivered
        })
      } catch (err) {
        console.error('Error fetching rider parcels:', err)
        Swal.fire({
          title: 'Error!',
          text: 'Failed to load your deliveries',
          icon: 'error',
          confirmButtonColor: '#EF4444'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchRiderParcels()
  }, [session?.user?.email])

  const handleStatusUpdate = async (parcel, newStatus) => {
    const statusMessages = {
      'in_transit': 'mark as picked up',
      'delivered': 'mark as delivered'
    }

    const result = await Swal.fire({
      title: 'Confirm Update?',
      text: `Are you sure you want to ${statusMessages[newStatus]} for ${parcel.tracking_id}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#6B7280',
      confirmButtonText: `Yes, ${statusMessages[newStatus]}`,
      background: document.documentElement.classList.contains('dark') ? '#1F2937' : '#fff',
      color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
    })

    if (!result.isConfirmed) return

    try {
      // Update parcel status
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/parcels/${parcel._id}/status`, {
        status: newStatus,
      })

      // Log tracking
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tracking`, {
        tracking_id: parcel.tracking_id,
        parcel_id: parcel._id,
        status: newStatus,
        message: newStatus === 'delivered' 
          ? `Parcel delivered by ${session?.user?.name || session?.user?.email}`
          : `Parcel picked up by ${session?.user?.name || session?.user?.email}`,
        updated_by: session?.user?.email
      })

      // Update local state
      setParcels(prev => prev.map(p => 
        p._id === parcel._id ? { ...p, delivery_status: newStatus } : p
      ))

      // Update stats
      setStats(prev => ({
        ...prev,
        assigned: newStatus === 'in_transit' ? prev.assigned - 1 : prev.assigned,
        inTransit: newStatus === 'in_transit' ? prev.inTransit + 1 : 
                   newStatus === 'delivered' ? prev.inTransit - 1 : prev.inTransit,
        delivered: newStatus === 'delivered' ? prev.delivered + 1 : prev.delivered
      }))

      Swal.fire({
        title: 'Success!',
        text: `Parcel ${statusMessages[newStatus]} successfully`,
        icon: 'success',
        confirmButtonColor: '#10B981',
        background: document.documentElement.classList.contains('dark') ? '#1F2937' : '#fff',
        color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
      })
    } catch (err) {
      console.error('Error updating status:', err)
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update parcel status',
        icon: 'error',
        confirmButtonColor: '#EF4444',
        background: document.documentElement.classList.contains('dark') ? '#1F2937' : '#fff',
        color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
      })
    }
  }

  const handleViewDetails = (parcel) => {
    Swal.fire({
      title: `Parcel Details - ${parcel.tracking_id}`,
      html: `
        <div class="text-left space-y-3">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="font-semibold text-gray-700">Sender:</label>
              <p>${parcel.sender_name}</p>
              <p class="text-sm text-gray-600">${parcel.sender_contact}</p>
            </div>
            <div>
              <label class="font-semibold text-gray-700">Receiver:</label>
              <p>${parcel.receiver_name}</p>
              <p class="text-sm text-gray-600">${parcel.receiver_contact}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="font-semibold text-gray-700">Pickup Location:</label>
              <p>${parcel.sender_center}, ${parcel.sender_region}</p>
              <p class="text-sm text-gray-600">${parcel.sender_address}</p>
            </div>
            <div>
              <label class="font-semibold text-gray-700">Delivery Location:</label>
              <p>${parcel.receiver_center}, ${parcel.receiver_region}</p>
              <p class="text-sm text-gray-600">${parcel.receiver_address}</p>
            </div>
          </div>

          <div>
            <label class="font-semibold text-gray-700">Instructions:</label>
            <p class="text-sm text-gray-600">${parcel.delivery_instruction || 'No special instructions'}</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="font-semibold text-gray-700">Parcel Type:</label>
              <p>${parcel.type}</p>
            </div>
            <div>
              <label class="font-semibold text-gray-700">Weight:</label>
              <p>${parcel.weight} kg</p>
            </div>
          </div>

          <div>
            <label class="font-semibold text-gray-700">Delivery Cost:</label>
            <p class="text-lg font-bold text-green-600">৳${parcel.cost}</p>
          </div>
        </div>
      `,
      width: 600,
      background: document.documentElement.classList.contains('dark') ? '#1F2937' : '#fff',
      color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
      confirmButtonColor: '#3B82F6',
      confirmButtonText: 'Close'
    })
  }

  const handleContactCustomer = (parcel, type) => {
    const phoneNumber = type === 'sender' ? parcel.sender_contact : parcel.receiver_contact
    const name = type === 'sender' ? parcel.sender_name : parcel.receiver_name
    
    Swal.fire({
      title: `Contact ${name}`,
      html: `
        <div class="text-center">
          <p class="mb-4">Call or message ${name}</p>
          <p class="text-xl font-mono bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">${phoneNumber}</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Call',
      cancelButtonText: 'Message',
      background: document.documentElement.classList.contains('dark') ? '#1F2937' : '#fff',
      color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
    }).then((result) => {
      if (result.isConfirmed) {
        window.open(`tel:${phoneNumber}`)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        window.open(`sms:${phoneNumber}`)
      }
    })
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      rider_assigned: { 
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', 
        label: 'Assigned',
        icon: '📋'
      },
      in_transit: { 
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', 
        label: 'In Transit',
        icon: '🚚'
      },
      delivered: { 
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', 
        label: 'Delivered',
        icon: '✅'
      }
    }
    
    const config = statusConfig[status] || statusConfig.rider_assigned
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <span className="mr-1">{config.icon}</span>
        {config.label}
      </span>
    )
  }

  const getUrgencyBadge = (parcel) => {
    const createdAt = new Date(parcel.creation_date || parcel.createdAt)
    const now = new Date()
    const hoursDiff = (now - createdAt) / (1000 * 60 * 60)
    
    if (hoursDiff > 48) {
      return <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full text-xs">Urgent</span>
    } else if (hoursDiff > 24) {
      return <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 rounded-full text-xs">Soon</span>
    }
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              ))}
            </div>
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                My Deliveries
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your assigned parcel deliveries
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Logged in as <span className="font-semibold text-blue-600 dark:text-blue-400">{session?.user?.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <span className="text-2xl">📦</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Assigned</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <span className="text-2xl">📋</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ready for Pickup</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.assigned}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <span className="text-2xl">🚚</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Transit</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inTransit}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Delivered</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.delivered}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Parcels List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {parcels.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">😴</div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No Active Deliveries
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                You don't have any assigned deliveries at the moment. Check back later for new delivery assignments.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Parcel Information
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Delivery Locations
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {parcels.map((parcel) => (
                    <tr key={parcel._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="flex items-center">
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {parcel.tracking_id}
                            </div>
                            {getUrgencyBadge(parcel)}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {parcel.title} • {parcel.type}
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                            ৳{parcel.cost}
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Pickup</div>
                            <div className="text-sm text-gray-900 dark:text-white">
                              {parcel.sender_center}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Delivery</div>
                            <div className="text-sm text-gray-900 dark:text-white">
                              {parcel.receiver_center}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {getStatusBadge(parcel.delivery_status)}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          parcel.payment_status === 'paid' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {parcel.payment_status === 'paid' ? '✅ Paid' : '❌ Unpaid'}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end space-x-2">
                          {/* View Details */}
                          <button
                            onClick={() => handleViewDetails(parcel)}
                            className="inline-flex items-center px-3 py-1.5 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-all shadow-sm"
                            title="View Details"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Details
                          </button>

                          {/* Contact Buttons */}
                          <div className="flex space-x-1">
                            <button
                              onClick={() => handleContactCustomer(parcel, 'sender')}
                              className="inline-flex items-center px-2 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all shadow-sm"
                              title="Contact Sender"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleContactCustomer(parcel, 'receiver')}
                              className="inline-flex items-center px-2 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-all shadow-sm"
                              title="Contact Receiver"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </button>
                          </div>

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
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Tips */}
        {parcels.length > 0 && (
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Delivery Tips</h3>
                <div className="mt-1 text-sm text-blue-700 dark:text-blue-400">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Always contact customers before delivery</li>
                    <li>Update status immediately after pickup/delivery</li>
                    <li>Check parcel condition before accepting</li>
                    <li>Follow delivery instructions carefully</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}