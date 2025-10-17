// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { useSession } from "next-auth/react";
// import { Bike, Search, XCircle, MapPin, Phone } from "lucide-react";
// import toast from "react-hot-toast";

// const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// export default function ActiveRidersPage() {
//   const { data: session, status } = useSession();
//   const [riders, setRiders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedRider, setSelectedRider] = useState(null);
//   const [search, setSearch] = useState("");
//   const [error, setError] = useState(null);

//   const fetchActiveRiders = useCallback(async () => {
//     if (!session?.token) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch(`${apiUrl}/riders/active`, {
//         headers: {
//           "Content-Type": "application/json",
//           // Authorization: `Bearer ${session.token}`,
//         },
//       });

//       if (!res.ok) {
//         throw new Error("Failed to fetch active riders");
//       }

//       const data = await res.json();
//       setRiders(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error(err);
//       setError(err.message || "Something went wrong while fetching data.");
//       toast.error("Failed to load active riders.");
//     } finally {
//       setLoading(false);
//     }
//   }, [session]);

//   // useEffect(() => {
//   //   if (status === "authenticated") {
//   //     fetchActiveRiders();
//   //   } else if (status === "unauthenticated") {
//   //     setLoading(false);
//   //   }
//   // }, [status, fetchActiveRiders]);

//   // --- Filtering Logic ---
//   const filteredRiders = riders.filter(rider =>
//     rider.name?.toLowerCase().includes(search.toLowerCase()) || 
//     rider.district?.toLowerCase().includes(search.toLowerCase()) ||
//     rider.phone?.includes(search)
//   );
  
//   // --- Render Statuses ---
//   if (status === "loading" || loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px] bg-gray-50 dark:bg-gray-950">
//         <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading active riders...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-8 text-center bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg mx-auto max-w-lg mt-10">
//         <p className="font-semibold text-red-600 dark:text-red-400">Error Loading Data:</p>
//         <p className="text-sm text-red-500 dark:text-red-300">{error}</p>
//       </div>
//     );
//   }
  
//   // if (status === "unauthenticated") {
//   //     return (
//   //         <div className="flex justify-center items-center min-h-[400px] bg-gray-50 dark:bg-gray-950">
//   //             <p className="text-xl font-semibold text-red-500">Please log in to view this page.</p>
//   //         </div>
//   //     );
//   // }

//   // --- Main Render ---
//   return (
//     <div className="p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center gap-3 mb-8 pb-3 border-b border-gray-200 dark:border-gray-800">
//           <Bike size={32} className="text-orange-600 dark:text-orange-400" />
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Active Riders</h1>
//         </div>

//         {/* Search Input (Themed) */}
//         <div className="mb-6 max-w-lg relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
//           <input
//             type="text"
//             placeholder="Search by name, district, or phone..."
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//             className="pl-10 pr-4 py-2 w-full text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
//           />
//         </div>

//         {filteredRiders.length === 0 ? (
//           <div className="p-10 text-center bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
//             <p className="text-xl font-medium text-gray-500 dark:text-gray-400">No active riders found matching your criteria. 😟</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">
//             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
//               {/* Table Head (Themed) */}
//               <thead className="bg-gray-100 dark:bg-gray-800">
//                 <tr className="uppercase text-left text-xs font-semibold tracking-wider">
//                   <th className="p-4 text-gray-700 dark:text-gray-300">Name</th>
//                   <th className="p-4 text-gray-700 dark:text-gray-300">Phone</th>
//                   <th className="p-4 text-gray-700 dark:text-gray-300">Division</th>
//                   <th className="p-4 text-gray-700 dark:text-gray-300">District</th>
//                   <th className="p-4 text-gray-700 dark:text-gray-300">Status</th>
//                   <th className="p-4 text-gray-700 dark:text-gray-300 text-center">View</th>
//                 </tr>
//               </thead>
              
//               {/* Table Body */}
//               <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
//                 {filteredRiders.map((rider, idx) => (
//                   <tr
//                     key={rider._id}
//                     className={`transition-all duration-300 transform 
//                         ${idx % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}
//                         hover:bg-yellow-50/70 dark:hover:bg-gray-800/70 hover:shadow-lg`}
//                   >
//                     <td className="p-4 text-gray-900 dark:text-white font-medium">{rider.name}</td>
//                     <td className="p-4 text-gray-700 dark:text-gray-300">{rider.phone}</td>
//                     <td className="p-4 text-gray-700 dark:text-gray-300">{rider.division || 'N/A'}</td>
//                     <td className="p-4 text-gray-700 dark:text-gray-300">{rider.district}</td>
//                     <td className="p-4">
//                       {/* Active Status Tag (Themed Green) */}
//                       <span className="px-3 py-1.5 rounded-full bg-green-500 dark:bg-green-600 text-white font-semibold text-xs capitalize shadow-md shadow-green-500/30">
//                         {rider.status}
//                       </span>
//                     </td>
//                     <td className="p-4 text-center">
//                       {/* View Button (Themed Yellow/Orange Gradient) */}
//                       <button
//                         onClick={() => setSelectedRider(rider)}
//                         className="flex items-center justify-center gap-1 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-yellow-500/30 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.05] active:scale-95 text-sm mx-auto"
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Modal (Themed) */}
//         {selectedRider && (
//           <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//             <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-800 relative transform transition-all duration-300 scale-100">
//               <button
//                 onClick={() => setSelectedRider(null)}
//                 className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
//                 aria-label="Close modal"
//               >
//                 <XCircle size={24} />
//               </button>
              
