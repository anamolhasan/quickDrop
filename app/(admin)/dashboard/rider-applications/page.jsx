"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Bike, CheckCircle, XCircle, Eye } from "lucide-react";
import toast from "react-hot-toast";

const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Define API URL once

export default function RiderApplicationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRider, setSelectedRider] = useState(null);
  const [error, setError] = useState(null);

  // --- Auth & Redirection ---
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/"); // Redirect non-admin
      toast.error("Access denied. Admin required.");
    }
  }, [status, session, router]);

  // --- Data Fetching ---
  const fetchRiders = useCallback(async () => {
    if (!session?.token) return;

    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/riders`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
      });

      if (!res.ok) {
        // Attempt to read error message from response body
        const errorData = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(errorData.message || "Failed to fetch riders");
      }

      const data = await res.json();
      setRiders(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
      toast.error(`Error: ${err.message || "Failed to load applications."}`);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchRiders();
    }
  }, [status, session, fetchRiders]);

  // --- Actions ---
  const handleAccept = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/riders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify({ status: "accepted" }),
      });

      if (res.ok) {
        fetchRiders();
        toast.success("Rider application accepted!");
      } else {
        toast.error("Failed to accept rider.");
      }
    } catch (error) {
      console.error("Error accepting rider:", error);
      toast.error("Network error while accepting.");
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to permanently remove this rider application?")) return;

    try {
      const res = await fetch(`${apiUrl}/riders/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
      });

      if (res.ok) {
        setRiders(riders.filter((r) => r._id !== id));
        toast.success("Rider application removed!");
      } else {
        toast.error("Failed to remove rider.");
      }
    } catch (error) {
      console.error("Error removing rider:", error);
      toast.error("Network error while removing.");
    }
  };

  // --- Render Status Tag ---
  const getStatusTag = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-500 dark:bg-green-600 shadow-md shadow-green-500/30";
      case "pending":
        return "bg-yellow-500 dark:bg-yellow-600 shadow-md shadow-yellow-500/30 animate-pulse";
      case "rejected":
        return "bg-red-500 dark:bg-red-600 shadow-md shadow-red-500/30";
      default:
        return "bg-gray-400 dark:bg-gray-500";
    }
  };

  // --- Render Loading/Error States ---
  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-gray-50 dark:bg-gray-950">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading rider applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg mx-auto max-w-lg mt-10">
        <p className="font-semibold text-red-600 dark:text-red-400">Error Loading Data:</p>
        <p className="text-sm text-red-500 dark:text-red-300">{error}</p>
      </div>
    );
  }

  // --- Main Component Render ---
  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 pb-3 border-b border-gray-200 dark:border-gray-800">
          <Bike size={32} className="text-yellow-600 dark:text-yellow-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Rider Applications
          </h1>
        </div>

        {riders.length === 0 ? (
          <div className="p-10 text-center bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
             <p className="text-xl font-medium text-gray-500 dark:text-gray-400">No new rider applications found. 😴</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              {/* Table Head (Themed) */}
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr className="uppercase text-left text-xs font-semibold tracking-wider">
                  <th className="p-4 text-gray-700 dark:text-gray-300">Name</th>
                  <th className="p-4 text-gray-700 dark:text-gray-300">Phone</th>
                  <th className="p-4 text-gray-700 dark:text-gray-300">District</th>
                  <th className="p-4 text-gray-700 dark:text-gray-300">Status</th>
                  <th className="p-4 text-gray-700 dark:text-gray-300 text-center">Actions</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {riders.map((rider, idx) => (
                  <tr
                    key={rider._id}
                    className={`transition-all duration-300 transform 
                        ${idx % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}
                        hover:bg-yellow-50/70 dark:hover:bg-gray-800/70 hover:shadow-lg`}
                  >
                    <td className="p-4 text-gray-900 dark:text-white font-medium">{rider.name}</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">{rider.phone}</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">{rider.district}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1.5 rounded-full text-white font-semibold text-xs capitalize ${getStatusTag(rider.status)}`}
                      >
                        {rider.status}
                      </span>
                    </td>
                    <td className="p-4 text-center flex flex-wrap gap-2 justify-center">
                      
                      {/* View Button (Themed) */}
                      <button
                        onClick={() => setSelectedRider(rider)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium rounded-xl shadow-md shadow-yellow-500/30 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.05] active:scale-95 text-sm"
                      >
                        <Eye size={16} />
                        View
                      </button>

                      {/* Accept Button (Themed) */}
                      {rider.status === "pending" && (
                        <button
                          onClick={() => handleAccept(rider._id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-xl shadow-md shadow-green-500/30 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.05] active:scale-95 text-sm"
                        >
                          <CheckCircle size={16} />
                          Accept
                        </button>
                      )}
                      
                      {/* Remove Button (Themed) */}
                      <button
                        onClick={() => handleRemove(rider._id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-xl shadow-md shadow-red-500/30 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.05] active:scale-95 text-sm"
                      >
                        <XCircle size={16} />
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal (Themed) */}
        {selectedRider && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-800 relative transform transition-all duration-300 scale-100">
              <button
                onClick={() => setSelectedRider(null)}
                className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                aria-label="Close modal"
              >
                <XCircle size={24} />
              </button>
              
              <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white border-b pb-3 border-gray-200 dark:border-gray-700">
                {selectedRider.name}'s Application
              </h2>

              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  <span className="font-semibold text-gray-900 dark:text-white">Email:</span> {selectedRider.email}
                </p>
                <p>
                  <span className="font-semibold text-gray-900 dark:text-white">Phone:</span> {selectedRider.phone}
                </p>
                <p>
                  <span className="font-semibold text-gray-900 dark:text-white">District:</span> {selectedRider.district}
                </p>
                <p>
                  <span className="font-semibold text-gray-900 dark:text-white">Region:</span> {selectedRider.region || 'N/A'}
                </p>
                <p className="pt-2">
                  <span className="font-semibold text-gray-900 dark:text-white">Applied At:</span>{" "}
                  <span className="text-sm">{new Date(selectedRider.createdAt).toLocaleString()}</span>
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="font-semibold text-gray-900 dark:text-white mr-3">Status:</span>
                <span
                  className={`px-3 py-1.5 rounded-full text-white font-semibold text-sm capitalize ${getStatusTag(selectedRider.status)}`}
                >
                  {selectedRider.status}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}