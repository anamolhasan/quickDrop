"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ActiveRidersPage() {
  const { data: session, status } = useSession();
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRider, setSelectedRider] = useState(null);
  const [search, setSearch] = useState(""); // search input state

  const fetchActiveRiders = async () => {
    if (!session?.token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/riders/active", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
      });
      const data = await res.json();
      setRiders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchActiveRiders();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  if (loading) return <p className="p-4">Loading active riders...</p>;

  // filter riders by region (case-insensitive)
  const filteredRiders = riders.filter(rider =>
    rider.district?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-4">Active Riders</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by region..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-sm"
        />
      </div>

      {filteredRiders.length === 0 ? (
        <p className="text-gray-500">No active riders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 min-w-[600px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border text-left">Name</th>
                <th className="p-3 border text-left">Phone</th>
                <th className="p-3 border text-left">Division</th>
                <th className="p-3 border text-left">District</th>
                <th className="p-3 border text-left">Status</th>
                <th className="p-3 border text-left">View</th>
              </tr>
            </thead>
            <tbody>
              {filteredRiders.map((rider) => (
                <tr key={rider._id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="p-3 border">{rider.name}</td>
                  <td className="p-3 border">{rider.phone}</td>
                  <td className="p-3 border">{rider.division}</td>
                  <td className="p-3 border">{rider.district}</td>
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
            <p><strong>District:</strong> {selectedRider.division}</p>
            <p><strong>Region:</strong> {selectedRider.district}</p>
            <p><strong>Status:</strong> {selectedRider.status}</p>
          </div>
        </div>
      )}
    </div>
  );
}
