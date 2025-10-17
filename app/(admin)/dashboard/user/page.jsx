// // "use client";

// // import React, { useEffect, useState } from "react";
// // import { useSession } from "next-auth/react";
// // import { useRouter } from "next/navigation";
// // import { FiTrash2 } from "react-icons/fi";

// // const AdminUsersPage = () => {
// //   const { data: session, status } = useSession();
// //   const router = useRouter();
// //   const [users, setUsers] = useState([]);
// //   const [filteredUsers, setFilteredUsers] = useState([]);
// //   const [filterRole, setFilterRole] = useState("all");
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// //   // Redirect non-admin users
// //   useEffect(() => {
// //     if (status === "authenticated" && session?.user?.role !== "admin") {
// //       router.push("/"); // redirect non-admins
// //     }
// //   }, [status, session, router]);

// //   // Fetch users (Admin only)
// //   const fetchUsers = async () => {
// //     if (!session?.token) return;
// //     try {
// //       setLoading(true);
// //       const res = await fetch(`${apiUrl}/users`, {
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${session.token}`,
// //         },
// //       });

// //       if (!res.ok) {
// //         throw new Error("Failed to fetch users");
// //       }

// //       const data = await res.json();
// //       setUsers(data);
// //       setFilteredUsers(data);
// //     } catch (err) {
// //       console.error(err);
// //       setError(err.message || "Something went wrong");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (status === "authenticated") {
// //       if (!session?.token) {
// //         setError("No token found. Please login again.");
// //         setLoading(false);
// //         return;
// //       }
// //       if (session.user.role === "admin") {
// //         fetchUsers();
// //       } else {
// //         router.push("/");
// //         setLoading(false);
// //       }
// //     }
// //   }, [status, session, router]);

// //   // Handle role change
// //   const handleRoleChange = async (userId, newRole) => {
// //     try {
// //       const res = await fetch(`${apiUrl}/users/${userId}/role`, {
// //         method: "PATCH",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${session.token}`,
// //         },
// //         body: JSON.stringify({ role: newRole }),
// //       });

// //       const data = await res.json();

// //       if (data.success) {
// //         setUsers((prev) =>
// //           prev.map((user) =>
// //             user._id === userId ? { ...user, role: newRole } : user
// //           )
// //         );
// //         setFilteredUsers((prev) =>
// //           prev.map((user) =>
// //             user._id === userId ? { ...user, role: newRole } : user
// //           )
// //         );
// //         alert("Role updated successfully!");
// //       } else {
// //         alert(data.error || "Failed to update role");
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       alert("Error updating role");
// //     }
// //   };

// //   // Handle user delete
// //   const handleDeleteUser = async (userId) => {
// //     if (!confirm("Are you sure you want to remove this user?")) return;
// //     try {
// //       const res = await fetch(`${apiUrl}/users/${userId}`, {
// //         method: "DELETE",
// //         headers: {
// //           Authorization: `Bearer ${session.token}`,
// //         },
// //       });

// //       const data = await res.json();
// //       if (data.success) {
// //         setUsers((prev) => prev.filter((user) => user._id !== userId));
// //         setFilteredUsers((prev) => prev.filter((user) => user._id !== userId));
// //         alert("User removed successfully!");
// //       } else {
// //         alert(data.error || "Failed to remove user");
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       alert("Error removing user");
// //     }
// //   };

// //   // Handle filtering
// //   useEffect(() => {
// //     if (filterRole === "all") {
// //       setFilteredUsers(users);
// //     } else {
// //       setFilteredUsers(users.filter((user) => user.role === filterRole));
// //     }
// //   }, [filterRole, users]);

// //   if (loading) return <p className="p-4">Loading users...</p>;
// //   if (error) return <p className="p-4 text-red-500">{error}</p>;

// //   return (
// //     <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
// //       <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
// //         Manage Users
// //       </h1>

