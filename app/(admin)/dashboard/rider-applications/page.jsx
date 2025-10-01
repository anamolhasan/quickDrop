"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RiderApplicationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRider, setSelectedRider] = useState(null);
  const [error, setError] = useState(null);

  // Redirect non-admin users
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/"); // redirect non-admin
    }
  }, [status, session]);

  // Fetch riders (Admin only)
  const fetchRiders = async () => {
    if (!session?.token) return;

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/riders", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch riders");
      }

      const data = await res.json();
      setRiders(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchRiders();
    }
  }, [status, session]);

  // Accept rider
  const handleAccept = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/riders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify({ status: "accepted" }),
      });

      if (res.ok) fetchRiders();
    } catch (error) {
      console.error("Error accepting rider:", error);
    }
  };

  // Remove rider
  const handleRemove = async (id) => {
    if (!confirm("Are you sure you want to remove this rider?")) return;

    try {
      const res = await fetch(`http://localhost:5000/riders/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
      });

      if (res.ok) setRiders(riders.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Error removing rider:", error);
    }
  };

  if (loading) return <p className="p-4">Loading riders...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
        Rider Applications
      </h1>

      {riders.length === 0 ? (
        <p className="text-center text-gray-500">No rider applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 min-w-[600px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border text-left">Name</th>
                <th className="p-3 border text-left">Phone</th>
                <th className="p-3 border text-left">District</th>
                <th className="p-3 border text-left">Status</th>
                <th className="p-3 border text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider) => (
                <tr
                  key={rider._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="p-3 border">{rider.name}</td>
                  <td className="p-3 border">{rider.phone}</td>
                  <td className="p-3 border">{rider.district}</td>
                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        rider.status === "accepted"
                          ? "bg-green-500"
                          : rider.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                      }`}
                    >
                      {rider.status}
                    </span>
                  </td>
                  <td className="p-3 border flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedRider(rider)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
                    >
                      View
                    </button>
                    {rider.status === "pending" && (
                      <button
                        onClick={() => handleAccept(rider._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
                      >
                        Accept
                      </button>
                    )}
                    <button
                      onClick={() => handleRemove(rider._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                    >
                      Remove
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-11/12 md:w-2/3 lg:w-1/3 shadow-lg relative">
            <button
              onClick={() => setSelectedRider(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedRider.name}</h2>
            <p>
              <span className="font-semibold">Email:</span> {selectedRider.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {selectedRider.phone}
            </p>
            <p>
              <span className="font-semibold">District:</span> {selectedRider.district}
            </p>
            <p>
              <span className="font-semibold">Region:</span> {selectedRider.region}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded text-white ${
                  selectedRider.status === "accepted"
                    ? "bg-green-500"
                    : selectedRider.status === "pending"
                    ? "bg-yellow-500"
                    : "bg-gray-400"
                }`}
              >
                {selectedRider.status}
              </span>
            </p>
            <p className="mt-4">
              <span className="font-semibold">Applied At:</span>{" "}
              {new Date(selectedRider.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
