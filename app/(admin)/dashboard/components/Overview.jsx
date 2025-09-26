import React from 'react'
import { Package, Clock, CheckCircle, DollarSign } from "lucide-react"; // icons

const Overview = () => {
     // Fake Data
  const stats = [
    {
      id: 1,
      title: "Total Orders",
      value: "1,245",
      icon: <Package className="w-6 h-6" />,
      color: "bg-yellow-500",
    },
    {
      id: 2,
      title: "Pending Queries",
      value: "89",
      icon: <Clock className="w-6 h-6" />,
      color: "bg-yellow-500",
    },
    {
      id: 3,
      title: "Delivered",
      value: "1,120",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "bg-yellow-500",
    },
    {
      id: 4,
      title: "Revenue",
      value: "$24,560",
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-yellow-500",
    },
  ];
  return (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between transition hover:shadow-lg"
          >
            <div>
              <h2 className="text-gray-500 text-sm font-medium">{item.title}</h2>
              <p className="text-2xl font-semibold text-gray-800 mt-1">
                {item.value}
              </p>
            </div>
            <div
              className={`p-3 rounded-full text-white ${item.color}`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>
  )
}

export default Overview