// //       {/* Filter Dropdown */}
// //       <div className="flex justify-end mb-4">
// //         <select
// //           value={filterRole}
// //           onChange={(e) => setFilterRole(e.target.value)}
// //           className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
// //         >
// //           <option value="all">All</option>
// //           <option value="user">User</option>
// //           <option value="admin">Admin</option>
// //           <option value="moderator">Moderator</option>
// //           <option value="rider">Rider</option>
// //         </select>
// //       </div>

// //       {filteredUsers.length === 0 ? (
// //         <p className="text-center text-gray-500">No users found.</p>
// //       ) : (
// //         <div className="overflow-x-auto shadow rounded-lg">
// //           <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden">
// //             <thead className="bg-gray-100 dark:bg-gray-700">
// //               <tr>
// //                 <th className="border px-4 py-2 text-left text-gray-900 dark:text-gray-100">
// //                   Photo
// //                 </th>
// //                 <th className="border px-4 py-2 text-left text-gray-900 dark:text-gray-100">
// //                   Name
// //                 </th>
// //                 <th className="border px-4 py-2 text-left text-gray-900 dark:text-gray-100">
// //                   Email
// //                 </th>
// //                 <th className="border px-4 py-2 text-left text-gray-900 dark:text-gray-100">
// //                   Role
// //                 </th>
// //                 <th className="border px-4 py-2 text-center text-gray-900 dark:text-gray-100">
// //                   Actions
// //                 </th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filteredUsers.map((user) => (
// //                 <tr
// //                   key={user._id}
// //                   className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
// //                 >
// //                   <td className="border px-4 py-2">
// //                     <img
// //                       src={
// //                         user.photo ||
// //                         "https://i.ibb.co/2n8qPkw/default-avatar.png"
// //                       }
// //                       alt={user.name}
// //                       className="w-12 h-12 rounded-full mx-auto"
// //                     />
// //                   </td>
// //                   <td className="border px-4 py-2">{user.name}</td>
// //                   <td className="border px-4 py-2">{user.email}</td>
// //                   <td className="border px-4 py-2">
// //                     <select
// //                       value={user.role}
// //                       onChange={(e) =>
// //                         handleRoleChange(user._id, e.target.value)
// //                       }
// //                       className="border rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 transition w-full"
// //                     >
// //                       <option value="user">User</option>
// //                       <option value="admin">Admin</option>
// //                       <option value="moderator">Moderator</option>
// //                       <option value="rider">Rider</option>
// //                     </select>
// //                   </td>
// //                   <td className="border px-4 py-2 text-center">
// //                     <button
// //                       onClick={() => handleDeleteUser(user._id)}
// //                       className="text-red-500 hover:text-red-700 transition"
// //                     >
// //                       <FiTrash2 size={20} />
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AdminUsersPage;

// "use client";

// import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { FiTrash2 } from "react-icons/fi";

// const AdminUsersPage = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [filterRole, setFilterRole] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   // ✅ EMERGENCY FIX: Multiple ways to get token
//   const getToken = () => {
//     // Try all possible locations
//     const token = 
//       session?.accessToken ||
//       session?.user?.accessToken || 
//       session?.token ||
//       localStorage.getItem("nextauth.token") ||
//       localStorage.getItem("accessToken");

//     console.log("🔑 Token search result:", {
//       sessionAccessToken: session?.accessToken,
//       sessionUserAccessToken: session?.user?.accessToken,
//       sessionToken: session?.token,
//       localStorageToken: localStorage.getItem("nextauth.token"),
//       finalToken: token
//     });

//     return token;
//   };

//   // ✅ Store token in localStorage when available
//   useEffect(() => {
//     if (status === "authenticated") {
//       const token = getToken();
//       console.log("💾 Storing token in localStorage:", token);
      
//       if (token) {
//         localStorage.setItem("nextauth.token", token);
//         localStorage.setItem("accessToken", token);
//       }
//     }
//   }, [session, status]);

