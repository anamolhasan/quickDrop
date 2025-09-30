"use client";
import { useEffect, useState } from "react";

export default function ActiveRidersPage() {
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRider, setSelectedRider] = useState(null);

  const fetchActiveRiders = async () => {
    try {
      const res = await fetch("http://localhost:5000/riders/active");
      const data = await res.json();
      setRiders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveRiders();
  }, []);

  if (loading) return <p className="p-4">Loading active riders...</p>;

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Active Riders</h1>

      {riders.length === 0 ? (
        <p className="text-gray-500">No active riders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 min-w-[600px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border text-left">Name</th>
                <th className="p-3 border text-left">Phone</th>
                <th className="p-3 border text-left">District</th>
                <th className="p-3 border text-left">Region</th>
                <th className="p-3 border text-left">Status</th>
                <th className="p-3 border text-left">View</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider) => (
                <tr key={rider._id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="p-3 border">{rider.name}</td>
                  <td className="p-3 border">{rider.phone}</td>
                  <td className="p-3 border">{rider.district}</td>
                  <td className="p-3 border">{rider.region}</td>
                  <td className="p-3 border">
                    <span className="px-2 py-1 rounded bg-green-500 text-white">{rider.status}</span>
                  </td>
                  <td className="p-3 border">
                    <button
                      onClick={() => setSelectedRider(rider)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedRider && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-11/12 max-w-md relative">
            <button
              onClick={() => setSelectedRider(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedRider.name}</h2>
            <p><strong>Email:</strong> {selectedRider.email}</p>
            <p><strong>Phone:</strong> {selectedRider.phone}</p>
            <p><strong>District:</strong> {selectedRider.district}</p>
            <p><strong>Region:</strong> {selectedRider.region}</p>
            <p><strong>Status:</strong> {selectedRider.status}</p>
          </div>
        </div>
      )}
    </div>
  );
}
