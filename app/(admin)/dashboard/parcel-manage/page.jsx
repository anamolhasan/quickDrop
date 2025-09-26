import React from 'react'

export default function ParcelManage() {
    // Example static data for now
    const parcels = [
        {
            id: 1,
            status: "Pending",
            user: "Hasan",
            deliveryMan: "Rakib",
            moderator: "Admin A",
        },
        {
            id: 2,
            status: "Delivered",
            user: "Lara",
            deliveryMan: "Siam",
            moderator: "Admin B",
        },
        {
            id: 3,
            status: "Cancelled",
            user: "Rafi",
            deliveryMan: "Jamil",
            moderator: "Admin C",
        },
    ];

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
                Parcel Management
            </h1>

            {/* Responsive Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">#ID</th>
                            <th scope="col" className="px-6 py-3">User</th>
                            <th scope="col" className="px-6 py-3">Delivery Man</th>
                            <th scope="col" className="px-6 py-3">Moderator</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel) => (
                            <tr
                                key={parcel.id}
                                className="border-b hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900">{parcel.id}</td>
                                <td className="px-6 py-4">{parcel.user}</td>
                                <td className="px-6 py-4">{parcel.deliveryMan}</td>
                                <td className="px-6 py-4">{parcel.moderator}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${parcel.status === "Pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : parcel.status === "Delivered"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {parcel.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