//   // ✅ Debug session completely
//   useEffect(() => {
//     console.log("=== FULL SESSION DEBUG ===");
//     console.log("Session:", session);
//     console.log("Session keys:", session ? Object.keys(session) : "No session");
//     console.log("Session.user:", session?.user);
//     console.log("Session.user keys:", session?.user ? Object.keys(session.user) : "No user");
//     console.log("Status:", status);
//     console.log("Final token:", getToken());
//     console.log("===========================");
//   }, [session, status]);

//   // ✅ Fetch users - UPDATED with better error handling
//   const fetchUsers = async () => {
//     const token = getToken();
    
//     console.log("🚀 Starting fetch with token:", token ? "✅ Available" : "❌ Missing");

//     if (!token) {
//       setError("No authentication token found. Please login again.");
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
      
//       console.log("📤 Sending request to:", `${apiUrl}/users`);
//       console.log("📤 Authorization header:", `Bearer ${token}`);

//       const response = await fetch(`${apiUrl}/users`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           // "Authorization": `Bearer ${token}`
//         },
//       });

//       console.log("📥 Response status:", response.status);
//       console.log("📥 Response headers:", Object.fromEntries(response.headers.entries()));

//       if (response.status === 401) {
//         throw new Error("Token invalid or expired. Please login again.");
//       }

//       if (response.status === 403) {
//         throw new Error("Admin access required.");
//       }

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Server returned ${response.status}: ${errorText}`);
//       }

//       const usersData = await response.json();
//       console.log("✅ Users fetched successfully. Count:", usersData.length);
      
//       setUsers(usersData);
//       setFilteredUsers(usersData);
      
//     } catch (err) {
//       console.error("❌ Fetch failed:", err);
//       setError(err.message);
      
//       // Clear invalid token
//       if (err.message.includes("Token invalid")) {
//         localStorage.removeItem("nextauth.token");
//         localStorage.removeItem("accessToken");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Fetch when ready
//   useEffect(() => {
//     if (status === "authenticated") {
//       console.log("🔐 User authenticated, checking role...");
      
//       if (session?.user?.role === "admin") {
//         console.log("🎯 Admin user detected, fetching users...");
//         // Small delay to ensure token is available
//         setTimeout(() => {
//           fetchUsers();
//         }, 100);
//       } else {
//         console.log("🚫 Not an admin, redirecting...");
//         router.push("/");
//       }
//     } else if (status === "unauthenticated") {
//       console.log("🔒 Not authenticated, redirecting to login...");
//       router.push("/login");
//     }
//   }, [status, session, router]);

//   // ✅ Manual test function
//   const testAuthorization = async () => {
//     const token = getToken();
//     console.log("🧪 Testing authorization with token:", token);
    
//     if (!token) {
//       alert("No token found!");
//       return;
//     }

//     // Test with a simple API call
//     try {
//       const testResponse = await fetch(`${apiUrl}/users`, {
//         headers: {
//           "Authorization": `Bearer ${token}`,
//         },
//       });
      
//       console.log("🧪 Test response status:", testResponse.status);
//       alert(`Test response: ${testResponse.status} - ${testResponse.statusText}`);
//     } catch (error) {
//       console.error("🧪 Test failed:", error);
//       alert("Test failed: " + error.message);
//     }
//   };

//   // ✅ Handle role change
//   const handleRoleChange = async (userId, newRole) => {
//     const token = getToken();
//     if (!token) {
//       alert("No authentication token found. Please login again.");
//       return;
//     }

//     try {
//       const res = await fetch(`${apiUrl}/users/${userId}/role`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify({ role: newRole }),
//       });

//       const data = await res.json();
//       console.log("Role change response:", data);

//       if (data.success) {
//         // Optimistic update
//         setUsers(prev => prev.map(user => 
//           user._id === userId ? { ...user, role: newRole } : user
//         ));
//         setFilteredUsers(prev => prev.map(user => 
//           user._id === userId ? { ...user, role: newRole } : user
//         ));
        
//         alert("User role updated successfully!");
//       } else {
//         alert(data.error || "Failed to update role");
//         // Re-fetch to sync with server
//         fetchUsers();
//       }
//     } catch (err) {
//       console.error("Role change error:", err);
//       alert("Error updating role. Please try again.");
//       // Re-fetch to sync with server
//       fetchUsers();
//     }
//   };

//   // ✅ Handle user delete with confirmation
//   const handleDeleteUser = async (userId) => {
//     const token = getToken();
//     if (!token) {
//       alert("No authentication token found. Please login again.");
//       return;
//     }

//     const userName = users.find(user => user._id === userId)?.name || "this user";
    
//     if (!confirm(`Are you sure you want to remove ${userName}? This action cannot be undone.`)) {
//       return;
//     }

//     try {
//       const res = await fetch(`${apiUrl}/users/${userId}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       console.log("Delete response:", data);

