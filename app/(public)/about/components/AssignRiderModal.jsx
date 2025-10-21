// components/AssignRiderModal.js - Updated version
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'

export default function AssignRiderModal({ parcel, isOpen, onClose, onAssign }) {
  const [riders, setRiders] = useState([])
  const [filteredRiders, setFilteredRiders] = useState([])
  const [selectedRider, setSelectedRider] = useState('')
  const [loading, setLoading] = useState(false)
  const [filterRegion, setFilterRegion] = useState('')

  useEffect(() => {
    if (isOpen) {
      fetchAvailableRiders()
      // Auto-set filter region based on parcel's sender region
      setFilterRegion(parcel.sender_region || '')
      
      // Pre-select already assigned rider if exists
      if (parcel.assigned_rider_id) {
        setSelectedRider(parcel.assigned_rider_id)
      }
    }
  }, [isOpen, parcel])

  useEffect(() => {
    if (filterRegion) {
      const filtered = riders.filter(rider => 
        rider.division === filterRegion
      )
      setFilteredRiders(filtered)
    } else {
      setFilteredRiders(riders)
    }
  }, [filterRegion, riders])

  const fetchAvailableRiders = async () => {
    try {
      // Pass parcelId to get already assigned rider
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/riders/available?parcelId=${parcel._id}${filterRegion ? `&region=${filterRegion}` : ''}`
      )
      setRiders(res.data)
    } catch (err) {
      console.error('Error fetching riders:', err)
      Swal.fire('Error!', 'Failed to load riders', 'error')
    }
  }

  const handleAssign = async () => {
    if (!selectedRider) {
      Swal.fire('Error!', 'Please select a rider', 'error')
      return
    }

    setLoading(true)
    try {
      const rider = riders.find(r => r._id === selectedRider)
      
      const result = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/parcels/${parcel._id}/assign`, 
        {
          riderId: rider._id,
          riderName: rider.name,
          riderEmail: rider.email
        }
      )

      if (result.data.parcelUpdated) {
        Swal.fire({
          title: 'Success!',
          text: 'Rider assigned successfully',
          icon: 'success',
          confirmButtonColor: '#10B981'
        })
        onAssign()
        onClose()
      } else {
        throw new Error('Failed to update parcel')
      }
    } catch (err) {
      console.error('Error assigning rider:', err)
      Swal.fire({
        title: 'Error!',
        text: err.response?.data?.message || 'Failed to assign rider',
        icon: 'error',
        confirmButtonColor: '#EF4444'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleReassign = async () => {
    if (!selectedRider) {
      Swal.fire('Error!', 'Please select a new rider', 'error')
      return
    }

    const result = await Swal.fire({
      title: 'Reassign Rider?',
      text: `Are you sure you want to change the assigned rider for ${parcel.tracking_id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F59E0B',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, reassign!'
    })

    if (!result.isConfirmed) return

    await handleAssign()
  }

  const isAlreadyAssigned = parcel.assigned_rider_id && selectedRider === parcel.assigned_rider_id

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className={`p-6 text-white ${isAlreadyAssigned ? 'bg-orange-600' : 'bg-gradient-to-r from-blue-600 to-purple-600'}`}>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">
                {isAlreadyAssigned ? 'Reassign Rider' : 'Assign Rider'}
              </h2>
              <p className="opacity-90 mt-1">
                {isAlreadyAssigned ? 'Change rider for this delivery' : 'Select a rider for this delivery'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:opacity-70 transition-opacity text-2xl font-light"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Parcel Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Tracking ID</label>
              <p className="font-semibold text-gray-900 dark:text-white">{parcel.tracking_id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {isAlreadyAssigned ? 'Current Rider' : 'Receiver'}
              </label>
              <p className="font-semibold text-gray-900 dark:text-white">
                {isAlreadyAssigned ? parcel.assigned_rider_name : parcel.receiver_name}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Sender Region</label>
              <p className="font-semibold text-gray-900 dark:text-white">{parcel.sender_region}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Receiver Center</label>
              <p className="font-semibold text-gray-900 dark:text-white">{parcel.receiver_center}</p>
            </div>
          </div>

          {/* Region Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filter by Region
            </label>
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Regions</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Khulna">Khulna</option>
              <option value="Barishal">Barishal</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Mymensingh">Mymensingh</option>
            </select>
          </div>

          {/* Rider Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Rider {filterRegion && `from ${filterRegion}`}
            </label>
            
            {filteredRiders.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">
                  {riders.length === 0 
                    ? 'No available riders found' 
                    : `No riders available in ${filterRegion}`}
                </p>
                {riders.length > 0 && (
                  <button
                    onClick={() => setFilterRegion('')}
                    className="mt-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Show all regions
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-3 max-h-60 overflow-y-auto">
                {filteredRiders.map(rider => {
                  const isCurrentAssigned = rider._id === parcel.assigned_rider_id
                  const isSelected = selectedRider === rider._id
                  
                  return (
                    <div
                      key={rider._id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        isSelected
                          ? isCurrentAssigned
                            ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-md'
                            : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                          : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500'
                      } ${isCurrentAssigned ? 'ring-2 ring-orange-200 dark:ring-orange-800' : ''}`}
                      onClick={() => setSelectedRider(rider._id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {rider.name}
                              {isCurrentAssigned && (
                                <span className="ml-2 px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-xs">
                                  Currently Assigned
                                </span>
                              )}
                            </h3>
                            {isSelected && (
                              <span className="ml-2 text-blue-600 dark:text-blue-400">✓</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {rider.email}
                          </p>
                          <div className="flex gap-4 mt-2 text-xs">
                            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                              {rider.vehicleType}
                            </span>
                            <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full">
                              {rider.division}
                            </span>
                            <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full">
                              {rider.district}
                            </span>
                            <span className={`px-2 py-1 rounded-full ${
                              rider.work_status === 'in_delivery' 
                                ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                                : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                            }`}>
                              {rider.work_status || 'available'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {isAlreadyAssigned && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  This parcel already has an assigned rider
                </span>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={isAlreadyAssigned ? handleReassign : handleAssign}
                disabled={loading || !selectedRider}
                className={`px-6 py-2 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-md ${
                  isAlreadyAssigned 
                    ? 'bg-orange-600 hover:bg-orange-700' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                }`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    {isAlreadyAssigned ? 'Reassigning...' : 'Assigning...'}
                  </span>
                ) : (
                  isAlreadyAssigned ? 'Reassign Rider' : 'Assign Rider'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}