//               <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white border-b pb-3 border-gray-200 dark:border-gray-700">
//                 Rider Details
//               </h2>

//               <div className="space-y-3 text-gray-700 dark:text-gray-300">
//                 <p>
//                   <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2"><MapPin size={16} className="text-yellow-600" />Name:</span> {selectedRider.name}
//                 </p>
//                 <p>
//                   <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2"><Phone size={16} className="text-yellow-600" />Email:</span> {selectedRider.email}
//                 </p>
//                 <p>
//                   <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2"><Phone size={16} className="text-yellow-600" />Phone:</span> {selectedRider.phone}
//                 </p>
//                 <p>
//                   <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2"><MapPin size={16} className="text-yellow-600" />Division:</span> {selectedRider.division || 'N/A'}
//                 </p>
//                 <p>
//                   <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2"><MapPin size={16} className="text-yellow-600" />District:</span> {selectedRider.district}
//                 </p>
//               </div>

//               <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
//                 <span className="font-semibold text-gray-900 dark:text-white mr-3">Status:</span>
//                 <span
//                   className="px-3 py-1.5 rounded-full bg-green-500 dark:bg-green-600 text-white font-semibold text-sm capitalize shadow-md shadow-green-500/30"
//                 >
//                   {selectedRider.status}
//                 </span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Bike, Search, XCircle, MapPin, Phone } from "lucide-react";
import toast from "react-hot-toast";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ActiveRidersPage() {
  const { data: session, status } = useSession();
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRider, setSelectedRider] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const fetchActiveRiders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/riders/active`, {
        headers: {
          "Content-Type": "application/json",
          // ✅ REMOVED: Authorization header (JWT removed)
          "user-id": session?.user?.id || "temp_id", // ✅ ADDED: User ID
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch active riders");
      }

      const data = await res.json();
      setRiders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong while fetching data.");
      toast.error("Failed to load active riders.");
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchActiveRiders();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status, fetchActiveRiders]);

  // --- Filtering Logic ---
  const filteredRiders = riders.filter(rider =>
    rider.name?.toLowerCase().includes(search.toLowerCase()) || 
    rider.district?.toLowerCase().includes(search.toLowerCase()) ||
    rider.phone?.includes(search)
  );
  
  // --- Render Statuses ---
  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-gray-50 dark:bg-gray-950">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading active riders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg mx-auto max-w-lg mt-10">
        <p className="font-semibold text-red-600 dark:text-red-400">Error Loading Data:</p>
        <p className="text-sm text-red-500 dark:text-red-300">{error}</p>
        <button 
          onClick={fetchActiveRiders}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // --- Main Render ---
  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 pb-3 border-b border-gray-200 dark:border-gray-800">
          <Bike size={32} className="text-orange-600 dark:text-orange-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Active Riders</h1>
          <button 
            onClick={fetchActiveRiders}
            className="ml-auto px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm"
          >
            Refresh
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-6 max-w-lg relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, district, or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
          />
        </div>

        {filteredRiders.length === 0 ? (
          <div className="p-10 text-center bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <p className="text-xl font-medium text-gray-500 dark:text-gray-400">
              {riders.length === 0 ? "No active riders found. 😟" : "No riders match your search."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr className="uppercase text-left text-xs font-semibold tracking-wider">
                  <th className="p-4 text-gray-700 dark:text-gray-300">Name</th>
                  <th className="p-4 text-gray-700 dark:text-gray-300">Phone</th>
                  <th className="p-4 text-gray-700 dark:text-gray-300">Division</th>
                  <th className="p-4 text-gray-700 dark:text-gray-300">District</th>
                  <th className="p-4 text-gray-700 dark:text-gray-300">Status</th>
                  <th className="p-4 text-gray-700 dark:text-gray-300 text-center">View</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredRiders.map((rider, idx) => (
                  <tr
                    key={rider._id}
                    className={`transition-all duration-300 transform 
                        ${idx % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}
                        hover:bg-yellow-50/70 dark:hover:bg-gray-800/70 hover:shadow-lg`}
                  >
                    <td className="p-4 text-gray-900 dark:text-white font-medium">{rider.name}</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">{rider.phone}</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">{rider.division || 'N/A'}</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">{rider.district}</td>
                    <td className="p-4">
                      <span className="px-3 py-1.5 rounded-full bg-green-500 dark:bg-green-600 text-white font-semibold text-xs capitalize shadow-md shadow-green-500/30">
                        {rider.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setSelectedRider(rider)}
                        className="flex items-center justify-center gap-1 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-yellow-500/30 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.05] active:scale-95 text-sm mx-auto"
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
                Rider Details
              </h2>

              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2"><MapPin size={16} className="text-yellow-600" />Name:</span> {selectedRider.name}
                </p>
                <p>
                  <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2"><Phone size={16} className="text-yellow-600" />Email:</span> {selectedRider.email}
                </p>
                <p>
                  <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2"><Phone size={16} className="text-yellow-600" />Phone:</span> {selectedRider.phone}
                </p>
                <p>
                  <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2"><MapPin size={16} className="text-yellow-600" />Division:</span> {selectedRider.division || 'N/A'}
                </p>
                <p>
                  <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2"><MapPin size={16} className="text-yellow-600" />District:</span> {selectedRider.district}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="font-semibold text-gray-900 dark:text-white mr-3">Status:</span>
                <span
                  className="px-3 py-1.5 rounded-full bg-green-500 dark:bg-green-600 text-white font-semibold text-sm capitalize shadow-md shadow-green-500/30"
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