//       if (data.success) {
//         // Optimistic update
//         setUsers(prev => prev.filter(user => user._id !== userId));
//         setFilteredUsers(prev => prev.filter(user => user._id !== userId));
        
//         alert("User removed successfully!");
//       } else {
//         alert(data.error || "Failed to remove user");
//         // Re-fetch to sync with server
//         fetchUsers();
//       }
//     } catch (err) {
//       console.error("Delete error:", err);
//       alert("Error removing user. Please try again.");
//       // Re-fetch to sync with server
//       fetchUsers();
//     }
//   };

//   // ✅ Handle filtering
//   useEffect(() => {
//     if (filterRole === "all") {
//       setFilteredUsers(users);
//     } else {
//       setFilteredUsers(users.filter(user => user.role === filterRole));
//     }
//   }, [filterRole, users]);

//   // ✅ Better loading and error states
//   if (status === "loading") {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Checking authentication...</p>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading users...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center max-w-md">
//           <div className="text-red-500 text-4xl mb-4">⚠️</div>
//           <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
//           <p className="text-red-500 mb-4">{error}</p>
//           <div className="space-y-2">
//             <button 
//               onClick={fetchUsers}
//               className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//             >
//               Try Again
//             </button>
//             <button 
//               onClick={testAuthorization}
//               className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
//             >
//               Test Authorization
//             </button>
//             <button 
//               onClick={() => router.push("/login")}
//               className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
//             >
//               Go to Login
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
//           Manage Users
//         </h1>

//         {/* Debug Info - Remove in production */}
//         <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
//           <h3 className="font-bold mb-2 text-blue-800 dark:text-blue-200">Debug Information</h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
//             <div>
//               <span className="font-semibold">Status:</span> 
//               <span className="ml-1 font-mono bg-white dark:bg-gray-800 px-1 rounded">{status}</span>
//             </div>
//             <div>
//               <span className="font-semibold">Role:</span> 
//               <span className="ml-1 font-mono bg-white dark:bg-gray-800 px-1 rounded">{session?.user?.role}</span>
//             </div>
//             <div>
//               <span className="font-semibold">Token:</span> 
//               <span className={`ml-1 font-mono px-1 rounded ${getToken() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                 {getToken() ? "✅ Available" : "❌ Missing"}
//               </span>
//             </div>
//             <div>
//               <span className="font-semibold">Users:</span> 
//               <span className="ml-1 font-mono bg-white dark:bg-gray-800 px-1 rounded">{users.length}</span>
//             </div>
//           </div>
//           <div className="mt-2 flex gap-2">
//             <button 
//               onClick={testAuthorization}
//               className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
//             >
//               Test Auth
//             </button>
//             <button 
//               onClick={fetchUsers}
//               className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition"
//             >
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Filter and Stats */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="text-gray-600 dark:text-gray-300">
//             <span className="font-semibold">Total Users:</span> {filteredUsers.length}
//             {filterRole !== 'all' && (
//               <span className="ml-2 text-sm">(Filtered by: {filterRole})</span>
//             )}
//           </div>
//           <select
//             value={filterRole}
//             onChange={(e) => setFilterRole(e.target.value)}
//             className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
//           >
//             <option value="all">All Roles</option>
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//             <option value="moderator">Moderator</option>
//             <option value="rider">Rider</option>
//           </select>
//         </div>

//         {filteredUsers.length === 0 ? (
//           <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
//             <div className="text-gray-400 text-6xl mb-4">👥</div>
//             <p className="text-gray-500 dark:text-gray-400 text-lg">No users found.</p>
//             {filterRole !== 'all' && (
//               <p className="text-gray-400 text-sm mt-2">Try changing the filter</p>
//             )}
//           </div>
//         ) : (
//           <div className="overflow-x-auto shadow-lg rounded-lg">
//             <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden">
//               <thead className="bg-gray-100 dark:bg-gray-700">
//                 <tr>
//                   <th className="border px-4 py-3 text-left text-gray-900 dark:text-gray-100 font-semibold">Photo</th>
//                   <th className="border px-4 py-3 text-left text-gray-900 dark:text-gray-100 font-semibold">Name</th>
//                   <th className="border px-4 py-3 text-left text-gray-900 dark:text-gray-100 font-semibold">Email</th>
//                   <th className="border px-4 py-3 text-left text-gray-900 dark:text-gray-100 font-semibold">Role</th>
//                   <th className="border px-4 py-3 text-center text-gray-900 dark:text-gray-100 font-semibold">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredUsers.map((user) => (
//                   <tr
//                     key={user._id}
//                     className="text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
//                   >
//                     <td className="border px-4 py-3">
//                       <img
//                         src={user.photo || "https://i.ibb.co/2n8qPkw/default-avatar.png"}
//                         alt={user.name}
//                         className="w-10 h-10 rounded-full mx-auto object-cover"
//                       />
//                     </td>
//                     <td className="border px-4 py-3 font-medium">{user.name}</td>
//                     <td className="border px-4 py-3">{user.email}</td>
//                     <td className="border px-4 py-3">
//                       <select
//                         value={user.role}
//                         onChange={(e) => handleRoleChange(user._id, e.target.value)}
//                         className="border rounded px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition w-full"
//                       >
//                         <option value="user">User</option>
//                         <option value="admin">Admin</option>
//                         <option value="moderator">Moderator</option>
//                         <option value="rider">Rider</option>
//                       </select>
//                     </td>
//                     <td className="border px-4 py-3 text-center">
//                       <button
//                         onClick={() => handleDeleteUser(user._id)}
//                         className="text-red-500 hover:text-red-700 transition p-2 rounded hover:bg-red-50 dark:hover:bg-red-900"
//                         title="Delete User"
//                       >
//                         <FiTrash2 size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminUsersPage;










"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";

const AdminUsersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // ✅ Fetch users - UPDATED for JWT-less system
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("📤 Fetching users from:", `${apiUrl}/admin/users`);

      const response = await fetch(`${apiUrl}/admin/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // ✅ REMOVED: Authorization header
          "user-id": session?.user?.id || "temp_id", // ✅ ADDED: User ID
        },
      });

      console.log("📥 Response status:", response.status);

      if (response.status === 401) {
        throw new Error("Authentication required. Please login again.");
      }

      if (response.status === 403) {
        throw new Error("Admin access required.");
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server returned ${response.status}: ${errorText}`);
      }

      const usersData = await response.json();
      console.log("✅ Users fetched successfully. Count:", usersData.length);
      
      setUsers(usersData);
      setFilteredUsers(usersData);
      
    } catch (err) {
      console.error("❌ Fetch failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch when ready
  useEffect(() => {
    if (status === "authenticated") {
      console.log("🔐 User authenticated, checking role...");
      
      if (session?.user?.role === "admin") {
        console.log("🎯 Admin user detected, fetching users...");
        fetchUsers();
      } else {
        console.log("🚫 Not an admin, redirecting...");
        router.push("/");
      }
    } else if (status === "unauthenticated") {
      console.log("🔒 Not authenticated, redirecting to login...");
      router.push("/login");
    }
  }, [status, session, router]);

  // ✅ Handle role change
  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await fetch(`${apiUrl}/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "user-id": session?.user?.id || "temp_id", // ✅ ADDED: User ID
        },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await res.json();
      console.log("Role change response:", data);

      if (data.success) {
        // Optimistic update
        setUsers(prev => prev.map(user => 
          user._id === userId ? { ...user, role: newRole } : user
        ));
        setFilteredUsers(prev => prev.map(user => 
          user._id === userId ? { ...user, role: newRole } : user
        ));
        
        toast.success("User role updated successfully!");
      } else {
        alert(data.error || "Failed to update role");
        fetchUsers();
      }
    } catch (err) {
      console.error("Role change error:", err);
      alert("Error updating role. Please try again.");
      fetchUsers();
    }
  };

  // ✅ Handle user delete
  const handleDeleteUser = async (userId) => {
    const userName = users.find(user => user._id === userId)?.name || "this user";
    
    if (!confirm(`Are you sure you want to remove ${userName}? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "user-id": session?.user?.id || "temp_id", // ✅ ADDED: User ID
        },
      });

      const data = await res.json();
      console.log("Delete response:", data);

      if (data.success) {
        setUsers(prev => prev.filter(user => user._id !== userId));
        setFilteredUsers(prev => prev.filter(user => user._id !== userId));
        
        toast.success("User removed successfully!");
      } else {
        alert(data.error || "Failed to remove user");
        fetchUsers();
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error removing user. Please try again.");
      fetchUsers();
    }
  };

  // ✅ Handle filtering
  useEffect(() => {
    if (filterRole === "all") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(user => user.role === filterRole));
    }
  }, [filterRole, users]);

  // ✅ Loading and error states
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={fetchUsers}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          Manage Users
        </h1>

        {/* Filter and Stats */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold">Total Users:</span> {filteredUsers.length}
            {filterRole !== 'all' && (
              <span className="ml-2 text-sm">(Filtered by: {filterRole})</span>
            )}
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="rider">Rider</option>
          </select>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="text-gray-400 text-6xl mb-4">👥</div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">No users found.</p>
            {filterRole !== 'all' && (
              <p className="text-gray-400 text-sm mt-2">Try changing the filter</p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="border px-4 py-3 text-left text-gray-900 dark:text-gray-100 font-semibold">Photo</th>
                  <th className="border px-4 py-3 text-left text-gray-900 dark:text-gray-100 font-semibold">Name</th>
                  <th className="border px-4 py-3 text-left text-gray-900 dark:text-gray-100 font-semibold">Email</th>
                  <th className="border px-4 py-3 text-left text-gray-900 dark:text-gray-100 font-semibold">Role</th>
                  <th className="border px-4 py-3 text-center text-gray-900 dark:text-gray-100 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="border px-4 py-3">
                      <img
                        src={user.photo || "https://i.ibb.co/2n8qPkw/default-avatar.png"}
                        alt={user.name}
                        className="w-10 h-10 rounded-full mx-auto object-cover"
                      />
                    </td>
                    <td className="border px-4 py-3 font-medium">{user.name}</td>
                    <td className="border px-4 py-3">{user.email}</td>
                    <td className="border px-4 py-3">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="border rounded px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition w-full"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="rider">Rider</option>
                      </select>
                    </td>
                    <td className="border px-4 py-3 text-center">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="text-red-500 hover:text-red-700 transition p-2 rounded hover:bg-red-50 dark:hover:bg-red-900"
                        title="Delete User"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;